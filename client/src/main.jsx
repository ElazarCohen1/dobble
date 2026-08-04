import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import Game from './Game.jsx'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/game/:gameId", element: <Game /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
