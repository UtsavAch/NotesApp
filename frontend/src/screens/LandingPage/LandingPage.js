import React, { useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome !!!</h1>
              <p className="subtitle">
                ...to the best place for all your notes
              </p>
              <div>
                <div className="buttonContainer">
                  <Link to="/login">
                    <Button size="lg" className="landingButton">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      size="lg"
                      className="landingButton"
                      variant="outline-primary"
                    >
                      Signup
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
