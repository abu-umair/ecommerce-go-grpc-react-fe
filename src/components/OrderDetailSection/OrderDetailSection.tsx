import { Link, useParams } from "react-router-dom";
import useGrpcApi from "../../hooks/useGrpcApi";
import { DetailOrderResponse } from "../../../pb/order/order";
import { getOrderClient } from "../../api/grpc/client";
import { useEffect, useState } from "react";

function OrderDetailSection() {
    const { id } = useParams();
    const detailApi = useGrpcApi();
    const [apiResponse, setApiResponse] = useState<DetailOrderResponse | null>(null);

    const fetchData = async () => {
        const res = await detailApi.callApi(getOrderClient().detailOrder({ id: id ?? "" }));
        setApiResponse(res.response);
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="p-4 p-lg-5 border bg-white">
            <Link to="/profile/orders" className="d-inline-block mb-4">
                <button className="btn btn-sm btn-primary">
                    Kembali ke Riwayat
                </button>
            </Link>
            <h2 className="section-title mb-4">Pesanan  {apiResponse?.number ?? ""}</h2>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <h3 className="h5 mb-3">Informasi Pengiriman</h3>
                    <div className="p-3 border rounded">
                        <p className="mb-2"><strong>Nama:</strong> {apiResponse?.userFullName ?? ""}</p>
                        <p className="mb-2"><strong>Telepon:</strong> {apiResponse?.phoneNumber ?? ""}</p>
                        <p className="mb-2"><strong>Alamat:</strong> {apiResponse?.address ?? ""}</p>
                        <p className="mb-0"><strong>Catatan:</strong> {apiResponse?.notes ?? ""}</p>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <h3 className="h5 mb-3">Status Pesanan</h3>
                    <div className="p-3 border rounded">
                        <p className="mb-2"><strong>Status Saat Ini:</strong> <span className="badge bg-success">Dikirim</span></p>
                        <p className="mb-2"><strong>Tanggal Pesanan:</strong> 20 Februari 2025</p>
                        <div className="mt-3">
                            <select className="form-select mb-2">
                                <option value="pending">Menunggu</option>
                                <option value="processing">Diproses</option>
                                <option value="shipped">Dikirim</option>
                                <option value="delivered">Diterima</option>
                            </select>
                            <button className="btn btn-primary w-100">Perbarui Status</button>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <h3 className="h5 mb-3">Item Pesanan</h3>
                    <div className="table-responsive">
                        <table className="table site-blocks-table">
                            <thead>
                                <tr>
                                    <th>Produk</th>
                                    <th>Harga</th>
                                    <th>Kuantitas</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Hoodie Santai</td>
                                    <td>Rp120.000</td>
                                    <td>1</td>
                                    <td>Rp120.000</td>
                                </tr>
                                <tr>
                                    <td>Celana Chino</td>
                                    <td>Rp150.000</td>
                                    <td>2</td>
                                    <td>Rp300.000</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="text-end"><strong>Subtotal</strong></td>
                                    <td>Rp420.000</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="text-end"><strong>Total</strong></td>
                                    <td><strong>Rp420.000</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailSection;
