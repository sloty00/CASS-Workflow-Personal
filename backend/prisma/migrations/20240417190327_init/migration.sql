/*
  Warnings:

  - You are about to alter the column `F_permiso` on the `permisos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - Changed the type of `Fecha_Salida` on the `vacaciones` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `permisos` MODIFY `F_permiso` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `vacaciones` DROP COLUMN `Fecha_Salida`,
    ADD COLUMN `Fecha_Salida` DATETIME(3) NOT NULL;
