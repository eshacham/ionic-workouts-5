/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import { Observable } from "zen-observable-ts";
import { APIService, ModelReleaseFilterInput, ListReleasesQuery, GetFeatureQuery, ModelFeatureFilterInput, ListFeaturesQuery, OnCreateReleaseSubscription, OnUpdateReleaseSubscription, OnDeleteReleaseSubscription, OnCreateFeatureSubscription, OnUpdateFeatureSubscription, OnDeleteFeatureSubscription } from './API.service';

export type ListReleasesFullQuery = {
  __typename: "ModelReleaseConnection";
  items: Array<{
    __typename: "Release";
    id: string;
    name: string;
    version: string;
    features: {
      __typename: "ModelFeatureConnection";
      items: Array<{
        __typename: "Feature";
        id: string;
        name: string;
        description: string;
        enabled: boolean;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken: string | null;
};

@Injectable({
  providedIn: "root"
})
export class APIServiceExtended extends APIService {

  async ListReleasesFull(
    filter?: ModelReleaseFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListReleasesFullQuery> {
    const statement = `query ListReleases($filter: ModelReleaseFilterInput, $limit: Int, $nextToken: String) {
      listReleases(filter: $filter, limit: $limit, nextToken: $nextToken) {
        __typename
        items {
          __typename
          id
          name
          version
          features {
            __typename
            items {
              __typename
              name
              description
              enabled
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
    }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListReleasesFullQuery>response.data.listReleases;
  }

}
