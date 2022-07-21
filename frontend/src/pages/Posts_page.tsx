import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import context_auth from '../components/context/context_auth';
import FormText from '../components/form/FormText';
import useHttpRequest from '../components/hooks/htpp_hook';
import List from '../components/List';

const Posts_page = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const [loadedPosts, setPosts] = useState([]);
  const auth = useContext(context_auth);

  const { userID } = useParams();
  

    useEffect(() => {

      const fetchPosts = async () => {
        try {

          const url: string = `http://localhost:8000/api/posts/user/${userID}`;
          const responseData = await sendRequest(url);
          setPosts(responseData.posts);

        } catch (err) { }}

        fetchPosts();
    }, [sendRequest]);
     
  return (
    <>
      { isLoading &&
        <FormText type='LOADING' text='Loading...' />

      }
      { !isLoading && loadedPosts &&
        <List posts={loadedPosts} whichList={'POSTS'}/>
      }
    </>
  )
}

export default Posts_page