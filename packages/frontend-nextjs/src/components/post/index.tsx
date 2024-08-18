import GetPost from "@/src/@types/api/posts";
import { FC, MouseEventHandler, useState } from "react";
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { PostCard, PostContent, PostProfile, PostProfileBox, PostProfileImg, PostReactionBox, PostText } from '@/src/components/posts/style';
import { AuthUser } from "@/src/lib/user";
import { NextResponse } from "next/server";
import { useMessage } from "@/src/contexts/message";

type Props = { post: GetPost, fetchPosts: () => Promise<void>, user: AuthUser, index: number, posts: GetPost[], setPosts(v: GetPost[]): void }

const Post: FC<Props> = ({ post, user, posts, index, fetchPosts }) => {
    const [liked, setLiked] = useState<boolean>(post.liked ?? false);
    const { showMessage } = useMessage();
    const { profile } = user;

    const handleLike: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        const url = `${process.env.NEXT_PUBLIC_API ?? ''}/${liked ? `unlike` : `like`}`
        const response: NextResponse = await fetch(url,
            {
                method: "POST",
                body: JSON.stringify({
                    profileId: profile?.id ?? null,
                    postId: post.id ?? null,
                    action: post.liked == true ? "unlike" : "like"
                })
            }) as NextResponse<{} | GetPost>;
        if (response.ok) {
            if (liked) removeLike()
            else addLike()

        } else {
            showMessage(response.statusText, "warning")
        }
    }

    const addLike = () => {
        const { profile } = user;
        post.reactions.push({
            profile: {
                userId: user.id,
                name: profile?.name ?? "",
                bio: profile?.bio ?? ""
            }
        });
        setLiked(true);
    }

    const removeLike = () => {
        const findIndex = post.reactions.findIndex(e => e.profile.userId == user.id);
        
        if (findIndex !== 1) {
            const newPost = { ...post };
            newPost.reactions.splice(findIndex, 1);
            posts[findIndex] = newPost;
            setLiked(false);
        }
    }

    return (
        <PostCard className='shadow' >
            <PostContent>
                <PostProfileBox className='shadow' size='small'>
                    <PostProfileImg alt={post?.profile?.name} />
                    <PostProfile variant="body1">{post?.profile?.name}</PostProfile>
                </PostProfileBox>
                <PostText>{post?.content}</PostText>
                <PostReactionBox>
                    <Box>
                        <IconButton onClick={handleLike}>
                            {liked == true && <Favorite fontSize='small' />}
                            {!liked && <FavoriteBorder fontSize='small' />}
                        </IconButton>
                        <span>{post.reactions?.length}</span>
                    </Box>
                </PostReactionBox>
            </PostContent>
        </PostCard>
    )
}

export default Post;