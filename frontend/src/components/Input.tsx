import React, { useReducer, ChangeEvent } from 'react'
import { InputProps } from './props/props_Form'
import { validate } from './validators';


const inputReducer = (state: any, action: any) => {
    switch(action.type){
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true,
            };

        default:
            return state;
    };
};



const Input = ({element, id, inputType, label, rows , placeholder, validators} : InputProps) => {

    const [inputState, dispatch] = useReducer(inputReducer, {value: '', isValid: false, isTouched: false});

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'CHANGE', val: event.target.value, validators: validators})
    }

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    }
    const htmlElement = element === 'input' ? (
         <input id={id} type={inputType} placeholder={placeholder} value={inputState.value} onBlur={touchHandler} onChange={onChangeHandler}/> 
         ) : ( 
         <textarea id={id} rows={rows || 3} placeholder={placeholder} onBlur={touchHandler} /> )


    

    return (
    <div className='input_container'>
        <label htmlFor={id} >{label}</label>
        {htmlElement}
        {!inputState.isValid && inputState.isTouched && <p>ERROR</p>}
    </div>
  )
}

export default Input