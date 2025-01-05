const API_BASE_URL = "https://doctor-appointment-backend-p0ms.onrender.com"; // Replace with your actual API base URL

// Function to fetch doctors
export const fetchDoctors = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/appointments/doctor`,{
      headers: { Authorization: `${token}` },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch doctors.");
    }
    const doctors = await response.json();
    console.log(response.json)
    return doctors; 
  } catch (error) {
    console.error("Error fetching doctors:", error.message);
    return [];
  }
};

// Function to fetch patients
 export const fetchPatients = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/patient/6777805853af57ec7901aaea`,{
      headers: { Authorization: `${token}` },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch patients.");
    }
    const patients = await response.json();
    console.log(response.json)
    return patients; // Assuming the API returns an array of patient objects
  } catch (error) {
    console.error("Error fetching patients:", error.message);
    return [];
  }
};
