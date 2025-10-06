import { FinishedUnaryCall, RpcError, type UnaryCall } from '@protobuf-ts/runtime-rpc';
import React, { useState } from 'react'
import { useAuthStore } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BaseResponse } from '../../pb/common/base_response';



interface callApiArgs<T extends object, U extends GrpcBaseResponse> {
    useDefaultError?: boolean;
    defaultError?: (e: FinishedUnaryCall<T, U>) => void; //?tdk mereturn apa2
    useDefaultAuthError?: boolean;//?membuat custom lagi
    defaultAuthError?: (e: RpcError) => void; //? krn yang masuk merupakan RpcError (line 41)
}

interface GrpcBaseResponse {
    base?: BaseResponse
}
const useGrpcApi = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const logoutUser = useAuthStore(state => state.logout);

    const callApi = async <T extends object, U extends GrpcBaseResponse>(
        api: UnaryCall<T, U>,
        args?: callApiArgs<T, U>
    ) => {
        try {
            setIsLoading(true);

            const res = await api;

            if (res.response.base?.isError ?? true) {
                throw res; //? di throw (yang mana bukan error) agar bisa di catch (di JS bisa di throw baik positif maupun negatif)
            }

            return res;
        } catch (e) {
            if (e instanceof RpcError) {
                if (args?.useDefaultAuthError ?? true) {
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

                    }

                    if(args?.useDefaultAuthError === false && args?.defaultAuthError){
                        args.defaultAuthError(e); //?mengirim e nya
                    }
                    throw e;
                }
            }

            //?handle throw bagian sini (apakah e nya meruoakan FinishedUnaryCall)
            //?jika menggunakn RpcError, maka bisa menggunakan seperti ini
            //?if (e instanceof FinishedUnaryCall) {//?FinishedUnaryCall adl type di TS, sedangkan RpcError adl class (sehingga tidak bisa menggunakan seperti RpcError)
            //? }


            if (typeof e === "object" && e != null && "response" in e && args?.useDefaultError === false) {
                if (args?.defaultError) {
                    args.defaultError(e as FinishedUnaryCall<T, U>);
                }
            }

            if (args?.useDefaultError ?? true) { //?membuat pengecekan
                Swal.fire({
                    title: 'Terjadi Kesalahan',
                    text: 'Silakan coba beberapa saat lagi.',
                    icon: 'error',
                })
            }


            throw e; //?menghulangkan nilai Undefined nya dari return CallApi nya (UseGrpcApi)
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