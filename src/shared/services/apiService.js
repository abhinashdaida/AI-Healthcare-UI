import ApiClientService from "./ApiClientService";

const generateApiClientService = (baseURL, store) =>  ApiClientService(baseURL, store);   

export const apiService = {
  getApiClientService: (store) => generateApiClientService('https://jsonplaceholder.typicode.com', store),
};