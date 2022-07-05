import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Post } from './props/props_Post'
import context_auth from './context/context_auth';


const PostItem = ( { user, postID, image, placeName, placeLocation } : Post ) => {
  
  const auth = useContext(context_auth);

  const content = image ? (
    <img className='postItem_postImage' src={image} alt={placeName}/>
  ) : (
    <div className='postList_Item_description'>
      <p>lorem ipsum sudo lomen, barum ito dolores, pato esty</p>
    </div>
  )
  
  
  return (
    <div className='postsList_Item'>
      <Link className='postList_Item_Link' to={`/${user}/post/${postID}`}>
        <div className='postList_Item_header'>
          <div className='post_User_image'></div>
          <div>
            <h2 className='post_List_Item_authorname'>{user}</h2>
            <h2 className='post_List_Item_posttitle'>{placeName}</h2>
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