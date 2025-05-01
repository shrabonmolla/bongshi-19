import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Register from './components/Register'
import UserCard from './components/UserCard'
import{ BrowserRouter,Routes,Route } from "react-router-dom"



function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route  path='/' element={<Home/>}       />

     <Route path='/usercard' element={<UserCard/>}       />
      <Route path='/register' element={<Register/>}       />
      <Route path='/usercard/:id' element={<Profile/>}       />

    
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
