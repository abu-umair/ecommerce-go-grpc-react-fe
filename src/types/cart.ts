export interface CartCheckoutState {
    total: number;
    products: {
        id: string;
        name: string;
        price: number;
        quantity: number;
        total: number;
    }[];
    cartIds: string[]; //?juga digunakan saat integrasi yang nantinya cardId akan dihapus semua data yang ada didalam card
}