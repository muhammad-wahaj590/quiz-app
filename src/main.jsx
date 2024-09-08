import { StrictMode } from 'react'
import './index.css'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import QuizInstructions from './components/quiz/QuizInstructions'
import Play from './components/quiz/Play'
import QuestionCategory from './components/quiz/QuestionCategory'
import Login from './components/Login'
import Signup from './components/Signup'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' exact element={<Home />}/>
      <Route path='/play/instructions' exact element={<QuizInstructions />}/>
      <Route path='/play/category' element={<QuestionCategory />} />
      <Route path='/play/:cat/:dif/:no' element={<Play/>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<Signup />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
