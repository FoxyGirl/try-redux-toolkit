import { FC } from 'react';

import { IPost } from '../models/IPost';

interface PostItemProps {
  post: IPost;
  remove: (post: IPost) => void;
  update?: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({ post, remove, update }) => {
  const handleRemove = (event: React.MouseEvent) => {
    event.preventDefault();
    remove(post);
  };

  const handleUpdate = (event: React.MouseEvent) => {
    event.preventDefault();
    update!(post);
  };

  return (
    <div className="Post">
      <div className="Post-info">
        {`${post.id}: ${post.title}`}
        <p className="Post-body">{post.body || 'Post body'}</p>
        <p className="Post-author">{post.author || 'Unknown'}</p>
      </div>
      <p className="Post-buttons">
        {update && <button onClick={handleUpdate}>Update</button>}
        <button onClick={handleRemove}>Delete</button>
      </p>
    </div>
  );
};

export default PostItem;
