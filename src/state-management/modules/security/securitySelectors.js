

import _ from "lodash";

export const getIsLoading = _.property("security.loading");
export const getError = _.property("security.error");
export const getIsAuthenticated = _.property("security.isAuthenticated");
// export const getOpenIdConfig = _.property("globalConfig.openIdConfig");
// export const getIsOpenIdConfigLoaded = _.property("globalConfig.isOpenIdConfigLoaded");
export const getURLs = _.property("globalConfig.urls");