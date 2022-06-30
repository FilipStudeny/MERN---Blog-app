
import '../styles/form.css'
import { InputProps } from '../components/props/props_Form'
import { useReducer } from 'react';
import { validate } from './validators';


const inputReducer = (state: any, action: any) => {
    switch(action.type){
        case 'CHANGE':
            return {
                ...state, //Copy old state
                value: action.value,
                inputIsValid: validate(action.value, action.validators), //INPUT validation here
            };

        case 'TOUCH':
            return {
                ...state,
                isTouched: true,
            };
        default:
            return state;

    }
}


const Input = ( {inputID, element, title, inputType, placeHolderText, numberRows, errorText, validators } : InputProps) => {

    const [inputState, inputDispatch] = useReducer(inputReducer, {value: '', inputIsValid: false, isTouched: false});

    const onChangeInputEnter = (event: any) => {
        inputDispatch({
            type: 'CHANGE',
            value: event.target.value,
            validators: validators
        });
    }

    const onInputTouch = () => {
        inputDispatch({
            type: 'TOUCH',
        });
    }


    const htmlElement = element === 'INPUT' ? (
        <input 
            className={`form_input_valid ${!inputState.inputIsValid && inputState.isTouched && 'form_input_invalid'}`} 
            value={inputState.value} 
            id={inputID} 
            type={inputType} 
            placeholder={placeHolderText} 
            onChange={onChangeInputEnter}
            onBlur={onInputTouch}
        /> 
    ) : ( 
        <textarea 
            className={`form_input_valid ${!inputState.inputIsValid && inputState.isTouched && 'form_input_invalid'}`} 
            value={inputState.value} 
            id={inputID} 
            placeholder={placeHolderText} 
            rows={numberRows || 10} 
            onChange={onChangeInputEnter}
            onBlur={onInputTouch}

        />
    )

    return (
        <div className='form_input_element'>
            <div className='form_input_element_header'>
                {title && <label>{title}</label>}
                {!inputState.inputIsValid && inputState.isTouched && <h2 className='form_error_text'>{errorText}</h2>}
                
            </div>

            {htmlElement}
        </div>
    )




}

export default Input