import { Container, Row, Col, Button } from 'react-bootstrap';

const NotFoundPage = () => {
  return (
    <Container fluid className="d-flex vh-100 align-items-center justify-content-center bg-dark">
      <Row className="text-center">
        <Col>
          <h1 className="display-1 fw-bold text-light">404</h1>
          <p className=" fs-3 text-light">Page Not Found</p>
          <Button variant="outline-light" href="/">Torna all&apos;home</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
