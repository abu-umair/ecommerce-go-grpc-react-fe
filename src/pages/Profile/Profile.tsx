import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import PlainHeroSection from '../../components/PlainHeroSection/PlainHeroSection';
import { getAuthClient } from '../../api/grpc/client';
import Swal from 'sweetalert2';
import { convertTimestampToDate } from '../../utils/date';
import { RpcError } from '@protobuf-ts/runtime-rpc';
import { useAuthStore } from '../../store/auth';

function Profile() {
    const location = useLocation();
    const navigate = useNavigate();
    const logoutUser = useAuthStore(state => state.logout);
    const [fullName, setFullName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [memberSince, setMemberSince] = useState<string>();

    useEffect(() => {
        if (location.pathname === '/profile') {
            navigate('/profile/change-password');
        }
    }, [navigate, location.pathname]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getAuthClient().getProfile({})

                if (res.response.base?.isError ?? true) {
                    Swal.fire({
                        title: 'Terjadi Kesalahan',
                        text: 'Silakan coba beberapa saat lagi.',
                        icon: 'error',
                    })
                    return
                }

                setFullName(res.response.fullName);
                setEmail(res.response.email);

                //? formatnya timestamp, maka buat seperti 14 agustus 2025
                const dateStr = convertTimestampToDate(res.response.memberSince);
                setMemberSince(dateStr);
            } catch (e) {
                if (e instanceof RpcError) {
                    if (e.code === 'UNAUTHENTICATED') {
                        logoutUser();
                        localStorage.removeItem('access_token');

                        navigate('/');

                        Swal.fire({
                            title: 'Sesi telah berakhir',
                            text: 'Silakan login ulang.',
                            icon: 'warning',
                        })
                    }
                }

                Swal.fire({
                    title: 'Terjadi Kesalahan',
                    text: 'Silakan coba beberapa saat lagi.',
                    icon: 'error',
                })
            }

        }

        fetchProfile();
    }, [])


    return (
        <>
            <PlainHeroSection title='Profil Saya' />

            <div className="untree_co-section before-footer-section">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-12">
                            <div className="p-4 p-lg-5 border bg-white">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="text-black">Nama Lengkap</label>
                                            <div className="form-control-plaintext">{fullName}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="text-black">Alamat Email</label>
                                            <div className="form-control-plaintext">{email}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="text-black">Anggota Sejak</label>
                                            <div className="form-control-plaintext">{memberSince}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="nav flex-column nav-pills">
                                <Link
                                    to="/profile/change-password"
                                    className={`nav-link ${location.pathname === '/profile/change-password' ? 'active' : ''}`}
                                >
                                    Ubah Kata Sandi
                                </Link>
                                <Link
                                    to="/profile/orders"
                                    className={`nav-link ${location.pathname === '/profile/orders' ? 'active' : ''}`}
                                >
                                    Riwayat Pesanan
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
