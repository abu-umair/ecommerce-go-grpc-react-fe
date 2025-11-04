import React, { useEffect, useState } from 'react'
import useSortableHeader from '../../hooks/useSortableHeader';
import SortableHeader from '../SortableHeader/SortableHeader';
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';
import useGrpcApi from '../../hooks/useGrpcApi';
import { getProductClient } from '../../api/grpc/client';


interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

function AdminProductListSection() {
    const listApi = useGrpcApi();

    const { handleSort, sortConfig } = useSortableHeader();
    const [items, setItems] = useState<Product[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        const fetchData = async () => {
            const res = await listApi.callApi(getProductClient().listProductAdmin({
                pagination: {
                    currentPage: currentPage,
                    itemPerPage: 2,
                }
            }))

            setItems(res.response.data.map(d => ({
                description: d.description,
                id: d.id,
                imageUrl: d.imageUrl,
                name: d.name,
                price: d.price,
            })));
        }

        fetchData();
    }, [currentPage]);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="section-title">Produk</h2>
                <Link to="/admin/products/create">
                    <button className="btn btn-primary">Tambah Produk</button>
                </Link>
            </div>
            <div className="table-responsive">
                <table className="table site-blocks-table">
                    <thead>
                        <tr>
                            <th>Gambar</th>
                            <SortableHeader //?sortnya sudah di integrasikan
                                label="Nama Produk"
                                sortKey="name"
                                currentSort={sortConfig}
                                onSort={handleSort}
                            />
                            <SortableHeader
                                label="Harga"
                                sortKey="price"
                                currentSort={sortConfig}
                                onSort={handleSort}
                            />
                            <SortableHeader
                                label="Deskripsi"
                                sortKey="description"
                                currentSort={sortConfig}
                                onSort={handleSort}
                            />
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(i => (
                            <tr key={i.id}>
                                <td>
                                    <img src={i.imageUrl} width="50" alt="Produk" />
                                </td>
                                <td>{i.name}</td>
                                <td>{i.price}</td>
                                <td>{i.description}</td>
                                <td>{/* integrasi di video berikutna  */}
                                    <button className="btn btn-secondary me-2">Edit</button>
                                    <button className="btn">Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

        </div>
    );
}

export default AdminProductListSection;
