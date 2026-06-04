/*
  Warnings:

  - A unique constraint covering the columns `[Id]` on the table `Personal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Personal_Id_key` ON `Personal`(`Id`);
