import { useEffect, useState } from "react";
import { postAPI } from "../services/PostService";

import PostItem from './PostItem';

type queryError = {
    status: number,
    data: {}
}

const Posts2 = () => {
    const [limit, setLimit] = useState(10);
    const {data: posts, isLoading, error, refetch} = postAPI.useFetchAllPostsQuery(limit);
    const typedError = error as queryError;


    useEffect(() => {
        // It will update query due to different params
        setTimeout(() => {
            setLimit(3);
        }, 2000)
    }, []);

    return (
        <div>
            {!isLoading && <p><button onClick={refetch}>REFETCH</button></p>}

            {isLoading && <h2>Loading...</h2>}
            {posts && posts.map(post => <PostItem key={post.id} post={post}/>)}
            {error && <h3 style={{color: 'red'}}>Error with status: {typedError.status}</h3>}
        </div>
    )
}

export default Posts2;