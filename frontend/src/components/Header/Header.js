import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileCanvas from "../ProfileCanvas/ProfileCanvas";
import "./Header.css";

function Header({ setSearch }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (userInfo) {
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
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
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
              <ProfileCanvas />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    return <div className="logoutHeader">Notes</div>;
  }
}

export default Header;
