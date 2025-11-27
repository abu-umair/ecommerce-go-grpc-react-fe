import { useLocation } from 'react-router-dom';
import PlainHeroSection from '../../components/PlainHeroSection/PlainHeroSection'
import { CartCheckoutState } from '../../types/cart';
import { formatToIDR } from '../../utils/number';

function Checkout() {
    const location = useLocation();
    const checkoutState = location.state as CartCheckoutState | null;
    const products = checkoutState?.products ?? [];
    const totalPrice = checkoutState?.total ?? 0;

    return (
        <>
            <PlainHeroSection title='Checkout' />

            <div className="untree_co-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mb-5 mb-md-0">
                            <h2 className="h3 mb-3 text-black">Detail Penagihan</h2>
                            <div className="p-3 p-lg-5 border bg-white">
                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label htmlFor="c_fname" className="text-black">Nama Lengkap <span
                                            className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_fname" name="c_fname"
                                            placeholder="Nama Lengkap"
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label htmlFor="c_address" className="text-black">Alamat <span
                                            className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_address" name="c_address"
                                            placeholder="Alamat Jalan" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label htmlFor="c_phone" className="text-black">Nomor Telepon <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_phone" name="c_phone"
                                            placeholder="Nomor Telepon" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="c_order_notes" className="text-black">Catatan Pesanan</label>
                                    <textarea name="c_order_notes" id="c_order_notes" cols={30} rows={5} className="form-control"
                                        placeholder="Tulis catatan Anda di sini..."></textarea>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-6">

                            <div className="row mb-5">
                                <div className="col-md-12">
                                    <h2 className="h3 mb-3 text-black">Pesanan Anda</h2>
                                    <div className="p-3 p-lg-5 border bg-white">
                                        <table className="table site-block-order-table mb-5">
                                            <thead>
                                                <th>Produk</th>
                                                <th>Total</th>
                                            </thead>
                                            <tbody>
                                                {products.map(product => (
                                                <tr key={product.id}>
                                                    <td>{product.name} <strong className="mx-2">x</strong> {product.quantity}</td>
                                                    <td>{formatToIDR(product.price)}</td>
                                                </tr>
                                                    
                                                ))}
                                                {/* <tr>
                                                    <td>Produk 2 <strong className="mx-2">x</strong> 1</td>
                                                    <td>Rp1.550.000</td>
                                                </tr> */}
                                                <tr>
                                                    <td className="text-black font-weight-bold"><strong>Subtotal Keranjang</strong></td>
                                                    <td className="text-black">{formatToIDR(totalPrice)}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-black font-weight-bold"><strong>Total Pesanan</strong></td>
                                                    <td className="text-black font-weight-bold"><strong>{formatToIDR(totalPrice)}</strong></td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="form-group">
                                            <button className="btn btn-black btn-lg py-3 btn-block">Buat Pesanan</button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;
