/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import { Observable } from "zen-observable-ts";

export type CreateReleaseInput = {
  id?: string | null;
  order: number;
  name: string;
  version: string;
};

export type ModelReleaseConditionInput = {
  order?: ModelIntInput | null;
  name?: ModelStringInput | null;
  version?: ModelStringInput | null;
  and?: Array<ModelReleaseConditionInput | null> | null;
  or?: Array<ModelReleaseConditionInput | null> | null;
  not?: ModelReleaseConditionInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type UpdateReleaseInput = {
  id: string;
  order?: number | null;
  name?: string | null;
  version?: string | null;
};

export type DeleteReleaseInput = {
  id?: string | null;
};

export type CreateFeatureInput = {
  id?: string | null;
  order: number;
  name: string;
  description: string;
  releaseID: string;
  enabled?: boolean | null;
};

export type ModelFeatureConditionInput = {
  order?: ModelIntInput | null;
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  releaseID?: ModelIDInput | null;
  enabled?: ModelBooleanInput | null;
  and?: Array<ModelFeatureConditionInput | null> | null;
  or?: Array<ModelFeatureConditionInput | null> | null;
  not?: ModelFeatureConditionInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type UpdateFeatureInput = {
  id: string;
  order?: number | null;
  name?: string | null;
  description?: string | null;
  releaseID?: string | null;
  enabled?: boolean | null;
};

export type DeleteFeatureInput = {
  id?: string | null;
};

export type ModelReleaseFilterInput = {
  id?: ModelIDInput | null;
  order?: ModelIntInput | null;
  name?: ModelStringInput | null;
  version?: ModelStringInput | null;
  and?: Array<ModelReleaseFilterInput | null> | null;
  or?: Array<ModelReleaseFilterInput | null> | null;
  not?: ModelReleaseFilterInput | null;
};

export type ModelFeatureFilterInput = {
  id?: ModelIDInput | null;
  order?: ModelIntInput | null;
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  releaseID?: ModelIDInput | null;
  enabled?: ModelBooleanInput | null;
  and?: Array<ModelFeatureFilterInput | null> | null;
  or?: Array<ModelFeatureFilterInput | null> | null;
  not?: ModelFeatureFilterInput | null;
};

export type CreateReleaseMutation = {
  __typename: "Release";
  id: string;
  order: number;
  name: string;
  version: string;
  features: {
    __typename: "ModelFeatureConnection";
    items: Array<{
      __typename: "Feature";
      id: string;
      order: number;
      name: string;
      description: string;
      releaseID: string;
      enabled: boolean | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateReleaseMutation = {
  __typename: "Release";
  id: string;
  order: number;
  name: string;
  version: string;
  features: {
    __typename: "ModelFeatureConnection";
    items: Array<{
      __typename: "Feature";
      id: string;
      order: number;
      name: string;
      description: string;
      releaseID: string;
      enabled: boolean | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteReleaseMutation = {
  __typename: "Release";
  id: string;
  order: number;
  name: string;
  version: string;
  features: {
    __typename: "ModelFeatureConnection";
    items: Array<{
      __typename: "Feature";
      id: string;
      order: number;
      name: string;
      description: string;
      releaseID: string;
      enabled: boolean | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateFeatureMutation = {
  __typename: "Feature";
  id: string;
  order: number;
  name: string;
  description: string;
  releaseID: string;
  enabled: boolean | null;
  release: {
    __typename: "Release";
    id: string;
    order: number;
    name: string;
    version: string;
    features: {
      __typename: "ModelFeatureConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type UpdateFeatureMutation = {
  __typename: "Feature";
  id: string;
  order: number;
  name: string;
  description: string;
  releaseID: string;
  enabled: boolean | null;
  release: {
    __typename: "Release";
    id: string;
    order: number;
    name: string;
    version: string;
    features: {
      __typename: "ModelFeatureConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type DeleteFeatureMutation = {
  __typename: "Feature";
  id: string;
  order: number;
  name: string;
  description: string;
  releaseID: string;
  enabled: boolean | null;
  release: {
    __typename: "Release";
    id: string;
    order: number;
    name: string;
    version: string;
    features: {
      __typename: "ModelFeatureConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type GetReleaseQuery = {
  __typename: "Release";
  id: string;
  order: number;
  name: string;
  version: string;
  features: {
    __typename: "ModelFeatureConnection";
    items: Array<{
      __typename: "Feature";
      id: string;
      order: number;
      name: string;
      description: string;
      releaseID: string;
      enabled: boolean | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListReleasesQuery = {
  __typename: "ModelReleaseConnection";
  items: Array<{
    __typename: "Release";
    id: string;
    order: number;
    name: string;
    version: string;
    features: {
      __typename: "ModelFeatureConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken: string | null;
};

export type GetFeatureQuery = {
  __typename: "Feature";
  id: string;
  order: number;
  name: string;
  description: string;
  releaseID: string;
  enabled: boolean | null;
  release: {
    __typename: "Release";
    id: string;
    order: number;
    name: string;
    version: string;
    features: {
      __typename: "ModelFeatureConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type ListFeaturesQuery = {
  __typename: "ModelFeatureConnection";
  items: Array<{
    __typename: "Feature";
    id: string;
    order: number;
    name: string;
    description: string;
    releaseID: string;
    enabled: boolean | null;
    release: {
      __typename: "Release";
      id: string;
      order: number;
      name: string;
      version: string;
      createdAt: string;
      updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateReleaseSubscription = {
  __typename: "Release";
  id: string;
  order: number;
  name: string;
  version: string;
  features: {
    __typename: "ModelFeatureConnection";
    items: Array<{
      __typename: "Feature";
      id: string;
      order: number;
      name: string;
      description: string;
      releaseID: string;
      enabled: boolean | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateReleaseSubscription = {
  __typename: "Release";
  id: string;
  order: number;
  name: string;
  version: string;
  features: {
    __typename: "ModelFeatureConnection";
    items: Array<{
      __typename: "Feature";
      id: string;
      order: number;
      name: string;
      description: string;
      releaseID: string;
      enabled: boolean | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteReleaseSubscription = {
  __typename: "Release";
  id: string;
  order: number;
  name: string;
  version: string;
  features: {
    __typename: "ModelFeatureConnection";
    items: Array<{
      __typename: "Feature";
      id: string;
      order: number;
      name: string;
      description: string;
      releaseID: string;
      enabled: boolean | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateFeatureSubscription = {
  __typename: "Feature";
  id: string;
  order: number;
  name: string;
  description: string;
  releaseID: string;
  enabled: boolean | null;
  release: {
    __typename: "Release";
    id: string;
    order: number;
    name: string;
    version: string;
    features: {
      __typename: "ModelFeatureConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateFeatureSubscription = {
  __typename: "Feature";
  id: string;
  order: number;
  name: string;
  description: string;
  releaseID: string;
  enabled: boolean | null;
  release: {
    __typename: "Release";
    id: string;
    order: number;
    name: string;
    version: string;
    features: {
      __typename: "ModelFeatureConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteFeatureSubscription = {
  __typename: "Feature";
  id: string;
  order: number;
  name: string;
  description: string;
  releaseID: string;
  enabled: boolean | null;
  release: {
    __typename: "Release";
    id: string;
    order: number;
    name: string;
    version: string;
    features: {
      __typename: "ModelFeatureConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateRelease(
    input: CreateReleaseInput,
    condition?: ModelReleaseConditionInput
  ): Promise<CreateReleaseMutation> {
    const statement = `mutation CreateRelease($input: CreateReleaseInput!, $condition: ModelReleaseConditionInput) {
        createRelease(input: $input, condition: $condition) {
          __typename
          id
          order
          name
          version
          features {
            __typename
            items {
              __typename
              id
              order
              name
              description
              releaseID
              enabled
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateReleaseMutation>response.data.createRelease;
  }
  async UpdateRelease(
    input: UpdateReleaseInput,
    condition?: ModelReleaseConditionInput
  ): Promise<UpdateReleaseMutation> {
    const statement = `mutation UpdateRelease($input: UpdateReleaseInput!, $condition: ModelReleaseConditionInput) {
        updateRelease(input: $input, condition: $condition) {
          __typename
          id
          order
          name
          version
          features {
            __typename
            items {
              __typename
              id
              order
              name
              description
              releaseID
              enabled
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateReleaseMutation>response.data.updateRelease;
  }
  async DeleteRelease(
    input: DeleteReleaseInput,
    condition?: ModelReleaseConditionInput
  ): Promise<DeleteReleaseMutation> {
    const statement = `mutation DeleteRelease($input: DeleteReleaseInput!, $condition: ModelReleaseConditionInput) {
        deleteRelease(input: $input, condition: $condition) {
          __typename
          id
          order
          name
          version
          features {
            __typename
            items {
              __typename
              id
              order
              name
              description
              releaseID
              enabled
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteReleaseMutation>response.data.deleteRelease;
  }
  async CreateFeature(
    input: CreateFeatureInput,
    condition?: ModelFeatureConditionInput
  ): Promise<CreateFeatureMutation> {
    const statement = `mutation CreateFeature($input: CreateFeatureInput!, $condition: ModelFeatureConditionInput) {
        createFeature(input: $input, condition: $condition) {
          __typename
          id
          order
          name
          description
          releaseID
          enabled
          release {
            __typename
            id
            order
            name
            version
            features {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateFeatureMutation>response.data.createFeature;
  }
  async UpdateFeature(
    input: UpdateFeatureInput,
    condition?: ModelFeatureConditionInput
  ): Promise<UpdateFeatureMutation> {
    const statement = `mutation UpdateFeature($input: UpdateFeatureInput!, $condition: ModelFeatureConditionInput) {
        updateFeature(input: $input, condition: $condition) {
          __typename
          id
          order
          name
          description
          releaseID
          enabled
          release {
            __typename
            id
            order
            name
            version
            features {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateFeatureMutation>response.data.updateFeature;
  }
  async DeleteFeature(
    input: DeleteFeatureInput,
    condition?: ModelFeatureConditionInput
  ): Promise<DeleteFeatureMutation> {
    const statement = `mutation DeleteFeature($input: DeleteFeatureInput!, $condition: ModelFeatureConditionInput) {
        deleteFeature(input: $input, condition: $condition) {
          __typename
          id
          order
          name
          description
          releaseID
          enabled
          release {
            __typename
            id
            order
            name
            version
            features {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteFeatureMutation>response.data.deleteFeature;
  }
  async GetRelease(id: string): Promise<GetReleaseQuery> {
    const statement = `query GetRelease($id: ID!) {
        getRelease(id: $id) {
          __typename
          id
          order
          name
          version
          features {
            __typename
            items {
              __typename
              id
              order
              name
              description
              releaseID
              enabled
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetReleaseQuery>response.data.getRelease;
  }
  async ListReleases(
    filter?: ModelReleaseFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListReleasesQuery> {
    const statement = `query ListReleases($filter: ModelReleaseFilterInput, $limit: Int, $nextToken: String) {
        listReleases(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            order
            name
            version
            features {
              __typename
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
    return <ListReleasesQuery>response.data.listReleases;
  }
  async GetFeature(id: string): Promise<GetFeatureQuery> {
    const statement = `query GetFeature($id: ID!) {
        getFeature(id: $id) {
          __typename
          id
          order
          name
          description
          releaseID
          enabled
          release {
            __typename
            id
            order
            name
            version
            features {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetFeatureQuery>response.data.getFeature;
  }
  async ListFeatures(
    filter?: ModelFeatureFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListFeaturesQuery> {
    const statement = `query ListFeatures($filter: ModelFeatureFilterInput, $limit: Int, $nextToken: String) {
        listFeatures(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            order
            name
            description
            releaseID
            enabled
            release {
              __typename
              id
              order
              name
              version
              createdAt
              updatedAt
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
    return <ListFeaturesQuery>response.data.listFeatures;
  }
  OnCreateReleaseListener: Observable<
    OnCreateReleaseSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateRelease {
        onCreateRelease {
          __typename
          id
          order
          name
          version
          features {
            __typename
            items {
              __typename
              id
              order
              name
              description
              releaseID
              enabled
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<OnCreateReleaseSubscription>;

  OnUpdateReleaseListener: Observable<
    OnUpdateReleaseSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateRelease {
        onUpdateRelease {
          __typename
          id
          order
          name
          version
          features {
            __typename
            items {
              __typename
              id
              order
              name
              description
              releaseID
              enabled
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<OnUpdateReleaseSubscription>;

  OnDeleteReleaseListener: Observable<
    OnDeleteReleaseSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteRelease {
        onDeleteRelease {
          __typename
          id
          order
          name
          version
          features {
            __typename
            items {
              __typename
              id
              order
              name
              description
              releaseID
              enabled
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<OnDeleteReleaseSubscription>;

  OnCreateFeatureListener: Observable<
    OnCreateFeatureSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateFeature {
        onCreateFeature {
          __typename
          id
          order
          name
          description
          releaseID
          enabled
          release {
            __typename
            id
            order
            name
            version
            features {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<OnCreateFeatureSubscription>;

  OnUpdateFeatureListener: Observable<
    OnUpdateFeatureSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateFeature {
        onUpdateFeature {
          __typename
          id
          order
          name
          description
          releaseID
          enabled
          release {
            __typename
            id
            order
            name
            version
            features {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<OnUpdateFeatureSubscription>;

  OnDeleteFeatureListener: Observable<
    OnDeleteFeatureSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteFeature {
        onDeleteFeature {
          __typename
          id
          order
          name
          description
          releaseID
          enabled
          release {
            __typename
            id
            order
            name
            version
            features {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<OnDeleteFeatureSubscription>;
}
