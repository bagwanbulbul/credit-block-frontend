import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap'
import Header from '../../common/Header'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery';
import { SIGN_UP } from "../../Url";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [role, setrole] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    var userId

    let History = useNavigate()


    useEffect(() => {
        $("#passwordmismatch").hide()
        $("#firstName").hide()
        $("#UserError").hide();
        $("#lastName").hide();
        $("#email1").hide()
        $("#password1").hide()
        $("#password2").hide()
        $("#rolecheck").hide()
        $("#emailcheck").hide();
        $("#validemail").hide();


    }, [])


    $(".validate").focus(function () {
        $("#passwordmismatch").hide();
        $("#firstName").hide();
        $("#UserError").hide();
        $("#lastName").hide();
        $("#email1").hide();
        $("#password1").hide();
        $("#password2").hide();
        $("#rolecheck").hide();
        $("#emailcheck").hide();
        $("#validemail").hide();
    })
    
    const submitHandler = async () => {

        const article = { role: role, first_name: name, last_name: lastname, email: email, password: password, confirmpassword: confirmpassword, orgName:"Org1" };
        if (article.role === undefined || article.role == null || article.role === "") {
            $("#rolecheck").show()
        }
        if (article.first_name === undefined || article.first_name === "") {
            $("#firstName").show()
        }
        if (article.last_name === undefined || article.last_name === "") {
            $("#lastName").show()
        }
        if (article.email === undefined || article.email === "") {
            $("#email1").show();
        }
        if (article.password === undefined || article.password === "") {
            $("#password1").show();
        }
        if (article.confirmpassword === undefined || article.confirmpassword === "") {
            $("#password2").show()
        }
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!article.email || regex.test(article.email) === false){
            $("#validemail").show();
        }


        axios.post("http://148.72.244.170:3000/userSignup", article)
            .then((response) => {

                console.log("response", response)

                if (response.data.statusCode === 400) {
                    console.log("message", response.data.statusMsj)
                    // $("#emailcheck").show()
                    $("#UserError").show()
                    // $("#email1").show()
                }
                if (response.data.statusCode === 401) {
                    console.log("password mis match")
                    $("#passwordmismatch").show()
                } 

                // if (response.data.statusCode === 402) {
                //     $("#emailcheck").show()
                // } 

                if (response.data.statusCode === 403) {
                    $("#rolecheck").show()
                }

                if (response.data.statusCode === 200) {
                    console.log("verify",response.data)
                    // if(!response.data.data){
                    //     $("#emailcheck").show()
                    // }else{
                        userId = response.data._id
                        console.log("user id", userId)
                        toast.success('Your Registration Successfully done ', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored"
                        });
                        setTimeout(() => {
                            History(`/otp_verification/${userId}`)
                        }, 3000)
                    // }
                    
                    // userId = response.data.data._id   
                    // console.log("user id", userId)
                    // toast.success('Your Registration Successfully done ', {
                    //     position: "top-center",
                    //     autoClose: 2000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "colored"
                    // });
                    // setTimeout(() => {
                    //     History(`/otp_verification/${userId}`)
                    // }, 3000)
                   
                }
            })
    }

    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
                        <div className="login_form mt-2">
                            <div className="heading">
                                <h3>Sign Up</h3>
                            </div>
                            <div className="login_inputs mt-3">

                                <Form.Group className="mb-3" >
                                    <Form.Label>Role Select </Form.Label>
                                    <Form.Select
                                        className='validate'
                                        aria-label="Default select example"
                                        id="role"
                                        name="role"
                                        onChange={(e) => setrole(e.target.value)}
                                    >
                                        <option>Select Role</option>
                                        <option value="1">Client</option>
                                        <option value="2">Broker</option>
                                        <option value="3">Supervisor</option>
                                    </Form.Select>
                                    <p className="error" id="rolecheck">Please select role</p>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>First Name </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your first name "
                                        name="first_name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className='validate'

                                    />
                                    <p className='error' id="firstName">Enter Your FirstName</p>
                                    <p className='error' id="UserError">An identity for the user already exists in the wallet</p>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Last Name </Form.Label>
                                    <Form.Control
                                        className='validate'
                                        type="text"
                                        placeholder="Enter your last name "
                                        name="last_name"
                                        value={lastname}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                    <p className='error' id="lastName">Enter Your LastName</p>
                                </Form.Group>


                                <Form.Group className="mb-3">
                                    <Form.Label>Email </Form.Label>
                                    <Form.Control
                                        className='validate'
                                        type="email"
                                        placeholder="Enter your email "
                                        name="email"
                                        id="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <p className='error' id="email1">Email is required</p>
                                    <p className='error' id="emailcheck">Email already exist ! Please verify your email</p>
                                    <p className='error' id="validemail">Email Not valid </p>

                                </Form.Group>


                                <Form.Group className="mb-3" >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        className='validate'
                                        type="password"
                                        placeholder="Enter your password"
                                        name="password"
                                        id="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <p className='error' id="password1">Enter Password</p>
                                </Form.Group>


                                <Form.Group className="mb-3" >
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        className='validate'
                                        type="password"
                                        placeholder="Enter your confirm password"
                                        name="confirmpassword"
                                        id="confirmpassword"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <p className='error' id="passwordmismatch">Password Mismatch</p>
                                    <p className='error' id="password2">Confirm Password required</p>
                                </Form.Group>

                                {/* <Form.Group className="mb-3">
                                    <Form.Label>Upload your picture</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept='image/*'
                                        name="pic"
                                        id="pic"
                                    />
                                </Form.Group> */}

                                <div className="d-grid gap-2">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        type="submit"
                                        onClick={submitHandler}
                                    >
                                        Sign Up
                                    </Button>
                                </div>

                                <Link to="/"><p className='signup_account'>Already have an account? <span>Login</span></p></Link>

                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />


        </>
    )
}

export default SignUp