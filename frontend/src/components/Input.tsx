
import '../styles/form.css'
import { InputProps } from '../components/props/props_Form'

const Input = ( {inputID, element, title, inputType, placeHolderText, numberRows } : InputProps) => {

    const htmlElement = element === 'INPUT' ? (
        <input className='form_input' id={inputID} type={inputType} placeholder={placeHolderText}/> 
    ) : ( 
        <textarea id={inputID} placeholder={placeHolderText} rows={numberRows || 10} />
    )

    return (
        <div className='form_element'>
            <label>{title}:</label>
            {htmlElement}
        </div>
    )




}

export default Input