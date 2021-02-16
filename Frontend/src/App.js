import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Loader from './components/common/Loader'
import PrivateRoutes from './services/privateRoutes';
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ForgetPasswordPage = lazy(() => import('./pages/ForgetPasswordPage'));
const UserPage = lazy(() => import('./pages/UserPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));

function App() {

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            <Route exact path="/" component={SignUpPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/forget-password" component={ForgetPasswordPage} />
            <Route path="/reset-password" component={ResetPasswordPage} />
            <Route path="/books" component={PrivateRoutes(UserPage)} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
