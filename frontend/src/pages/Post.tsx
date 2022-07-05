import React, { useContext, useState } from 'react';
import Button from '../components/form/Button';

import Comments from '../components/Comments';
import context_auth from '../components/context/context_auth';
import Modal from '../modal/Modal';
import '../styles/pageHeader.css'
import '../styles/post.css'



const Post = () => {

  const auth = useContext(context_auth);

  const src = 'https://i0.wp.com/scandification.com/wp-content/uploads/2020/02/norwegian-fjords-1-scaled.jpg?resize=1155%2C770&ssl=1';

  const [showModal, setShowModal] = useState(false);

  const openModal = (event: any) =>  {
      setShowModal(true);
  }
  const closeModal = (event: any) =>  {
      setShowModal(false);
  }
  
  const content = (
    <>
    <div className='post_description'>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Quas fugit ea vero quisquam nam, ullam voluptatem tempora saepe 
        asperiores natus consectetur numquam eos 
        maxime eligendi labore laudantium, recusandae quaerat incidunt!
      </p>    
    </div>
    <img  className='post_postimage'  src={src} alt='asdasd' />
    </>
)

  return (
    <>
    { showModal &&  auth.isLoggedIn &&   
      <Modal title='Delete post' show={showModal} onCancel={closeModal}>
        <p className='post_description'>Do you want to delete this post ?</p>
        <Button 
                classname='button_submit' 
                classname_enabled='button_submit_enabled' 
                classname_disabled='button_submit_disabled' 
                type='submit'
                label='Delete' 
        
              />

      </Modal>
    }
    <div className='post'>
      <div className='post_Item'>
        <div className='post_header'>
          <div>
            <div className='post_User_image'></div>
            <div>
              <h2 className='post_authorname'>user</h2>
              <h2 className='post_title'>post</h2>
            </div>
          </div>
          
          { auth.isLoggedIn && 
            <button onClick={openModal} className='post_delete_btn'>Delete post</button>
          }
        </div>
        <div className='post_content'>
          {content}
          {content}
          {content}
          {content}
        </div>
        <div className='post_footer'>
          <p>Time of creation: 12:05:2222</p>
        </div>
      </div>  

    <Comments />
    </div>
    </>
    )


}

export default Post

  

