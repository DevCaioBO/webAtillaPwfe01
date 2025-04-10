import React from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify'
import AppRoutes from './routes'
import 'react-toastify/dist/ReactToastify.css'
export default function App() {
  return (
    <div className='app'>
      <AppRoutes/>
      <ToastContainer autoClose={3000} position='top-right'/>
    </div>
  )
}

