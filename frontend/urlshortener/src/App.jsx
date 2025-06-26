import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import MasterLayout from './pages/MasterLayout'
import Home from './pages/Home'
// import Index from './pages/Index.jsx'


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MasterLayout/>}> 
        <Route index element={<Home/>}/>
      </Route>
    )
  )
  return(
    <RouterProvider router={router}/>
  )
}

export default App
