/**
 * @format
 *
 * Smoke tests for the boilerplate tooling.
 * Full App mount is covered manually via android/ios run scripts.
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Text } from 'react-native';

test('jest and react-test-renderer are wired', async () => {
  let tree: ReactTestRenderer.ReactTestRenderer | undefined;

  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(<Text>RNBoilerplate</Text>);
  });

  expect(tree?.toJSON()).toBeTruthy();
});

test('package identity', () => {
  const pkg = require('../package.json') as { name: string };
  expect(pkg.name).toBe('RNBoilerplate');
});
