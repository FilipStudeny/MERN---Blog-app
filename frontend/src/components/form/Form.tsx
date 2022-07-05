import { FormProps } from '../props/props_Form';


const Form = ({children, onSubmit, classname} : FormProps) => {


  return (
    <form className={`modal_content ${classname}`} onSubmit={onSubmit}>
        <>
            {children}
            
        </>
    </form>
  )
}

export default Form