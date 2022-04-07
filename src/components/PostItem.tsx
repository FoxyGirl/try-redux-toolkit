import {FC} from 'react';

import { IPost } from "../models/IPost";

interface PostItemProps {
    post: IPost;
    remove: (post: IPost) => void;
    update: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({post, remove, update}) => {
    const handleRemove = (event: React.MouseEvent) => {
        event.preventDefault();
        remove(post);
    };

    const handleUpdate = (event: React.MouseEvent) => {
        event.preventDefault();
        const title = prompt() || '';
        update({...post, title});
    }

    return (
    <div className='Post'>
        <div className='Post-info' onClick={handleUpdate} >
            {`${post.id}: ${post.title}`}
        </div>
        <button onClick={handleRemove}>Delete</button>
    </div>
)}

export default PostItem;