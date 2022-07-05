import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from './validators';

import '../styles/pageHeader.css'

import Form from './form/Form';
import Modal from '../modal/Modal';
import Button from './form/Button';
import Input from './form/Input';

import { useForm } from './hooks/form_hook'
import context_auth from './context/context_auth';


function NavBar() {

  const auth = useContext(context_auth);

    const [formState, inputHandler] = useForm(
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
          break;

        case 'LOGIN':
          setLoginModal(false);
          break;

        case 'REGISTER':
          setRegisterModal(false);
          break;
      }
    }

    const onSubmit = (whichForm: any) => (event: any) => {
      event.preventDefault();

      switch (whichForm) {
        case 'POST':
          console.log(formState.inputs)
          closeModal(event, 'POST');
          break;

        case 'LOGIN':
          console.log(loginFormState.inputs)
          auth.login();
          closeModal(event, 'LOGIN');
          break;
        
        case 'REGISTER':
          console.log(registerFormState.inputs)
          closeModal(event, 'REGISTER');
          break;
      }
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
                    onInput={inputHandler}
            />
            <Input title='Description' element='textarea' id='textarea' 
                    inputType='INPUT' placeHolderText='text' errorText='ERROR DESCRIPTION IS EMPTY' 
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} 
                    onInput={inputHandler}
            />

            <Button 
                classname='button_submit' 
                classname_enabled='button_submit_enabled' 
                classname_disabled='button_submit_disabled' 
                type='submit'
                label='Create new post' 
                disabled={!formState.isValid} 
                
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
          </Form>
          </>
        </Modal>
        }

    <div className='navBar'>
        <div>
            <Link className='pageHeader_UserImg' to='/myplaces'>
                <img src='https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg' alt='profile pic'></img>
            </Link>
        </div>
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/users'>Users</Link>
            { auth.isLoggedIn && 
              <>
                <Link to='#' onClick={(e) => { openModal(e, 'POST') }} >New post</Link>
                <Link to='/myplaces'>My places</Link>
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