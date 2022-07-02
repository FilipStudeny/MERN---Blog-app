import React from 'react'
import { ButtonProps } from './props/props_Form'

const Button = ({type, disabled} : ButtonProps) => {

  return (
    <button type={type} disabled={disabled}>
        SUBMIT
    </button>
  )
}

export default Button