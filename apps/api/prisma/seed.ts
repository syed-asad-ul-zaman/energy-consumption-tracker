import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Seed User
  const user = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
    },
  });

  // Seed Measurements
  const measurements = await prisma.measurement.createMany({
    data: Array.from({ length: 20 }, () => ({
      userId: user.id,
      gasConsumption: faker.number.float({ min: 0, max: 100 }),
      comment: faker.lorem.sentence(),
    })),
  });
}

main()
  .then(() => {
    console.log('Seed successful');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
