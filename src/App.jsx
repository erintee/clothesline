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
import SearchUsersModal from './components/SearhUsersModal/SearchUsersModal';

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(!!localStorage.getItem("authToken"));
  const [ user, setUser ] = useState(null);
  const [ searchModalOpen, setSearchModalOpen ] = useState(false);

  useEffect(() => {
    if(isLoggedIn) {
      const fetchUser = async () => {
          try {
              const token = localStorage.getItem("authToken");
              const response = await axios.get(`${BASE_URL}/users/active`, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
              setUser(response.data);
          } catch (error) {
              console.error("Couldn't fetch active user", error);
          }
      }
      fetchUser();
    }
  }, [isLoggedIn]);

  if (isLoggedIn && !user) {
    return <>Loading</>
  }

  const handleOpenSearchModal = (event) => {
    setSearchModalOpen(true);
  };

  const handleCloseSearchModal = () => {
      setSearchModalOpen(false);
  };
  return (
    <div className="App">
      <BrowserRouter>

        <Header
          className="header"
          user={user}
          setUser={setUser}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          handleOpenSearchModal={handleOpenSearchModal}
        />
        <SearchUsersModal
          isOpen={searchModalOpen}
          onClose={handleCloseSearchModal}
        />
        
        <Routes>
          <Route path='/' element={isLoggedIn ? 
            <DashboardPage user={user} /> : 
            <AuthPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} >
          </Route>

          <Route path='/closets/:userId' element={isLoggedIn ?
            <ClosetPage user={user}/> :
            <AuthPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} >
          </Route>

          <Route path='/explore' element={isLoggedIn ? 
            <ExplorePage user={user}/> :
            <AuthPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} >
          </Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
