-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('Car', 'Motor');

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "immatriculation" TEXT,
    "type" "VehicleType" NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spot" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Spot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "reference" TEXT,
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "amount" DOUBLE PRECISION,
    "id_spot" INTEGER NOT NULL,
    "id_vehicle" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_id_spot_fkey" FOREIGN KEY ("id_spot") REFERENCES "Spot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_id_vehicle_fkey" FOREIGN KEY ("id_vehicle") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Insérer des données dans la table Spot
INSERT INTO "Spot" ("number", "state") VALUES
(101, false),  -- Spot 1, occupé
(102, false),  -- Spot 2, occupé
(103, true),   -- Spot 3, libre
(104, true),   -- Spot 4, libre
(105, false),  -- Spot 5, occupé
(106, true);   -- Spot 6, libre

-- Insérer des données dans la table Vehicle
INSERT INTO "Vehicle" ("immatriculation", "type") VALUES
('ABC-123-DE', 'Car'),  -- Voiture 1
('FGH-456-IJ', 'Car'),  -- Voiture 2
('KLM-789-NO', 'Motor'); -- Moto

-- Insérer des données dans la table Ticket
INSERT INTO "Ticket" ("reference", "start_time", "id_spot", "id_vehicle") VALUES
('A3B7C9D1', '2024-09-11T08:00:00', 1, 1),  -- Ticket pour la Voiture 1 dans Spot 1
('F8G2H6J4', '2024-09-11T09:00:00', 2, 2),  -- Ticket pour la Voiture 2 dans Spot 2
('K1L5M3N9', '2024-09-11T07:30:00', 5, 3);  -- Ticket pour la Moto dans Spot 5
