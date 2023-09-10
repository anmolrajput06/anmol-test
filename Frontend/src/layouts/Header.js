import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
import user1 from "../assets/images/users/user1.jpg";
import Logout from "../auth/Logout";
import Swal from 'sweetalert2'; // Import SweetAlert
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import axios from 'axios';
import host from "../views/ui/utils"
// Set the root element for the modal
Modal.setAppElement('#root');
var FullName = localStorage.getItem('FullName')

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
const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  // Move useNavigate outside the handleLogout function
  const navigate = useNavigate();

  const handleLogout = () => {
    // Show a SweetAlert confirmation
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
      } else {
        navigate("/");
      }
    });
  };

  const buttonStyles = {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const [aadharFrontImage, setAadharFrontImage] = useState(null);
  const [aadharBackImage, setAadharBackImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null)

  const handleAadharFrontImageChange = (e) => {
    const file = e.target.files[0];
    setAadharFrontImage(file);
  };

  const handleAadharBackImageChange = (e) => {
    const file = e.target.files[0];
    setAadharBackImage(file);
  };
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    setProfileImage(file)
  }
  const handleUploadProfileImage = () => {
    // Handle the profile image upload here
  };

  const handleUploadAadharFrontImage = () => {
    // Handle the Aadhar front image upload here
  };

  const handleUploadAadharBackImage = () => {
    // Handle the Aadhar back image upload here
  }
  const handleUploadImages = () => {
    // Create a FormData object to send the files to your server
    const formData = new FormData();
    formData.append('files', profileImage);
    formData.append('files', aadharFrontImage);
    formData.append('files', aadharBackImage);

    console.log(formData,'formDataformDataformDataformDataformDataformDataformDataformData');
     axios.post(`${host}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        // Handle the response from the server
        console.log(formData,'formData');
        console.log('Images uploaded successfully:', response);
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error uploading images:', error);
      });
  };

  return (
    <>
      <Navbar color="primary" dark expand="md">
        <div className="d-flex align-items-center">
          <NavbarBrand href="/" className="d-lg-none">
            <LogoWhite />
          </NavbarBrand>
          <Button
            color="primary"
            className="d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-list"></i>
          </Button>
        </div>
        <div className="hstack gap-2">
          <Button
            color="primary"
            size="sm"
            className="d-sm-block d-md-none"
            onClick={Handletoggle}
          >
            {isOpen ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-three-dots-vertical"></i>
            )}
          </Button>
        </div>

        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link to="/starter" className="nav-link">
                {/* Starter */}
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/about" className="nav-link">
               <h5>{ `Welcome ${FullName}`}</h5>
              </Link>
            </NavItem>

          </Nav>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="primary">
              <img
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="30"
              ></img>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Info</DropdownItem>
              <DropdownItem>My Account</DropdownItem>
              <DropdownItem onClick={openModal} >Edit Profile</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>My Balance</DropdownItem>
              <DropdownItem>Inbox</DropdownItem>
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Collapse>

      </Navbar>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
      <h2>Edit</h2>
      <p>Edit Profile.</p>
      <input type="file" name="files" accept="image/*" onChange={handleProfileImageChange} />
      {/* <button onClick={handleUploadProfileImage}>Upload Profile</button> */}
      <br />
      <p>Upload Aadhar Front</p>
      <input type="file" name="files" accept="image/*" onChange={handleAadharFrontImageChange} />
      {/* <button onClick={handleUploadAadharFrontImage}>Upload Aadhar Front</button> */}
      <br />
      <p>Upload Aadhar Back</p>
      <button onClick={handleUploadImages}>Upload Images</button>

    </Modal>

    </>
  );
};

export default Header;
