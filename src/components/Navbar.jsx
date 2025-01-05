import React from 'react'
import { Link  , useNavigate} from 'react-router'
const Navbar = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if(!token){
    return null;
  }
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem('role');
    localStorage.removeItem('_id');
    localStorage.removeItem('patientId');


    navigate("/login"); // Redirect to login page
  };
  return (

   
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Care Plus</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          {role == "patient" ?  
          
          <>
          <li class="nav-item">
            <Link  class="nav-link"to='/profile'>
           
            Profile
            </Link>

          </li>
          
          
          
          
            
          <li class="nav-item">

          <Link class="nav-link" to='/book-appointment'>
          Book Appointment</Link>
           
          </li>

          <li class="nav-item">
          <Link class="nav-link" to='/my-appointment'>
          My Appointment</Link>
      
          </li>


</>

          : 
          
          
          <li class="nav-item">
          <Link class="nav-link" to='/doctor-dashboard'>
          Doctor Dashboard</Link>
      
          </li>
          }
      



         
          <button onClick={handleLogout} className="mx-2">Logout</button>
        </ul>
      
      </div>
    </div>
  </nav>
  )
}

export default Navbar