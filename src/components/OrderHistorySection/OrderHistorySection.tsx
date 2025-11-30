import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import useGrpcApi from "../../hooks/useGrpcApi";
import { getOrderClient } from "../../api/grpc/client";
import { convertTimestampToDate } from "../../utils/date";
import { formatToIDR } from "../../utils/number";

interface OrderItem {
    id: string;
    number: string;
    date: string;
    total: number;
    statusCode: string;

}

function OrderHistorySection() {
    const listApi = useGrpcApi();
    const [items, setItems] = useState<OrderItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await listApi.callApi(getOrderClient().listOrder({
                pagination: {
                    currentPage: currentPage,
                    itemPerPage: 5,

                }
            }));

            setItems(res.response.items.map(item => ({
                id: item.id,
                date: convertTimestampToDate(item.createdAt) ?? "",
                number: item.number,
                statusCode: item.statusCode,
                total: item.total,
            })));
            setTotalPages(res.response.pagination?.totalItemCount ?? 0);

        }

        fetchData();
    }, [currentPage])


    return (
        <div className="p-4 p-lg-5 border bg-white">
            <h2 className="h3 mb-3 text-black">Riwayat Pesanan</h2>
            <div className="table-responsive">
                <table className="table site-block-order-table mb-5">
                    <thead>
                        <tr>
                            <th>Nomor Pesanan</th>
                            <th>Tanggal</th>
                            <th>Barang</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td>{item.number}</td>
                                <td>{item.date}</td>
                                <td>
                                    <div>Kaos Top Up x 1</div>
                                    <div>Kemeja Polo x 1</div>
                                </td>
                                <td>{formatToIDR(item.total)}</td>
                                <td><span className="badge bg-success">{item.statusCode}</span></td>
                            </tr>
                        ))}
                        {/* <tr>
                            <td>#ORD-2025000002</td>
                            <td>20 Jan 2025</td>
                            <td>
                                <div>Kursi Nordic x 2</div>
                            </td>
                            <td>Rp7.800.000</td>
                            <td><span className="badge bg-warning">Sedang Diproses</span></td>
                        </tr> */}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default OrderHistorySection;
