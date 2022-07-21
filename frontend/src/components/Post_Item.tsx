import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Post  from './props/props_Post'
import context_auth from './context/context_auth';
import useHttpRequest from './hooks/htpp_hook';
import FormText from './form/FormText';


const PostItem = ( { creator_id, creator_name, id, title, description, createdAt  } : Post ) => {
    
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const [userImage, setUserImage] = useState('');

  const postCreationDate = new Date(createdAt).toDateString()


  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const url: string = `http://localhost:8000/api/users/${creator_id}`;
            const responseData = await sendRequest(url);

            setUserImage(responseData.user);
            clearError();
        } catch (err) { }
    }

    fetchUsers();
  }, [sendRequest]);

  return (



    <>
    { isLoading &&
      <FormText type='LOADING' text='Loading post...' />
    }


    { !isLoading &&
        <div className='list_Item'>
        <Link className='list_Item_Link' to={`/${creator_name}/post/${id}`}>
          <div className='list_Item_header'>
            <div className='pageHeader_UserImg'>
              <img className='user_List_profile_picture' src={`http://localhost:8000/${userImage}`} alt={title}/>
            </div>
            <div>
              <h2 className='post_List_Item_authorname'>{creator_name}</h2>
              <h2 className='post_List_Item_posttitle'>{title}</h2>
            </div>
          </div>
          <div className='postList_Item_content'>
            <div className='postList_Item_description'>
              <p>{description}</p>
            </div>
          </div>
          <div className='postList_Item_footer'>
            <p>Time of creation: {postCreationDate}</p>
          </div>
        </Link>   
      </div>
    }
    </>
  )
}

export default PostItem