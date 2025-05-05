import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Nav from './pages/Nav'
function App() {

  return (
  <>
  <BrowserRouter>
  <Routes>
    {/* Navi route is parent to all and home is render with Nav */}
    <Route path='/' element={<Nav/>}>
      <Route index element={<Home />}></Route>
      <Route path='/signin' element={<SignIn/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
    </Route>
  </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
