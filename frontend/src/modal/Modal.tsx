import React from 'react'
import ReactDOM from 'react-dom';
import '../styles/modal.css'
import Backdrop from './Backdrop';
import { modalProps } from '../components/props/props_modal';


const ModalOverlay = ({title, onCancel, children, onHandleSubmit, formData } : modalProps) => {

    const content = (
        <>
        <div className='modal'>
            <div className='modal_header'>
                <h2>{title}</h2>
                <button onClick={onCancel}>X</button>
            </div>
            {children}
            <div className='modal_footer'>
                
            </div>
        </div>
        </>
    )
    return ReactDOM.createPortal(content,document.getElementById('modal')!)
}


const Modal = ( {title, show, onCancel, children } : modalProps) => {
    return(
        <React.Fragment>
            {show && <Backdrop onCancel={onCancel} />}
            <ModalOverlay title={title} onCancel={onCancel} children={children} />
        </React.Fragment>
 

    )
}

export default Modal