
---

## 3️⃣ 02-client.ts.md

```markdown
# Penjelasan Baris per Baris: client.ts

```ts
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
// Import transport agar React bisa komunikasi ke gRPC server (Go)

import { AuthServiceClient, IAuthServiceClient } from "../../../pb/auth/auth.client";
// Import client gRPC hasil generate dari file proto

let webTransport: GrpcWebFetchTransport | null = null;
// Variable global transport (supaya tidak dibuat ulang terus)

let authClient: IAuthServiceClient | null = null;
// Variable global client AuthService

// 🔹 Fungsi untuk mendapatkan transport
const getWebTransport = () => {
    if (webTransport === null) {
        webTransport = new GrpcWebFetchTransport({
            baseUrl: 'http://localhost:8080',
            // URL server Go gRPC
        });
    }

    return webTransport;
};

// 🔹 Fungsi untuk mendapatkan AuthServiceClient
export const getAuthClient = () => {
    if (authClient === null) {
        authClient = new AuthServiceClient(getWebTransport());
        // Buat AuthServiceClient hanya sekali (singleton pattern)
    }

    return authClient;
};
