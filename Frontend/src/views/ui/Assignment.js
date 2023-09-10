
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { AiFillDelete } from 'react-icons/ai';
import { GrFormView } from 'react-icons/gr';
import { BiSolidDownload } from 'react-icons/bi';
import { BiShow } from 'react-icons/bi';

import Modal from 'react-modal';

import axios from 'axios';
import Swal from 'sweetalert2';
import host from "./utils";
Modal.setAppElement('#root');
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// import RobotoMedium from './';

// Set the fonts for pdfMake
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

const EventDataTable = (props) => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [empdata, empdatachange] = useState([]);
  const navigate = useNavigate();
  const [pdfBuffer, setPdfBuffer] = useState(null);
  const [assignmentsId, setAssignmentsId] = useState("")
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [responseItems, setResponseItems] = useState([]); // State variable to hold response data
  const [bannerImage, setBannerImage] = useState(null);
  const [file, setFile] = useState([]);
  const [base64Data, setBase64Data] = useState(""); // Initialize base64Data as an empty string
  console.log("base64Data", base64Data);
  var user_id = localStorage.getItem('user_id')

  //  DELETE ASSIGNMENT
  const DeleteAssignment = async (_id) => {
    const formData = {
      user_id: _id
    };
    const response = await axios.post(`${host}/delete/assignment`, formData);

    Swal.fire({
      icon: 'success',
      title: 'Event successfully deleted',
      text: 'Your event has been successfully deleted.',
    }).then(() => {
      navigate('/EventDataTable');

    });

  };


  // GET API CALL TO 
  useEffect(() => {

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/getall/assignment',
      headers: {},
      data: {
        user_id: user_id
      }
    };

    axios.request(config)
      .then((response) => {
        // console.log(response.data.data);
        empdatachange(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);


  // EDIT ASSIGNMENT
  const LoadEdit = (_id) => {
    const formData = {
      id: _id
    };
    // console.log('vjffj',formData);
    navigate(`/eventUpdate/${formData.id}`);
  };

  // TABLE COLUMN
  var columns = [

    {
      name: "id",
      selector: (rowData, index) => index + 1,
      width: "80px",
    },
    {
      name: "Title",
      selector: (rowData) => rowData["title"],
      sortable: true,
      width: "150px",                       // added line here
      headerStyle: (selector, id) => {
        return { textAlign: "center" };   // removed partial line here
      },
    },
    {
      name: "Descripation",
      selector: (rowData) => rowData["description"],
      sortable: true,
      width: "200px",                       // added line here
      headerStyle: (selector, id) => {
        return { textAlign: "center" };   // removed partial line here
      },
    },
    {
      name: "Create Date",
      selector: (rowData) => rowData["createdAt"].split("T")[0] + " " + rowData["createdAt"].split("T")[1].split(".")[0],
      sortable: true,
      width: "200px",                       // added line here
      headerStyle: (selector, id) => {
        return { textAlign: "center" };   // removed partial line here
      },
    },
    {
      name: "Pdf",
      cell: (row) => (
        <>
          <div>
            {/* <button className="btn" onClick={() => fetchPdfData(row)}>Load PDF</button> */}
            <BiSolidDownload onClick={() => fetchPdfData(row)} />
          </div>
        </>
      ),
      sortable: true,
      width: "100px",
    },

    {
      name: "Delete",
      width: "100px",                       // added line here
      headerStyle: (selector, id) => {
        return { textAlign: "center" };   // removed partial line here
      },
      cell: (row) => (
        <>
          <span
            className="btn btn-md"
            onClick={() => {
              DeleteAssignment(row._id);
              window.location.reload()
            }}
          >
            <AiFillDelete />
          </span>
          {/* onClick={() => LoadEdit(row._id)} */}
        </>
      ),

      ignoreRowClick: true,
    },
    {
      name: "Re-Submit",
      width: "180px",                       // added line here
      headerStyle: (selector, id) => {
        return { textAlign: "center" };   // removed partial line here
      },
      cell: (row) => (
        <>

          <span
            className="btn btn-md"
            onClick={() => {
              Resubmit(row._id);
            }}
          >
            {/* <AiFillDelete /> */}
            re-submit
          </span>        </>
      ),

      ignoreRowClick: true,
    },


  ];

  // PDF VIEW
  var fetchPdfData = (row) => {
    // alert(row.pdf)
    console.log(row.pdf);
    //     const text = row.pdf;

    //     // Encode the text to UTF-8 using TextEncoder
    //     const encoder = new TextEncoder();
    //     const utf8Bytes = encoder.encode(text);

    //     // Create a Uint8Array from the UTF-8 encoded data
    //     const uint8Array = new Uint8Array(utf8Bytes);

    // // Convert the Uint8Array to a regular array
    // const array = Array.from(uint8Array);

    // // Convert the array to a string using the spread operator
    // const byteArray = [...array];

    // // Encode the byteArray to Base64
    // const base64Data = btoa(byteArray.map(byte => String.fromCharCode(byte)).join(''));

    // console.log(base64Data);


  }


  const Resubmit = (id) => {
    console.log(id);
    setAssignmentsId(id)
    setModalIsOpen(true);


  }


  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
    },
  };

  const buttonStyles = {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: "5px"
  };

  var filteredData = empdata.filter((row) => {
    // console.log(row,'row');
    return (
      row.title ||
      row.description ||
      row.pdf
    );
  });

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // RE SUBMIT DOCUMENT
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


  // var SubmitAssigment = async(event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append('pdf', file);
  //   formData.append('assignmentsId', assignmentsId);

  //   let config = {
  //     method: 'post',
  //     maxBodyLength: Infinity,
  //     url: 'http://localhost:5000/update/assignment',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     data: {
  //       base64Data:base64Data  ,
  //       assignmentsId:assignmentsId      
  //     }
  //   };

  //   axios.request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // }


  const SubmitAssigment = async (event) => {
    event.preventDefault();

    if (file) {
      const formData1 = new FormData();
      formData1.append('pdf', file);
      formData1.append('assignmentsId', assignmentsId);

      console.log(formData1); // This should log the FormData object with data.
      
      try {
        const response = await fetch('http://localhost:5000/update/assignment', {
          method: 'POST',
          body: formData1,
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


  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Data = e.target.result;
        setBase64Data(base64Data); // Update the state with the base64 data
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>

      <div>
        <div className="ml-5 mr-5" style={{ width: "1000px" }}>
          <DataTable
            title={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex" }}>
                  <h4>ASSIGNMENTS</h4>{" "}

                </div>
                <Link
                  to="/add/assignments"
                  className="btn btn-primary btn-sm ml-5 mr-5"
                >
                  Add Assignment
                </Link>
              </div>

            }
            columns={columns}
            data={filteredData ? filteredData : []}
            pagination
            highlightOnHover
          />
        </div>
      </div>





      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>

        <div className="form-group">
          <label htmlFor="banner_image">Re Submit Assignments :</label>
          <input
            type="file"
            id="banner_image"
            name="banner_image"
            onChange={handleFileInputChange}
          />
        </div>
        <div> <button onClick={SubmitAssigment} style={buttonStyles}>
          Submit
        </button>
          <button onClick={closeModal} style={buttonStyles}>
            Close
          </button></div>
      </Modal>
    </div>
  );
};

export default EventDataTable;




























