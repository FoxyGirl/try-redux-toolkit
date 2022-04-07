// import { useEffect, useState } from "react";
import { postAPI } from "../services/PostService";

import PostItem from './PostItem';

type queryError = {
    status: number,
    data: {}
}

const Posts2 = () => {
    // const [limit, setLimit] = useState(30);
    const {data: posts, isLoading, error} = postAPI.useFetchAllPostsQuery(30);
    const typedError = error as queryError;


    // useEffect(() => {
    //     // It will update query due to different params
    //     setTimeout(() => {
    //         setLimit(3);
    //     }, 2000)
    // }, []);

    const reversedPosts = posts ? [...posts].reverse() : [];

    return (
        <div>
            {isLoading && <h2>Loading...</h2>}
            {reversedPosts?.length > 0 && reversedPosts.map(post => <PostItem key={post.id} post={post}/>)}
            {error && <h3 style={{color: 'red'}}>Error with status: {typedError.status}</h3>}
        </div>
    )
}

export default Posts2;