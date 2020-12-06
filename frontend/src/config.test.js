import { serverPort, config, requestRoot, serverMode } from './config';

describe('Test config', () => {
  describe('environments', () => {
    it('inProduction', () => {
      expect(config.inProduction).toEqual(false);
    });
    it('inDevelopment', () => {
      expect(config.inDevelopment).toEqual(false);
    });
    it('inTest', () => {
      expect(config.inTest).toEqual(true);
    });
    it('currentEnv', () => {
      expect(config.currentEnv).toEqual('test');
    });
  });
  describe('hostnames', () => {
    it('hostname', () => {
      expect(config.hostname).toEqual('localhost');
    });
    it('prod', () => {
      expect(config.hostnames.prod).toEqual('yolo.io');
    });
    it('qa', () => {
      expect(config.hostnames.qa).toEqual('qa.yolo.io');
    });
    it('test', () => {
      expect(config.hostnames.test).toEqual('test.yolo.io');
    });
    it('dev', () => {
      expect(config.hostnames.dev).toEqual('localhost');
    });
  });
  describe('apiUrl', () => {
    it('prod', () => {
      expect(config.apiUrl.prod).toEqual(
        'https://yolo.io/api',
      );
    });
    it('qa', () => {
      expect(config.apiUrl.qa).toEqual('https://qa.yolo.io/api');
    });
    it('test', () => {
      expect(config.apiUrl.test).toEqual(
        'https://test.yolo.io/api',
      );
    });
    describe('dev', () => {
      it(`server is set to ${serverMode}`, () => {
        expect(config.apiUrl.dev).toEqual(
          `http://${config.hostnames.dev}:${serverPort(serverMode)}`,
        );
      });
    });
  });
  describe('serverPort', () => {
    it('json', () => {
      expect(serverPort('json')).toEqual('3000');
    });
    it('graphql', () => {
      expect(serverPort('graphql')).toEqual('4000/graphql');
    });
  });
  describe('requestRoot', () => {
    it('json', () => {
      expect(requestRoot('json')).toEqual('http://localhost:3000');
    });
    it('graphql', () => {
      expect(requestRoot('graphql')).toEqual('http://localhost:4000/graphql');
    });
  });
});
