import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1744862856279 implements MigrationInterface {
    name = 'Auto1744862856279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`loginId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_f085de3b9289b5f6b7528ebe16\` (\`loginId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_f085de3b9289b5f6b7528ebe16\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`loginId\``);
    }

}
