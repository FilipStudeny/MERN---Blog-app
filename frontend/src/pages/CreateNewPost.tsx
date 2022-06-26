import React from 'react'
import Input from '../components/Input'
import { VALIDATOR_REQUIRE } from '../components/validators'
import '../styles/form.css'


const CreateNewPost = () => {
  return (
    <div className='form_container'>
        <form className='form'>
            <Input validators={[VALIDATOR_REQUIRE()]} element='input' inputType='text' label='Post Title' placeholder='text' errorText='Please enter valid Input' />
            <Input validators={[VALIDATOR_REQUIRE()]} element='input' inputType='text' label='Title' placeholder='text' errorText='Please enter valid Input' />
            <Input validators={[VALIDATOR_REQUIRE()]} element='input' inputType='text' label='Title' placeholder='text' errorText='Please enter valid Input' />
            <Input validators={[VALIDATOR_REQUIRE()]} element='input' inputType='text' label='Title' placeholder='text' errorText='Please enter valid Input' />
            <Input validators={[VALIDATOR_REQUIRE()]} element='input' inputType='text' label='Title' placeholder='text' errorText='Please enter valid Input' />

        
        </form>

    </div>
  )
}

export default CreateNewPost