import React,{useState , useEffect} from 'react'
import axios from 'axios'


const DoctorDashboard = () => {

 
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // To store selected appointment for the modal
  const [modalAction, setModalAction] = useState(""); // To differentiate between "Schedule" or "Cancel"
  const [newStatus, setNewStatus] = useState(""); // To store the updated status
  const [cancelReason, setCancelReason] = useState(""); // To store the cancellation reason
  const [counts, setCounts] = useState({
    scheduled: 0,
    pending: 0,
    cancelled: 0,
  });

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://doctor-appointment-backend-p0ms.onrender.com/api/appointments",
          {
            headers: { Authorization: `${token}` },
          }
        );

        const allAppointments = response.data.data;

        // Calculate counts for each status
        const scheduledCount = allAppointments.filter(
          (appt) => appt.status === "confirmed"
        ).length;
        const pendingCount = allAppointments.filter(
          (appt) => appt.status === "pending"
        ).length;
        const cancelledCount = allAppointments.filter(
          (appt) => appt.status === "cancelled"
        ).length;

        // Update state
        setAppointments(allAppointments);
        setCounts({
          scheduled: scheduledCount,
          pending: pendingCount,
          cancelled: cancelledCount,
        });


       
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [counts]);

  // Function to determine badge class based on status
  const getBadgeClass = (status) => {
    switch (status) {
      case "confirmed":
        return "badge bg-success text-black";
      case "pending":
        return "badge bg-warning text-black";
      case "completed":
        return "badge bg-primary";
      default:
        return "badge bg-secondary";
    }
  };

  // Function to handle the modal open
  const handleModalOpen = (appointment, action) => {
    setSelectedAppointment(appointment);
    setModalAction(action);
    setNewStatus(action === "Schedule" ? "confirmed" : "cancelled");
    setCancelReason(""); // Reset the cancel reason
  };

  // Function to handle status update
  const handleStatusUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const updateData =
        modalAction === "Cancel"
          ? { status: newStatus, cancelReason } // Include cancel reason for cancellation
          : { status: newStatus };

      const response = await axios.patch(
        `https://doctor-appointment-backend-p0ms.onrender.com/api/appointments/${selectedAppointment._id}/status`,
        updateData,
        { headers: { Authorization: `${token}` } }
      );
      // Update the state with the new status
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === selectedAppointment._id
            ? { ...appt, status: newStatus }
            : appt
        )
      );
      setSelectedAppointment(null); // Close modal
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };








  return (
    <div className="container mx-auto p-4">

<h1>Welcome , Admin</h1>
<h3>Start day with managing new appointment</h3>
 {/* Cards Section */}
 <div className="row my-lg-5">
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Scheduled Appointments</h5>
              <p className="card-text display-4">{counts.scheduled}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Pending Appointments</h5>
              <p className="card-text display-4">{counts.pending}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Cancelled Appointments</h5>
              <p className="card-text display-4">{counts.cancelled}</p>
            </div>
          </div>
        </div>
      </div>


    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Doctor</th>
          <th scope="col">Patient</th>
          <th scope="col">Date</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment, index) => (
          <tr key={appointment._id}>
            <th scope="row">{index}</th>
            <td>{appointment.doctorId.name}</td>
            <td>{appointment.patientId.personalInformation.name}</td>
            <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
            <td>
              <span className={getBadgeClass(appointment.status)}>
                {appointment.status}
              </span>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-outline-success"
                data-bs-toggle="modal"
                data-bs-target="#statusModal"
                onClick={() => handleModalOpen(appointment, "Schedule")}
              >
                Schedule
              </button>

              <button
                type="button"
                className="btn btn-outline-light mx-3"
                data-bs-toggle="modal"
                data-bs-target="#statusModal"
                onClick={() => handleModalOpen(appointment, "Cancel")}
              >
                Cancel
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Modal */}
    <div
      className="modal fade"
      id="statusModal"
      tabIndex="-1"
      aria-labelledby="statusModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="statusModalLabel">
              {modalAction} Appointment
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {modalAction === "Cancel" && (
              <>
                <label htmlFor="cancelReason" className="form-label">
                  Reason for Cancellation:
                </label>
                <textarea
                  id="cancelReason"
                  className="form-control"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  rows="3"
                ></textarea>
              </>
            )}
            {modalAction === "Schedule" && (
              <p>Are you sure you want to schedule this appointment?</p>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleStatusUpdate}
              data-bs-dismiss="modal"
              disabled={modalAction === "Cancel" && !cancelReason.trim()}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>





  )
}

export default DoctorDashboard