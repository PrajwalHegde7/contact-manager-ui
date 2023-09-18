import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const authContext = useContext(AuthContext);
//   const { isAuthenticated, loading } = authContext;
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         !isAuthenticated && !loading ? (
//           <Navigate replace to='/login' />
//         ) : (
//           <Component {...props} />
//         )
//       }
//     />
//   );
// };


const PrivateRoute = ({ component: Component,children }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  if (!isAuthenticated && !loading) return <Navigate replace to="/login" />;
  else return children;
};

export default PrivateRoute;
