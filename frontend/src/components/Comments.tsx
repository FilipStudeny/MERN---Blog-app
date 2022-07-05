import React, { useContext } from 'react'
import Comment from '../components/Comment';
import Form from './form/Form';
import Input from './form/Input';

import { useForm } from './hooks/form_hook'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from './validators';
import Button from './form/Button';
import context_auth from './context/context_auth';


const Comments = () => {

  const auth = useContext(context_auth);

  const [formState, inputHandler] = useForm(
    {
      comment: {
        value: '',
        isValid: false
      },
    }, [])

  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log(formState.inputs);

  }

  return (
    <div className='post_Item'>
    <div className='post_header'>
      <h2 className='post_title'>Comments</h2>

    </div>
    <div className='post_content'>
      <div className='comments_input_container'>
        { auth.isLoggedIn &&
          <Form onSubmit={onSubmit} >
            <Input title='Description' element='textarea' id='comment' 
                    inputType='INPUT' placeHolderText='text' errorText='ERROR DESCRIPTION IS EMPTY' 
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(1)]} 
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
        }
        
      </div>

      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />

    </div>
  </div>
  )
}

export default Comments