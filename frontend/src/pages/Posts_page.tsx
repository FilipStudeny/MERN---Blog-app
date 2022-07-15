import React, { useEffect, useState } from 'react'
import useHttpRequest from '../components/hooks/htpp_hook';
import List from '../components/List';

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
    }, [sendRequest]);
     
  return (
    <>
      { isLoading &&
        <h1>Loading ...</h1>

      }
      { !isLoading && loadedPosts &&
        <List posts={loadedPosts} whichList={'POSTS'}/>
      }
    </>
  )
}

export default Posts_page