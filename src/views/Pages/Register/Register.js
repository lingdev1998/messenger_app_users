import React, { Component, useState } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router';
export const Register = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isRegisted, setIsRegisted] = useState(false);
  const handleSubmit = () => {
    if (password !== repeatPassword) {
      return;
    }
    else {
      if (userName == "" || password == "") return
      var formData = new FormData();
      formData.append("userName", userName);
      formData.append("password", password);
      axios.post("/authentication/registration", formData).then(response => setIsRegisted(true)).catch(err => console.log(err));
    }
  }


  return (
    <>
      {isRegisted ? <Redirect to="/Login" /> : (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="9" lg="7" xl="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <Form>
                      <h1>Register</h1>
                      <p className="text-muted">Create your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" onChange={(e) => setUserName(e.target.value)} />
                      </InputGroup>
                      {/* <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" />
                    </InputGroup> */}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Repeat password" autoComplete="new-password" onChange={(e) => setRepeatPassword(e.target.value)} />
                      </InputGroup>
                      <Button color="success" onClick={() => handleSubmit()} block>Create Account</Button>
                    </Form>
                  </CardBody>
                  <CardFooter className="p-4">
                    <Row>
                      <Col xs="12" sm="6">
                        {/* <Button className="btn-facebook mb-1" block><span>facebook</span></Button> */}
                      </Col>
                      <Col xs="12" sm="6">
                        {/* <Button className="btn-twitter mb-1" block><span>twitter</span></Button> */}
                      </Col>
                    </Row>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )
      }
    </>
  );

}

export default Register;
