const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userData = [
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

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const users = await prisma.user.create({
      data: u
    });
    console.log(`Created user with id: ${user.id}`);
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
