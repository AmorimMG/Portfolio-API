import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class GithubService {
  private readonly githubApiUrl = 'https://api.github.com/graphql';
  private readonly githubToken = process.env.GITHUB_TOKEN;

  constructor(private readonly httpService: HttpService) {}

  async getUserCommits(username: string): Promise<any[]> {
    let commits = [];

    try {
      const headers = {
        Authorization: `bearer ${this.githubToken}`,
      };

      // Fetch repositories first
      const repositoriesQuery = `
        query GetUserRepositories($username: String!) {
          user(login: $username) {
            repositories(first: 100, orderBy: { field: CREATED_AT, direction: DESC }) {
              nodes {
                name
                defaultBranchRef {
                  name
                }
                refs(first: 10, refPrefix: "refs/heads/") {
                  nodes {
                    name
                    target {
                      ... on Commit {
                        history(first: 100, author: { emails: ["gabriel._amorim@hotmail.com"] }) {
                          pageInfo {
                            hasNextPage
                            endCursor
                          }
                          edges {
                            node {
                              committedDate
                              message
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const repositoriesVariables = { username };
      const repositoriesResponse = await firstValueFrom(
        this.httpService.post(
          this.githubApiUrl,
          { query: repositoriesQuery, variables: repositoriesVariables },
          { headers },
        ),
      );

      if (
        repositoriesResponse.data &&
        repositoriesResponse.data.data &&
        repositoriesResponse.data.data.user
      ) {
        const repositories =
          repositoriesResponse.data.data.user.repositories.nodes;

        for (const repo of repositories) {
          for (const ref of repo.refs.nodes) {
            if (!ref.target) {
              console.warn(
                `Skipping repository ${repo.name} branch ${ref.name}: No commit history found`,
              );
              continue;
            }

            let hasNextPage = true;
            let cursor = null;

            while (hasNextPage) {
              const historyQuery = `
                query GetCommitHistory($username: String!, $repoName: String!, $branchName: String!, $cursor: String) {
                  repository(owner: $username, name: $repoName) {
                    ref(qualifiedName: $branchName) {
                      target {
                        ... on Commit {
                          history(first: 100, after: $cursor, author: { emails: ["gabriel._amorim@hotmail.com"] }) {
                            pageInfo {
                              hasNextPage
                              endCursor
                            }
                            edges {
                              node {
                                committedDate
                                message
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              `;

              const historyVariables = {
                username,
                repoName: repo.name,
                branchName: ref.name,
                cursor,
              };
              const historyResponse = await firstValueFrom(
                this.httpService.post(
                  this.githubApiUrl,
                  { query: historyQuery, variables: historyVariables },
                  { headers },
                ),
              );

              if (
                historyResponse.data &&
                historyResponse.data.data &&
                historyResponse.data.data.repository
              ) {
                const history =
                  historyResponse.data.data.repository.ref?.target?.history;

                if (history) {
                  const repoCommits = history.edges.map((edge) => ({
                    committedDate: edge.node.committedDate,
                    message: edge.node.message,
                  }));

                  commits.push({
                    repository: repo.name,
                    branch: ref.name,
                    defaultBranch: repo.defaultBranchRef.name,
                    commits: repoCommits,
                  });

                  if (history.pageInfo.hasNextPage) {
                    hasNextPage = true;
                    cursor = history.pageInfo.endCursor;
                  } else {
                    hasNextPage = false;
                  }
                } else {
                  console.warn(
                    `No commit history found for repository ${repo.name} branch ${ref.name}`,
                  );
                }
              } else {
                console.error(
                  'Unexpected API response structure:',
                  historyResponse.data,
                );
                throw new Error('Unexpected API response structure');
              }
            }
          }
        }
      } else {
        console.error(
          'Unexpected API response structure:',
          repositoriesResponse.data,
        );
        throw new Error('Unexpected API response structure');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error making API request',
          error.response?.data || error.message,
        );
      } else {
        console.error('Error processing data', error.message);
      }
      throw error; // Re-throw the error to ensure it's not silently swallowed
    }

    return commits;
  }
}
