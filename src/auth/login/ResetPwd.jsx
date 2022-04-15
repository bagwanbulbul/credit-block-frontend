import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Header from '../../common/Header';
import { FaChevronLeft } from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom'
import $ from 'jquery';
import axios from 'axios';
import { VERIFY_OTP, RESET_PWD } from '../../Url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ResetPwd() {
    const [otp, setOtp] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    let History = useNavigate()
   

    useEffect(() => {
        $("#otp1").hide()
        $("#otpcheck").hide();
        $("#newpassword").hide()
        $("#confirmpassword").hide();
        $("#passwordmismatch").hide();
    }, []);

    $(".validate").focus(function () {
        $("#otp1").hide()
        $("#otpcheck").hide();
        $("#newpassword").hide()
        $("#confirmpassword").hide();
        $("#passwordmismatch").hide();
    })


    var url_string = window.location.href;
    const splitUrl = url_string.split('?')
    var userId = splitUrl[1].split("=")[1]


    const submitHander = async () => {
        try {

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            console.log("userId",userId)
            const { data } = await axios.post(VERIFY_OTP , { otp: otp, _id: userId }, config)
            console.log("data", data)
            if (data.statusCode === 400) {
                $("#otp1").show();
            }
            if (data.statusCode === 401) {
                $("#otpcheck").show();
                $("#otp1").hide();
            }
            if (data.statusCode === 200) {
                
                const result = await axios.post( RESET_PWD, { "_id":userId, password: newpassword , confirmpassword: confirmpassword },config)
                console.log("result",result.data)

                if(result.data.statusCode === 400){
                    $("#newpassword").show()
                }
                if(result.data.statusCode === 401){
                    $("#confirmpassword").show();
                }
                if(result.data.statusCode === 402){
                    $("#passwordmismatch").show();
                }
                if(result.data.statusCode === 200){
                    toast.success('Password Reset Successfully ', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme:"colored"
                    });
                    setTimeout(()=>{
                        History('/');
                    },3000)
                }
            }
        } catch (error) {
            console.log("error", error)
        }
    }

  

    return (
        <div>
            <Header />
            <Container>
                <Row>
                    <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
                        <div className="login_form mt-5">
                            <div className="heading">
                                <h3>Reset Password</h3>
                            </div>
                            <div className="login_inputs mt-3">
                                <Form>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>OTP </Form.Label>
                                        <Form.Control
                                            placeholder="Enter Your OTP "
                                            className='validate'
                                          
                                            onChange={(e) => setOtp(e.target.value)}
                                            value={otp}
                                        />
                                        <p className='error' id="otp1">Enter valid OTP</p>
                                        <p className='error' id="otpcheck">Incorrect OTP</p>
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder='Enter Your New Password'
                                            className='validate'
                                            onChange={(e) => setNewpassword(e.target.value)}
                                            value={newpassword}
                                        />
                                    </Form.Group>
                                    <p className='error' id="newpassword">Enter new password</p>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter your password"
                                            className='validate'
                                            onChange={(e) => setConfirmpassword(e.target.value)}
                                            value={confirmpassword}
                                        />
                                        <p className='error' id="confirmpassword">Enter confirm password</p>
                                        <p className='error' id="passwordmismatch">password mismatch</p>
                                    </Form.Group>


                                    <div className="d-grid gap-2">
                                        <Button variant="primary" size="lg" onClick={submitHander}>
                                            {/* <Link to="/login">Reset Password</Link> */}
                                            Reset Password
                                        </Button>
                                    </div>
                                    <Link to="/login"><p className='mt-3 text-center'><FaChevronLeft style={{ fontSize: "12px", marginRight: "10px" }} />Back to login</p></Link>
                                </Form>
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
        </div>
    )
}

export default ResetPwd