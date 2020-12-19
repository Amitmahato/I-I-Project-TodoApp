import Axios from "axios";
import { getToken, removeUser } from "../auth/authentication";
// import { store } from "../../app/store";

const headersWithToken = (headers = {}) => ({
  ...headers,
  authorization: `Token ${getToken()}`,
});

const handleError = (error) => {
  if (error.response) {
    return Promise.reject({
      status: error.response.status,
      message:
        (error.response.data && error.response.data.message) ||
        error.response.statusText ||
        error.message,
      data: error.response.data,
    });
  }

  return Promise.reject({ message: error.message });
};

const request = (config, withToken) => {
  const finalConfig = withToken
    ? { ...config, headers: headersWithToken(config.headers) }
    : config;
  return Axios.request(finalConfig).catch((error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      // const { dispatch } = store;
      removeUser();
      // dispatch(push("/login"));
    } else {
      return handleError(error);
    }
  });
};

export const Get = (url, withToken = true, params = {}, headers = {}) => {
  const config = { url, params, method: "get" };
  return request(config, withToken);
};

export const Put = (url, data, withToken = true, params = {}, headers = {}) => {
  const config = { url, params, method: "put", data, headers };
  return request(config, withToken);
};

export const Patch = (
  url,
  data,
  withToken = true,
  params = {},
  headers = {}
) => {
  const config = { url, params, method: "patch", data, headers };
  return request(config, withToken);
};

export const Post = (
  url,
  data,
  withToken = true,
  params = {},
  headers = {}
) => {
  const config = { url, params, method: "post", data, headers };
  return request(config, withToken);
};

export const Delete = (url, withToken = true, params = {}, headers = {}) => {
  const config = { url, params, method: "delete", headers };
  return request(config, withToken);
};

const processOptions = (url, options) => {
  url = url + "?";
  Object.keys(options).forEach((option) => {
    url = url + `&${option}=${options[option]}`;
  });
  return encodeURI(url);
};

/**
 * supports crude queries that follow REST paradigm
 * @param resource
 */
export const api = (resource, rootUrl = "/api") => {
  const resourceUrl = `${rootUrl}/${resource.toLowerCase()}s`;
  return {
    get: async (id) => {
      return await Get(`${resourceUrl}/${id}`, true);
    },
    getAll: async (options) => {
      return await Get(processOptions(resourceUrl, options), true);
    },
    post: async (data) => {
      return await Post(`${resourceUrl}/`, data, true);
    },
    put: async (id, data) => {
      return await Put(`${resourceUrl}/${id}`, data, true);
    },
    delete: async (id) => {
      return await Delete(`${resourceUrl}/${id}`, true);
    },
  };
};
