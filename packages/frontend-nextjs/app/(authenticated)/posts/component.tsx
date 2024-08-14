"use client";

import GetPost from '@/src/@types/api/posts';
import { Container, Card, CardContent, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

const FeedPageComponent: FC = () => {
    const [posts, setPosts] = useState<GetPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API ?? '??'}/api/posts`, {
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
                <Card key={post.id}>
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