import React,{useState} from 'react'
import {Link ,useNavigate} from "react-router"
import axios from 'axios'
const Register = () => {
       const externalImage ="https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
       const navigate = useNavigate();
       const [ formData , setFormData ] = useState (

        { name: "", email: "", password: "", role: "patient" }
       )
     const [success , setSuccess]  = useState(false);
const[error , setError] = useState(false);


     const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("https://doctor-appointment-backend-p0ms.onrender.com/api/auth/register", formData);
       
          console.log(response.data); // Store token

          localStorage.setItem('token',response.data.token)

          setFormData({
             email: "",
        password :"",
        name: "", 
        role: ""
          })
          setSuccess(true);
          navigate('/login')

        } catch (error) {
          console.error(error);
            setError(true);
        }
      };



  return (
    <div class="d-lg-flex half">
    <div class="bg order-1 order-md-2" style={{backgroundImage : `url(${externalImage})` , borderRadius:"20px"}}></div>
    <div class="contents order-2 order-md-1">

      <div class="container">
      
        <div class="row align-items-center justify-content-center">
           


        {success && 
        <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Registration Successful!</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>}

      {error && <div class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong>Registration Successful!</strong> 
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>}



          <div class="col-md-7">
         
          <h3>Register to <strong>Healthcare</strong></h3>
            <form   style={{marginTop:"5rem"}} onSubmit={handleSubmit}>

            <div class="form-group first">
                <label for="username">Name :</label>
                <input type="text" class="form-control" placeholder="your-name" id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                 
                />
              </div>
              <div class="form-group first">
                <label for="username">Email</label>
                <input type="text" class="form-control" placeholder="your-email@gmail.com"
                
                value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div class="form-group last mb-3">
                <label for="password">Password</label>
                <input type="password" class="form-control" placeholder="Your Password" 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
              </div>
              
              <div class="d-flex mb-5 align-items-center">
             
             <span class="ml-auto" style={{color:"white"}}>Already have an account ?<Link to='/login' class="forgot-pass"> Click here</Link></span> 
           </div>

              <input type="submit" value="Get Started" class="btn btn-block btn-success mt-3" />

            </form>
          </div>
        </div>
      </div>
    </div>

    
  </div>
  )
}

export default Register