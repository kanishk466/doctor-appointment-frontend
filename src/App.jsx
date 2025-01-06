import React from "react";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Register from "./pages/Register";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import BookAppointment from "./pages/BookAppointment";
import MyAppointment from "./pages/MyAppointment";
import DoctorDashboard from "./pages/DoctorDashboard";

const App = () => {
  const token = localStorage.getItem("token");


  function MultiRoute (el, ...paths) {
    return paths.map((p) => <Route key={p} element={el} path={p} />);
  };


  return (
    <Router>
      {token &&  (<Navbar/> )}
       
      <Routes> 
       

     
   {MultiRoute(  <Login/>, '/login', '/')}


       <Route path="/register" element={<Register/>}/>
        
       <Route path="/profile" element={
       <ProtectedRoute>
       <Profile/>
         </ProtectedRoute>
         }/>
        

  
        








        <Route
          path="/book-appointment"
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-appointment"
          element={
            <ProtectedRoute>
              <MyAppointment />
            </ProtectedRoute>
          }
        />

        <Route path="/doctor-dashboard" element={<ProtectedRoute>
          <DoctorDashboard/>
        </ProtectedRoute>}/>
        
       
        

      </Routes>
    </Router>
  );
};

export default App;
