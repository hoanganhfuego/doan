import { Redirect, Route } from 'umi';
import React, { useState } from 'react';
import Authorized from './Authorized';


const AuthorizedRoute = ({ component: Component, render, authority, redirectPath, ...rest }) => {
  const [auth, setAuth] = useState(false);
  function checkAuth() {
     if (localStorage.getItem('antd-pro-authority'=='admin'))
    {
      setAuth(true);
    }
    else{
      setAuth(false)
    }
  }
  return (
  <>
  <Authorized
  
    authority={authority}
    noMatch={
      <Route
        {...rest}
        render={() => (
          <Redirect
            to={{
              pathname: redirectPath,
            }}
          />
        )}
      />
    }
  >
    <Route {...rest} render={(props) => (Component ? <Component {...props} /> : render(props))} />
    {auth?<Redirect
            to={{
              pathname: "/",
              }}
            />:<Redirect
            to={{
              pathname: "/login",
              }}
            />}
  </Authorized>
  </>)
  };

export default AuthorizedRoute;
