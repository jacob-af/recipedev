-- AlterTable
CREATE SEQUENCE "groups_id_seq";
ALTER TABLE "Groups" ALTER COLUMN "id" SET DEFAULT nextval('groups_id_seq');
ALTER SEQUENCE "groups_id_seq" OWNED BY "Groups"."id";

-- AlterTable
CREATE SEQUENCE "ingredients_id_seq";
ALTER TABLE "Ingredients" ALTER COLUMN "id" SET DEFAULT nextval('ingredients_id_seq');
ALTER SEQUENCE "ingredients_id_seq" OWNED BY "Ingredients"."id";

-- AlterTable
CREATE SEQUENCE "quantities_id_seq";
ALTER TABLE "quantities" ALTER COLUMN "id" SET DEFAULT nextval('quantities_id_seq');
ALTER SEQUENCE "quantities_id_seq" OWNED BY "quantities"."id";

-- AlterTable
CREATE SEQUENCE "recipes_id_seq";
ALTER TABLE "recipes" ALTER COLUMN "id" SET DEFAULT nextval('recipes_id_seq');
ALTER SEQUENCE "recipes_id_seq" OWNED BY "recipes"."id";

-- AlterTable
CREATE SEQUENCE "specs_id_seq";
ALTER TABLE "specs" ALTER COLUMN "id" SET DEFAULT nextval('specs_id_seq');
ALTER SEQUENCE "specs_id_seq" OWNED BY "specs"."id";

-- AlterTable
CREATE SEQUENCE "user_data_id_seq";
ALTER TABLE "user_data" ALTER COLUMN "id" SET DEFAULT nextval('user_data_id_seq');
ALTER SEQUENCE "user_data_id_seq" OWNED BY "user_data"."id";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "date_joined" DROP DEFAULT,
ALTER COLUMN "date_joined" SET DATA TYPE DATE;
