import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/pageHeader.css'


function NavBar() {

  return (
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
        </nav>
        <div>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Sign up</Link>
        </div>
    </div>
  )
}

export default NavBar