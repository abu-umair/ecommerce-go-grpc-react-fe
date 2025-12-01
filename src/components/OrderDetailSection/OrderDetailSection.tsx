import { Link, useParams } from "react-router-dom";
import useGrpcApi from "../../hooks/useGrpcApi";
import { DetailOrderResponse } from "../../../pb/order/order";
import { getOrderClient } from "../../api/grpc/client";
import { useEffect, useState } from "react";
import OrderStatusBadge from "../OrderStatusBadge/OrderStatusBadge";
import { ORDER_STATUS_UNPAID } from "../../constants/order";
import { convertTimestampToDate } from "../../utils/date";
import { formatToIDR } from "../../utils/number";

function OrderDetailSection() {
    const { id } = useParams();
    const detailApi = useGrpcApi();
    const [apiResponse, setApiResponse] = useState<DetailOrderResponse | null>(null);
    const items = apiResponse?.items ?? []; //?memberikan default array utk menghilangkan undifinednya
    const totalPrice = apiResponse?.total ?? 0;

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
                        <p className="mb-2"><strong>Status Saat Ini:</strong>
                            <OrderStatusBadge code={apiResponse?.orderStatusCode ?? ""} />
                            {apiResponse?.orderStatusCode === ORDER_STATUS_UNPAID &&
                                <a href={apiResponse?.xenditInvoiceUrl ?? ""}>(Bayar)</a>}
                        </p>
                        <p className="mb-2"><strong>Tanggal Pesanan:</strong> {convertTimestampToDate(apiResponse?.createdAt)}</p>
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
                                {items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{formatToIDR(item.price)}</td>
                                        <td>{Number(item.quantity)}</td>
                                        <td>{formatToIDR(item.price * Number(item.quantity))}</td>
                                    </tr>
                                ))}
                                {/* <tr>
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
                                </tr>*/}
                                <tr>
                                    <td colSpan={3} className="text-end"><strong>Subtotal</strong></td>
                                    <td>{formatToIDR(totalPrice)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="text-end"><strong>Total</strong></td>
                                    <td><strong>{formatToIDR(totalPrice)}</strong></td>
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
