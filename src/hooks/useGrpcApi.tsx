import { type UnaryCall } from '@protobuf-ts/runtime-rpc';
import React, { useState } from 'react'

const useGrpcApi = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const callApi = async <T extends object, U extends object>(api: UnaryCall<T, U>) => {
        try {
            setIsLoading(true);

            const res = await api;


            return res;
        } catch (error) {
            setIsLoading(false);
        }

    }
    return{
        isLoading,
        callApi,
    }
}

export default useGrpcApi