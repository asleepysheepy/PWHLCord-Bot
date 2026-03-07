-- CreateTable
CREATE TABLE "GuildConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "birthdaysEnabled" BOOLEAN NOT NULL DEFAULT false,
    "birthdaysChannel" TEXT
);

-- CreateTable
CREATE TABLE "Birthday" (
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "birthMonth" TEXT NOT NULL,
    "birthDay" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "guildId")
);
