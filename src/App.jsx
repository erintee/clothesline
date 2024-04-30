import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import './App.scss';
import { BASE_URL } from './utils/utils';
import Header from './components/Header/Header';
import ExplorePage from './pages/ExplorePage/ExplorePage';
import ClosetPage from './pages/ClosetPage/ClosetPage';
import AuthPage from './pages/AuthPage/AuthPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(!!localStorage.getItem("authToken"));
  console.log(isLoggedIn)
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    if(isLoggedIn) {
      const fetchUser = async () => {
          try {
              const token = localStorage.getItem("authToken");
              console.log(token);
              const response = await axios.get(`${BASE_URL}/dashboard`, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
              setUser(response.data);
          } catch (error) {
              console.error(error);
          }
      }
      fetchUser();
    }
  }, [isLoggedIn]);

  if (isLoggedIn && !user) {
    return <>Loading</>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header
          user={user}
          setUser={setUser}
          isLoggedIn={isLoggedIn}
        />

        <Routes>
          {/* isLoggedIn ? <DashboardPage /> : <AuthPage /> */}
          <Route path='/' element={isLoggedIn ? 
            <DashboardPage user={user} /> : 
            <AuthPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} >
          </Route>

          {/* ClosetPage - have conditional statement for render in page element (friend vs own) */}
          <Route path='/closets/:userId' element={isLoggedIn ?
            <ClosetPage user={user}/> :
            <AuthPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} >
          </Route>

          {/* Add item to my closet */}
          <Route path='/add'></Route>

          {/* Items List */}
          <Route path='/items' element={isLoggedIn ? 
            <ExplorePage user={user}/> :
            <AuthPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} >
          </Route>

          {/* List friends' closets */}
          <Route path='/closets'></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
