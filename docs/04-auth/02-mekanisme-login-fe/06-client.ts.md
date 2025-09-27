# File: client.ts

```ts
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
// Transport HTTP/Fetch untuk komunikasi gRPC-Web

import { AuthServiceClient, IAuthServiceClient } from "../../../pb/auth/auth.client";
// Client gRPC hasil generate dari auth.proto

import { authInterceptor } from "./auth-interceptor";
// Import interceptor auth

let webTransport: GrpcWebFetchTransport | null = null;
let authClient: IAuthServiceClient | null = null;

const getWebTransport = () => {
  if (webTransport === null) {
    webTransport = new GrpcWebFetchTransport({
      baseUrl: "http://localhost:8080",
      interceptors: [authInterceptor], // tambahkan interceptor
    });
  }
  return webTransport;
};

export const getAuthClient = () => {
  if (authClient === null) {
    authClient = new AuthServiceClient(getWebTransport());
  }
  return authClient;
};


🔹 Analogi Laravel

GrpcWebFetchTransport → Http Client

AuthServiceClient → AuthController

authInterceptor → Middleware (auth:api)

getAuthClient() → Service Container (resolve(AuthService::class))