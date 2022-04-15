import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Header from '../../common/Header';
import { FaChevronLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FORGOT_PASSWORD } from '../../Url';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPwd() {
    const [email, setEmail] = useState("");
    let History = useNavigate()

    useEffect(() => {
        $("#email1").hide()
        $("#emailcheck").hide();
    }, []);


    $(".validate").focus(function () {
        $("#email1").hide();
        $("#emailcheck").hide();
    })

   


    const submitHander = async () => {

        if (!email) {
            $("#email1").show();
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(FORGOT_PASSWORD, { email }, config)
          
            var UserId = data.UserId
            console.log("data",UserId)

            if (data.statusCode === 401) {
                $("#email1").show();
            }
            if (data.statusCode === 400) {
                $("#emailcheck").show();
            }
            if (data.statusCode === 200) {
                toast.success('Your OTP Send Successfully  ', {
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
                    History('/reset_pwd?userId='+ UserId )
                },3000)
                
            }

        } catch (error) {
            console.log("error", error)
        }
    }



    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
                        <div className="login_form mt-5">
                            <div className="heading">
                                <h3>Forgot Password</h3>
                            </div>
                            <div className="login_inputs mt-4">
                                <p className='forgot_text'>Enter your email and we'll send you a link to reset your password. </p>
                                <Form>
                                    <Form.Group className="mb-4" >
                                        <Form.Control
                                            className='validate'
                                            type="email"
                                            placeholder="Enter your email "
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                        />
                                        <p className='error' id="email1">Enter Valid Email</p>
                                        <p className='error' id="emailcheck">Email does not exist</p>
                                    </Form.Group>

                                    <div className="d-grid gap-2">
                                        <Button variant="primary" size="lg" onClick={submitHander} >
                                            Send OTP
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
        </>
    )
}

export default ForgotPwd