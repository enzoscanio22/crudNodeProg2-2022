import {MigrationInterface, QueryRunner} from "typeorm";

export class creacion1666920731596 implements MigrationInterface {
    name = 'creacion1666920731596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "productos" ("id" varchar PRIMARY KEY NOT NULL, "nombreProducto" varchar NOT NULL, "descripción" varchar NOT NULL, "precio" integer NOT NULL, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')), "categoriaId" varchar)`);
        await queryRunner.query(`CREATE TABLE "categorias" ("id" varchar PRIMARY KEY NOT NULL, "nombreCategoria" varchar NOT NULL, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" varchar PRIMARY KEY NOT NULL, "nombreUsuario" varchar NOT NULL, "eMail" varchar NOT NULL, "teléfono" varchar NOT NULL, "ciudad" varchar NOT NULL, "provincia" varchar NOT NULL, "contraseña" varchar NOT NULL, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_productos" ("id" varchar PRIMARY KEY NOT NULL, "nombreProducto" varchar NOT NULL, "descripción" varchar NOT NULL, "precio" integer NOT NULL, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')), "categoriaId" varchar, CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7" FOREIGN KEY ("categoriaId") REFERENCES "categorias" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_productos"("id", "nombreProducto", "descripción", "precio", "fechaCreacion", "fechaModificacion", "categoriaId") SELECT "id", "nombreProducto", "descripción", "precio", "fechaCreacion", "fechaModificacion", "categoriaId" FROM "productos"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`ALTER TABLE "temporary_productos" RENAME TO "productos"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productos" RENAME TO "temporary_productos"`);
        await queryRunner.query(`CREATE TABLE "productos" ("id" varchar PRIMARY KEY NOT NULL, "nombreProducto" varchar NOT NULL, "descripción" varchar NOT NULL, "precio" integer NOT NULL, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')), "categoriaId" varchar)`);
        await queryRunner.query(`INSERT INTO "productos"("id", "nombreProducto", "descripción", "precio", "fechaCreacion", "fechaModificacion", "categoriaId") SELECT "id", "nombreProducto", "descripción", "precio", "fechaCreacion", "fechaModificacion", "categoriaId" FROM "temporary_productos"`);
        await queryRunner.query(`DROP TABLE "temporary_productos"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
        await queryRunner.query(`DROP TABLE "productos"`);
    }

}
