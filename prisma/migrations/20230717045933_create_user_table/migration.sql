-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "alternative_name" VARCHAR(100) NOT NULL DEFAULT '',
    "email" VARCHAR(150) NOT NULL,
    "phone_number" VARCHAR(30) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'MANAGER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
