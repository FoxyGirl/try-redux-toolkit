import { postAPI } from "../services/PostService";

import PostItem from './PostItem';

type queryError = {
    status: number,
    data: {}
}

const Posts = () => {
    const {data: posts, isLoading, error} = postAPI.useFetchAllPostsQuery(10);
    console.log('>>>> error', error);

    const typedError = error as queryError;

    return (
        <div>
            {isLoading && <h2>Loading...</h2>}
            {posts && posts.map(post => <PostItem key={post.id} post={post}/>)}
            {error && <h3 style={{color: 'red'}}>Error with status: {typedError.status}</h3>}
        </div>
    )
}

export default Posts;