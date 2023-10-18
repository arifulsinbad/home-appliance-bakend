/*
  Warnings:

  - The `rating` column on the `repairing_categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `bookingCount` on table `repairing_categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `repairing_categories` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "repairing_categories" DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "bookingCount" SET NOT NULL,
ALTER COLUMN "bookingCount" SET DEFAULT 0,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT true;
