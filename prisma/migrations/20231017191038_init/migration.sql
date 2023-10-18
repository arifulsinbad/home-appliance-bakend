/*
  Warnings:

  - You are about to drop the column `categoryId` on the `repairing_categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "repairing_categories" DROP CONSTRAINT "repairing_categories_categoryId_fkey";

-- AlterTable
ALTER TABLE "repairing_categories" DROP COLUMN "categoryId";
