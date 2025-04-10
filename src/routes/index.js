import { BrowserRouter,Route,Routes } from "react-router-dom";

import Header    from '../components/Header/Header.jsx'
import Home      from '../pages/Home/Home.jsx'
import Favoritos from '../pages/Favoritos/Favoritos.jsx'
import Filme     from '../pages/Filme/Filme.jsx'

export default function AppRoutes(){
    return(
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='favoritos' element={<Favoritos/>}/>
            <Route path='/filme/:id' element={<Filme/>}/>
        </Routes>
        </BrowserRouter>
    )
}










