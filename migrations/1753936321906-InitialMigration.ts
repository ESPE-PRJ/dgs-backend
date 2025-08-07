import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1753936321906 implements MigrationInterface {
    name = 'InitialMigration1753936321906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medicamento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actualizado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "eliminado_en" TIMESTAMP WITH TIME ZONE, "codigo" character varying(20) NOT NULL, "nombre" character varying(100) NOT NULL, "forma_farmaceutica" character varying(50) NOT NULL, "concentracion" character varying(50) NOT NULL, "laboratorio" character varying(100) NOT NULL, "observaciones" character varying(100) NOT NULL, CONSTRAINT "UQ_034a9be29768b76b6528b7b8f88" UNIQUE ("codigo"), CONSTRAINT "PK_d78d6a102cc6e898c965583d55a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actualizado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "eliminado_en" TIMESTAMP WITH TIME ZONE, "nombre" character varying NOT NULL, "descripcion" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notificacion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actualizado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "eliminado_en" TIMESTAMP WITH TIME ZONE, "titulo" character varying NOT NULL, "mensaje" character varying NOT NULL, "tipo" character varying NOT NULL, "prioridad" character varying NOT NULL, "leido" boolean NOT NULL, "usuarioId" uuid, CONSTRAINT "PK_b4402a54386266ca21a86420f77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mensaje" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actualizado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "eliminado_en" TIMESTAMP WITH TIME ZONE, "contenido" text NOT NULL, "leido" boolean NOT NULL DEFAULT false, "fecha_lectura" TIMESTAMP, "remitenteId" uuid NOT NULL, "destinatarioId" uuid NOT NULL, CONSTRAINT "PK_335fa8b9b8e643289485ea98138" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."usuario_genero_enum" AS ENUM('Femenino', 'Masculino')`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actualizado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "eliminado_en" TIMESTAMP WITH TIME ZONE, "email" character varying(200) NOT NULL, "password" character varying NOT NULL, "nombre" character varying NOT NULL, "apellido" character varying NOT NULL, "fecha_nacimiento" TIMESTAMP NOT NULL, "telefono" character varying(20) NOT NULL, "genero" "public"."usuario_genero_enum" NOT NULL, "activo" boolean NOT NULL DEFAULT true, "roleId" uuid, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cuidador" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actualizado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "eliminado_en" TIMESTAMP WITH TIME ZONE, "parentesco" character varying NOT NULL, "usuarioId" uuid, CONSTRAINT "REL_795734252a7d6328a3b7943019" UNIQUE ("usuarioId"), CONSTRAINT "PK_f1156eddcbdd20932d20c8fbf08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cuidador_paciente" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actualizado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "eliminado_en" TIMESTAMP WITH TIME ZONE, "rol" character varying NOT NULL, "observaciones" character varying, "cuidadorId" uuid, "pacienteId" uuid, CONSTRAINT "PK_2f3a537f3c58ade66260faf8b63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "signos_vitales" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actualizado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "eliminado_en" TIMESTAMP WITH TIME ZONE, "tipo" character varying NOT NULL, "valor" numeric(6,2) NOT NULL, "unidad" character varying(10) NOT NULL, "pacienteId" uuid, CONSTRAINT "PK_9393417075680a1eeaa4a3e5e24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paciente" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actualizado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "eliminado_en" TIMESTAMP WITH TIME ZONE, "historial_clinico" character varying NOT NULL, "grupo_sanguineo" character varying NOT NULL, "direccion" character varying NOT NULL, "usuarioId" uuid, CONSTRAINT "REL_2eb0f3dd5ffad965b52aa77fd4" UNIQUE ("usuarioId"), CONSTRAINT "PK_cbcb7985432e4b49d32c5243867" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profesional_salud" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actualizado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "eliminado_en" TIMESTAMP WITH TIME ZONE, "numero_licencia" character varying NOT NULL, "especialidad" character varying NOT NULL, "institucion" character varying NOT NULL, "usuarioId" uuid, CONSTRAINT "REL_d9b189d956f5d363517041340d" UNIQUE ("usuarioId"), CONSTRAINT "PK_ea4c46eb450c21003c57f1a5a14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prescripcion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actualizado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "eliminado_en" TIMESTAMP WITH TIME ZONE, "motivo" character varying NOT NULL, "instrucciones" character varying NOT NULL, "vigente" boolean NOT NULL DEFAULT true, "pacienteId" uuid, "profesionalSaludId" uuid, CONSTRAINT "PK_e4a3f640a8c53b76ad623f164fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prescripcion_medicamento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actualizado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "eliminado_en" TIMESTAMP WITH TIME ZONE, "dosis" character varying NOT NULL, "frecuencia" character varying NOT NULL, "via_administracion" character varying NOT NULL, "observaciones" character varying NOT NULL, "fecha_inicio" TIMESTAMP NOT NULL, "fecha_fin" TIMESTAMP NOT NULL, "medicamentoId" uuid, "prescripcionId" uuid, CONSTRAINT "PK_288bdd9235581b460fbfc480359" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recordatorio" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actualizado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "eliminado_en" TIMESTAMP WITH TIME ZONE, "titulo" character varying NOT NULL, "descripcion" text NOT NULL, "intervalo_dias" integer NOT NULL DEFAULT '1', "hora_recordatorio" TIME NOT NULL, "fecha_inicio" date NOT NULL, "fecha_fin" date, "activo" boolean NOT NULL DEFAULT true, "completado" boolean NOT NULL DEFAULT false, "ultima_ejecucion" TIMESTAMP, "proxima_ejecucion" TIMESTAMP, "usuarioId" uuid NOT NULL, "prescripcionMedicamentoId" uuid NOT NULL, CONSTRAINT "PK_6cc05e4e39c0e1ad5ff404018d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "registro_adherencia" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actualizado_en" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "eliminado_en" TIMESTAMP WITH TIME ZONE, "suministrado" boolean NOT NULL DEFAULT false, "fecha_suministro" TIMESTAMP, "observaciones" text, "recordatorioId" uuid NOT NULL, "pacienteId" uuid NOT NULL, CONSTRAINT "PK_d5b8064107d775e27ded76f4f1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notificacion" ADD CONSTRAINT "FK_acdc42b01f62aded0f2983100df" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mensaje" ADD CONSTRAINT "FK_7aaa56af01e0e9e685b7cd2cb43" FOREIGN KEY ("remitenteId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mensaje" ADD CONSTRAINT "FK_ab4115bbc782494b774f685772c" FOREIGN KEY ("destinatarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_5fdb8ef6f8f60769de417c33f8b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cuidador" ADD CONSTRAINT "FK_795734252a7d6328a3b7943019f" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cuidador_paciente" ADD CONSTRAINT "FK_19000974a917294dfb253164776" FOREIGN KEY ("cuidadorId") REFERENCES "cuidador"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cuidador_paciente" ADD CONSTRAINT "FK_4ce045aee2a7e05c85ade8248ef" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "signos_vitales" ADD CONSTRAINT "FK_d257ee4b5b2808b80f9a82a1413" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "paciente" ADD CONSTRAINT "FK_2eb0f3dd5ffad965b52aa77fd47" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profesional_salud" ADD CONSTRAINT "FK_d9b189d956f5d363517041340d3" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prescripcion" ADD CONSTRAINT "FK_59fba10603d65d4cfb5143df99d" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prescripcion" ADD CONSTRAINT "FK_f6d533f6a8b350520835a3951e8" FOREIGN KEY ("profesionalSaludId") REFERENCES "profesional_salud"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prescripcion_medicamento" ADD CONSTRAINT "FK_15f6975639eeff29bdbc65ad714" FOREIGN KEY ("medicamentoId") REFERENCES "medicamento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prescripcion_medicamento" ADD CONSTRAINT "FK_f2f9c9fd26778e6a6c589c8ae45" FOREIGN KEY ("prescripcionId") REFERENCES "prescripcion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recordatorio" ADD CONSTRAINT "FK_46be88817395a7f8b16aa47ad4f" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recordatorio" ADD CONSTRAINT "FK_4402bd5547701a55b474f23cf26" FOREIGN KEY ("prescripcionMedicamentoId") REFERENCES "prescripcion_medicamento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registro_adherencia" ADD CONSTRAINT "FK_9c4dce46877a405851c98301680" FOREIGN KEY ("recordatorioId") REFERENCES "recordatorio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registro_adherencia" ADD CONSTRAINT "FK_4495d621a0917470fbb073281d1" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registro_adherencia" DROP CONSTRAINT "FK_4495d621a0917470fbb073281d1"`);
        await queryRunner.query(`ALTER TABLE "registro_adherencia" DROP CONSTRAINT "FK_9c4dce46877a405851c98301680"`);
        await queryRunner.query(`ALTER TABLE "recordatorio" DROP CONSTRAINT "FK_4402bd5547701a55b474f23cf26"`);
        await queryRunner.query(`ALTER TABLE "recordatorio" DROP CONSTRAINT "FK_46be88817395a7f8b16aa47ad4f"`);
        await queryRunner.query(`ALTER TABLE "prescripcion_medicamento" DROP CONSTRAINT "FK_f2f9c9fd26778e6a6c589c8ae45"`);
        await queryRunner.query(`ALTER TABLE "prescripcion_medicamento" DROP CONSTRAINT "FK_15f6975639eeff29bdbc65ad714"`);
        await queryRunner.query(`ALTER TABLE "prescripcion" DROP CONSTRAINT "FK_f6d533f6a8b350520835a3951e8"`);
        await queryRunner.query(`ALTER TABLE "prescripcion" DROP CONSTRAINT "FK_59fba10603d65d4cfb5143df99d"`);
        await queryRunner.query(`ALTER TABLE "profesional_salud" DROP CONSTRAINT "FK_d9b189d956f5d363517041340d3"`);
        await queryRunner.query(`ALTER TABLE "paciente" DROP CONSTRAINT "FK_2eb0f3dd5ffad965b52aa77fd47"`);
        await queryRunner.query(`ALTER TABLE "signos_vitales" DROP CONSTRAINT "FK_d257ee4b5b2808b80f9a82a1413"`);
        await queryRunner.query(`ALTER TABLE "cuidador_paciente" DROP CONSTRAINT "FK_4ce045aee2a7e05c85ade8248ef"`);
        await queryRunner.query(`ALTER TABLE "cuidador_paciente" DROP CONSTRAINT "FK_19000974a917294dfb253164776"`);
        await queryRunner.query(`ALTER TABLE "cuidador" DROP CONSTRAINT "FK_795734252a7d6328a3b7943019f"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_5fdb8ef6f8f60769de417c33f8b"`);
        await queryRunner.query(`ALTER TABLE "mensaje" DROP CONSTRAINT "FK_ab4115bbc782494b774f685772c"`);
        await queryRunner.query(`ALTER TABLE "mensaje" DROP CONSTRAINT "FK_7aaa56af01e0e9e685b7cd2cb43"`);
        await queryRunner.query(`ALTER TABLE "notificacion" DROP CONSTRAINT "FK_acdc42b01f62aded0f2983100df"`);
        await queryRunner.query(`DROP TABLE "registro_adherencia"`);
        await queryRunner.query(`DROP TABLE "recordatorio"`);
        await queryRunner.query(`DROP TABLE "prescripcion_medicamento"`);
        await queryRunner.query(`DROP TABLE "prescripcion"`);
        await queryRunner.query(`DROP TABLE "profesional_salud"`);
        await queryRunner.query(`DROP TABLE "paciente"`);
        await queryRunner.query(`DROP TABLE "signos_vitales"`);
        await queryRunner.query(`DROP TABLE "cuidador_paciente"`);
        await queryRunner.query(`DROP TABLE "cuidador"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TYPE "public"."usuario_genero_enum"`);
        await queryRunner.query(`DROP TABLE "mensaje"`);
        await queryRunner.query(`DROP TABLE "notificacion"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "medicamento"`);
    }

}
