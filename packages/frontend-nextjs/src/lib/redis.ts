import { createClient } from 'redis';

const RedisClient = createClient({
    password: 'a8qC26EO99raIKwjRSH6KklTOpzuscud',
    socket: {
        host: 'redis-17548.c81.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 17548
    }
});

RedisClient.connect().catch(console.error);

export default RedisClient;
