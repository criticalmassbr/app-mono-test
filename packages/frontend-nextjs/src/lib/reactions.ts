import OwnPrismaClient from '@/src/lib/OwnPrismaClient';
import RedisClient from "@/src/lib/redis";

type Validator = { profileId: number, postId: number };

export const getReact = async ({profileId, postId}: Validator) => {
    const cacheKey = `post:${postId}:profile:${profileId}:liked`;
    const cachedReaction = await RedisClient.get(cacheKey);
    if (cachedReaction !== null) return cachedReaction === 'true';

    const reaction = await OwnPrismaClient.reaction.findUnique({
        where: {
            postId_profileId: {
                postId,
                profileId,
            },
        },
        select: {id: true},
    });

    await RedisClient.set(cacheKey, (reaction) ? 'true' : 'false', {EX: 3600});
    return reaction != null;
};

export const updateReactionInDb = async (profileId: number, postId: number, action: 'like' | 'unlike') => {
    if (action === 'like') {
        return OwnPrismaClient.reaction.create({
            data: {
                profileId,
                postId,
            },
            select: {id: true},
        });
    } else {
        return OwnPrismaClient.reaction.delete({
            where: {
                postId_profileId: {
                    profileId,
                    postId,
                },
            },
            select: {id: true},
        });
    }
};

export const update = async ({profileId, postId}: Validator, action: 'like' | 'unlike') => {
    const result = await updateReactionInDb(profileId, postId, action);
    const cacheKey = `post:${postId}:profile:${profileId}:liked`;
    await RedisClient.set(cacheKey, action === 'like' ? 'true' : 'false', {EX: 3600});
    return !!result.id;
};
