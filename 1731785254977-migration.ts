import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731785254977 implements MigrationInterface {
    name = 'Migration1731785254977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "body" character varying NOT NULL, "user_id" integer, "article_id" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Articals" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, "user_id" integer, CONSTRAINT "PK_2c83ee8415072028f1a07e00d48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_03a590c26b0910b0bb49682b1e3" FOREIGN KEY ("article_id") REFERENCES "Articals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Articals" ADD CONSTRAINT "FK_81607d9b135a801e10681c73217" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Articals" DROP CONSTRAINT "FK_81607d9b135a801e10681c73217"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_03a590c26b0910b0bb49682b1e3"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "Articals"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
