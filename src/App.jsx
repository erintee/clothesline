import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

function App() {

  const [ imageUpload, setImageUpload ] = useState();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Home Page */}
          <Route path='/'></Route>

          {/* My Closet */}
          <Route path='/closets/myCloset'></Route>

          {/* Add item to my closet */}
          <Route path='/add'></Route>
          
          {/* Search Form */}
          <Route path='/search'></Route>

          {/* Items List */}
          <Route path='/items'></Route>

          {/* List friends' closets */}
          <Route path='/closets'></Route>

          {/* Closet */}
          <Route path='/closets/:userId'></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
