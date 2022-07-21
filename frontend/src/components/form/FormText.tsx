import React from 'react'
import { FormTextProps } from '../props/props_Form'



const FormText = ( { type, text } : FormTextProps ) => {

    const content = () => {

        switch (type) {
            case 'ERROR':

                return (
                    <h1 className='formtext_error_text' >{text}</h1>
                );

            case 'LOADING':

                return (
                    <h1 className='formtext_loading_text' >{text}</h1>
                );
        }
    }

    return(
        <>
            {content()}
        </>
    )
}

export default FormText