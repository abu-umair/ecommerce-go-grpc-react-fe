# File: auth-interceptor.ts

```ts
import { RpcInterceptor } from "@protobuf-ts/runtime-rpc";
// Interceptor = middleware untuk setiap request gRPC

export const authInterceptor: RpcInterceptor = {
  interceptUnary(next, method, input, options) {
    const accessToken = localStorage.getItem("access_token");
    // Ambil token dari localStorage

    if (accessToken) {
      options.meta = {
        ...options.meta,
        authorization: `Bearer ${accessToken}`,
      };
    }

    return next(method, input, options);
  },
};



🔹 Analogi Laravel

authInterceptor → Middleware auth: cek token

localStorage.getItem("access_token") → request()->bearerToken()

options.meta.authorization → Authorization header