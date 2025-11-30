import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import useGrpcApi from "../../hooks/useGrpcApi";
import { getOrderClient } from "../../api/grpc/client";
import { convertTimestampToDate } from "../../utils/date";
import { formatToIDR } from "../../utils/number";
import SortableHeader from "../SortableHeader/SortableHeader";
import useSortableHeader from "../../hooks/useSortableHeader";

interface OrderItem {
    id: string;
    number: string;
    date: string;
    total: number;
    statusCode: string;
    products: {
        id: string;
        name: string;
        quantity: number;
    }[];
}

function OrderHistorySection() {
    const listApi = useGrpcApi();
    const { handleSort, sortConfig } = useSortableHeader();
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
                    sort: sortConfig.direction ? {
                        direction: sortConfig.direction,
                        field: sortConfig.key
                    } : undefined,
                }
            }));

            setItems(res.response.items.map(item => ({
                id: item.id,
                date: convertTimestampToDate(item.createdAt) ?? "",
                number: item.number,
                statusCode: item.statusCode,
                total: item.total,
                products: item.products.map(product => ({
                    id: product.id,
                    name: product.name,
                    quantity: Number(product.quantity),
                })),
            })));
            setTotalPages(res.response.pagination?.totalItemCount ?? 0);

        }

        fetchData();
    }, [currentPage, sortConfig.direction, sortConfig.key]);


    return (
        <div className="p-4 p-lg-5 border bg-white admin-dashboard">
            <h2 className="h3 mb-3 text-black">Riwayat Pesanan</h2>
            <div className="table-responsive">
                <table className="table site-blocks-table site-block-order-table mb-5">
                    <thead>
                        <tr>
                            <SortableHeader
                                currentSort={sortConfig}
                                label="Nomor Pesanan"
                                onSort={handleSort}
                                sortKey="number"
                            />
                            <SortableHeader
                                currentSort={sortConfig}
                                label="Tanggal"
                                onSort={handleSort}
                                sortKey="created_at"
                            />
                            <th>Barang</th>
                            <SortableHeader
                                currentSort={sortConfig}
                                label="Total"
                                onSort={handleSort}
                                sortKey="total"
                            />
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td>{item.number}</td>
                                <td>{item.date}</td>
                                <td>
                                    {item.products.map(product => (
                                        <div key={product.id}>{product.name} x {product.quantity}</div>
                                    ))}
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
