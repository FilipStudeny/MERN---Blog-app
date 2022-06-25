import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import User from './pages/User';

import './index.css'
import './styles/pageHeader.css'
import './styles/pageBody.css'
import Places from './pages/Places';

function App() {
  return (

    <div className='pageBody'>
      <Router>
        <header className='pageHeader'>
          <NavBar/>
        </header>
        <main className='pageBody_Row pageBody_Content'>
            <div className='pageBody_Column'></div>
            <section>
              <Routes>
                <Route path='/' element={<Places/ >}/>
                <Route path='/users' element={<User/ >}/>
                <Route path='/:userID/places' element={<Places/ >}/>
              </Routes>  
            </section>
            <div className='pageBody_Column'></div>
       
        </main>

    </Router>
    </div>
    
  
  );
}

export default App;
