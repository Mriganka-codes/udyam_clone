-- CreateTable
CREATE TABLE "public"."UdyamRegistration" (
    "id" SERIAL NOT NULL,
    "registrationId" TEXT NOT NULL,
    "aadhaarNumber" TEXT NOT NULL,
    "entrepreneurName" TEXT NOT NULL,
    "enterpriseName" TEXT NOT NULL,
    "enterpriseType" TEXT NOT NULL,
    "panNumber" TEXT NOT NULL,
    "gstinNumber" TEXT,
    "mobileNumber" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "pinCode" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'submitted',

    CONSTRAINT "UdyamRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UdyamRegistration_registrationId_key" ON "public"."UdyamRegistration"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "UdyamRegistration_emailId_key" ON "public"."UdyamRegistration"("emailId");
