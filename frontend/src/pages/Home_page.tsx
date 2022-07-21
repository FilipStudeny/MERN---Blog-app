import React, { useContext, useEffect, useState } from 'react'
import context_auth from '../components/context/context_auth';
import FormText from '../components/form/FormText';
import useHttpRequest from '../components/hooks/htpp_hook';
import List from '../components/List';

const Home_page = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpRequest();
    const [loadedPosts, setPosts] = useState([]);
    const auth = useContext(context_auth);
  
    useEffect(() => {
  
        const fetchPosts = async () => {
          try {
  
            const url: string = `http://localhost:8000/api/posts/`;
            const responseData = await sendRequest(url);
            setPosts(responseData.posts);
  
          } catch (err) { }}
  
          fetchPosts();
      }, [sendRequest]);
       
    return (
      <>
        {isLoading &&
            <FormText type='LOADING' text='Loading...' />
        }
        
        { !isLoading && loadedPosts &&
          <List posts={loadedPosts} whichList={'POSTS'}/>
        }
      </>
    )
}

export default Home_page