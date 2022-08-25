import React from "react";
import { Container, Row } from "react-bootstrap";
import "./MainScreen.css";

const MainScreen = (props) => {
  return (
    <div className="mainback">
      <Container>
        <Row>
          <div className={`page ${props.type}`}>
            {props.title && (
              <div>
                <h1 className="heading">{props.title}</h1>
                <hr />
              </div>
            )}
            {props.children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
