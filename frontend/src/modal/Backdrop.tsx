import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/modal.css'
import { modalProps } from '../components/props/props_modal';

const Backdrop = ({ onCancel } : modalProps) => {

  const content = (
    <div className="backdrop" onClick={onCancel}>
      
    </div>
  )

  return (
    ReactDOM.createPortal(content, document.getElementById('modal-backdrop')!)
  )
  
};

export default Backdrop;
