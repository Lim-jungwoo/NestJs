import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1744963976150 implements MigrationInterface {
    name = 'Auto1744963976150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_240853a0c3353c25fb12434ad3\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_permissions_permission\` (\`roleId\` int NOT NULL, \`permissionId\` int NOT NULL, INDEX \`IDX_b36cb2e04bc353ca4ede00d87b\` (\`roleId\`), INDEX \`IDX_bfbc9e263d4cea6d7a8c9eb3ad\` (\`permissionId\`), PRIMARY KEY (\`roleId\`, \`permissionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_roles_role\` (\`userId\` int NOT NULL, \`roleId\` int NOT NULL, INDEX \`IDX_5f9286e6c25594c6b88c108db7\` (\`userId\`), INDEX \`IDX_4be2f7adf862634f5f803d246b\` (\`roleId\`), PRIMARY KEY (\`userId\`, \`roleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`role_permissions_permission\` ADD CONSTRAINT \`FK_b36cb2e04bc353ca4ede00d87b9\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_permissions_permission\` ADD CONSTRAINT \`FK_bfbc9e263d4cea6d7a8c9eb3ad2\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_5f9286e6c25594c6b88c108db77\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_4be2f7adf862634f5f803d246b8\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_4be2f7adf862634f5f803d246b8\``);
        await queryRunner.query(`ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_5f9286e6c25594c6b88c108db77\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions_permission\` DROP FOREIGN KEY \`FK_bfbc9e263d4cea6d7a8c9eb3ad2\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions_permission\` DROP FOREIGN KEY \`FK_b36cb2e04bc353ca4ede00d87b9\``);
        await queryRunner.query(`DROP INDEX \`IDX_4be2f7adf862634f5f803d246b\` ON \`user_roles_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_5f9286e6c25594c6b88c108db7\` ON \`user_roles_role\``);
        await queryRunner.query(`DROP TABLE \`user_roles_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_bfbc9e263d4cea6d7a8c9eb3ad\` ON \`role_permissions_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_b36cb2e04bc353ca4ede00d87b\` ON \`role_permissions_permission\``);
        await queryRunner.query(`DROP TABLE \`role_permissions_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP INDEX \`IDX_240853a0c3353c25fb12434ad3\` ON \`permission\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
    }

}
