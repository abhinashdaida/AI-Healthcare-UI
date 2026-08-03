import React from 'react';
import PropTypes from 'prop-types';
// import queryString from 'query-string';

// import ExtendedMaturityUsers from 'constants/ExtendedMaturityUsers';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

const GlobalConfigView = ({
  isLoading,
  loadSorData,
  generateUserPermissions,
  location,
  children,
}) => {

  // Determine if SOO is passed in (used for Extended Maturity)
  // const sooId = queryString.parse(location.search).sooId;

  let sid = '';

  // if (sooId === ExtendedMaturityUsers.EXTENDED_CREDIT_USER) {
  //   sid = 'ccw';
  // } else if (sooId === ExtendedMaturityUsers.EXTENDED_MLM_USER) {
  //   sid = 'mlm';
  // } else if (sooId === ExtendedMaturityUsers.EXTENDED_CTL_USER) {
  //   sid = 'ctl';
  // } else {
  //   sid = sooId;
  // }

  loadSorData(sid);
  generateUserPermissions();

  return (
    <>
      {isLoading?.length > 0 ? (
        <LoadingOverlay />
      ) : (
        children
      )}
    </>
  );
};

GlobalConfigView.defaultProps = {
  children: null,
  loadSorData: () => {},
  generateUserPermissions: () => {},
};

GlobalConfigView.propTypes = {
  isLoading: PropTypes.instanceOf(Array).isRequired,
  loadSorData: PropTypes.func.isRequired,
  generateUserPermissions: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.instanceOf(Object),
  ]),
};

export default GlobalConfigView;