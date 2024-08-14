"use client";

import GetPost from '@/src/@types/api/posts';
import { Container, Card, CardContent, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

const FeedPageComponent: FC = () => {
    const [posts, setPosts] = useState<GetPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/posts`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const { status, ok, statusText } = response;
                if (!ok) throw new Error(statusText);
                const body = await response.json();
                setPosts(body);
            } catch (error) {
                console.log(error)
            }
        }
        fetchPosts();
    }, []);

    return (
        <Container>
            {posts.map((post) => (
                <Card key={post.id} sx={{ margin: '20px 0' }}>
                    <CardContent>
                        <Typography variant="h5">{post.profile.bio}</Typography>
                        <Typography>{post.content}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
};

export default FeedPageComponent;