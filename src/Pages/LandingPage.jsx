import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
 
import {Link} from 'react-router-dom'
import Header from '../common/Header'
function LandingPage() {
  return (
    <div>
        <Header/>
         <Container>
                <Row className="verticle-center">
                    <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
                        <div className="landing_form mt-5">
                            <div className="heading">
                                <h3>Login</h3>
                                <h5 className="mt-2">Choose an option to log in</h5>
                            </div>
                            <div className="login_inputs mt-3">
                                <Form>
                               
                                    <div className="d-grid gap-2">
                                       
                                    <Link to="/login?role=1"  ><Button className="client_loginBtn" variant="primary" size="lg"><span className='title'>SecureChat</span> <span className="uppercase role" style={{fontWeight: "500"}}>Client</span> </Button></Link>                                   
                                    <Link to="/login?role=2" ><Button className="broker_loginBtn" variant="info" size="lg"><span className='title'>SecureChat</span> <span className="uppercase role" style={{fontWeight: "500"}}>Broker</span></Button></Link>
                                    <Link to="/login?role=3" ><Button className="supervisor_loginBtn" variant="secondary" size="lg"><span className='title'>SecureChat</span> <span className="uppercase role" style={{fontWeight: "500"}}>Supervisor</span></Button></Link>
                                       
                                    </div>
                                   
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
    </div>
  )
}

export default LandingPage