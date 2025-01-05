import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Profile = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({

    personalInformation:{   
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      emergencyContact: "",
      occupation: "",
      address: {
        primary: "",
        secondary: "",
        city: "",
        state: "",
        zip: ""
      }
    },
 
    medicalInformation: {
      primaryCarePhysician: "",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      allergies: "",
      currentMedication: "",
      familyMedicalHistory: "",
      pastMedicalHistory: "",
    },
    identification: {
      idNumber: "",
      idDocumentPath: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 1) {
      setFormData({
        ...formData,
        [keys[0]]: value,
      });
    } else if (keys.length === 2) {
      setFormData({
        ...formData,
        [keys[0]]: {
          ...formData[keys[0]],
          [keys[1]]: value,
        },
      });
    } else if (keys.length === 3) {
      setFormData({
        ...formData,
        [keys[0]]: {
          ...formData[keys[0]],
          [keys[1]]: {
            ...formData[keys[0]][keys[1]],
            [keys[2]]: value,
          },
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
      const response = await axios.post(
        "https://doctor-appointment-backend-p0ms.onrender.com/api/register-patient",
        formData,
        {
          headers: { Authorization: `${token}` },
        }
      );
      alert("Patient information saved successfully!");
      setFormData({
        personalInformation:{   
          name: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          gender: "",
          emergencyContact: "",
          occupation: "",
          address: {
            primary: "",
            secondary: "",
            city: "",
            state: "",
            zip: ""
          }
        },
     
        medicalInformation: {
          primaryCarePhysician: "",
          insuranceProvider: "",
          insurancePolicyNumber: "",
          allergies: "",
          currentMedication: "",
          familyMedicalHistory: "",
          pastMedicalHistory: "",
        },
        identification: {
          idNumber: "",
          idDocumentPath: "",
        },
      })

      navigate('/book-appointment')
    } catch (error) {
      console.log("Error submitting form:", error);
      alert("Failed to save patient information.");
    }
  };


  return (
    <>
<div className="container mt-5">
      <h2 className="mb-4">Patient Personal Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control profile-input"
              name="personalInformation.name"
              value={formData.personalInformation.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control profile-input"
              name="personalInformation.email"
              value={formData.personalInformation.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control profile-input"
              name="personalInformation.phone"
              value={formData.personalInformation.phone}
              onChange={handleChange}
              placeholder="123-456-7890"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control profile-input"
              name="personalInformation.dateOfBirth"
              value={formData.personalInformation.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            name="personalInformation.gender"
            value={formData.personalInformation.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Emergency Contact</label>
            <input
              type="text"
              className="form-control profile-input"
              name="personalInformation.emergencyContact"
              value={formData.personalInformation.emergencyContact}
              onChange={handleChange}
              placeholder="123-456-7890"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Occupation</label>
            <input
              type="text"
              className="form-control profile-input"
              name="personalInformation.occupation"
              value={formData.personalInformation.occupation}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <h4>Address</h4>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Primary Address</label>
            <input
              type="text"
              className="form-control profile-input"
              name="personalInformation.address.primary"
              value={formData.personalInformation.address.primary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Secondary Address</label>
            <input
              type="text"
              className="form-control profile-input"
              name="personalInformation.address.secondary"
              value={formData.personalInformation.address.secondary}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control profile-input"
              name="personalInformation.address.city"
              value={formData.personalInformation.address.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">State</label>
            <input
              type="text"
              className="form-control profile-input"
              name="personalInformation.address.state"
              value={formData.personalInformation.address.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Zip Code</label>
            <input
              type="text"
              className="form-control profile-input"
              name="personalInformation.address.zip"
              value={formData.personalInformation.address.zip}
              onChange={handleChange}
              required
            />
          </div>
        </div>





        {/* Medical Information */}

        <h2 className="mb-4">Medical Information</h2>
          
        <div className="mb-3">
          <label className="form-label">Primary Care Physician</label>
          <select
            className="form-select"
            name="medicalInformation.primaryCarePhysician"
            value={formData.medicalInformation.primaryCarePhysician}
            onChange={handleChange}
            required
          >
          
            <option value="john doe">Dr .john doe</option>
            <option value="jane">DR. jane doe</option>
       
          </select>
        </div>


        <div className="row mb-3">
      
          <div className="col-md-6">
            <label className="form-label">Insurance Provider</label>
            <input
              type="text"
              className="form-control profile-input"
              name="medicalInformation.insuranceProvider"
              value={formData.medicalInformation.insuranceProvider}
              onChange={handleChange}
            />
          </div>
          <div className=" col-md-6 mb-3">
          <label className="form-label">Past Medical History</label>
          <textarea
            className="form-control profile-input"
            name="medicalInformation.pastMedicalHistory"
            value={formData.medicalInformation.pastMedicalHistory}
            onChange={handleChange}
          />
        </div>

        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Insurance Policy Number</label>
            <input
              type="text"
              className="form-control profile-input"
              name="medicalInformation.insurancePolicyNumber"
              value={formData.medicalInformation.insurancePolicyNumber}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Allergies</label>
            <input
              type="text"
              className="form-control profile-input"
              name="medicalInformation.allergies"
              value={formData.medicalInformation.allergies}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Current Medication</label>
            <input
              type="text"
              className="form-control profile-input"
              name="medicalInformation.currentMedication"
              value={formData.medicalInformation.currentMedication}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Family Medical History</label>
            <textarea
              className="form-control profile-input"
              name="medicalInformation.familyMedicalHistory"
              value={formData.medicalInformation.familyMedicalHistory}
              onChange={handleChange}
            />
          </div>
        </div>

        
      {/* Identification Section */}
      <h2 className="mb-4">Identification</h2>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">ID Number</label>
            <input
              type="text"
              className="form-control profile-input"
              name="identification.idNumber"
              value={formData.identification.idNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">ID Document Path</label>
            <input
              type="text"
              className="form-control profile-input"
              name="identification.idDocumentPath"
              value={formData.identification.idDocumentPath}
              onChange={handleChange}
              required
            />
          </div>
        </div>






        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default Profile;
