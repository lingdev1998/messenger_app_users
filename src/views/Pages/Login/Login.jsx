import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, FormFeedback, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { loginUser, logout } from '../../../reducers/authentication';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Formik } from "formik";
import * as Yup from "yup";
import ToastCommon from "../../Commons/ToastCommon";

const Login = (props) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.authentication);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableToast, setEnableToast] = useState(true);
  const [toastError, setToastError] = useState("");


  const handleSubmit = () => {
    var formData = {
      email : email,
      password:password
    }
    var name = formData['email'].substring(0, formData['email'].lastIndexOf("@"));
    var form = new FormData();
    // form.append("userName", formData.email);
    // form.append("password", formData.password);
    form.append("userName",name);
    form.append("password",password);
    dispatch(loginUser(form));
  }

  const initialValues = {
    email: "",
    password: ""
  };
  const validationSchema = function (values) {
    return Yup.object().shape({
      email: Yup.string()
      .min(6, `Username has to be at least  ${6} characters!`)
      .required("Username is required!"),
      password: Yup.string()
        .min(6, `Password has to be at least ${6} characters!`)
        .required("Password is required!"),
    });
  };

  const validate = getValidationSchema => {
    return values => {
      values = {
        email: email,
        password: password
      };
      const validationSchema = getValidationSchema(values);
      try {
        validationSchema.validateSync(values, { abortEarly: false });
        return {};
      } catch (error) {
        return getErrorsFromValidationError(error);
      }
    };
  };
  const getErrorsFromValidationError = validationError => {
    const FIRST_ERROR = 0;
    return validationError.inner.reduce((errors, error) => {
      return {
        ...errors,
        [error.path]: error.errors[FIRST_ERROR]
      };
    }, {});
  };

  useEffect(() => {
    handleRedirect();
  }, [state.isAuthenticated, state.errorMessage])

  const handleRedirect = () => {
    if (state.isAuthenticated) {
      props.history.push('/dashboard');
    } else {
      if (state.errorMessage) {
        setEnableToast(false);
        setToastError(state.errorMessage);
        setTimeout(() => {
          setEnableToast(true);
        }, 2000);
      }
    }
  }
  return (
    <div className="app flex-row align-items-center">
      <ToastCommon title="Error" body={toastError} hidden={enableToast} />
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Formik
                    initialValues={initialValues}
                    validate={validate(validationSchema)}
                    onSubmit={handleSubmit}
                    render={({
                      errors,
                      touched,
                      handleBlur,
                      handleSubmit,
                      isSubmitting
                    }) => (
                        <Form onSubmit={handleSubmit} noValidate>
                          <h1>Login</h1>
                          <p className="text-muted">Sign In to your account</p>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              autoFocus={true}
                              valid={!errors.email}
                              invalid={touched.email && !!errors.email}
                              required
                              onBlur={handleBlur}
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                console.log(email);
                              }}
                              placeholder="User Name..."
                              autoComplete="username"
                            />
                            <FormFeedback>{errors.email}</FormFeedback>
                          </InputGroup>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="password"
                              required
                              valid={!errors.password}
                              invalid={touched.password && !!errors.password}
                              onBlur={handleBlur}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Password"
                              autoComplete="current-password"
                            />
                            <FormFeedback>{errors.password}</FormFeedback>
                          </InputGroup>
                          <Row>
                            <Col xs="6">
                              <Button
                                color="primary"
                                type="submit"
                                className="px-4"
                              >Login</Button>
                            </Col>
                            <Col xs="6" className="text-right">
                              <Button color="link" className="px-0">Forgot password?</Button>
                            </Col>
                          </Row>
                        </Form>
                      )} />
                </CardBody>
              </Card>
              <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
}


export default Login;
