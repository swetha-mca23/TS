import { MigrationInterface, QueryRunner } from "typeorm";

export class Newmigration1742548202216 implements MigrationInterface {
    name = 'Newmigration1742548202216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`phoneNo\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`phoneNo\``);
    }

}
