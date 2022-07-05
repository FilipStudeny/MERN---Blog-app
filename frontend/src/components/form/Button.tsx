import React from 'react'
import { ButtonProps } from '../props/props_Form'

const Button = ({type, label, disabled, classname, classname_enabled, classname_disabled} : ButtonProps) => {


  const isActive = disabled ? classname_disabled : classname_enabled;

  return (
    <button className={`${classname} ${isActive}`} type={type} disabled={disabled}>
        {label}
    </button>
  )
}

export default Button