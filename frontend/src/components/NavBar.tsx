import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from './validators';

import '../styles/pageHeader.css'

import Form from './form/Form';
import Modal from './modal/Modal';
import Button from './form/Button';
import Input from './form/Input';

import { useForm } from './hooks/form_hook'
import context_auth from './context/context_auth';
import useHttpRequest from './hooks/htpp_hook';


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
        },
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
      }, [])

    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setLoginModal] = useState(false);
    const [showRegisterModal, setRegisterModal] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  

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
            const headers = {
              'Content-Type': 'application/json',
            };

            const body = JSON.stringify({
              title: newPostFormState.inputs.title.value,
              description: newPostFormState.inputs.textarea.value,
              imageURL: "image 1",
              creator: '62cd5b1bf2a39582f96ad500',
              creator_name: 'bogo'
              
            })

            const url: string = 'http://localhost:8000/api/posts/';
            await sendRequest(url, 'POST', body, headers );
            
            closeModal(event, 'POST');


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
            await sendRequest(url, 'POST', body, headers );

            auth.login();
            closeModal(event, 'LOGIN');
          } catch (err) { } 
          break;
        
        case 'REGISTER':
          try {
            const headers = {
              'Content-Type': 'application/json',
            };

            const body = JSON.stringify({
              username: registerFormState.inputs.username_form.value,
              email: registerFormState.inputs.email_form.value,
              password: registerFormState.inputs.password_form.value
            })

            const url: string = 'http://localhost:8000/api/users/register';
            await sendRequest(url, 'POST', body, headers );

            auth.login();
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

            <Button 
                classname='button_submit' 
                classname_enabled='button_submit_enabled' 
                classname_disabled='button_submit_disabled' 
                type='submit'
                label='Create new post' 
                disabled={!newPostFormState.isValid} 
                
            />
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
                label='Create new post' 
                disabled={!loginFormState.isValid} 
              />

              <>
              { isLoading && 
                <h1>Loading...</h1>
              }
              </>
          </Form>
          </>
        </Modal>
        }

        {
          showRegisterModal &&
          <Modal title='Login' show={showRegisterModal} onCancel={(e) => {closeModal(e, 'REGISTER')}}>
          <>
          <Form onSubmit={onSubmit('REGISTER')}>
            <Input title='Username' element='INPUT' id='username_form' inputType='INPUT' 
                    placeHolderText='text' errorText='ERROR EMAIL IS EMPTY' 
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]} 
                    onInput={registerInputHandler}
              />

              <Input title='Email' element='INPUT' id='email_form' inputType='INPUT' 
                    placeHolderText='text' errorText='ERROR EMAIL IS EMPTY' 
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]} 
                    onInput={registerInputHandler}
              />
              <Input title='Password' element='INPUT' id='password_form' 
                    inputType='INPUT' placeHolderText='text' errorText='ERROR INPUT IS EMPTY' 
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} 
                    onInput={registerInputHandler}
              />

              <Button 
                classname='button_submit' 
                classname_enabled='button_submit_enabled' 
                classname_disabled='button_submit_disabled' 
                type='submit'
                label='Create new post' 
                disabled={!registerFormState.isValid} 
              />

              <>
              { isLoading && 
                <h1>Loading...</h1>
              }
              </>
          </Form>
          </>
        </Modal>
        }

    <div className='navBar'>
        <div>
            <Link className='pageHeader_UserImg' to='/myplaces'>
                <img src='' alt='profile pic'></img>
            </Link>
        </div>
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/users'>Users</Link>
            { auth.isLoggedIn && 
              <>
                <Link to='#' onClick={(e) => { openModal(e, 'POST') }} >New post</Link>
                <Link to='#'>My places</Link>
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