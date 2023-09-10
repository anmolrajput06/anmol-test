import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from "react-toastify";
// import { format } from "date-fns";

import "./eventForm.css"
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import host from "./utils";
const EventForm = (props) => {

  if (props.data) {
    var propsObject = props.data;

  }



  const [description, setDescription] = useState("");
  const [Assignment_name, setPerson_name] = useState("");

  const [bannerImage, setBannerImage] = useState(null);
  const [fields, setFields] = useState({});
  const [submitDisable, setSubmitDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState([]);

var user_id = localStorage.getItem('user_id')


  const notify = (message) => {
    toast(
      message == "alredy exist ADHAR."
        ? "Aadhar already exiest"
        : message == "alredy exist PAN_NO."
          ? "Pan Number already exiest"
          : message == "alredy exist emails."
            ? "Email already exiest"
            : null,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };


  const navigate = useNavigate();


  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0]; // Assuming you're uploading a single file
    const file = e.target.files[0];
    setFile(file);
    // Get the first selected file
    if (selectedFile) {
      const fileType = selectedFile.type; // Get the file type
      if (fileType === "application/pdf") {
        // Valid PDF file selected, you can proceed
        // Your code to handle the PDF file goes here
      } else {
        // Invalid file type, show an error message or take appropriate action
        alert("Please select a valid PDF file.");
        e.target.value = ""; // Clear the file input
      }
    }


    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Base64 encoded image data
        const base64Image = e.target.result;
        setBannerImage(base64Image);
      };

      reader.readAsDataURL(file);
    }
  };



  function updateEvent(e) {
    e.preventDefault();

    let finalData = { ...fields };
    // console.log("finalData", finalData);
    const validationErrors = (fields, true);
    const formData = {
      descripation: description,
      banner_image: bannerImage,
      Assignment_name: Assignment_name,
      user_id:user_id
    };



    // console.log(formData,'formData');
    setErrors(validationErrors.errObj);
    if (validationErrors) {
      setSubmitDisable(true);
      axios
        .post(`${host}/Event/eventUpdate`, formData)
        .then((response) => {
          // console.log("success", response);
          if (response.data.message == "Event updated successfully") {
            Swal.fire({
              icon: "success",
              title: "Successful",
              text: "Event Successfully Updated!",
            }).then(() => {
              navigate("/EventDataTable");
            });
          } else {
            setSubmitDisable(false)
            notify(response.data.message);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setFields({
      ...fields,
      [fieldName]: value,
    });
  };








  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (file) {
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('title', Assignment_name);
      formData.append('description', description);
      formData.append('user_id', user_id);

  
      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          // File successfully uploadedif
          console.log('File uploaded successfully');
          navigate("/EventDataTable");
        } else {
          // Error handling
          console.error('Error uploading file');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };
  










  return (
    <div className="page-container">
      <form className="page-form" onSubmit={(e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        // props.data ? updateEvent(e) : handleSubmit(e);
      }}>


        <div className="form-group">
          <label htmlFor="Title">Assignments Name:</label>
          <input
            type="text"
            placeholder="Assignments Name"
            defaultValue={fields.person_name}
            onChange={(event) => setPerson_name(event.target.value)}

          />
        </div>

        <div className="form-group">
          <label htmlFor="Title">Assignments Descripation:</label>

          <input
            type="text"
            placeholder="Enter Assignments Descripation"
            onChange={(event) => setDescription(event.target.value)}

          />
        </div>

        <div className="form-group">
          <label htmlFor="banner_image">Assignments :</label>
          <input
            type="file"
            id="banner_image"
            name="banner_image"
            onChange={handleFileInputChange}
          />



        </div>
        <button type="submit" onClick={handleSubmit}  >
          Submit
        </button>

      </form>
    </div>
  );
};

export default EventForm;
