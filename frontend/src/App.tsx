import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';

import './index.css'
import './styles/pageHeader.css'
import './styles/pageBody.css'
import './styles/form.css'
import './styles/modal.css'

import context_auth from './components/context/context_auth';
import page_Posts from './pages/Posts_page';
import Posts_page from './pages/Posts_page';
import Users_page from './pages/Users_page';
import Post_page from './pages/Post_page';


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
                  <Route path='/' element={< Posts_page />}/>
                  <Route path='/users' element={ < Users_page /> }/>
                  <Route path='/:user/posts' element={<Posts_page />}/>
                  <Route path='/:user/post/:id' element={< Post_page />}/>
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
