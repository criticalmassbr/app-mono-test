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
            }) as NextResponse<{} | GetPost>;
        if (response.ok) {
            const postInfo = await response.json() as {} | GetPost;
            console.log({ postInfo })
            if (Object.keys(postInfo).length === 0 && postInfo.constructor === Object) {
                setLiked(Boolean((postInfo as GetPost).liked));
            }
            
            // await fetchPosts();
        }
        else showMessage(response.statusText, "warning")
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
                        <span>{reactions?.length}</span>
                    </Box>
                </PostReactionBox>
            </PostContent>
        </PostCard>
    )
}

export default Post;