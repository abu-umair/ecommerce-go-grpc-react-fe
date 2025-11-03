import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";

interface ProductFormValues {
    name: string;
    price: number;
    description: string;
    image: FileList;
}


function ProductForm() {
    const form = useForm<ProductFormValues>();


    const submitHandler = (values: ProductFormValues) => {
        console.log(values);

    }

    return (
        <div className="p-4 p-lg-5 border bg-white">
            <form onSubmit={form.handleSubmit(submitHandler)}>
                <FormInput<ProductFormValues>
                    errors={form.formState.errors}
                    name="name"
                    register={form.register}
                    type="text"
                    label="Nama Produk"
                    placeholder="Nama Produk"
                    labelRequired
                />
              

                {/* sementara dibiarin karena terkait harga / curency  */}
                <div className="form-group mb-3">
                    <label className="text-black" htmlFor="product_price">Harga <span className="text-danger">*</span></label>
                    <input type="number" className="form-control" id="product_price" placeholder="Harga Produk" />
                </div>

                <FormInput<ProductFormValues>
                    errors={form.formState.errors}
                    name="image"
                    register={form.register}
                    type="image"
                    label="Gambar Produk"
                    placeholder="Gambar Produk"
                    labelRequired
                />


                <FormInput<ProductFormValues>
                    errors={form.formState.errors}
                    name="description"
                    register={form.register}
                    type="textarea"
                    label="Deskripsi Produk"
                    placeholder="Deskripsi Produk ..."
                />


                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Simpan Produk</button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm;
