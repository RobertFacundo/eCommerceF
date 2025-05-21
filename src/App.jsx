import { Routes, Route, useLocation } from "react-router-dom"
import NavBar from "./components/nav/NavBar"
import Home from "./views/Home"
import Auth from "./views/Authentication"
import Profile from "./views/Profile"
import CheckOut from "./views/CheckOut"
import Success from "./views/Success"

///!!
function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/' && <NavBar />}
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/CheckOut' element={<CheckOut />} />
        <Route path='/Success' element={<Success />}/>
      </Routes>
    </>
  )
}

export default App
