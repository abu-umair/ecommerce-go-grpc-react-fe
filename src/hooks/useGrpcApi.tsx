import { RpcError, type UnaryCall } from '@protobuf-ts/runtime-rpc';
import React, { useState } from 'react'
import { useAuthStore } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const useGrpcApi = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const logoutUser = useAuthStore(state => state.logout);

    const callApi = async <T extends object, U extends object>(api: UnaryCall<T, U>) => {
        try {
            setIsLoading(true);

            const res = await api;


            return res;
        } catch (e) {
            if (e instanceof RpcError) {
                console.log(e.code);

                if (e.code === 'UNAUTHENTICATED' || e.code === 'INTERNAL') {
                    logoutUser();
                    localStorage.removeItem('access_token');

                    Swal.fire({
                        title: 'Sesi telah berakhir',
                        text: 'Silakan login ulang.',
                        icon: 'warning',
                    })

                    navigate('/');
                    return;
                }
            }

            Swal.fire({
                title: 'Terjadi Kesalahan',
                text: 'Silakan coba beberapa saat lagi.',
                icon: 'error',
            })
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