import React from 'react'
import ReactDOM from 'react-dom';
import '../styles/modal.css'
import Backdrop from './Backdrop';
import { modalProps } from './props/props_modal';


const ModalOverlay = ({title, onCancel, children } : modalProps) => {
    const content = (
        <>
        <div className='modal'>
            <div className='modal_header'>
                <h2>{title}</h2>
                <button onClick={onCancel}>X</button>
            </div>
            <div className='modal_content'>
                {children}
            </div>
            <div className='modal_footer'>
                <p>
                    Footer
                </p>
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