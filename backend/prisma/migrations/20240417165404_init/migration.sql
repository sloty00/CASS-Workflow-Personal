-- CreateTable
CREATE TABLE `Personal` (
    `Rut` VARCHAR(191) NOT NULL,
    `Nombre` VARCHAR(191) NOT NULL,
    `Apellidos` VARCHAR(191) NOT NULL,
    `Sector` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Telefono` VARCHAR(191) NOT NULL,
    `Direccion` VARCHAR(191) NOT NULL,
    `Comuna` VARCHAR(191) NOT NULL,
    `Provincia` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Personal_Rut_key`(`Rut`),
    PRIMARY KEY (`Rut`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Accesos` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `A_Rut` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehiculo` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Patente` VARCHAR(191) NOT NULL,
    `Marca` VARCHAR(191) NOT NULL,
    `Modelo` VARCHAR(191) NOT NULL,
    `Ano` INTEGER NOT NULL,
    `Fecha_ptte` DATETIME(3) NOT NULL,
    `Fecha_rvs` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Vehiculo_Patente_key`(`Patente`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `P_vehiculo` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `PV_Rut` VARCHAR(191) NOT NULL,
    `PV_Patente` VARCHAR(191) NOT NULL,
    `F_permiso` DATETIME(3) NOT NULL,
    `Validar` BOOLEAN NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chk_vehiculo` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Chk_Rut` VARCHAR(191) NOT NULL,
    `Chk_Patente` VARCHAR(191) NOT NULL,
    `Km_salida` INTEGER NOT NULL,
    `Km_llegada` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vacaciones` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `V_Rut` VARCHAR(191) NOT NULL,
    `Fecha_Salida` INTEGER NOT NULL,
    `Dias_vacaciones` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permisos` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `P_Rut` VARCHAR(191) NOT NULL,
    `F_permiso` VARCHAR(191) NOT NULL,
    `Dias` INTEGER NOT NULL,
    `Descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Accesos` ADD CONSTRAINT `Accesos_A_Rut_fkey` FOREIGN KEY (`A_Rut`) REFERENCES `Personal`(`Rut`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `P_vehiculo` ADD CONSTRAINT `P_vehiculo_PV_Rut_fkey` FOREIGN KEY (`PV_Rut`) REFERENCES `Personal`(`Rut`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `P_vehiculo` ADD CONSTRAINT `P_vehiculo_PV_Patente_fkey` FOREIGN KEY (`PV_Patente`) REFERENCES `Vehiculo`(`Patente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chk_vehiculo` ADD CONSTRAINT `Chk_vehiculo_Chk_Rut_fkey` FOREIGN KEY (`Chk_Rut`) REFERENCES `Personal`(`Rut`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chk_vehiculo` ADD CONSTRAINT `Chk_vehiculo_Chk_Patente_fkey` FOREIGN KEY (`Chk_Patente`) REFERENCES `Vehiculo`(`Patente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vacaciones` ADD CONSTRAINT `Vacaciones_V_Rut_fkey` FOREIGN KEY (`V_Rut`) REFERENCES `Personal`(`Rut`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permisos` ADD CONSTRAINT `Permisos_P_Rut_fkey` FOREIGN KEY (`P_Rut`) REFERENCES `Personal`(`Rut`) ON DELETE RESTRICT ON UPDATE CASCADE;
