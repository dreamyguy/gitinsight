// Environments
const hostname =
  typeof window === 'object' && window.location.hostname !== ''
    ? window.location.hostname
    : 'localhost';
const currentEnv = process.env.NODE_ENV;
const inDevelopment = process.env.NODE_ENV === 'development';
const inProduction = process.env.NODE_ENV === 'production';
const inTest = process.env.NODE_ENV === 'test';

// Modes and feature-togglers
const serverMode = 'graphql'; // json | graphql
const animateNumbers = true;
const animateNumbersDuration = 2000; // Duration of timeout, used for 'animateNumbers'
const animateNumbersInit = 10; // Initialize timeout for 'animateNumbers'
const showResponsiveGuide = false;
const githubOrg = 'netliferesearch';

// Ports
export const PORT_JSON_SERVER = '3000';
export const PORT_GRAPHQL_SERVER = '4000';
export const PORT_REACT_APP = '7777';
export const URL_BASE_DEV = `http://${hostname}`;

// Resolver: server port
export const serverPort = mode => {
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

// URLs
const hostnames = {
  prod: 'yolo.io',
  qa: 'qa.yolo.io',
  test: 'test.yolo.io',
  dev: 'localhost',
};
const apiUrl = {
  prod: 'https://yolo.io/api',
  qa: 'https://qa.yolo.io/api',
  test: 'https://test.yolo.io/api',
  dev: `${URL_BASE_DEV}:${serverPort(serverMode)}`,
};

// Resolver: full root request URL
export const requestRoot = mode => {
  let url = '';
  const theMode = mode || serverMode;
  switch (theMode) {
    case 'graphql':
      url = `${URL_BASE_DEV}:${serverPort('graphql')}`;
      break;
    case 'json':
      url = `${URL_BASE_DEV}:${serverPort('json')}`;
      break;
    default:
      // Syntax sugar, we default to 'json'
      url = `${URL_BASE_DEV}:${serverPort('json')}`;
      break;
  }
  return url;
};

// Resolver: set root request URL according to environment
const setApiUrl = host => {
  let envApiUrl = apiUrl.prod;
  let environment = 'development';
  try {
    switch (host) {
      case hostnames.test:
        console.warn('Setting environment to Test');
        envApiUrl = apiUrl.test;
        break;
      case hostnames.qa:
        console.warn('Setting environment to QA');
        environment = 'production';
        envApiUrl = apiUrl.qa;
        break;
      case hostnames.prod:
        environment = 'production';
        envApiUrl = apiUrl.prod;
        break;
      case hostnames.dev:
        // Reduce noise while testing
        if (currentEnv !== 'test') {
          console.log('Setting environment to local');
        }
        envApiUrl = !inDevelopment ? apiUrl.test : `${URL_BASE_DEV}:${serverPort(serverMode)}`;
        break;
      default:
        // Reduce noise while testing
        if (currentEnv !== 'test') {
          console.log('Setting environment to local');
        }
        envApiUrl = !inDevelopment ? apiUrl.test : `${URL_BASE_DEV}:${serverPort(serverMode)}`;
        break;
    }
    return {
      envApiUrl,
      environment,
    };
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const config = {
  animateNumbers,
  animateNumbersDuration,
  animateNumbersInit,
  currentEnv,
  githubOrg,
  hostname,
  hostnames,
  apiUrl,
  inDevelopment,
  inProduction,
  inTest,
  serverMode,
  setApiUrl,
  showResponsiveGuide,
};
