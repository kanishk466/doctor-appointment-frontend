import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router";

import axios from 'axios';
const navigate = useNavigate();
const BookAppointment = () => {

  const [doctors, setDoctors] = useState([]);

  const id =localStorage.getItem("_id");
  const [formData, setFormData] = useState({
    doctorId: "",
    patientId: "",
    appointmentDate: "",
    notes: "",
    reasonNotes: "",
    status: "pending",
  });


  const fetchPatientProfile = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored here
      const response = await axios.get(`https://doctor-appointment-backend-p0ms.onrender.com/api/patient/${id}`, {
        headers: { Authorization: `${token}` },
      });
    
     


      const patientId = response.data.data._id; // Extract patient ID from the response
      localStorage.setItem('patientId',response.data.data._id);
      setFormData((prev) => ({
        ...prev,
        patientId,
      }));
    
    
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming the token is stored here
        const response = await axios.get("https://doctor-appointment-backend-p0ms.onrender.com/api/appointments/doctor", {
          headers: { Authorization: `${token}` },
        });
        setDoctors(response.data);
      
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
    fetchPatientProfile();
  }, []);







  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
      const response = await axios.post(
        "https://doctor-appointment-backend-p0ms.onrender.com/api/appointments",
        formData,
        {
          headers: { Authorization: `${token}` },
        }
      );
      alert(response.data);
      navigate('/my-appointment');

    } catch (error) {
      console.log("Error submitting form:", error);
      alert("Failed to book appointment.");
    }
  };



  return (
    <div className="container mt-5">
    <h2 className="mb-4">Book an Appointment</h2>
    <form onSubmit={handleFormSubmit}>
      {/* Doctor Selection */}
      <div className="mb-3">
        <label htmlFor="doctorId" className="form-label">
          Select Doctor
        </label>
        <select
          id="doctorId"
          name="doctorId"
          className="form-select"
          value={formData.doctorId}
          onChange={handleInputChange}
          required
        >
          <option value="">Choose a doctor...</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.name} 
            </option>
          ))}
        </select>
      </div>



      {/* Appointment Date */}
      <div className="mb-3">
        <label htmlFor="appointmentDate" className="form-label">
          Appointment Date
        </label>
        <input
          type="datetime-local"
          id="appointmentDate"
          name="appointmentDate"
          className="form-control profile-input"
          value={formData.appointmentDate}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Reason Notes */}
      <div className="mb-3">
        <label htmlFor="reasonNotes" className="form-label">
          Reason for Appointment
        </label>
        <textarea
          id="reasonNotes"
          name="reasonNotes"
          className="form-control profile-input"
          rows="3"
          value={formData.reasonNotes}
          onChange={handleInputChange}
          required
        ></textarea>
      </div>

      {/* Additional Notes */}
      <div className="mb-3">
        <label htmlFor="notes" className="form-label">
          Additional Notes (Optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          className="form-control profile-input"
          rows="3"
          value={formData.notes}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary">
        Book Appointment
      </button>
    </form>
  </div>
  )
}

export default BookAppointment