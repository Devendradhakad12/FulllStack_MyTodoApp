import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Tasks from "./pages/Tasks";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import AddTask from "./pages/AddTask";
import AllTasks from "./pages/AllTasks";
import EditTask from "./pages/EditTask";

const Provider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  if (token !== null) return children;
  useEffect(() => {
    navigate("/login");
  }, []);
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks">
          <Route
            path="pending"
            element={
              <Provider>
                <Tasks />
              </Provider>
            }
          />
          <Route
            path="completed"
            element={
              <Provider>
                <Tasks />
              </Provider>
            }
          />
          <Route
            path="all"
            element={
              <Provider>
                <AllTasks />
              </Provider>
            }
          />
        </Route>
        <Route
          path="/addtask"
          element={
            <Provider>
              <AddTask />
            </Provider>
          }
        />
        <Route
          path="/edittask/:id"
          element={
            <Provider>
              <EditTask />
            </Provider>
          }
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
