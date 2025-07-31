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
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateAuthDto) {
    const exist = await this.usuarioRepo.findOne({
      where: { email: dto.email },
    });
    if (exist) throw new BadRequestException('El correo ya está registrado');
    const role = await this.roleRepo.findOne({ where: { nombre: dto.role } });
    if (!role) throw new BadRequestException('Rol no válido');

    const hash = await bcrypt.hash(dto.password, 10);

    const usuario = this.usuarioRepo.create({
      ...dto,
      password: hash,
      role,
    });
    await this.usuarioRepo.save(usuario);
    // Aquí puedes crear el paciente, cuidador o profesional según el rol
    return { message: 'Usuario registrado correctamente' };
  }

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

  async getProfile(userId: string) {
    return this.usuarioRepo.findOne({
      where: { id: userId },
      relations: ['role'],
    });
  }
}
