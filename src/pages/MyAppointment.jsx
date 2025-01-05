import React,{useState , useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router";


const MyAppointment = () => {


  const [appointments, setAppointments] = useState([]);
  const patientId = localStorage.getItem('patientId');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming the token is stored here
        const response = await axios.get(`https://doctor-appointment-backend-p0ms.onrender.com/api/appointments/patient/${patientId}`, {
          headers: { Authorization: `${token}` },
        });
        setAppointments(response.data.data);
        console.log(response.data.data);
      
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);


  const getBadgeClass = (status) => {
    switch (status) {
      case "confirmed":
        return "badge bg-success";
      case "pending":
        return "badge bg-warning";
      case "completed":
        return "badge bg-primary";
      default:
        return "badge bg-secondary";
    }
  };

  return (





    <div className="container mx-auto p-4">






    <table class="table table-dark">
  <thead>
  <tr>
      <th scope="col">#</th>
      

      <th scope="col">Doctor Name</th>
      <th scope="col">Date</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>


  {appointments.map((appointment , index) => (
  <tr key={appointment._id}>
      <th scope="row">{index}</th>
     

      <td>{appointment.doctorId.name}</td>
      <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
      <td className='text-black'  > <span className={getBadgeClass(appointment.status)}>
                  {appointment.status}
                </span></td>

   
     
    </tr>

))}



   
  </tbody>
</table>
  </div>
    

  )
}

export default MyAppointment