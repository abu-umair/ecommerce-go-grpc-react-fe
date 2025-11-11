import ProductHighlightSection from '../../components/ProductHighlightSection/ProductHighlightSection'
import PlainHeroSection from '../../components/PlainHeroSection/PlainHeroSection'
import { Link } from 'react-router-dom'
import useGrpcApi from '../../hooks/useGrpcApi'
import { getCartClient } from '../../api/grpc/client';
import { useEffect, useState } from 'react';
import { formatToIDR } from '../../utils/number';

interface CartItem {
    id: string;
    product_name: string;
    product_id: string;
    product_price: number;
    product_image_url: string;
    quantity: number;
    total: number;
}

function Cart() {
    const listApi = useGrpcApi();
    const [items, setItems] = useState<CartItem[]>([])//?utk menampung itemsnya

    useEffect(() => {
        const fetchData = async () => {
            const res = await listApi.callApi(getCartClient().listCart({}));

            setItems(res.response.items.map<CartItem>(item => ({
                id: item.cartId,
                product_id: item.productId,
                product_image_url: item.productImageUrl,
                product_name: item.productName,
                product_price: item.productPrice,
                quantity: Number(item.quantity),
                total: item.productPrice * Number(item.quantity),
            })));

        }

        fetchData();
    }, []);

    return (
        <>
            <PlainHeroSection title='Keranjang Belanja' />

            <div className="untree_co-section before-footer-section">
                <div className="container">
                    <div className="row mb-5">
                        <div className="site-blocks-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="product-thumbnail">Gambar</th>
                                        <th className="product-name">Produk</th>
                                        <th className="product-price">Harga</th>
                                        <th className="product-quantity">Kuantitas</th>
                                        <th className="product-total">Total</th>
                                        <th className="product-remove">Hapus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => (
                                        <tr key={item.id}>
                                            <td className="product-thumbnail">
                                                <img src={item.product_image_url} alt="Image" className="img-fluid" />
                                            </td>
                                            <td className="product-name">
                                                <h2 className="h5 text-black">{item.product_name}</h2>
                                            </td>
                                            <td>{formatToIDR(item.product_price)}</td>
                                            <td>
                                                <div className="input-group mb-3 d-flex align-items-center quantity-container" style={{ maxWidth: 120 }}>
                                                    <div className="input-group-prepend">
                                                        <button className="btn btn-outline-black decrease" type="button">-</button>
                                                    </div>
                                                    <input type="text" className="form-control text-center quantity-amount" value={item.quantity} placeholder="" disabled />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-outline-black increase" type="button">+</button>
                                                    </div>
                                                </div>

                                            </td>
                                            <td>{formatToIDR(item.total)}</td>
                                            <td><a href="#" className="btn btn-black btn-sm">X</a></td>
                                        </tr>
                                    ))}

                                    {/* <tr>
                                            <td className="product-thumbnail">
                                                <img src="images/product-2.png" alt="Image" className="img-fluid" />
                                            </td>
                                            <td className="product-name">
                                                <h2 className="h5 text-black">Produk 2</h2>
                                            </td>
                                            <td>Rp735.000</td>
                                            <td>
                                                <div className="input-group mb-3 d-flex align-items-center quantity-container" style={{ maxWidth: 120 }}>
                                                    <div className="input-group-prepend">
                                                        <button className="btn btn-outline-black decrease" type="button">-</button>
                                                    </div>
                                                    <input type="text" className="form-control text-center quantity-amount" value="1" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-outline-black increase" type="button">+</button>
                                                    </div>
                                                </div>

                                            </td>
                                            <td>Rp735.000</td>
                                            <td><a href="#" className="btn btn-black btn-sm">X</a></td>
                                        </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="row mb-5">

                                <div className="col-md-6">
                                    <Link to="/shop"><button className="btn btn-outline-black btn-sm btn-block">Lanjut Belanja</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 pl-5">
                            <div className="row justify-content-end">
                                <div className="col-md-7">
                                    <div className="row">
                                        <div className="col-md-12 text-right border-bottom mb-5">
                                            <h3 className="text-black h4 text-uppercase">Total Keranjang</h3>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <span className="text-black">Subtotal</span>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <strong className="text-black">Rp3.450.000</strong>
                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-md-6">
                                            <span className="text-black">Total</span>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <strong className="text-black">Rp3.450.000</strong>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <Link to="/checkout">
                                                <button className="btn btn-black btn-lg py-3 btn-block">Lanjutkan ke Pembayaran</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <ProductHighlightSection beforeFooter />
        </>
    )
}

export default Cart
