# Go gRpc FE - Ecommerce

## E-Commerce Project - Setup
### Instalasi Template E-Commerce ReactJS
#### History Steps
1. clone project https://github.com/Dryluigi/go-grpc-course-fe
```bash
git clone https://github.com/Dryluigi/go-grpc-course-fe.git

```

2. pastikan versi node 20
```bash
node -v

```

3. install dependency
```bash
npm i

```

4. run project
```bash
npm run dev

```

## E-Commerce Project - Autentikasi
### Control Form FE
#### History Steps


### Reusable Input Component FE
#### History Steps

### Integrasi API Login FE
#### History Steps
1. Copas folder proto dari BE ke FE

2. install dependencies, beberapa sudah diinstall
a. @protobuf-ts/runtime
b. @protobuf-ts/runtime-rpc
c. @protobuf-ts/plugin
d. @protobuf-ts/grpcweb-transport

masukkan di terminal:
```bash
npm i @protobuf-ts/runtime @protobuf-ts/runtime-rpc @protobuf-ts/grpcweb-transport
```

kemudian generate protonya
```bash
npm i -D @protobuf-ts/plugin
```

3  generate protonya lagi yang mengarah ke folder pb
```bash
npx protoc --ts_out ./pb --proto_path ./proto auth/auth.proto
```

4  generate common/base_response
```bash
npx protoc --ts_out ./pb --proto_path ./proto common/base_response.proto
```

## E-Commerce Project - Produk
### Setup Form Tambah Produk Admin FE
#### History Steps
1. run project
```bash
npm run dev

```

### Input Rupiah FE
#### History Steps

### Integrasi Tambah Produk Admin FE
#### History Steps
1. Memindahkan file product.proto dan pagination.proto dr BE

2  generate protonya lagi yang mengarah ke folder pb
```bash
npx protoc --ts_out ./pb --proto_path ./proto product/product.proto
```

3  generate common/base_response
```bash
npx protoc --ts_out ./pb --proto_path ./proto common/pagination.proto
```

4. kemudian lihat hasil generate ada error atau tidak

### Integrasi List Produk Admin FE
#### History Steps


### Integrasi Hapus Produk Admin FE
#### History Steps


### Integrasi Edit Produk Admin FE
#### History Steps

### Integrasi Highlight Produk FE
#### History Steps

### Integrasi API Tambah ke Cart FE
#### History Steps
1. Memindahkan file cart.proto dan pagination.proto dr BE
2  generate protonya yang mengarah ke folder pb
```bash
npx protoc --ts_out ./pb --proto_path ./proto cart/cart.proto
```

### Integrasi API List Item di Cart FE
#### History Steps

### Integrasi API Hapus Cart FE
#### History Steps

### Integrasi API Edit Kuantitas Cart FE
#### History Steps
1. ketika Quantity 0, maka dihapus di DB, karena ada script Go yang telah mengaturnya (cart_service.go, pada func 'UpdateCartQuantity')

### Optimasi Edit Kuantitas Cart FE
#### History Steps


### Navigasi Halaman Checkout FE 
#### History Steps


### Integrasi API Create Order / Checkout 
#### History Steps
1. Memindahkan file order.proto dr BE
2  generate protonya yang mengarah ke folder pb
```bash
npx protoc --ts_out ./pb --proto_path ./proto order/order.proto
```


### Integrasi Halaman Sukses Checkout FE
#### History Steps