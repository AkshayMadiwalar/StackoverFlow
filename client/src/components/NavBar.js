import React from 'react'
import { Nav, NavDropdown, Navbar, Container } from 'react-bootstrap'
import { Form, FormControl, Button, Offcanvas } from 'react-bootstrap'
import {useLocation, Outlet } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { Row, Col, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import SideMenu from './Dashboard/DashboardCards/SideMenu'
import logo from './images/stackoverflowlogo.PNG'
const NavBar = () => {
    const location = useLocation()
    const [Flag, setFlag] = useState(false);
    

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
                <Container>
                    <Navbar.Brand href="/DashBoard" ><img style={{ width: "10rem", marginLeft: "-5rem", marginTop: "-1rem", paddingTop: ".5rem" }} src={logo} alt="Flowers in Chania"></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Col sm={10}>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-1"
                                    aria-label="Search"

                                />
                            </Form>
                        </Col>
                        <Col sm={2}>
                            <Button variant="outline-primary">Log in</Button>
                            <Button variant="outline-primary">Sign up</Button>
                        </Col>
                    </Navbar.Collapse>
                </Container>

            </Navbar>
            <SideMenu />
            <Outlet />
        </div>
    )
}

export default NavBar