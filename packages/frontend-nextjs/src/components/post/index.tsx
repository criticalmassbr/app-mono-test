import GetPost from "@/src/@types/api/posts";
import { FC, MouseEventHandler, useMemo, useState } from "react";
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { PostCard, PostContent, PostDate, PostProfile, PostProfileBox, PostProfileImg, PostReactionBox, PostReactionBoxItem, PostReactionCounter, PostText } from '@/src/components/posts/style';
import { AuthUser } from "@/src/lib/user";
import { NextResponse } from "next/server";
import { useMessage } from "@/src/contexts/message";
import { formatRelative } from "date-fns";

type Props = { post: GetPost, user: AuthUser, posts: GetPost[] }

const Post: FC<Props> = ({ post, user, posts }) => {
    const [liked, setLiked] = useState<boolean>(post.liked ?? false);
    const { showMessage } = useMessage();
    const { profile } = user;

    const handleLike: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        const url = `${process.env.NEXT_PUBLIC_API ?? ''}/${liked ? `unlike` : `like`}`
        if (liked) removeLike()
        else addLike()

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
            // if (liked) removeLike()
            // else addLike()
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

    const postDate = useMemo(() => post.createdAt ?? new Date(), [post]);
    return (
        <PostCard className='shadow' >
            <PostContent>
                <Box textAlign={"start"}>
                    <PostProfileBox className='shadow' size='small'>
                        <PostProfileImg alt={post?.profile?.name} />
                        <PostProfile variant="body1">{post?.profile?.name}</PostProfile>
                    </PostProfileBox>
                    <PostDate>{formatRelative(postDate, 3)}</PostDate>
                </Box>
                <PostText>{post?.content}</PostText>
                <PostReactionBox>
                    <PostReactionBoxItem>
                        <IconButton onClick={handleLike}>
                            {liked == true && <Favorite fontSize='small' />}
                            {!liked && <FavoriteBorder fontSize='small' />}
                        </IconButton>
                        <PostReactionCounter>{post.reactions?.length}</PostReactionCounter>
                    </PostReactionBoxItem>
                </PostReactionBox>
            </PostContent>
        </PostCard>
    )
}

export default Post;