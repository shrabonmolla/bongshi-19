import './App.css'
import Footer from './components/Footer'
import Home from './components/Home'
import Profile from './components/Profile'
import UserCard from './components/UserCard'
import{ BrowserRouter,Routes,Route } from "react-router-dom"


function App() {

  return (
    <>
    <BrowserRouter>
    
    <Routes>
    <Route  path='/' element={<Home/>}       />

     <Route path='/usercard' element={<UserCard/>}       />
      <Route path='/usercard/:id' element={<Profile/>}       />

    
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
