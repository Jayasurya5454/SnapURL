import React from "react";
import backgroundImage from "../../assets/backgroundUrl.png"; // Ensure this path is correct
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Dashboard = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
      }}
    >
      <Container
        fluid
        className="text-white vh-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} 
      >
        <Row className="bg-success p-5 rounded shadow">
          <Col>
            <h3 className="text-center">Shorten Your URLs with SnapUrl</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Enter your long URL</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://your-long-url.com"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Custom Alias</Form.Label>
                <Form.Control type="text" placeholder="your-custom-alias" />
                <Form.Text className="text-muted">
                  Leave blank for random URL slug.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Row>
                  <Col>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="optional" />
                  </Col>
                  <Col>
                    <Form.Label>Max Clicks</Form.Label>
                    <Form.Control type="number" placeholder="optional" />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3">
              </Form.Group>
              <div className="text-center">
                <br></br>
                <Button variant="dark" type="submit" className="px-5">
                  Shorten
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;