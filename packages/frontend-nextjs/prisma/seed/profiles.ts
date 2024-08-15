import OwnPrismaClient from "../../src/utils/OwnPrismaClient"
import { faker } from '@faker-js/faker';

async function createProfilesForUsersWithoutProfile() {
    try {
        const usersWithoutProfile = await OwnPrismaClient.user.findMany({
            where: {
                profile: null,
            },
        });

        console.log(`Found ${usersWithoutProfile.length} users without profiles.`);

        for (const user of usersWithoutProfile) {
            const fakeBirth = faker.date.birthdate();
            const fakeName = faker.name.fullName();
            await OwnPrismaClient.profile.create({
                data: {
                    userId: user.id,
                    bio: '',
                    name: fakeName,
                    birthDate: fakeBirth,
                },
            });

            console.log(`Created profile for user with ID ${user.id}`);
        }

        console.log('Profile creation for all users without profiles is complete.');
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await OwnPrismaClient.$disconnect();
    }
}

createProfilesForUsersWithoutProfile().then(() => {
    console.log('Seeding finished.');
})
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await OwnPrismaClient.$disconnect();
    });
