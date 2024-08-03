// import { expect, it } from 'vitest'
// import { getMobileSettingById } from './mobile-settings'
// import { createRequest, createResponse } from 'node-mocks-http';

// it('pass simplest possible test calling controller succesfully using typescript', () => {
//   const req = createRequest();
//     const res = createResponse();
//     console.log(getMobileSettingById, req, res)
//     expect(true).toBeTruthy();
// })

import type * as TestFunctions from './mobile-settings';
const { getMobileSettingById } = jest.requireActual<typeof TestFunctions>('./mobile-settings');

import type * as NodeMocksHttp from 'node-mocks-http';
const { createRequest, createResponse } = jest.requireActual<typeof NodeMocksHttp>('node-mocks-http');

it('fails the simplest possible test importing two modules succesfully using typescript', () => {
  const req = createRequest();
  const res = createResponse();
  console.log(getMobileSettingById, req, res)
  expect(true).toBeTruthy();
});