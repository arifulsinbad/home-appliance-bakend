/*
  Warnings:

  - You are about to drop the column `address` on the `booking_services` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `repairing_categories` table. All the data in the column will be lost.
  - Added the required column `location` to the `booking_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `repairing_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `male` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking_services" DROP COLUMN "address",
ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "repairing_categories" DROP COLUMN "address",
ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "male" TEXT NOT NULL;
