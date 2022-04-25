import { useState } from 'react';

import { IPost } from '../models/IPost';
import { postAPI } from '../services/PostService';

import PostItem from './PostItem';
import Form from './Form';

type queryError = {
  status: number;
  data: {};
};

const Posts = () => {
  const { data: posts, isLoading, error } = postAPI.useFetchAllPostsQuery(30);
  const [createPost, { isLoading: isLoadingPost, error: errorPost }] =
    postAPI.useCreatePostMutation();
  const [updatePost, { isLoading: isLoadingUpdatePost, error: errorUpdatePost }] =
    postAPI.useUpdatePostMutation();
  const [deletePost, {}] = postAPI.useDeletePostMutation();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<IPost | null>(null);

  const typedError = error as queryError;

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    setIsUpdate(true);
    setCurrentPost(post);
  };

  const onFormSubmit = async (post: IPost) => {
    if (!isUpdate) {
      await createPost(post);
    } else {
      await updatePost(post);
      setIsUpdate(false);
      setCurrentPost(null);
    }
  };

  const reversedPosts = posts ? [...posts].reverse() : [];

  return (
    <section>
      <div>
        <Form
          onFormSubmit={onFormSubmit}
          isUpdate={isUpdate}
          isLoading={isLoadingPost || isLoadingUpdatePost}
          post={currentPost}
        />
      </div>
      <div data-testid="posts">
        {isLoading && <h2 data-testid="loading">Loading...</h2>}
        {reversedPosts.length > 0 &&
          reversedPosts.map((post) => (
            <PostItem key={post.id} post={post} remove={handleRemove} update={handleUpdate} />
          ))}
        {error && <h3 style={{ color: 'red' }}>Error with status: {typedError.status}</h3>}
        {errorPost && <h4 style={{ color: 'red' }}>Post hasn't been created</h4>}
        {errorUpdatePost && <h4 style={{ color: 'red' }}>Post hasn't been updated</h4>}
      </div>
    </section>
  );
};

export default Posts;
