/*
  Warnings:

  - You are about to drop the column `progressbar` on the `budget` table. All the data in the column will be lost.
  - You are about to drop the column `remaining` on the `budget` table. All the data in the column will be lost.
  - You are about to drop the column `spent` on the `budget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "budget" DROP COLUMN "progressbar",
DROP COLUMN "remaining",
DROP COLUMN "spent";
