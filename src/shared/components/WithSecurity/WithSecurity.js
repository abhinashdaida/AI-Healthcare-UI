import _ from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ErrorIcon from '@mui/icons-material/Error';
import {
  Alert,
  AppBar,
  Box,
  CircularProgress,
  Container,
  Toolbar,
  Typography
} from '@mui/material';

import { securitySelectors } from '@/state-management/modules/rootSelectors.js';
import { dispatchAuthenticate } from '@/state-management/modules/security/securityActions.js';

const LoadingOverlayManual = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          minWidth: 250,
          boxShadow: 5,
        }}
      >
        <CircularProgress />

        <Typography variant="h6">
          Loading...
        </Typography>
      </Box>
    </Box>
  );
};

const LoggedOut = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Alert severity="error">
        Session expired or unauthorized access.
      </Alert>
    </Container>
  );
};

const withSecurity = (ComponentToWrap) => {
  const AppLoader = (props) => {
    const dispatch = useDispatch();
    
    // Redux selectors
    const _isAuthenticated = useSelector(securitySelectors.getIsAuthenticated);
    
    const _isLoading = useSelector(
      state => securitySelectors.getIsLoading(state)
    );
    
    const _isError = useSelector(
      state => securitySelectors.getError(state)
    );
    
    // const openIdConfig = useSelector(
    //   state => globalConfigSelectors.getOpenIdConfig(state)
    // );
    
    // const isOpenIdConfigLoaded = useSelector(
    //   state => globalConfigSelectors.getIsOpenIdConfigLoaded(state)
    // );
    
    // const urls = useSelector(
    //   state => globalConfigSelectors.getURLs(state)
    // );

    // Authenticate on mount
    useEffect(() => {
      dispatch(dispatchAuthenticate());
    }, []);

    // Redirect for authentication
    // useEffect(() => {
    //   const scope =
    //     'openid profile csvfprofile csgappgroups:CBOA';


    //   if (
    //     isOpenIdConfigLoaded &&
    //     openIdConfig?.authorized
    //   ) {
    //     const href = `
    //       ${openIdConfig.authorizationEndpoint}
    //       ?client_id=${openIdConfig.clientId}
    //       &redirect_uri=${openIdConfig.redirectUri}
    //       &scope=${scope}
    //       &response_type=${openIdConfig.responseType}
    //     `;

    //     window.location.href = href.replace(/\s/g, '');
    //   }
    // }, []);

    // Error state
    if (_isError) {
      return <LoggedOut />;
    }

    // Loading state
    if (_isLoading) {
      return <LoadingOverlayManual />;
    }

    console.log('isAuthenticated:', _isAuthenticated);

    // Authenticated state
    if (
      _isAuthenticated 
      // isOpenIdConfigLoaded &&
      // openIdConfig?.authorized
    ) {
      return (
        <ComponentToWrap
          {..._.omit(props, [
            '_dispatchAuthenticate',
            '_isError',
          ])}
        />
      );
    }

    // Unauthorized view
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Healthcare Telemedicine 
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 5 }}>
          <Alert
            severity="error"
            icon={<ErrorIcon />}
            sx={{
              alignItems: 'center',
            }}
          >
            <Typography variant="body1">
              You do not have sufficient
              privileges to access this
              application or your session has
              expired.
            </Typography>

            {/* <Button
              variant="text"
              sx={{ mt: 2 }}
              onClick={() => {
                window.location.replace(
                  `${urls.uiURL}/rest`
                );
              }}
            >
              Refresh Session
            </Button> */}
          </Alert>
        </Container>
      </>
    );
  };


  return AppLoader;
};

export default withSecurity;