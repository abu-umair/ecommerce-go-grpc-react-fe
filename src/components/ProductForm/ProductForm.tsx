import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import * as yup from "yup";


const changeProductSchema = yup.object().shape({
    name: yup.string().required("Nama produk wajib diisi"),
    price: yup.number().required("Harga produk wajib diisi").typeError("Harga produk tidak valid").moreThan(0, "Harga produk harus lebih dari 0"),
    description: yup.string(),
    image: yup.mixed<FileList>().required("Gambar produk wajib diisi")
        .test("fileLength", "Gambar produk wajib diisi", (fileList) => {
            return fileList.length > 0
        })
        .test("fileType", "Format gambar tidak valid", (fileList) => {
            return fileList && fileList.length > 0 ? ["image/jpeg", "image/png"].includes(fileList[0].type) : true
            //?jika nilainya lebih ari 0 maka true, selain itu seakan-akan aman (sehingga di triger adl test yang pertama, bkn ke 2 nya)
        })
})

interface ProductFormValues {
    name: string;
    price: number;
    description?: string;
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
