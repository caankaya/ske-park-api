/*
  Warnings:

  - You are about to drop the column `amount` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_id_vehicle_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "amount",
DROP COLUMN "end_time";

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_id_vehicle_fkey" FOREIGN KEY ("id_vehicle") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
