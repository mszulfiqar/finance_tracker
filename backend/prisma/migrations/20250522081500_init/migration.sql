-- CreateTable
CREATE TABLE "budget" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "budgeted" INTEGER NOT NULL,
    "spent" INTEGER NOT NULL,
    "remaining" INTEGER NOT NULL,
    "progressbar" INTEGER NOT NULL,

    CONSTRAINT "budget_pkey" PRIMARY KEY ("id")
);
