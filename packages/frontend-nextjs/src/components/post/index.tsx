import GetPost from "@/src/@types/api/posts";
import { FC, MouseEventHandler } from "react";
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import {Box, IconButton } from '@mui/material';
import { PostCard, PostContent, PostProfile, PostProfileBox, PostProfileImg, PostReactionBox, PostText } from '@/src/components/posts/style';

const Post: FC<{ post: GetPost }> = ({ post }) => {
    const { liked, reactions } = post;

    const handleLike: MouseEventHandler<HTMLButtonElement> = (e) => {

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
                            {liked == true && <Favorite fontSize='small' />}
                            {!liked && <FavoriteBorder fontSize='small' />}
                        </IconButton>
                        <span>{reactions.length}</span>
                    </Box>
                </PostReactionBox>
            </PostContent>
        </PostCard>
    )
}

export default Post;