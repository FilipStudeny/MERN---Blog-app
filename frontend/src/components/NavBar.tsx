import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import '../styles/pageHeader.css'
import Backdrop from './Backdrop';
import Input from './Input';
import Modal from './Modal';

function NavBar() {

    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const content = <Input title='Input' element='INPUT' inputID='id' inputType='INPUT' placeHolderText='text'/> 

  return (
    <React.Fragment>    
        { showModal && 
        
        <Modal title='Create new Post' show={showModal} onCancel={closeModal}>
            <Input title='Input' element='INPUT' inputID='id' inputType='INPUT' placeHolderText='text'/>
            <Input title='Input' element='textarea' inputID='id' inputType='INPUT' placeHolderText='text'/>
            
        </Modal>
        }

    <div className='navBar'>
        <div>
            <Link className='pageHeader_UserImg' to='/myplaces'>
                <img src='https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg' alt='profile pic'></img>
            </Link>
        </div>
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/users'>Users</Link>
            <Link to='/newpost'>New post</Link>
            <Link to='/myplaces'>My places</Link>
            <button onClick={openModal}>modal</button>
        </nav>
        <div>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Sign up</Link>
        </div>
    </div>

    </React.Fragment>

  )
}

export default NavBar