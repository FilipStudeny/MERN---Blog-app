import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import User from './pages/Users';

import './index.css'
import './styles/pageHeader.css'
import './styles/pageBody.css'
import './styles/form.css'
import './styles/modal.css'

import Posts from './pages/Posts';
import Post from './pages/Post';
import context_auth from './components/context/context_auth';

function App() {

  const [isLoggedIn, setLoogedIn] = useState(false);

  const login = useCallback(() => {
    setLoogedIn(true);
  },[])

  const loggout = useCallback(() => {
    setLoogedIn(false);

  },[])


  return (
    <context_auth.Provider value={{isLoggedIn: isLoggedIn, login: login, loggout: loggout}}>

    <div className='pageBody'>
        <Router>
          <header className='pageHeader'>
            <NavBar/>
          </header>
          <main className='pageBody_Row pageBody_Content'>
              <div className='pageBody_Column'></div>
              <section>
                <Routes>
                  <Route path='/' element={<Posts/ >}/>
                  <Route path='/users' element={<User/ >}/>
                  <Route path='/:user/posts' element={<Posts/ >}/>
                  <Route path='/:user/post/:id' element={<Post />}/>
                </Routes>  
              </section>
              <div className='pageBody_Column'></div>
        
          </main>
        </Router>
    </div>
    </context_auth.Provider>

  );
}

export default App;
