const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const users = [
  {
    user_name: "jfeitler",
    first_name: "Jacob",
    last_name: "Feitler",
    email: "jfeitler@test.com",
    password: "123456"
  },
  {
    user_name: "rhunter",
    first_name: "Rebecah",
    last_name: "Hunter",
    email: "rhunter@fake.com",
    password: "123456"
  },
  {
    user_name: "tdaze",
    first_name: "Tequila",
    last_name: "Daze",
    email: "tdaze@test.com",
    password: "123456"
  }
];

const recipeBooks = [
  {
    name: "My Recipes"
  }
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of users) {
    const userSeed = await prisma.user.create({
      data: u
    });
    console.log(`Created user with id: ${userSeed.id}`);
    const recipeBookSeed = await prisma.recipeBook.create({
      ...recipeBooks[0],
      createdById: userSeed.id
    });
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
