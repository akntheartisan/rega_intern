import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import {Routes,Route} from 'react-router-dom';
import Footer from './components/Footer/Footer';

function App() {
  return (
     <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/contact' element={<Contact/>}/>
     </Routes>
     <Footer/>
     </>
  );
}

export default App;
