/*
  Warnings:

  - A unique constraint covering the columns `[immatriculation]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_immatriculation_key" ON "Vehicle"("immatriculation");
