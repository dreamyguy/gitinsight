const hostname =
  typeof window === 'object' && window.location.hostname !== ''
    ? window.location.hostname
    : 'localhost';

const inDevelopment = process.env.NODE_ENV === 'development';
const inProduction = process.env.NODE_ENV === 'production';
const inTest = process.env.NODE_ENV === 'test';

export const serverMode = 'graphql'; // json | graphql

export const PORT_JSON_SERVER = '3000';
export const PORT_GRAPHQL_SERVER = '4000';
export const PORT_REACT_APP = '7777';
export const URL_BASE_DEV = `http://${hostname}`;

export const apiPortDev = mode => {
  let port = '';
  const theMode = mode || serverMode;
  switch (theMode) {
    case 'graphql':
      port = `${PORT_GRAPHQL_SERVER}/graphql`;
      break;
    case 'json':
      port = PORT_JSON_SERVER;
      break;
    default:
      // Syntax sugar, we default to 'json'
      port = PORT_JSON_SERVER;
      break;
  }
  return port;
};

export const requestRoot = mode => {
  let url = '';
  const theMode = mode || serverMode;
  switch (theMode) {
    case 'graphql':
      url = `${URL_BASE_DEV}:${apiPortDev('graphql')}`;
      break;
    case 'json':
      url = `${URL_BASE_DEV}:${apiPortDev('json')}`;
      break;
    default:
      // Syntax sugar, we default to 'json'
      url = `${URL_BASE_DEV}:${apiPortDev('json')}`;
      break;
  }
  return url;
};

export const config = {
  hostname,
  hostnames: {
    prod: 'yolo.io',
    qa: 'qa.yolo.io',
    test: 'test.yolo.io',
    dev: 'localhost',
  },
  apiUrl: {
    prod: 'https://yolo.io/api',
    qa: 'https://yolo.io/api',
    test: 'https://yolo.io/api',
    dev: `${URL_BASE_DEV}:${apiPortDev(serverMode)}`,
  },
  inDevelopment,
  inProduction,
  inTest,
};
