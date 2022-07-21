import React, { useCallback, useState, useEffect } from 'react';
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
import Home_page from './pages/Home_page';


let logoutTimer: any;


function App() {

  const [userID, setUserID] = useState<any>();
  const [username, setUserName] = useState<any>();
  const [userImage, setUserImage] = useState('');
  const [token, setToken] = useState<any>();
  const [tokenExpirationDate, setTokenExpirationDate] = useState<any>();

  
  const login = useCallback((userID: any, token: any, username: any, profilePicture: string, expirationDate: any) => {
    setUserID(userID);
    setUserName(username);
    setToken(token);
    setUserImage(profilePicture);

    const tokenExpirationDate = expirationDate ||  new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem('userData', JSON.stringify({
      userID: userID,
      username: username,
      profilePicture: profilePicture,
      token: token,
      tokenExpirationData: tokenExpirationDate.toISOString()
    }));

  },[])

  const logout = useCallback(() => {
    setUserID(null);
    setUserName(null);
    setToken(null);
    setUserImage('');
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  },[])

  useEffect(() => {
    if (token && tokenExpirationDate){

      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime() ;
      logoutTimer = setTimeout(logout, remainingTime);
    }else{
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate])

  useEffect(() => {
    const storedData: any = JSON.parse(localStorage.getItem('userData') || '{}' );
  
    if (storedData && storedData.token && new Date(storedData.tokenExpirationData) > new Date()){
      login(storedData.userID, storedData.token, storedData.username, storedData.profilePicture ,new Date(storedData.tokenExpirationData));
    }

  }, [login]);

  return (
    <context_auth.Provider value={{isLoggedIn: !!token, userId: userID, username: username, login: login, loggout: logout, token: token, profilePicture: userImage}}>

    <div className='pageBody'>
        <Router>
          <header className='pageHeader'>
            <NavBar/>
          </header>
          <main className='pageBody_Row pageBody_Content'>
              <div className='pageBody_Column'></div>
              <section>
                <Routes>
                  <Route path='/' element={<Home_page />}/>
                  <Route path='/users' element={ < Users_page /> }/>
                  <Route path='/:user/:userID/:posts' element={<Posts_page />}/>
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
