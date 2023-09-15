import { BrowserRouter,Route,Routes } from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Tasks from "./pages/Tasks"
import { Toaster } from "react-hot-toast"
import Nav from "./components/nav"
 
function App() {
  return (
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/tasks">
        <Route path="pending"  element={<Tasks />}   />
        <Route path="completed"  element={<Tasks />}   />
      </Route>
    </Routes>
    <Toaster/>
    </BrowserRouter>
  )
}

export default App
