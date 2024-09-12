/*
  Warnings:

  - Made the column `immatriculation` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "immatriculation" SET NOT NULL;
