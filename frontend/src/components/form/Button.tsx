import React from 'react'
import { ButtonProps } from '../props/props_Form'

const Button = ({type, label, disabled, classname, classname_enabled, classname_disabled, onClick} : ButtonProps) => {


  const isActive = disabled ? classname_disabled : classname_enabled;

  return (
    <button className={`${classname} ${isActive}`} type={type} disabled={disabled} onClick={onClick}>
        {label}
    </button>
  )
}

export default Button