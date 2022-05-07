import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { useNavigate, Link } from "react-router-dom";
import { FaBell } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';



// let History = useNavigate()
function UserHeader() {
    const navigate = useNavigate();
    const [MyProfile, setProfile] = useState()

    const loggedInUser = JSON.parse(sessionStorage.getItem("userInfo"));
    console.log("loggedInUser", loggedInUser)
    if (loggedInUser === null || loggedInUser === undefined) {
        console.log("jhdjhfdjhfdj")
        navigate("/")
    }


    const getProfile = async () => {
        var result = await axios.post("http://148.72.244.170:3000/getUser", {
            "id": loggedInUser._id
        })

        if (result.data.data.role === 1) {
            result.data.data.role = "Client";
        }
        if (result.data.data.role === 2) {
            result.data.data.role = "Broker";
        }
        if (result.data.data.role === 3) {
            result.data.data.role = "Supervisor";
        }
        console.log("profileeeeeeeee", result.data.data)
        setProfile(result.data.data)

    }
    useEffect(() => {
        getProfile();
    }, [])

    // ========user logout function========
    const logout = () => {
        let delete_token = sessionStorage.removeItem("userInfo");
        navigate("/");
    }


    return (
        <div>
            <Container fluid>
                <Row>
                    <Col lg={12} className="px-0">
                        <div className="Userheader">
                            <Navbar collapseOnSelect expand="lg">
                                <Container fluid>
                                    <Link to="/chat">Secure<b>Chat</b></Link>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="me-auto">

                                        </Nav>
                                        <Nav>
                                            <Nav.Link href="http://148.72.244.170:8080/#/"><button className="btn fabric_view">Fabric View</button></Nav.Link>
                                            <Nav.Link href="#"><span className='notification'><FaBell /></span></Nav.Link>

                                            <div className='d-flex align-items-center'>
                                                {MyProfile ?
                                                    <div className="user_profile_img">
                                                        <img src={MyProfile.pic} alt="" />
                                                        <NavDropdown title={MyProfile.first_name + " " + MyProfile.last_name} id="collasible-nav-dropdown">
                                                            <NavDropdown.Item><Link to="/userProfile">My Profile</Link></NavDropdown.Item>
                                                            {/* <NavDropdown.Item href='/userProfile'>My Profile</NavDropdown.Item> */}
                                                            <NavDropdown.Divider />
                                                            <NavDropdown.Item onClick={logout}><Button className='logout_btn' >Logout</Button></NavDropdown.Item>
                                                        </NavDropdown>
                                                    </div>
                                                    :
                                                    <div className="user_profile_img">
                                                        <img src={loggedInUser.pic} alt="" />
                                                        <NavDropdown title={loggedInUser.first_name + " " + loggedInUser.last_name} id="collasible-nav-dropdown">
                                                            <NavDropdown.Item><Link to="/userProfile">My Profile</Link></NavDropdown.Item>
                                                            {/* <NavDropdown.Item href='/userProfile'>My Profile</NavDropdown.Item> */}
                                                            <NavDropdown.Divider />
                                                            <NavDropdown.Item onClick={logout}><Button className='logout_btn' >Logout</Button></NavDropdown.Item>
                                                        </NavDropdown>
                                                    </div>

                                                }

                                            </div>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                        </div>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserHeader