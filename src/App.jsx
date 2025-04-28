import { Routes, Route, useLocation } from "react-router-dom"
import NavBar from "./components/nav/NavBar"
import Home from "./views/Home"
import Auth from "./views/Authentication"
import Profile from "./views/Profile"

///!!
function App() {
  const location = useLocation();
  return (
    <>
    {location.pathname !== '/' && <NavBar/>}
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
