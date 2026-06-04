/*
  Warnings:

  - The primary key for the `personal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `Id` to the `Personal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `personal` DROP PRIMARY KEY,
    ADD COLUMN `Id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Id`);
