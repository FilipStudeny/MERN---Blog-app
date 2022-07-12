import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Post } from './props/props_Post'
import context_auth from './context/context_auth';


const PostItem = ( { creator_id, creator_name, id, title, description, image } : Post ) => {
  
  const auth = useContext(context_auth);

  const content = image ? (
    <img className='postItem_postImage' src={image} alt={title}/>
  ) : (
    <div className='postList_Item_description'>
      <p>{description}</p>
    </div>
  )
  
  
  return (
    <div className='postsList_Item'>
      <Link className='postList_Item_Link' to={`/${creator_name}/post/${id}`}>
        <div className='postList_Item_header'>
          <div className='post_User_image'></div>
          <div>
            <h2 className='post_List_Item_authorname'>{creator_name}</h2>
            <h2 className='post_List_Item_posttitle'>{title}</h2>
          </div>
        </div>
        <div className='postList_Item_content'>
          {content}
        </div>
        <div className='postList_Item_footer'>
          <p>Time of creation: 12:05:2222</p>
        </div>
      </Link>   
    </div>
  )
}

export default PostItem