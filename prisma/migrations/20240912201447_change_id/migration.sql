-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('Car', 'Motor');

-- CreateTable
CREATE TABLE "Vehicle" (
    "immatriculation" TEXT NOT NULL,
    "type" "VehicleType" NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("immatriculation")
);

-- CreateTable
CREATE TABLE "Spot" (
    "number" INTEGER NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Spot_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "reference" TEXT NOT NULL,
    "start_time" TIMESTAMP(3),
    "spot_number" INTEGER NOT NULL,
    "id_vehicle" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("reference")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_spot_number_fkey" FOREIGN KEY ("spot_number") REFERENCES "Spot"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_id_vehicle_fkey" FOREIGN KEY ("id_vehicle") REFERENCES "Vehicle"("immatriculation") ON DELETE CASCADE ON UPDATE CASCADE;

-- Insérer des données dans la table Spot
INSERT INTO "Spot" ("number", "state") VALUES
(101, false),  
(102, false),  
(103, true),  
(104, true),  
(105, false),  
(106, true);  

-- Insérer des données dans la table Vehicle
INSERT INTO "Vehicle" ("immatriculation", "type") VALUES
('ABC-123-DE', 'Car'),  
('FGH-456-IJ', 'Car'),  
('KLM-789-NO', 'Motor'); 

-- Insérer des données dans la table Ticket
INSERT INTO "Ticket" ("reference", "start_time", "spot_number", "id_vehicle") VALUES
('A3B7C9D1', '2024-09-11T08:00:00', 101, 'ABC-123-DE'),
('F8G2H6J4', '2024-09-11T09:00:00', 102, 'FGH-456-IJ'),  
('K1L5M3N9', '2024-09-11T07:30:00', 105, 'KLM-789-NO');
