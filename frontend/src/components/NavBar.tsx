import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from './validators';

import Form from './form/Form';
import Modal from './modal/Modal';
import Button from './form/Button';
import Input from './form/Input';

import { useForm } from './hooks/form_hook'
import context_auth from './context/context_auth';
import useHttpRequest from './hooks/htpp_hook';
import ImageUpload from './form/ImageUpload';
import FormText from './form/FormText';


function NavBar() {

  const auth = useContext(context_auth);

    const [newPostFormState, formInputHandler] = useForm(
      {
      title: {
        value: '',
        isValid: false
      },
      textarea: {
        value: '',
        isValid: false
      },
      image:{
        value: '',
        isValid: false
      }
      }, [])

    const [loginFormState, loginInputHandler] = useForm(
      {
        email_form: {
          value: '',
          isValid: false
        },
        password_form: {
          value: '',
          isValid: false
        }
      }, [])

    const [registerFormState, registerInputHandler] = useForm(
      {
        username_form: {
          value: '',
          isValid: false
        },
        email_form: {
            value: '',
            isValid: false
        },
        password_form: {
            value: '',
            isValid: false
        },
        image: {
          value: '',
          isValid: false
        }
      }, [])

    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setLoginModal] = useState(false);
    const [showRegisterModal, setRegisterModal] = useState(false);
    const [userImage, setUserImage] = useState('');

    const { isLoading, error, sendRequest, clearError } = useHttpRequest();
    const navigate = useNavigate();

    const openModal = (event: any, whichModal: string) =>  {

      switch (whichModal) {
        case 'POST':
          setShowModal(true);

          break;

        case 'LOGIN':
          setLoginModal(true);
          break;

        case 'REGISTER':
          setRegisterModal(true);
          break;

      }
    }

    const closeModal = (event: any, whichModal: string) =>  {

      switch (whichModal) {
        case 'POST':
          setShowModal(false);
          errorHandle();
          console.log(userImage);
          break;

        case 'LOGIN':
          setLoginModal(false);
          errorHandle();
          break;

        case 'REGISTER':
          setRegisterModal(false);
          errorHandle();
          break;
      }
    }

    const onSubmit = (whichForm: any) => async (event: any) => {
      event.preventDefault();

      switch (whichForm) {
        case 'POST':
          try {

            const formData = new FormData();
            formData.append('title', newPostFormState.inputs.title.value );
            formData.append('description', newPostFormState.inputs.textarea.value);
            formData.append('image', newPostFormState.inputs.image.value );
            formData.append('creator_id', auth.userId);
            formData.append('creator_name', auth.username);

            const url: string = 'http://localhost:8000/api/posts/';

            const headers: any = {
              Authorization: 'Bearer ' + auth.token
            };

            await sendRequest(url, 'POST', formData, headers);
            
            closeModal(event, 'POST');
            newPostFormState.inputs.image.value = null;
            newPostFormState.inputs.image.isValid = false;
            navigate('/');


          } catch (err) { 
          } 
          
          break;
         
        case 'LOGIN':
          try {
            const headers = {
              'Content-Type': 'application/json',
            };

            const body = JSON.stringify({
              email: loginFormState.inputs.email_form.value,
              password: loginFormState.inputs.password_form.value
            })

            const url: string = 'http://localhost:8000/api/users/login';
            const response = await sendRequest(url, 'POST', body, headers );

            setUserImage(response.image);
            auth.login(response.userID, response.token, response.username, response.image);
            closeModal(event, 'LOGIN');
            
          } catch (err) { } 
          break;
        
        case 'REGISTER':
          try {

            const formData = new FormData();
            formData.append('username', registerFormState.inputs.username_form.value );
            formData.append('email', registerFormState.inputs.email_form.value);
            formData.append('password', registerFormState.inputs.password_form.value );
            formData.append('image', registerFormState.inputs.image.value);

            const url: string = 'http://localhost:8000/api/users/register';
            const response = await sendRequest(url, 'POST', formData );

            auth.login(response.userID, response.token, response.username, response.image);
            closeModal(event, 'REGISTER');
            
          } catch (err) {
            
          } 
          break;
      }
    }

    const errorHandle = () => {
      clearError();
    }

  return (
    <React.Fragment>    
        { showModal && 
        
        <Modal title='Create new Post' show={showModal}  onCancel={(e) => {closeModal(e, 'POST')}} >
          <>
          <Form onSubmit={onSubmit('POST')} classname='modal_content_height_scroll'>
            <Input title='Input' element='INPUT' id='title' inputType='INPUT' 
                    placeHolderText='text' errorText='ERROR INPUT IS EMPTY' 
                    validators={[VALIDATOR_REQUIRE()]} 
                    onInput={formInputHandler}
            />
            <Input title='Description' element='textarea' id='textarea' 
                    inputType='INPUT' placeHolderText='text' errorText='ERROR DESCRIPTION IS EMPTY' 
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} 
                    onInput={formInputHandler}
            />

            <ImageUpload id='image' onInput={formInputHandler} />

            <Button 
                classname='button_submit' 
                classname_enabled='button_submit_enabled' 
                classname_disabled='button_submit_disabled' 
                type='submit'
                label='Create new post' 
                disabled={!newPostFormState.isValid} 
                
            />

            <>
              { isLoading && 
                <FormText type='LOADING' text='Loading...' />
              }

              {
                error &&
                <FormText type='ERROR' text="Error couldn't create post, try again !" />
              } 
            </>
          </Form>
          </>
        </Modal>
        }

        {
          showLoginModal &&
          <Modal title='Login' show={showLoginModal} onCancel={(e) => {closeModal(e, 'LOGIN')}}>
          <>
          <Form onSubmit={onSubmit('LOGIN')}>
            <Input title='Email' element='INPUT' id='email_form' inputType='INPUT' 
                    placeHolderText='text' errorText='ERROR EMAIL IS EMPTY' 
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]} 
                    onInput={loginInputHandler}
              />
              <Input title='Password' element='INPUT' id='password_form' 
                    inputType='INPUT' placeHolderText='text' errorText='ERROR INPUT IS EMPTY' 
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} 
                    onInput={loginInputHandler}
              />

              <Button 
                classname='button_submit' 
                classname_enabled='button_submit_enabled' 
                classname_disabled='button_submit_disabled' 
                type='submit'
                label='Login' 
                disabled={!loginFormState.isValid} 
              />

              <>

              { isLoading && 
                <FormText type='LOADING' text='Loading...' />
              }

              {
                error &&
                <FormText type='ERROR' text='Wrong credentials try again !' />
              } 

              </>

          </Form>
          </>
        </Modal>
        }

        {
          showRegisterModal &&
          <Modal title='Register' show={showRegisterModal} onCancel={(e) => {closeModal(e, 'REGISTER')}}>
          <>
          <Form onSubmit={onSubmit('REGISTER')} classname='modal_content_height_scroll'>
            <Input title='Username' element='INPUT' id='username_form' inputType='INPUT' 
                    placeHolderText='text' errorText='ERROR USERNAME IS EMPTY' 
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]} 
                    onInput={registerInputHandler}
              />

              <Input title='Email' element='INPUT' id='email_form' inputType='INPUT' 
                    placeHolderText='text' errorText='ERROR EMAIL IS EMPTY' 
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]} 
                    onInput={registerInputHandler}
              />
              <Input title='Password' element='INPUT' id='password_form' 
                    inputType='PASSWORD' placeHolderText='text' errorText='ERROR INPUT IS EMPTY' 
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} 
                    onInput={registerInputHandler}
              />

              <ImageUpload id='image' onInput={registerInputHandler} />

              <Button 
                classname='button_submit' 
                classname_enabled='button_submit_enabled' 
                classname_disabled='button_submit_disabled' 
                type='submit'
                label='Register' 
                disabled={!registerFormState.isValid} 
              />

              <>
              { isLoading && 
                <FormText type='LOADING' text='Loading...' />
              }

              {
                error &&
                <FormText type='ERROR' text='Invalid register information, try again !' />
              } 
              </>
          </Form>
          </>
        </Modal>
        }

    <div className='navBar'>
        <div>
          { auth.isLoggedIn &&
          <>
            <Link className='pageHeader_UserImg' to={`/${auth.username}/${auth.userId}/posts`}>
              <img className='user_List_profile_picture' src={`http://localhost:8000/${auth.profilePicture}`} alt=''></img>
            </Link>
            <p className='pageHeader_username'>{auth.username}</p>

          </>

          }
            
        </div>
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/users'>Users</Link>
            { auth.isLoggedIn && 
              <>
                <Link to='#' onClick={(e) => { openModal(e, 'POST') }} >Create new post</Link>
                <Link to={`/${auth.username}/${auth.userId}/posts`} >My posts</Link>
              </>
            }
            
        </nav>
        <div className='login_section'>
          { !auth.isLoggedIn ? (
            <>
              <Link to='#' onClick={(e) => { openModal(e, 'LOGIN') }} >Login</Link>
              <Link to='#' onClick={(e) => { openModal(e, 'REGISTER') }}>Sign up</Link>
            </>
          ) : (
            <Link to='#' onClick={auth.loggout}>Logout</Link>
          )

          }
            
        </div>
    </div>

    </React.Fragment>

  )
}

export default NavBar