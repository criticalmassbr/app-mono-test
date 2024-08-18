import { faker } from '@faker-js/faker';
import OwnPrismaClient from "@/src/lib/OwnPrismaClient";

async function main() {
  try {
    // Buscar todos os perfis no banco de dados
    const profiles = await OwnPrismaClient.profile.findMany();

    // Iterar sobre cada perfil e atualizar com um nome aleatório
    for (const profile of profiles) {
      const randomName = faker.person.fullName(); // Gera um nome completo aleatório
      
      await OwnPrismaClient.profile.update({
        where: { id: profile.id },
        data: { name: randomName },
      });
    }

    console.log('All profiles have been updated with random names.');
  } catch (error) {
    console.error('Error updating profiles:', error);
  } finally {
    await OwnPrismaClient.$disconnect();
  }
}

main()
    .then(() => {
        console.log('Update finished.');
    })
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await OwnPrismaClient.$disconnect();
    });