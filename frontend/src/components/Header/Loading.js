import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <Spinner animation="border" role="status" style={{ width: 50, height: 50 }}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loading;
