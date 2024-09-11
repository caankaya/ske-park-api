DROP TABLE IF EXISTS "ticket";
DROP TABLE IF EXISTS "vehicle";
DROP TABLE IF EXISTS "spot";


-- Supprimer le type "IVehicle" s'il existe déjà
DROP TYPE IF EXISTS "IVehicle";

-- Créer un nouveau type énuméré "IVehicle" avec les valeurs 'Car' et 'Motor'
CREATE TYPE "IVehicle" AS ENUM ('Car', 'Motor');

CREATE TABLE IF NOT EXISTS "vehicle" (
  "id" SERIAL PRIMARY KEY,
  "immatriculation" TEXT NOT NULL,
  "type" "IVehicle" NOT NULL
);

CREATE TABLE IF NOT EXISTS "spot" (
  "id" SERIAL PRIMARY KEY,
  "numero" INT NOT NULL,
  "state" BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS "ticket" (
  "id" SERIAL PRIMARY KEY,
  "reference" TEXT NOT NULL,
  "start_time" TIMESTAMP WITHOUT TIME ZONE,
  "end_time" TIMESTAMP WITHOUT TIME ZONE,
  "montant" DOUBLE PRECISION NOT NULL,
  "id_spot" INT REFERENCES "spot"("id") ON DELETE CASCADE,
  "id_vehicle" INT REFERENCES "vehicle"("id") ON DELETE CASCADE
);


INSERT INTO "spot" ("id", "numero")
VALUES
      (1, 101),
      (2, 102),
      (3, 103),
      (4, 104),
      (5, 105),
      (6, 106);

