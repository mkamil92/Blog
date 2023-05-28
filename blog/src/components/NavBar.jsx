import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NavBar(){
    const navigate = useNavigate()
    let email = localStorage.getItem('email')
    function logOut(){
        localStorage.removeItem('email')
        window.location.href = '/';
    }
    
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    <Link to='/' className="nav-link border border-white rounded ps-3 pe-3 pt-2 pb-2">Home</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {!email &&
                        <Nav.Link>
                            <Link to='sign-in' className="nav-link rounded bg-primary text-white">Sign in</Link>
                        </Nav.Link>
                    }
                    {!email &&
                        <Nav.Link>
                            <Link to='register' className="nav-link rounded bg-secondary text-white">Register</Link>
                        </Nav.Link>
                    }
                    {email &&
                        <Nav.Link>
                            <Link to='dashboard' className="nav-link rounded bg-primary text-white">Dashboard</Link>
                        </Nav.Link>
                    }
                    {email &&
                        <Nav.Link>
                            <Button variant='danger' onClick={logOut}>Log out</Button>
                        </Nav.Link>
                    }
                    
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}