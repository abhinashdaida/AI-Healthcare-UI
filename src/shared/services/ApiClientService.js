import axios from 'axios';


const ApiClientService = (baseURL, token) => {

    const post = (url, data, config, returnPromise) => {
        let requestConfig

        const payload = {
            ...data,
        }
        if (token) {
            requestConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
        }
        else {
            requestConfig = {
                ...config,
                headers: { [token.headerKey]: token.value },
                Authorization: `Bearer ${token}`,
                ['Content-Type']: 'application/json',
                [origin]: `${window.location.origin}`,
            };
        }

        return returnPromise
        ?axios.post(`${baseURL}${url}`, payload, requestConfig) 
        : axios.post(`${baseURL}${url}`, payload, requestConfig);

    }

    return {
        post,
    };
};

export default ApiClientService;