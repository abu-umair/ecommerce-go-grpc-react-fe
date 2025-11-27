import { useLocation } from 'react-router-dom';
import PlainHeroSection from '../../components/PlainHeroSection/PlainHeroSection'
import { CartCheckoutState } from '../../types/cart';
import { formatToIDR } from '../../utils/number';
import { useForm } from 'react-hook-form';
import FormInput from '../../components/FormInput/FormInput';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const checkoutSchema = yup.object().shape({
    fullName: yup.string().required('Nama lengkap wajib diisi'),
    address: yup.string().required('Alamat wajib diisi'),
    phoneNumber: yup.string().required('Nomor telepon wajib diisi'),
})

interface CheckoutFormValues {
    fullName: string;
    address: string;
    phoneNumber: string;
    notes?: string;
}

function Checkout() {
    const form = useForm<CheckoutFormValues>({
        resolver: yupResolver(checkoutSchema),
    })
    const location = useLocation();
    const checkoutState = location.state as CartCheckoutState | null;
    const products = checkoutState?.products ?? [];
    const totalPrice = checkoutState?.total ?? 0;

    const submitHandler = () => {
        form.handleSubmit((values: CheckoutFormValues) => {
            console.log(values);
        })(); //?form.handleSubmit adl function (bkn value atau apapun) jadi dibuat 2x pemanggilan
    }

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
                                        <FormInput
                                            errors={form.formState.errors}
                                            name='fullName'
                                            register={form.register}
                                            type='text'
                                            labelRequired
                                            label='Nama Lengkap'
                                            placeholder='Nama Lengkap'
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <FormInput
                                            errors={form.formState.errors}
                                            name='address'
                                            register={form.register}
                                            type='text'
                                            labelRequired
                                            label='Alamat'
                                            placeholder='Alamat'
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <FormInput
                                            errors={form.formState.errors}
                                            name='phoneNumber'
                                            register={form.register}
                                            type='text'
                                            labelRequired
                                            label='Nomor Telepon'
                                            placeholder='Nomor Telepon'
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <FormInput
                                        errors={form.formState.errors}
                                        name='notes'
                                        register={form.register}
                                        type='textarea'
                                        label='Catatan Pesanan'
                                        placeholder='Tulis Catatan Pesanan Disini'
                                    />
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
                                            <button
                                                onClick={submitHandler}
                                                className="btn btn-black btn-lg py-3 btn-block">Buat Pesanan</button>
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
