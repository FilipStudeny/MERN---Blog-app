import React, { useState, useCallback, useReducer } from 'react'
import { Link } from 'react-router-dom'

import '../styles/pageHeader.css'
import Button from './Button';
import Input from './Input';
import Modal from './Modal';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from './validators';


const formReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
        for (const ID in state.inputs) {
          if (ID === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[ID].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value, isValid: action.isValid }
          },
          isValid: formIsValid
        };
      default:
        return state;
    }
  };

function NavBar() {

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
          title: {
            value: '',
            isValid: false
          },
          textarea: {
            value: '',
            isValid: false
          }
        },
        isValid: false
      });
    
      const inputHandler = useCallback((id: any, value: any, inputIsValid: any) => {
        dispatch({
          type: 'INPUT_CHANGE',
          value: value,
          isValid: inputIsValid,
          inputId: id,
        });

        console.log(formState)
      }, []);


    const [showModal, setShowModal] = useState(false);

    const openModal = (event: any) =>  {
        setShowModal(true);
    }
    const closeModal = (event: any) =>  {
        setShowModal(false);
    }

  return (
    <React.Fragment>    
        { showModal && 
        
        <Modal title='Create new Post' show={showModal} onCancel={closeModal}>
            <Input title='Input' element='INPUT' id='title' inputType='INPUT' 
                   placeHolderText='text' errorText='ERROR INPUT IS EMPTY' 
                   validators={[VALIDATOR_REQUIRE()]} 
                   onInput={inputHandler}
            />
            <Input title='Input' element='textarea' id='textarea' 
                   inputType='INPUT' placeHolderText='text' errorText='ERROR INPUT IS EMPTY' 
                   validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} 
                   onInput={inputHandler}
            />

            <Button type='submit' disabled={!formState.isValid} />
           
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
            <Link to='' onClick={openModal} >New post</Link>
            <Link to='/myplaces'>My places</Link>
        </nav>
        <div className='login_section'>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Sign up</Link>
        </div>
    </div>

    </React.Fragment>

  )
}

export default NavBar