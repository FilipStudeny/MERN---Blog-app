
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Comments from '../components/Comments';
import context_auth from '../components/context/context_auth';
import Button from '../components/form/Button';
import Form from '../components/form/Form';
import FormText from '../components/form/FormText';
import useHttpRequest from '../components/hooks/htpp_hook';
import Modal from '../components/modal/Modal';




const Post_page = () => {

  const auth = useContext(context_auth);
  
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const [showModal, setShowModal] = useState(false);
  const userID = useParams().id;

  const [title, setTitle] = useState();
  const [postID, setPostId] = useState();
  const [description, setDescription] = useState();
  const [creator_name, setCreatorName] = useState();
  const [creator_id, setCreatorID] = useState('');
  const [creationTime, setCreationTime] = useState('');
  const [image, setPostImage] = useState('');

  const navigate = useNavigate();

  const isAuthorized = () => {
    if(auth.username === creator_name){
      return true;
    }else{
      return false
    }
  }

  console.log(isAuthorized());

  const openModal = (event: any) =>  {
      setShowModal(true);
  }
  const closeModal = (event: any) =>  {
      setShowModal(false);
  }
  const onSubmit = async (event: any) => {
    event.preventDefault();
    
    try {
      const headers: any = {
        Authorization: 'Bearer ' + auth.token
      };

      const url: string = `http://localhost:8000/api/posts/${postID}`;
      await sendRequest(url, 'DELETE', '', headers);
      closeModal(event);
      navigate(`/${creator_name}/${creator_id}/posts`);

    } catch (err: any) {}
  }
  
  useEffect(() => {
    const fetchPosts = async () => {

      try {
        const url: string = `http://localhost:8000/api/posts/${userID}`;
        const responseData = await sendRequest(url);
  
        console.log(responseData.post);
        const data = responseData.post;
  
        setTitle(data.title);
        setDescription(data.description);
        setPostId(data.id);
        setCreationTime(new Date(data.createdAt).toDateString());
        setCreatorName(data.creator_name);
        setCreatorID(data.creator_id);
        setPostImage(data.image);

      } catch (err) {}
    }

    fetchPosts();

  }, [sendRequest]);


  return (
    <>
    {isLoading &&
      <FormText type='LOADING' text='Loading...' />
    }
    
    { !isLoading && showModal && isAuthorized() === true &&
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
            
            { auth.isLoggedIn && isAuthorized() === true &&
              <button onClick={openModal} className='post_delete_btn'>Delete post</button>
            }
          </div>
          <div className='post_content'>
            <div className='post_description'>
              <p>
                {description}
              </p>    
            </div>
            <div className='post_image_container'>
              <img  className='post_postimage' src={`http://localhost:8000/${image}`} alt='asdasd' />
            </div>
          </div>
          <div className='post_footer'>
            <p>Time of creation: {creationTime}</p>
          </div>
        </div>  

     {
      // <Comments />
     }
      </div>
    }
    </>
  )
}

export default Post_page

  

