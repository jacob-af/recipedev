-- AlterTable
CREATE SEQUENCE "users_id_seq";
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('users_id_seq'),
ALTER COLUMN "date_joined" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "date_joined" SET DATA TYPE TIMESTAMP(3);
ALTER SEQUENCE "users_id_seq" OWNED BY "users"."id";
