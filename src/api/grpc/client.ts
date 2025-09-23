import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { AuthServiceClient } from "../../../pb/auth/auth.client";


const getWebTransport = () => {
    const transport = new GrpcWebFetchTransport({
        baseUrl: 'http://localhost:8080',
    })

    return transport
}

export const getAuthClient = () => {
    const client = new AuthServiceClient(getWebTransport());

    return client
}