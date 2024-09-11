-- Supprimer les tables existantes si elles existent
DROP TABLE IF EXISTS "ticket";
DROP TABLE IF EXISTS "spot";
DROP TABLE IF EXISTS "vehicle";

-- Supprimer le type "IVehicle" s'il existe déjà
DROP TYPE IF EXISTS "IVehicle";

-- Créer un nouveau type énuméré "IVehicle" avec les valeurs 'Car' et 'Motor'
CREATE TYPE "IVehicle" AS ENUM ('Car', 'Motor');

-- Création de la table "vehicle"
CREATE TABLE IF NOT EXISTS "vehicle" (
  "id" SERIAL PRIMARY KEY,
  "immatriculation" TEXT NOT NULL,
  "type" "IVehicle" NOT NULL
);

-- Création de la table "spot"
CREATE TABLE IF NOT EXISTS "spot" (
  "id" SERIAL PRIMARY KEY,
  "numero" INT NOT NULL,
  "state" BOOLEAN DEFAULT true,
  "id_vehicle" INT DEFAULT NULL REFERENCES "vehicle"("id") ON DELETE SET NULL
);

-- Création de la table "ticket"
CREATE TABLE IF NOT EXISTS "ticket" (
  "id" SERIAL PRIMARY KEY,
  "reference" TEXT NOT NULL,
  "id_spot" INT REFERENCES "spot"("id") ON DELETE CASCADE,
  "id_vehicle" INT REFERENCES "vehicle"("id") ON DELETE CASCADE
);

INSERT INTO "spot" ("numero")
VALUES
      (101),
      (102),
      (103),
      (104),
      (105),
      (106);

