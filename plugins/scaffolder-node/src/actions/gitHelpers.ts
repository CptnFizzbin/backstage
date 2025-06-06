/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Git } from '../scm';
import { LoggerService } from '@backstage/backend-plugin-api';

/**
 * @public
 */
export async function initRepoAndPush(input: {
  dir: string;
  remoteUrl: string;
  // For use cases where token has to be used with Basic Auth
  // it has to be provided as password together with a username
  // which may be a fixed value defined by the provider.
  auth: { username: string; password: string } | { token: string };
  logger: LoggerService;
  defaultBranch?: string;
  commitMessage?: string;
  gitAuthorInfo?: { name?: string; email?: string };
  signingKey?: string;
}): Promise<{ commitHash: string }> {
  const {
    dir,
    remoteUrl,
    auth,
    logger,
    defaultBranch = 'master',
    commitMessage = 'Initial commit',
    gitAuthorInfo,
    signingKey,
  } = input;
  const git = Git.fromAuth({
    ...auth,
    logger,
  });

  await git.init({
    dir,
    defaultBranch,
  });

  await git.add({ dir, filepath: '.' });

  // use provided info if possible, otherwise use fallbacks
  const authorInfo = {
    name: gitAuthorInfo?.name ?? 'Scaffolder',
    email: gitAuthorInfo?.email ?? 'scaffolder@backstage.io',
  };

  const commitHash = await git.commit({
    dir,
    message: commitMessage,
    author: authorInfo,
    committer: authorInfo,
    signingKey,
  });

  await git.push({
    dir,
    remote: 'origin',
    url: remoteUrl,
  });

  return { commitHash };
}

/**
 * @public
 */
export async function commitAndPushRepo(input: {
  dir: string;
  // For use cases where token has to be used with Basic Auth
  // it has to be provided as password together with a username
  // which may be a fixed value defined by the provider.
  auth: { username: string; password: string } | { token: string };
  logger: LoggerService;
  commitMessage: string;
  gitAuthorInfo?: { name?: string; email?: string };
  branch?: string;
  remoteRef?: string;
  signingKey?: string;
}): Promise<{ commitHash: string }> {
  const {
    dir,
    auth,
    logger,
    commitMessage,
    gitAuthorInfo,
    branch = 'master',
    remoteRef,
    signingKey,
  } = input;

  const git = Git.fromAuth({
    ...auth,
    logger,
  });

  await git.fetch({ dir });
  await git.checkout({ dir, ref: branch });
  await git.add({ dir, filepath: '.' });

  // use provided info if possible, otherwise use fallbacks
  const authorInfo = {
    name: gitAuthorInfo?.name ?? 'Scaffolder',
    email: gitAuthorInfo?.email ?? 'scaffolder@backstage.io',
  };

  const commitHash = await git.commit({
    dir,
    message: commitMessage,
    author: authorInfo,
    committer: authorInfo,
    signingKey,
  });

  await git.push({
    dir,
    remote: 'origin',
    remoteRef: remoteRef ?? `refs/heads/${branch}`,
  });

  return { commitHash };
}

/**
 * @public
 */
export async function cloneRepo(options: {
  url: string;
  dir: string;
  // For use cases where token has to be used with Basic Auth
  // it has to be provided as password together with a username
  // which may be a fixed value defined by the provider.
  auth: { username: string; password: string } | { token: string };
  logger?: LoggerService | undefined;
  ref?: string | undefined;
  depth?: number | undefined;
  noCheckout?: boolean | undefined;
}): Promise<void> {
  const { url, dir, auth, logger, ref, depth, noCheckout } = options;

  const git = Git.fromAuth({
    ...auth,
    logger,
  });

  await git.clone({ url, dir, ref, depth, noCheckout });
}

/**
 * @public
 */
export async function createBranch(options: {
  dir: string;
  ref: string;
  // For use cases where token has to be used with Basic Auth
  // it has to be provided as password together with a username
  // which may be a fixed value defined by the provider.
  auth: { username: string; password: string } | { token: string };
  logger?: LoggerService | undefined;
}): Promise<void> {
  const { dir, ref, auth, logger } = options;
  const git = Git.fromAuth({
    ...auth,
    logger,
  });

  await git.branch({ dir, ref });
}

/**
 * @public
 */
export async function addFiles(options: {
  dir: string;
  filepath: string;
  // For use cases where token has to be used with Basic Auth
  // it has to be provided as password together with a username
  // which may be a fixed value defined by the provider.
  auth: { username: string; password: string } | { token: string };
  logger?: LoggerService | undefined;
}): Promise<void> {
  const { dir, filepath, auth, logger } = options;
  const git = Git.fromAuth({
    ...auth,
    logger,
  });

  await git.add({ dir, filepath });
}

/**
 * @public
 */
export async function commitAndPushBranch(options: {
  dir: string;
  // For use cases where token has to be used with Basic Auth
  // it has to be provided as password together with a username
  // which may be a fixed value defined by the provider.
  auth: { username: string; password: string } | { token: string };
  logger?: LoggerService | undefined;
  commitMessage: string;
  gitAuthorInfo?: { name?: string; email?: string };
  branch?: string;
  remoteRef?: string;
  remote?: string;
  signingKey?: string;
}): Promise<{ commitHash: string }> {
  const {
    dir,
    auth,
    logger,
    commitMessage,
    gitAuthorInfo,
    branch = 'master',
    remoteRef,
    remote = 'origin',
    signingKey,
  } = options;
  const git = Git.fromAuth({
    ...auth,
    logger,
  });

  // use provided info if possible, otherwise use fallbacks
  const authorInfo = {
    name: gitAuthorInfo?.name ?? 'Scaffolder',
    email: gitAuthorInfo?.email ?? 'scaffolder@backstage.io',
  };

  const commitHash = await git.commit({
    dir,
    message: commitMessage,
    author: authorInfo,
    committer: authorInfo,
    signingKey,
  });

  await git.push({
    dir,
    remote,
    remoteRef: remoteRef ?? `refs/heads/${branch}`,
  });

  return { commitHash };
}
