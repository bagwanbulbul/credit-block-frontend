import React from 'react'
import { Container, Row, Col, Navbar } from 'react-bootstrap'
function Header() {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg={12} md={12} className="px-0">
                        <div className="header">
                            <div>
                               
                                    <p>Secure<b>Chat</b></p>
                                
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default Header
