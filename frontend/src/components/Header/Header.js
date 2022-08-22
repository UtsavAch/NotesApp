import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="navbarBrand">
            Notes
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form className="d-flex navbarForm">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 navbarFormControl"
                aria-label="Search"
              />
            </Form>
          </Nav>
          <Nav
            className="mr-auto my-2 my-lg-0 navbarProfile"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/mynotes" className="navbarLink">
              My notes
            </Link>
            <NavDropdown
              title={<span className="navbarDropdownTitle">Utsav Acharya</span>}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3" className="navbarDropdownItem">
                My profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5" className="navbarDropdownItem">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
