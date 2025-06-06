## API Report File for "@backstage/plugin-scaffolder-backend-module-bitbucket"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
import { BackendFeature } from '@backstage/backend-plugin-api';
import * as bitbucketCloud from '@backstage/plugin-scaffolder-backend-module-bitbucket-cloud';
import * as bitbucketServer from '@backstage/plugin-scaffolder-backend-module-bitbucket-server';
import { Config } from '@backstage/config';
import { ScmIntegrationRegistry } from '@backstage/integration';
import { TemplateAction } from '@backstage/plugin-scaffolder-node';

// @public @deprecated
const bitbucketModule: BackendFeature;
export default bitbucketModule;

// @public @deprecated (undocumented)
export const createBitbucketPipelinesRunAction: (options: {
  integrations: ScmIntegrationRegistry;
}) => TemplateAction<
  {
    workspace: string;
    repo_slug: string;
    body?:
      | {
          target?:
            | {
                type?: string | undefined;
                source?: string | undefined;
                selector?:
                  | {
                      type: string;
                      pattern: string;
                    }
                  | undefined;
                pull_request?:
                  | {
                      id: string;
                    }
                  | undefined;
                commit?:
                  | {
                      type: string;
                      hash: string;
                    }
                  | undefined;
                destination?: string | undefined;
                ref_name?: string | undefined;
                ref_type?: string | undefined;
                destination_commit?:
                  | {
                      hash: string;
                    }
                  | undefined;
              }
            | undefined;
          variables?:
            | {
                key: string;
                value: string;
                secured: boolean;
              }[]
            | undefined;
        }
      | undefined;
    token?: string | undefined;
  },
  {
    buildNumber?: number | undefined;
    repoUrl?: string | undefined;
    pipelinesUrl?: string | undefined;
  },
  'v2'
>;

// @public @deprecated
export function createPublishBitbucketAction(options: {
  integrations: ScmIntegrationRegistry;
  config: Config;
}): TemplateAction<
  {
    repoUrl: string;
    description?: string | undefined;
    repoVisibility?: 'private' | 'public' | undefined;
    defaultBranch?: string | undefined;
    sourcePath?: string | undefined;
    enableLFS?: boolean | undefined;
    token?: string | undefined;
    gitCommitMessage?: string | undefined;
    gitAuthorName?: string | undefined;
    gitAuthorEmail?: string | undefined;
    signCommit?: boolean | undefined;
  },
  {
    remoteUrl?: string | undefined;
    repoContentsUrl?: string | undefined;
    commitHash?: string | undefined;
  },
  'v2'
>;

// @public @deprecated (undocumented)
export const createPublishBitbucketCloudAction: typeof bitbucketCloud.createPublishBitbucketCloudAction;

// @public @deprecated (undocumented)
export const createPublishBitbucketServerAction: typeof bitbucketServer.createPublishBitbucketServerAction;

// @public @deprecated (undocumented)
export const createPublishBitbucketServerPullRequestAction: typeof bitbucketServer.createPublishBitbucketServerPullRequestAction;
```
