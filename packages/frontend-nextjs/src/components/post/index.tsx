import GetPost from "@/src/@types/api/posts";
import { FC, MouseEventHandler, useState } from "react";
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { PostCard, PostContent, PostProfile, PostProfileBox, PostProfileImg, PostReactionBox, PostText } from '@/src/components/posts/style';
import { AuthUser } from "@/src/lib/user";
import { NextResponse } from "next/server";
import { useMessage } from "@/src/contexts/message";

const Post: FC<{ post: GetPost, user: AuthUser, index: number, posts: GetPost[] }> = ({ post, user, posts, index }) => {
    const { showMessage } = useMessage();
    const { reactions } = post;
    const { profile } = user;

    const handleLike: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        const response: NextResponse = await fetch(`${process.env.NEXT_PUBLIC_API ?? ''}/reactions`,
            {
                method: "POST",
                body: JSON.stringify({
                    profileId: profile?.id ?? null,
                    postId: post.id ?? null,
                    action: post.liked == true ? "unlike" : "like"
                })
            }) as NextResponse;
        if (response.ok) {
            const newPost = await response.json();
            newPost.liked = post.liked == true ? false : true;
            posts[index] = newPost;
        }
        else showMessage(response.statusText, "warning")
    }

    return (
        <PostCard className='shadow' >
            <PostContent>
                <PostProfileBox className='shadow' size='small'>
                    <PostProfileImg alt={post.profile.name} />
                    <PostProfile variant="body1">{post.profile.name}</PostProfile>
                </PostProfileBox>
                <PostText>{post.content}</PostText>
                <PostReactionBox>
                    <Box>
                        <IconButton onClick={handleLike}>
                            {post.liked == true && <Favorite fontSize='small' />}
                            {!post.liked && <FavoriteBorder fontSize='small' />}
                        </IconButton>
                        <span>{reactions.length}</span>
                    </Box>
                </PostReactionBox>
            </PostContent>
        </PostCard>
    )
}

export default Post;