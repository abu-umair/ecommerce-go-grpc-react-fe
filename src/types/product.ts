export interface ProductFormValues { //?memindahkan dari ProductForm.tsx
    name: string;
    price: number;
    description?: string;
    image: FileList;
}