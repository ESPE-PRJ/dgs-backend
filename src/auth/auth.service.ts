import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Role } from './entities/role.entity';
import { Paciente } from './entities/paciente.entity';
import { Cuidador } from './entities/cuidador.entity';
import { ProfesionalSalud } from './entities/profesional-salud.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>,
    @InjectRepository(Cuidador)
    private readonly cuidadorRepo: Repository<Cuidador>,
    @InjectRepository(ProfesionalSalud)
    private readonly profesionalSaludRepo: Repository<ProfesionalSalud>,
    private readonly jwtService: JwtService,
  ) {}

  // REGISTRO DE USUARIO
  async register(dto: CreateAuthDto) {
    // Validar email único
    const exist = await this.usuarioRepo.findOne({
      where: { email: dto.email },
    });
    if (exist) throw new BadRequestException('El correo ya está registrado');

    // Rol válido
    const role = await this.roleRepo.findOne({ where: { nombre: dto.role } });
    if (!role) throw new BadRequestException('Rol no válido');

    // Hash de password
    const hash = await bcrypt.hash(dto.password, 10);

    // Crear usuario
    const usuario = this.usuarioRepo.create({
      email: dto.email,
      password: hash,
      nombre: dto.nombre,
      apellido: dto.apellido,
      fecha_nacimiento: dto.fecha_nacimiento,
      telefono: dto.telefono,
      genero: dto.genero,
      activo: true,
      role: role,
    });
    await this.usuarioRepo.save(usuario);

    // Crear entidad específica según rol
    if (dto.role === 'PACIENTE') {
      await this.pacienteRepo.save({
        usuario,
        historial_clinico: '',
        grupo_sanguineo: '',
        direccion: '',
      });
    } else if (dto.role === 'CUIDADOR') {
      await this.cuidadorRepo.save({ usuario, parentesco: '' });
    } else if (dto.role === 'PROFESIONAL') {
      await this.profesionalSaludRepo.save({
        usuario,
        numero_licencia: '',
        especialidad: '',
        institucion: '',
      });
    }

    return { message: 'Usuario registrado correctamente' };
  }

  // LOGIN DE USUARIO (DEVUELVE JWT)
  async login(dto: LoginAuthDto) {
    const usuario = await this.usuarioRepo.findOne({
      where: { email: dto.email },
      relations: ['role'],
    });
    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');
    const match = await bcrypt.compare(dto.password, usuario.password);
    if (!match) throw new UnauthorizedException('Credenciales inválidas');
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      role: usuario.role.nombre,
    };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        role: usuario.role.nombre,
      },
    };
  }

  // PERFIL DEL USUARIO AUTENTICADO
  async getProfile(userId: string) {
    return this.usuarioRepo.findOne({
      where: { id: userId },
      relations: ['role'],
    });
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const usuario = await this.usuarioRepo.findOne({ where: { id: userId } });
    if (!usuario) throw new BadRequestException('Usuario no encontrado');
    Object.assign(usuario, dto);
    return this.usuarioRepo.save(usuario);
  }
}
