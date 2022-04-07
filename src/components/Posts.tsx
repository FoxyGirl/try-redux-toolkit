import { IPost } from "../models/IPost";
import { postAPI } from "../services/PostService";

import PostItem from './PostItem';

type queryError = {
    status: number,
    data: {}
}

const Posts = () => {
    const {data: posts, isLoading, error} = postAPI.useFetchAllPostsQuery(30);
    const [createPost, { isLoading: isLoadingPost, error: errorPost}] = postAPI.useCreatePostMutation();
    const [updatePost, {}] = postAPI.useUpdatePostMutation();
    const [deletePost, {}] = postAPI.useDeletePostMutation();
    const typedError = error as queryError;

    const handleCreate = async () => {
        const title = prompt();
        await createPost({title, body: `Body: ${title}`} as IPost);
    }

    const handleRemove = (post: IPost) => {
        deletePost(post);
    };

    const handleUpdate = (post: IPost) => {
        updatePost(post);
    };

    return (
        <div>
            <button onClick={handleCreate} disabled={isLoadingPost}>
                {isLoadingPost ? 'Creating post...':'Add new post'}
            </button>
            {isLoading && <h2>Loading...</h2>}
            {posts && posts.map(post => <PostItem key={post.id} post={post} remove={handleRemove} update={handleUpdate} />)}
            {error && <h3 style={{color: 'red'}}>Error with status: {typedError.status}</h3>}
            {errorPost && <h4 style={{color: 'red'}}>Post hasn't been created</h4>}
        </div>
    )
}

export default Posts;