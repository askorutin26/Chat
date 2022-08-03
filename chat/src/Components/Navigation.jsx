import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../Hooks/index.js';
import routes from '../routes.js';

const Navigation = () => {
  const { t } = useTranslation();
  const authContext = useAuthContext();
  const { loggedIn, logOut } = authContext;
  const { chatPage, loginPage } = routes;

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={chatPage()}>
          Hexlet Chat
        </Navbar.Brand>
        {loggedIn ? (
          <Button
            as={Link}
            to={loginPage()}
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              logOut();
            }}
          >
            {t('logOut')}
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};
export default Navigation;
