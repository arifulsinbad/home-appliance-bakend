/*
  Warnings:

  - Added the required column `dateOfBirth` to the `users` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `gender` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "dateOfBirth" TEXT NOT NULL,
ALTER COLUMN "profileImg" DROP NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;
