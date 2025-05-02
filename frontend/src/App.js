import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from './pages/home';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <div className = "pages">
          <Routes>
            <Route 
            path="/" 
            element={<Home />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;