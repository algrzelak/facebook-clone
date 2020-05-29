/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */

import * as Context from "../context"
import { core, connectionPluginCore } from "@nexus/schema"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    upload<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "Upload";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    upload<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Upload";
    connectionField<FieldName extends string>(
            fieldName: FieldName, 
            config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName> 
          ): void
  }
}
declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  FriendStatusWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  PostWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  UserWhereUniqueInput: { // input type
    email?: string | null; // String
    id?: number | null; // Int
  }
}

export interface NexusGenEnums {
  Gender: "FEMALE" | "MALE" | "OTHER"
}

export interface NexusGenRootTypes {
  File: { // root type
    encoding: string; // String!
    filename: string; // String!
    id: string; // ID!
    mimetype: string; // String!
    url: string; // String!
  }
  FriendStatus: { // root type
    fromUserId: number; // Int!
    id: number; // Int!
    responseTime?: any | null; // DateTime
    sentTime: any; // DateTime!
    statusId: number; // Int!
    toUserId: number; // Int!
  }
  Mutation: {};
  PageInfo: { // root type
    endCursor: number; // Int!
    hasNextPage: boolean; // Boolean!
  }
  Post: { // root type
    content?: string | null; // String
    createdAt: any; // DateTime!
    id: number; // Int!
  }
  PostConnection: { // root type
    edges: NexusGenRootTypes['Post'][]; // [Post!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  Query: {};
  User: { // root type
    avatar?: string | null; // String
    background?: string | null; // String
    birthday: any; // DateTime!
    firstName: string; // String!
    gender: NexusGenEnums['Gender']; // Gender!
    id: number; // Int!
    lastName: string; // String!
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: any;
  Upload: any;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  FriendStatusWhereUniqueInput: NexusGenInputs['FriendStatusWhereUniqueInput'];
  PostWhereUniqueInput: NexusGenInputs['PostWhereUniqueInput'];
  UserWhereUniqueInput: NexusGenInputs['UserWhereUniqueInput'];
  Gender: NexusGenEnums['Gender'];
}

export interface NexusGenFieldTypes {
  File: { // field return type
    encoding: string; // String!
    filename: string; // String!
    id: string; // ID!
    mimetype: string; // String!
    url: string; // String!
  }
  FriendStatus: { // field return type
    fromUserId: number; // Int!
    id: number; // Int!
    receiver: NexusGenRootTypes['User']; // User!
    responseTime: any | null; // DateTime
    sender: NexusGenRootTypes['User']; // User!
    sentTime: any; // DateTime!
    statusId: number; // Int!
    toUserId: number; // Int!
  }
  Mutation: { // field return type
    acceptInvitation: NexusGenRootTypes['FriendStatus'] | null; // FriendStatus
    createPost: NexusGenRootTypes['Post'] | null; // Post
    deletePost: boolean; // Boolean!
    multiUpload: NexusGenRootTypes['File'][]; // [File!]!
    removeFriendship: boolean; // Boolean!
    removeRequest: boolean; // Boolean!
    sendInvitation: NexusGenRootTypes['FriendStatus'] | null; // FriendStatus
    signIn: NexusGenRootTypes['User']; // User!
    signOut: boolean; // Boolean!
    signUp: NexusGenRootTypes['User']; // User!
    updateAvatar: NexusGenRootTypes['File']; // File!
    updateBackground: NexusGenRootTypes['File']; // File!
  }
  PageInfo: { // field return type
    endCursor: number; // Int!
    hasNextPage: boolean; // Boolean!
  }
  Post: { // field return type
    author: NexusGenRootTypes['User']; // User!
    content: string | null; // String
    createdAt: any; // DateTime!
    id: number; // Int!
  }
  PostConnection: { // field return type
    edges: NexusGenRootTypes['Post'][]; // [Post!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  Query: { // field return type
    feed: NexusGenRootTypes['PostConnection'][]; // [PostConnection!]!
    friendRequests: NexusGenRootTypes['FriendStatus'][]; // [FriendStatus!]!
    friends: NexusGenRootTypes['User'][] | null; // [User!]
    friendStatus: NexusGenRootTypes['FriendStatus'] | null; // FriendStatus
    me: NexusGenRootTypes['User'] | null; // User
    profileFeed: NexusGenRootTypes['Post'][]; // [Post!]!
    user: NexusGenRootTypes['User'] | null; // User
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  User: { // field return type
    avatar: string | null; // String
    background: string | null; // String
    birthday: any; // DateTime!
    firstName: string; // String!
    gender: NexusGenEnums['Gender']; // Gender!
    id: number; // Int!
    lastName: string; // String!
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    receivedInvitations: NexusGenRootTypes['FriendStatus'][]; // [FriendStatus!]!
    sentInvitations: NexusGenRootTypes['FriendStatus'][]; // [FriendStatus!]!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    acceptInvitation: { // args
      id: number; // Int!
    }
    createPost: { // args
      content: string; // String!
    }
    deletePost: { // args
      id: number; // Int!
    }
    multiUpload: { // args
      files: any[]; // [Upload!]!
    }
    removeFriendship: { // args
      id: number; // Int!
    }
    removeRequest: { // args
      id: number; // Int!
    }
    sendInvitation: { // args
      id: number; // Int!
    }
    signIn: { // args
      email: string; // String!
      password: string; // String!
    }
    signUp: { // args
      birthday: any; // DateTime!
      email: string; // String!
      firstName: string; // String!
      gender: NexusGenEnums['Gender']; // Gender!
      lastName: string; // String!
      password: string; // String!
    }
    updateAvatar: { // args
      file: any; // Upload!
    }
    updateBackground: { // args
      file: any; // Upload!
    }
  }
  Query: {
    feed: { // args
      cursor?: number | null; // Int
    }
    friends: { // args
      id?: number | null; // Int
    }
    friendStatus: { // args
      id: number; // Int!
    }
    profileFeed: { // args
      id: number; // Int!
    }
    user: { // args
      where: NexusGenInputs['UserWhereUniqueInput']; // UserWhereUniqueInput!
    }
    users: { // args
      filter: string; // String!
    }
  }
  User: {
    posts: { // args
      after?: NexusGenInputs['PostWhereUniqueInput'] | null; // PostWhereUniqueInput
      before?: NexusGenInputs['PostWhereUniqueInput'] | null; // PostWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
    receivedInvitations: { // args
      after?: NexusGenInputs['FriendStatusWhereUniqueInput'] | null; // FriendStatusWhereUniqueInput
      before?: NexusGenInputs['FriendStatusWhereUniqueInput'] | null; // FriendStatusWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
    sentInvitations: { // args
      after?: NexusGenInputs['FriendStatusWhereUniqueInput'] | null; // FriendStatusWhereUniqueInput
      before?: NexusGenInputs['FriendStatusWhereUniqueInput'] | null; // FriendStatusWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "File" | "FriendStatus" | "Mutation" | "PageInfo" | "Post" | "PostConnection" | "Query" | "User";

export type NexusGenInputNames = "FriendStatusWhereUniqueInput" | "PostWhereUniqueInput" | "UserWhereUniqueInput";

export type NexusGenEnumNames = "Gender";

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "String" | "Upload";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    
  }
  interface NexusGenPluginSchemaConfig {
  }
}