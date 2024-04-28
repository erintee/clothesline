import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import ExplorePage from './pages/ExplorePage/ExplorePage';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          {/* Home Page */}
          <Route path='/'></Route>

          {/* My Closet
          <Route path='/closets/myCloset'></Route> */}

          {/* Add item to my closet */}
          <Route path='/add'></Route>
          
          {/* Search Form */}
          <Route path='/search'></Route>

          {/* Items List */}
          <Route path='/items' element={<ExplorePage/>}></Route>

          {/* List friends' closets */}
          <Route path='/closets'></Route>

          {/* ClosetPage - have conditional statement for render in page element (friend vs own) */}
          <Route path='/closets/:userId'></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
