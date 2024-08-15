"use client";

import GetPost from '@/src/@types/api/posts';
import Post from '@/src/components/post';
import { AuthUser } from '@/src/lib/user';
import { Container } from '@mui/material';
import { FC, useEffect, useState } from 'react';

const FeedPageComponent: FC<{ user: AuthUser }> = ({ user }) => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [posts, setPosts] = useState<GetPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API ?? ''}/posts?page=${page <= 0 ? 1 : page}`);
                const { ok, statusText } = response;
                if (!ok) throw new Error(statusText);
                const body = await response.json();
                setHasMore(body.length > 0);
                setLoading(false);
                setPosts((prev) => [...prev, ...body]);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [page, user]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight && hasMore && !loading) {
                setPage((prev) => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, loading]);

    return (
        <Container maxWidth="md">

            {posts.map((post, index) =>
                <Post {...{
                    post, index, posts, user
                }} key={`post_card_${post.id}_${index}`} />)}

            {loading && <p>Carregando mais...</p>}
            {!hasMore && <p>Não há mais registros.</p>}
        </Container>
    );
};

export default FeedPageComponent;