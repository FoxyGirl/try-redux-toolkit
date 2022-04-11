import { IPost } from '../models/IPost';
import { postAPI } from '../services/PostService';

import PostItem from './PostItem';

type queryError = {
  status: number;
  data: {};
};

const Posts2 = () => {
  const { data: posts, isLoading, error } = postAPI.useFetchAllPostsQuery(30);
  const [deletePost, {}] = postAPI.useDeletePostMutation();
  const typedError = error as queryError;

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  return (
    <div data-testid="posts2">
      {isLoading && <h2 data-testid="loading">Loading...</h2>}
      {posts && posts.map((post) => <PostItem key={post.id} post={post} remove={handleRemove} />)}
      {error && <h3 style={{ color: 'red' }}>Error with status: {typedError.status}</h3>}
    </div>
  );
};

export default Posts2;
