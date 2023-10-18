-- CreateTable
CREATE TABLE "report_service" (
    "id" TEXT NOT NULL,
    "report" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "repairingCategoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "report_service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "report_service" ADD CONSTRAINT "report_service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_service" ADD CONSTRAINT "report_service_repairingCategoryId_fkey" FOREIGN KEY ("repairingCategoryId") REFERENCES "repairing_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
