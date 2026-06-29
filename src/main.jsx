import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './views/Home.jsx'
import Resources from './views/Resources.jsx'
import LiveSessions from './views/LiveSessions.jsx'
import Contribute from './views/Contribute.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <Layout /> }>
      <Route path='' element={<Home /> }  />
      <Route path='resources' element={<Resources /> }  />
      <Route path='live-sessions' element={<LiveSessions /> }  />
      <Route path='contribute' element={<Contribute /> }  />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
