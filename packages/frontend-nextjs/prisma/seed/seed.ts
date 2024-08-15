import OwnPrismaClient from "@/utils/OwnPrismaClient";
import { faker } from '@faker-js/faker';

async function main() {
    // Your seeding logic here
    const commonPassword = 'password123';

    for (let i = 0; i < 5; i++) {
        const user = await OwnPrismaClient.user.create({
            data: {
                email: faker.internet.email(),
                password: commonPassword,
                profile: {
                    create: {
                        bio: faker.lorem.sentence(),
                        birthDate: faker.date.past(30, new Date('2000-01-01')),
                    }
                }
            },
            select: {
                email: true,
                profile: true
            }
        });

        const posts = [];
        for (let j = 0; j < 25; j++) {
            posts.push({
                content: faker.lorem.paragraph(),
                profileId: user?.profile?.id || 0
            });
        }

        await OwnPrismaClient.post.createMany({
            data: posts
        });

        console.log(`Created user ${user.email} with profile and 25 posts`);
    }
}

main()
    .then(() => {
        console.log('Seeding finished.');
    })
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await OwnPrismaClient.$disconnect();
    });