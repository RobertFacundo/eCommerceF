import { Routes, Route, useLocation } from "react-router-dom"
import Home from "./views/Home"
import Auth from "./views/Authentication"
import Profile from "./views/Profile"
import CheckOut from "./views/CheckOut"
import Success from "./views/Success"
import Footer from "./components/Footer"

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html {
    height: 100%;
    overflow-x: hidden;
  }
    
`

///!!
function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/CheckOut' element={<CheckOut />} />
        <Route path='/Success' element={<Success />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App;
