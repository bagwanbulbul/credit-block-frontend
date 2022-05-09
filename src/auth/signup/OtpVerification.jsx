import React,{useState,useEffect} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import {useLocation,useNavigate } from 'react-router-dom'
import Header from '../../common/Header'
import axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';



function OtpVerification() {
    let History = useNavigate()

    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const { pathname } = location;
    const userId = pathname.substr(pathname.lastIndexOf('/') + 1);
    console.log("userId", userId)

    const [otp, setOtp] = useState("");

    useEffect(() => {
        $("#otpError1").hide()
        $("#otpError2").hide()

    })

    $(".validate").focus(function () {
        $("#otpError1").hide();
        $("#otpError2").hide()
        
    })

    const submit = async() => {
        setLoading(true)
        if (!otp) {
            $("#otpError1").show()
        }

        try{
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
           const {data} = await axios.post("http://148.72.244.170:3000/verify_email_otp", {otp:otp, "_id":userId}, config);
                console.log("otp res", data)
                setLoading(false)


                if(data.statusCode === 401){
                    $("#otpError2").show();
                    $("#otpError1").hide();
                }
    

                // if(data){
                //     var obj = {
                //         accessToken:data.data.accessToken,
                //         first_name:data.data.first_name,
                //         last_name: data.data.last_name,
                //         role:data.data.role,
                //         statusCode: data.statusCode,
                //         statusMsj: data.statusMsj
                //     }
                //     sessionStorage.setItem("userInfo", JSON.stringify(obj));
                // }
    
                
                if (data.statusCode === 200) {

                    var obj = {
                        accessToken:data.data.accessToken,
                        _id: data.data._id,
                        first_name:data.data.first_name,
                        last_name: data.data.last_name,
                        role:data.data.role,
                        statusCode: data.statusCode,
                        statusMsj: data.statusMsj
                    }
                    sessionStorage.setItem("userInfo", JSON.stringify(obj));

                    toast.success('Email Verification Successfully done ', {
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
                        History('/chat');
                    }, 3000)
                }
            }
        catch (error) {
            console.log("error", error)
        }

    }
    const user = JSON.parse(sessionStorage.getItem("userInfo"))
    console.log("otp user token", user)
  return (
    <>
              <Header />
            <Container>
                <Row>
                    <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
                        <div className="login_form mt-5">
                            <div className="heading">
                                <h3>OTP Verification</h3>
                            </div>
                            <div className='loader' style={loading ? {display:"flex" }:{display:"none"}}>
                            <FaSpinner icon="spinner" className="spinner" />
                        </div>
                            <div className="login_inputs mt-3">
                            <div className="otp_container" >
                                 
                                    <div className="title">
                                        <p>We've sent a verification code to your email <br></br></p>
                                    </div>
                                    <div className="otp_input">
                                        <Form.Group className="mb-3">

                                            <Form.Control
                                                className='validate'
                                                type="text"
                                                placeholder="Enter verification code "
                                                name="otp"
                                                onChange={(e) =>setOtp(e.target.value)}
                                                required
                                            />
                                            <p className='error' id="otpError1">Enter OTP</p>
                                            <p className='error' id="otpError2">Invalid OTP</p>

                                        </Form.Group>
                                    </div>
                                </div>


                                <div className="d-grid gap-2">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        type="submit"
                                        onClick={submit}
                                    >
                                       Submit
                                    </Button>
                                </div>

                              

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

export default OtpVerification