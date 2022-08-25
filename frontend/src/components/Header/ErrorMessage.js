import Alert from "react-bootstrap/Alert";

function ErrorMessage({ variant = "info", children }) {
  return (
    <Alert variant={variant}>
      <strong>{children}</strong>
    </Alert>
  );
}

export default ErrorMessage;
