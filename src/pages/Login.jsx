import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const externalImage =
    "https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://doctor-appointment-backend-p0ms.onrender.com/api/auth/login",
        formData
      );



      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("_id", response.data.user._id);



      setFormData({
        email: "",
        password: "",
      });
      setSuccess(true);


      if(response.data.user.role == 'patient'){
        navigate("/profile");
      }else{
        navigate("/doctor-dashboard");
      }
    
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <div className="d-lg-flex half">
      <div
        className="bg order-1 order-md-2"
        style={{
          backgroundImage: `url(${externalImage})`,
          borderRadius: "20px",
        }}
      ></div>
      <div className="contents order-2 order-md-1">
        <div className="container">
          {success && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>Registration Successful!</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}

          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>Invalid Credentials</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}

          <div className="row align-items-center justify-content-center">
            <div className="col-md-7">
              <h3>
                Login to <strong>Healthcare</strong>
              </h3>
              <form style={{ marginTop: "5rem" }} onSubmit={handleSubmit}>
                <div className="form-group first">
                  <label for="username">Email :</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="your-email@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-group last mb-3">
                  <label for="password">Password :</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Your Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>

                <div className="d-flex mb-5 align-items-center">
                  <span className="ml-auto" style={{ color: "white" }}>
                    Don't have an account ?
                    <Link to="/register" className="forgot-pass">
                      {" "}
                      Click here
                    </Link>
                  </span>
                </div>
                <input
                  type="submit"
                  value="Get Started"
                  className="btn btn-block btn-success mt-3"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
