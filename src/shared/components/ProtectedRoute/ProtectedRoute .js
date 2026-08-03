/* eslint-disable no-debugger */
import React from "react";
// import PropTypes from "prop-types";
import _ from "lodash";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

import {
    globalConfigSelectors,
    securitySelectors,
} from "state-management/modules/rootSelectors";

import { NotFound } from "cboa-ui-shared";

const ProtectedRoute = ({
  component,
  requiredAuthority,
  children,
  ...rest
}) => {
  // Redux selectors
  const authMap = useSelector(
    state => securitySelectors.getSystemViewAuthMap(state)
  );
  
  const selectedSystemView = useSelector(
    state => globalConfigSelectors.getSelectedSystemView(state)
  );

  const selectedSystemViewValue = selectedSystemView?.value;
  const systemViewAuthMap = authMap[selectedSystemViewValue];

  // Determine whether we are a switched route (content route)
  // or a Global Nav route (navigation item)
  const switchedRoute = component != null;

  let canRender;

  if (_.isEmpty(requiredAuthority)) {
    // No authorities required
    canRender = true;
  } else if (_.isEmpty(systemViewAuthMap)) {
    // User has no authorities
    canRender = false;
  } else {
    // Check user authorities against required authorities
    canRender = requiredAuthority.reduce(
      (acc, authority) => acc || systemViewAuthMap.includes(authority),
      false
    );
  }

  if (switchedRoute) {
    // Switched content route
    const ComponentToRender = canRender ? component : NotFound;

    return (
      <Route
        {...rest}
        component={ComponentToRender}
      />
    );
  }

  // Global Navigation route
  return canRender ? (
    <Route {...rest}>
      {children}
    </Route>
  ) : null;
};

// ProtectedRoute.propTypes = {
//   ...Route.propTypes,

//   requiredAuthority: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.arrayOf(PropTypes.string),
//   ]),

//   component: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.shape({}),
//   ]),

//   authMap: PropTypes.object,
//   selectedSystemView: PropTypes.object,
//   children: PropTypes.node,
// };

export default ProtectedRoute;