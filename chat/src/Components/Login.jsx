import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';

import routes from '../routes.js';
import { useAuthContext } from '../Hooks/index.js';

export default function Login() {
  const AuthContext = useAuthContext();

  const { logIn } = AuthContext;

  const [errorName, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { chatPage, signupPage } = routes;

  return (
    <Container bsPrefix="container-fluid h-100">
      <Container bsPrefix="row justify-content-center align-content-center h-100">
        <Container bsPrefix="col-12 col-md-8 col-xxl-6">
          <Container bsPrefix="card shadow-sm">
            <Container bsPrefix="card-body row p-5 justify-content-center">
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                onSubmit={(values, { setSubmitting }) => {
                  const path = routes.loginPath();
                  axios
                    .post(path, values)
                    .then((response) => {
                      const { data } = response;
                      const { token } = data;
                      setSubmitting(false);
                      setError('');
                      logIn(token, values.username);
                      navigate(chatPage());
                    })
                    .catch((error) => {
                      setError('authError');
                      console.log(error);
                      setSubmitting(false);
                    });
                }}
              >
                { ({
                  values, handleChange, handleSubmit, isSubmitting,
                }) => (
                  <Form
                    className="col-12 col-md-6 mt-3 mt-mb-0"
                    onSubmit={handleSubmit}
                  >
                    <h1 className="text-center mb-4">
                      { t('Login.logIn') }
                    </h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="text"
                        name="username"
                        id="username"
                        required
                        placeholder="your username"
                        onChange={handleChange}
                        value={values.username}
                      />
                      <Form.Label htmlFor="username">
                        { t('Login.username') }
                      </Form.Label>
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        name="password"
                        id="password"
                        required
                        placeholder="your password"
                        onChange={handleChange}
                        value={values.password}
                      />
                      <Form.Label htmlFor="password">
                        { t('Login.password') }
                      </Form.Label>
                    </Form.Group>

                    { errorName && (
                    <p className="text-danger">
                      { t(`loginErrors.${errorName}`) }
                    </p>
                    ) }
                    <Button
                      type="submit"
                      className="w-100 mb-3 "
                      disabled={isSubmitting}
                    >
                      { t('Login.logIn') }
                    </Button>
                  </Form>
                ) }
              </Formik>
            </Container>
            <Container bsPrefix="card-footer p-4">
              <Container bsPrefix="text-center">
                <span>
                  { `${t('SignupBlock.noProfile')}?` }
                  { ' ' }
                </span>
                <a href={signupPage()}>
                  { t('SignupBlock.signingUp') }
                </a>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
