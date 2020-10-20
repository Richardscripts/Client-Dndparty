import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from './TokenService';

export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) =>
        TokenService.hasAuthToken() ? (
          <Component {...componentProps} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/register',
              state: { from: componentProps.location },
            }}
          />
        )
      }
    />
  );
}
