import { type UnaryCall } from '@protobuf-ts/runtime-rpc';
import React, { useState } from 'react'

const useGrpcApi = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const callApi = async <T extends object, U extends object>(api: UnaryCall<T, U>) => {
        try {
            setIsLoading(true);

            const res = await api;


            return res;
        } catch (e) {
            // if (e instanceof RpcError) {
                        //     console.log(e.code);
            
                        //     if (e.code === 'UNAUTHENTICATED' || e.code === 'INTERNAL') {
                        //         logoutUser();
                        //         localStorage.removeItem('access_token');
            
                        //         Swal.fire({
                        //             title: 'Sesi telah berakhir',
                        //             text: 'Silakan login ulang.',
                        //             icon: 'warning',
                        //         })
            
                        //         navigate('/');
                        //         return;
                        //     }
                        // }
        } finally {
            setIsLoading(false);
        }

    }
    return {
        isLoading,
        callApi,
    }
}

export default useGrpcApi