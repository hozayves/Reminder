import React from 'react'
import ReactDOM from 'react-dom/client'
import {router} from './components/App'
import "./App.css"
import { RouterProvider } from 'react-router-dom'
import './server'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router ={router}/>
  </React.StrictMode>,
)
