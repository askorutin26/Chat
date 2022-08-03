import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import routes from './routes';
import Chat from './Components/Chat.jsx';
import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';
import Empty from './Components/Empty.jsx';
import { AuthProvider } from './Context/Auth';
import { useAuthContext } from './Hooks';
import Navigation from './Components/Navigation';

const {
 chatPage, loginPage, signupPage, emptyPage
} = routes;
function PrivatePage({ children }) {
  const auth = useAuthContext();
  const { loggedIn } = auth;
  return loggedIn ? children : <Navigate to = {routes.loginPage()} />;
}
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className = "d-flex flex-column h-100">
          <Navigation />
          <Routes>
            <Route
              path = {chatPage()}
              element = {(
                <PrivatePage>
                  <Chat />
                </PrivatePage>
              )}
            />

            <Route path = {loginPage()} element = {<Login />} />
            <Route path = {signupPage()} element = {<Signup />} />
            <Route path = {emptyPage()} element = {<Empty />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
