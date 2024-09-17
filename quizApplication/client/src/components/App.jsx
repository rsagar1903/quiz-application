import { useState } from 'react'
import '../styles/App.css'
import {createBrowserRouter , RouterProvider } from 'react-router-dom'
import Main from './Main'
import Quiz from './Quiz'
import Result from './result'
import { CheckUserExist } from '../helper/helper'
import { Provider } from 'react-redux'
import store from '../redux/store'

const router = createBrowserRouter([
{
  path:"/",
  element : <Main />
},
{
  path:"/quiz",
  element:  <CheckUserExist><Quiz /></CheckUserExist>

},
{
  path:"/result",
  element :   <CheckUserExist><Result /></CheckUserExist>
}
])

function App() {

  return (
    < >
      <RouterProvider router={router} />
    </>
  );
}

export default App
