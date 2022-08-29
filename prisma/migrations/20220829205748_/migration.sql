-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_user" ("admin", "created", "email", "id", "isActive", "password", "username") SELECT "admin", "created", "email", "id", "isActive", "password", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_user_1" ON "user"("email");
Pragma writable_schema=0;
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
