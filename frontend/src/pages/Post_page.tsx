
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Comments from '../components/Comments';
import context_auth from '../components/context/context_auth';
import Button from '../components/form/Button';
import Form from '../components/form/Form';
import useHttpRequest from '../components/hooks/htpp_hook';
import Modal from '../components/modal/Modal';
import '../styles/pageHeader.css';
import '../styles/post.css';



const Post_page = () => {

  const auth = useContext(context_auth);
  
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const [showModal, setShowModal] = useState(false);
  const [fetchPost, setFetchPost] = useState(true);
  const userID = useParams().id;

  const [title, setTitle] = useState();
  const [postID, setPostId] = useState();
  const [description, setDescription] = useState();
  const [creator_name, setCreatorName] = useState();
  const [creationTime, setCreationTime] = useState('');

  const navigate = useNavigate();
  const openModal = (event: any) =>  {
      setShowModal(true);
  }
  const closeModal = (event: any) =>  {
      setShowModal(false);
  }
  const onSubmit = async (event: any) => {
    event.preventDefault();
    console.log("aaaaaaaaaaaaa");
    try {
      const url: string = `http://localhost:8000/api/posts/${postID}`;
      await sendRequest(url, 'DELETE');
      closeModal(event);

    } catch (err: any) {
      console.log(err.message)
      navigate('/');

    }
  }
  
  useEffect(() => {
    const fetchPosts = async () => {

      if(fetchPost){
        try {

          const url: string = `http://localhost:8000/api/posts/${userID}`;
          const responseData = await sendRequest(url);
  
         console.log(responseData.post);
         const data = responseData.post;
  
         setTitle(data.title);
         setDescription(data.description);
         setPostId(data.id);
         const timeOfCreation = new Date(data.createdAt).toDateString();
         setCreationTime(timeOfCreation);
         setCreatorName(data.creator_name);
         setFetchPost(false);

        } catch (err) {

         }
      }
      
    }

    fetchPosts();

  }, [sendRequest]);


  return (
    <>
    {isLoading &&
      <h1>Loading ...</h1>
    }
    { !isLoading && showModal &&  auth.isLoggedIn &&   
      <Modal title='Delete post' show={showModal} onCancel={closeModal}>
        <>
        <Form onSubmit={onSubmit} classname='modal_content_height_auto'>
            <p className='post_description'>Do you want to delete this post ?</p>
            <Button 
                classname='button_submit' 
                classname_enabled='button_submit_enabled' 
                classname_disabled='button_submit_disabled' 
                type='submit'
                label='Delete' 
      
              />
              <Link onClick={onSubmit} to={`/${creator_name}/posts`}  >REDIRECT</Link>
          </Form>
        </>
        

      </Modal>
    }

    { !isLoading &&
      <div className='post'>
        <div className='post_Item'>
          <div className='post_header'>
            <div>
              <div className='post_User_image'></div>
              <div>
                <h2 className='post_authorname'>{creator_name}</h2>
                <h2 className='post_title'>{title}</h2>
              </div>
            </div>
            
            { auth.isLoggedIn && 
              <button onClick={openModal} className='post_delete_btn'>Delete post</button>
            }
          </div>
          <div className='post_content'>
            <div className='post_description'>
              <p>
                {description}
              </p>    
            </div>
            <img  className='post_postimage'  alt='asdasd' />
          </div>
          <div className='post_footer'>
            <p>Time of creation: {creationTime}</p>
          </div>
        </div>  

      <Comments />
      </div>
    }
    </>
  )
}

export default Post_page

  

