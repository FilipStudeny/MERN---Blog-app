import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';

import './index.css'
import './styles/pageHeader.css'
import './styles/pageBody.css'
import './styles/form.css'
import './styles/modal.css'
import './styles/list.css'
import './styles/pageHeader.css';
import './styles/post.css';

import context_auth from './components/context/context_auth';
import Posts_page from './pages/Posts_page';
import Users_page from './pages/Users_page';
import Post_page  from './pages/Post_page';
import List from './components/List';

function App() {

  const [isLoggedIn, setLoogedIn] = useState(false);
  const [userID, setUserID] = useState<any>();
  const [username, setUserName] = useState<any>();

  const login = useCallback((userID: any, username: any) => {
    setUserID(userID);
    setUserName(username);
    setLoogedIn(true);

    console.log(username);
    console.log(userID);

  },[])

  const loggout = useCallback(() => {
    setLoogedIn(false);
    setUserID(null);
    setUserName(null);

    console.log(username);
    console.log(userID);
  },[])


  return (
    <context_auth.Provider value={{isLoggedIn: isLoggedIn, userId: userID, username: username, login: login, loggout: loggout}}>

    <div className='pageBody'>
        <Router>
          <header className='pageHeader'>
            <NavBar/>
          </header>
          <main className='pageBody_Row pageBody_Content'>
              <div className='pageBody_Column'></div>
              <section>
                <Routes>
                  <Route path='/' element={<List />}/>
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
