import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function updateTimestamps() {
    // Update Users
    const users = await prisma.user.findMany();
    for (const user of users) {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
            },
        });
    }

    // Update Profiles
    const profiles = await prisma.profile.findMany();
    for (const profile of profiles) {
        await prisma.profile.update({
            where: { id: profile.id },
            data: {
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
            },
        });
    }

    // Update Posts
    const posts = await prisma.post.findMany();
    for (const post of posts) {
        await prisma.post.update({
            where: { id: post.id },
            data: {
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
            },
        });
    }

    // Update Reactions
    const reactions = await prisma.reaction.findMany();
    for (const reaction of reactions) {
        await prisma.reaction.update({
            where: { id: reaction.id },
            data: {
                createdAt: faker.date.past(),
            },
        });
    }
}

updateTimestamps()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
