import {FC} from 'react';

import { IPost } from "../models/IPost";

interface PostItemProps {
    post: IPost;
}

const PostItem: FC<PostItemProps> = ({post}) => {
    return (
    <div className='Post'>
        <div className='Post-info'>
            {`${post.id}: ${post.title}`}
        </div>
        <button>Delete</button>
    </div>
)}

export default PostItem;