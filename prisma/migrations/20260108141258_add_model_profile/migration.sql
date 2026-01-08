-- CreateTable
CREATE TABLE "Profile" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "passwordHash" TEXT NOT NULL,
    "passwordSalt" TEXT NOT NULL,
    "kekSalt" TEXT NOT NULL,
    "dekIv" TEXT NOT NULL,
    "dekTag" TEXT NOT NULL,
    "dekContent" TEXT NOT NULL,
    "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
