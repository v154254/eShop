import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/container/Container';
import ROUTES from '../routes/routes';
import RegistrationForm from '../components/ui/registartionForm/RegistrationForm';

function Registration() {
  return (
    <section>
      <Container>
        <p style={{ marginTop: '20px' }}>
          Есть аккаунт?{' '}
          <Link className='button' to={ROUTES.LOGIN}>
            Login
          </Link>
        </p>
        <h2 style={{ display: 'inline-block', marginTop: '30px' }}>Registration</h2>
        <RegistrationForm />
      </Container>
    </section>
  );
}

export default Registration;
