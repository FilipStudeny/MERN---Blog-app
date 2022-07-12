import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useHttpRequest from '../components/hooks/htpp_hook';
import PostsList from '../components/Posts_List';

const Posts_page = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const [loadedPosts, setPosts] = useState([]);

  const ID = '62cd5b1bf2a39582f96ad500';

    useEffect(() => {

      const fetchPosts = async () => {
        try {

          const url: string = `http://localhost:8000/api/posts/user/${ID}`;
          const responseData = await sendRequest(url);
          setPosts(responseData.posts);

          
        } catch (err) { }}

        fetchPosts();
    }, []);
     
  return (
    <>
      { isLoading &&
        <h1>Loading ...</h1>

      }
      { !isLoading && loadedPosts &&
        <PostsList posts={loadedPosts}/>
      }
    </>
  )
}

export default Posts_page