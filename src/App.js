import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AddEditUser from "./Pages/AddEditUser";
import UserInfo from "./Pages/UserInfo";
import Header from "./Components/Header";
import store from "./ReduxState/store/Store";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from "./FirebaseAuth/SignIn/SignIn";
import SignUp from "./FirebaseAuth/SignUp/SignUp";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
      <div className="App">
        <ToastContainer />
        <Header />
        <Routes>
          <Route exact path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route exact path="/adduser" element={<ProtectedRoute><AddEditUser /></ProtectedRoute>} />
          <Route exact path="/edituser/:id" element={<ProtectedRoute><AddEditUser /></ProtectedRoute>} />
          <Route exact path="/userinfo/:id" element={<ProtectedRoute><UserInfo /></ProtectedRoute>} />
          <Route exact path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
    </Provider>
    
  );
}

export default App;
