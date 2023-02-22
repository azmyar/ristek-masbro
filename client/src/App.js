import { Route, Routes, Navigate } from "react-router-dom";
import Home from './components/home'
import Login from './components/auth/login'
import Signup from './components/auth/signup'

function App (){
    const user = localStorage.getItem("token")
    return(
        <Routes>
            {
            user && 
            <Route path="/" exact element={<Home/>} />
            }
            {
            user && 
            <Route path="/home" exact element={<Home/>} />
            }
            <Route path="/signup" exact element = {<Signup/>}/>
            <Route path="/login" exact element = {<Login/>}/>
            <Route path="/home" exact element = {<Navigate replace to="/login"/>}/>
            <Route path="/" exact element = {<Navigate replace to="/login"/>}/>
        </Routes>
    )
}

export default App