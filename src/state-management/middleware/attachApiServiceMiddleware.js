import { apiService } from "../../shared/services/apiService";

const attachApiServiceMiddleware = (store) => (next) => (action) => {
  // Attach the API service to the action
  // console.log('Attaching API service to action:', apiService);
  return next({
    ...action,
    apiClientService: apiService.getApiClientService(store),
  });
};

export default attachApiServiceMiddleware;