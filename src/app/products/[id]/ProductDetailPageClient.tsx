// // // app/products/[id]/ProductDetailPageClient.tsx

// // "use client";

// // import { useEffect, useState } from "react";
// // import Image from "next/image";

// // type ImageType = {
// //   id: number;
// //   product_id: number;
// //   name: string;
// // };

// // type Variant = {
// //   id: number;
// //   product_id: number;
// //   img_id: number;
// //   size: string;
// //   color: string;
// //   stock_quantity: number;
// //   price: number;
// //   sale_price: number | null;
// //   status: string;
// // };

// // type Product = {
// //   id: number;
// //   name: string;
// //   description: string;
// //   img: ImageType[];
// //   variant: Variant[];
// // };

// // export default function ProductDetailPageClient({ product }: { product: Product }) {
// //   const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

// //   useEffect(() => {
// //     if (product.variant.length > 0) {
// //       setSelectedVariant(product.variant[0]);
// //     }
// //   }, [product]);

// //   const variantImages = product.img.filter(
// //     (img) => img.id === selectedVariant?.img_id
// //   );

// //   return (
// //     <div className="p-4 max-w-4xl mx-auto">
// //       <h1 className="text-2xl font-bold">{product.name}</h1>
// //       <p className="text-gray-600 mb-4">{product.description}</p>

// //       {/* Ảnh biến thể hiện tại */}
// //       <div className="flex gap-4 overflow-x-auto mb-4">
// //         {variantImages.map((image) => (
// //           <Image
// //             key={image.id}
// //             src={`/img/${image.name}`}
// //             alt={product.name}
// //             width={150}
// //             height={150}
// //             className="rounded"
// //           />
// //         ))}
// //       </div>

// //       {/* Biến thể */}
// //       <h2 className="text-xl font-semibold mb-2">Chọn biến thể:</h2>
// //       <div className="grid gap-3 mb-4">
// //         {product.variant.map((v) => (
// //           <button
// //             key={v.id}
// //             onClick={() => setSelectedVariant(v)}
// //             className={`border p-2 rounded w-full text-left ${
// //               selectedVariant?.id === v.id ? "bg-blue-100 border-blue-500" : "bg-gray-50"
// //             }`}
// //           >
// //             <p>
// //               <span className="font-medium">Size:</span> {v.size} |{" "}
// //               <span className="font-medium">Màu:</span> {v.color}
// //             </p>
// //             <p>
// //               <span className="font-medium">Giá:</span>{" "}
// //               {v.sale_price ? (
// //                 <>
// //                   <span className="line-through text-red-500">{v.price.toLocaleString()}đ</span>{" "}
// //                   <span className="text-green-600 font-semibold">{v.sale_price.toLocaleString()}đ</span>
// //                 </>
// //               ) : (
// //                 <span>{v.price.toLocaleString()}đ</span>
// //               )}
// //             </p>
// //             <p>
// //               <span className="font-medium">Tồn kho:</span> {v.stock_quantity} |{" "}
// //               <span className="font-medium">Trạng thái:</span> {v.status}
// //             </p>
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";

// type ImageType = {
//   id: number;
//   product_id: number;
//   name: string;
// };

// type Variant = {
//   id: number;
//   product_id: number;
//   img_id: number;
//   size: string;
//   color: string;
//   stock_quantity: number;
//   price: number;
//   sale_price: number | null;
//   status: string;
// };

// type Product = {
//   id: number;
//   name: string;
//   description: string;
//   img: ImageType[];
//   variant: Variant[];
// };

// export default function ProductDetailPageClient({
//   product,
// }: {
//   product: Product;
// }) {
//   const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

//   useEffect(() => {
//     if (product.variant.length > 0) {
//       setSelectedVariant(product.variant[0]);
//     }
//   }, [product]);

//   // Lấy ảnh tương ứng với biến thể (nếu có), fallback ảnh đầu tiên
//   const variantImage =
//     product.img.find((img) => img.id === selectedVariant?.img_id) ||
//     product.img[0];

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold">{product.name}</h1>
//       <p className="text-gray-600 mb-4">{product.description}</p>

//       {/* Ảnh biến thể hiện tại */}
//       <div className="flex gap-4 overflow-x-auto mb-4">
//         {variantImage && (
//           <Image
//             key={variantImage.id}
//             src={`/img/${variantImage.name}`}
//             alt={product.name}
//             width={150}
//             height={150}
//             className="rounded"
//           />
//         )}
//       </div>

//       {/* Biến thể */}
//       <h2 className="text-xl font-semibold mb-2">Chọn biến thể:</h2>
//       <div className="grid gap-3 mb-4">
//         {product.variant.map((v) => (
//           <button
//             key={v.id}
//             onClick={() => setSelectedVariant(v)}
//             className={`border p-2 rounded w-full text-left ${
//               selectedVariant?.id === v.id
//                 ? "bg-blue-100 border-blue-500"
//                 : "bg-gray-50"
//             }`}
//           >
//             <p>
//               <span className="font-medium">Size:</span> {v.size} |{" "}
//               <span className="font-medium">Màu:</span> {v.color}
//             </p>
//             <p>
//               <span className="font-medium">Giá:</span>{" "}
//               {v.sale_price ? (
//                 <>
//                   <span className="line-through text-red-500">
//                     {v.price.toLocaleString()}đ
//                   </span>{" "}
//                   <span className="text-green-600 font-semibold">
//                     {v.sale_price.toLocaleString()}đ
//                   </span>
//                 </>
//               ) : (
//                 <span>{v.price.toLocaleString()}đ</span>
//               )}
//             </p>
//             <p>
//               <span className="font-medium">Tồn kho:</span> {v.stock_quantity} |{" "}
//               <span className="font-medium">Trạng thái:</span> {v.status}
//             </p>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
//bao
'use client';
import React from 'react';
import '../css/bao.css'
interface ProductPageState {
  mainImageSrc: string;
  selectedColorSrc: string;
  selectedSize: string;
  quantity: number;
  sizeModalVisible: boolean;
  toastMessage: string;
  toastVisible: boolean;
}

export default class ProductPage extends React.Component<{}, ProductPageState> {
  toastTimeout: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      mainImageSrc: 'img/somi.webp',
      selectedColorSrc: 'img/gry.webp',
      selectedSize: 'M',
      quantity: 1,
      sizeModalVisible: false,
      toastMessage: '',
      toastVisible: false,
    };
  }

  componentDidMount() {
    // Lấy màu và size đã chọn từ localStorage nếu có
    const selectedColor = localStorage.getItem('selectedColor');
    const selectedSize = localStorage.getItem('selectedSize');
    if (selectedColor) {
      this.setState({ selectedColorSrc: selectedColor, mainImageSrc: selectedColor });
    }
    if (selectedSize) {
      this.setState({ selectedSize });
    }

    // Lưu sản phẩm đã xem gần đây
    const viewed = {
      name: 'Áo sơ mi oxford nam ngắn tay fitted - Smartshirt',
      image: this.state.mainImageSrc,
      time: new Date().toISOString(),
    };
    let viewedItems = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    viewedItems.unshift(viewed);
    viewedItems = viewedItems.slice(0, 5);
    localStorage.setItem('recentlyViewed', JSON.stringify(viewedItems));

    // Thêm event listener ESC để đóng modal size
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.setState({ sizeModalVisible: false });
      document.body.style.backgroundColor = '';
    }
  };

  handleThumbnailClick = (src: string) => {
    this.setState({ mainImageSrc: src });
  };

  handleColorClick = (src: string) => {
    this.setState({ selectedColorSrc: src, mainImageSrc: src });
    localStorage.setItem('selectedColor', src);
  };

  handleSizeClick = (size: string) => {
    this.setState({ selectedSize: size });
    localStorage.setItem('selectedSize', size);
  };

  handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qty = Math.max(1, Number(e.target.value));
    this.setState({ quantity: qty });
  };

  toggleSizeModal = (visible: boolean) => {
    this.setState({ sizeModalVisible: visible });
    document.body.style.backgroundColor = visible ? 'rgba(0,0,0,0.5)' : '';
  };

  showToast = (message: string) => {
    this.setState({ toastMessage: message, toastVisible: true });
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.setState({ toastVisible: false });
    }, 3000);
  };

  handleAddToCart = () => {
    const { selectedSize, selectedColorSrc, quantity } = this.state;
    const cartItem = {
      name: 'Áo sơ mi oxford nam ngắn tay fitted - Smartshirt',
      size: selectedSize,
      color: selectedColorSrc,
      qty: quantity,
      price: '441.000 ₫',
    };
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.showToast('Đã thêm sản phẩm vào giỏ hàng');
  };

  handleLoginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert('Chức năng đăng nhập đang phát triển. Vui lòng quay lại sau.');
  };

  render() {
    const {
      mainImageSrc,
      selectedColorSrc,
      selectedSize,
      quantity,
      sizeModalVisible,
      toastMessage,
      toastVisible,
    } = this.state;

    return (
      <>
        <header className="header">
          <nav className="navbar">
            <div className="nav-left">
              <input type="text" placeholder="Tìm kiếm..." className="search" />
              <a href="#">Nam</a>
              <a href="#">Nữ</a>
              <a href="#">Về Routine</a>
              <a href="#">Thương Hiệu</a>
              <a href="#">Khuyến Mãi</a>
            </div>
            <div className="nav-right">
              <a href="#" onClick={this.handleLoginClick}>
                Đăng nhập
              </a>
              <a href="#">🛒</a>
            </div>
          </nav>
        </header>

        <div className="breadcrumb">
          Trang chủ > Thời Trang Nam > Áo Nam > GIÁ TỐT > Áo sơ mi oxford nam ngắn tay fitted - Smartshirt
        </div>


        <div className="container">
          <div className="left-column">
            <div className="thumbnail-column">
              {['img/ao1.webp', 'img/ao2.webp', 'img/ao3.webp', 'img/ao4.webp', 'img/ao3.webp', 'img/ao4.webp'].map(
                (src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Thumb ${idx + 1}`}
                    onClick={() => this.handleThumbnailClick(src)}
                    style={{ cursor: 'pointer' }}
                  />
                )
              )}
            </div>
            <div className="main-image">
              <img src={mainImageSrc} alt="Áo sơ mi chính" />
            </div>
          </div>

          <div className="product-details">
            <h1>Áo sơ mi oxford nam ngắn tay fitted - Smartshirt</h1>
            <p className="sku">SKU: 10S25SHS002_011</p>
            <p className="price">441.000 ₫</p>
            <p className="sold">684 sản phẩm đã bán</p>
            <div className="color-options">
              <label>LIGHT BLUE</label>
              <div className="colors">
                {['img/gry.webp', 'img/freen.webp', 'img/freen.webp', 'img/gry.webp'].map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Color ${idx + 1}`}
                    className={selectedColorSrc === src ? 'selected' : ''}
                    onClick={() => this.handleColorClick(src)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>
            <div className="sizes">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? 'selected' : ''}
                  onClick={() => this.handleSizeClick(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="size-guide">
              <button onClick={() => this.toggleSizeModal(true)}>Hướng dẫn chọn size</button>
            </div>

            {sizeModalVisible && (
              <div className="size-modal" onClick={() => this.toggleSizeModal(false)} style={{ display: 'flex' }}>
                <div className="size-modal-content" onClick={(e) => e.stopPropagation()}>
                  <img src="PATH_TO_YOUR_IMAGE.png" alt="Hướng dẫn chọn size" />
                </div>
              </div>
            )}

            <div className="fundiin-banner">
              Giảm đến 50K khi thanh toán qua Fundiin. <a href="#">xem thêm</a>
            </div>

            <div className="bonus-offer">
              <strong>Các sản phẩm được tặng kèm</strong>
              <p>Chọn 1 trong những quà tặng sau</p>
              <p>Quần lót nam organic cotton .Boxer</p>
            </div>

            <div className="toggle-sections">
              <details>
                <summary>ĐÁNH GIÁ</summary>
                <p>Chưa có đánh giá nào.</p>
              </details>
            </div>

            <div style={{ marginTop: '10px' }}>
              <label htmlFor="qty">Số lượng:</label>
              <input
                type="number"
                id="qty"
                min={1}
                value={quantity}
                onChange={this.handleQuantityChange}
                style={{ width: 60, margin: '0 10px' }}
              />
              <button
                id="addToCartBtn"
                style={{ padding: '8px 16px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}
                onClick={this.handleAddToCart}
              >
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>

        <section className="products-section">
          <h2>SẢN PHẨM BÁN CHẠY NHẤT</h2>
          <div className="product-grid" id="bestSellerRow" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
            {[
              {
                main: 'img/freen.webp',
                colors: ['img/freen.webp', 'img/freen.webp'],
                price: '471.000 đ',
                title: 'Áo sơ mi nữ ngắn tay sọc kẻ lệ...',
              },
              {
                main: 'img/freen.webp',
                colors: ['img/freen.webp', 'img/freen.webp'],
                price: '540.000 đ',
                title: 'Quần dài ống rộng lưng thun di...',
              },
              {
                main: 'img/freen.webp',
                colors: ['img/freen.webp', 'img/freen.webp'],
                price: '392.000 đ',
                title: 'Áo polo nữ croptop cài nút for...',
              },
              {
                main: 'img/freen.webp',
                colors: ['img/freen.webp', 'img/freen.webp', 'img/freen.webp'],
                price: '373.000 đ',
                title: 'Quần short nữ co giãn thun',
              },
            ].map((product, idx) => (
              <div className="product-card" key={idx} style={{ display: 'inline-block', verticalAlign: 'top', marginRight: 10 }}>
                <img
                  className="main"
                  src={product.main}
                  alt={product.title}
                  style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  onMouseEnter={(e) => ((e.currentTarget.style.transform = 'scale(1.05)'))}
                  onMouseLeave={(e) => ((e.currentTarget.style.transform = 'scale(1)'))}
                />
                <div className="color-options">
                  {product.colors.map((colorSrc, cidx) => (
                    <img key={cidx} src={colorSrc} alt={`Color ${cidx + 1}`} />
                  ))}
                </div>
                <div className="price">{product.price}</div>
                <div className="title">{product.title}</div>
                <div className="fundiin">
                  Từ 100.000đ <img src="img/freen.webp" alt="Fundiin" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="products-section">
          <h2>ƯU ĐÃI ĐẶC BIỆT</h2>
          <div className="product-grid" style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
            {[
              {
                main: 'img/freen.webp',
                colors: ['img/freen.webp'],
                price: '490.000 đ',
                title: 'Áo len dệt kim nam đen tay dài...',
              },
              {
                main: 'img/freen.webp',
                colors: ['img/freen.webp', 'img/freen.webp'],
                price: (
                  <>
                    249.000 đ{' '}
                    <span style={{ textDecoration: 'line-through', color: '#999' }}>381.000 đ</span>{' '}
                    <span style={{ color: 'red' }}>-74%</span>
                  </>
                ),
                title: 'Áo khoác nữ thắt belt form stra...',
              },
              {
                main: 'img/freen.webp',
                colors: ['img/freen.webp'],
                price: '1.374.000 đ',
                title: 'Áo blazer nam kiểu sọc form fit...',
              },
              {
                main: 'img/freen.webp',
                colors: ['img/freen.webp'],
                price: '883.000 đ',
                title: 'Áo blazer nữ tay dài',
              },
            ].map((product, idx) => (
              <div className="product-card" key={idx} style={{ display: 'inline-block', verticalAlign: 'top', marginRight: 10 }}>
                <img className="main" src={product.main} alt={product.title} />
                <div className="color-options">
                  {product.colors.map((colorSrc, cidx) => (
                    <img key={cidx} src={colorSrc} alt={`Color ${cidx + 1}`} />
                  ))}
                </div>
                <div className="price">{product.price}</div>
                <div className="title">{product.title}</div>
                <div className="fundiin">
                  Từ 100.000đ <img src="img/freen.webp" alt="Fundiin" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="footer">
          <div className="footer-column">
            <h4>CÔNG TY TNHH ROUTINE VIỆT NAM</h4>
            <ul>
              <li>Mã số thuế: 0106486365</li>
              <li>Văn phòng: Tầng 5 Tòa nhà IMC, 62 Trần Quang Khải, P. Tân Định, Q.1, TP HCM</li>
            </ul>
            <img className="footer-logo" src="logo.png" alt="Routine logo" />
          </div>
          <div className="footer-column">
            <h4>VỀ CHÚNG TÔI</h4>
            <ul>
              <li>
                <a href="#">Liên hệ</a>
              </li>
              <li>
                <a href="#">Theo dõi đơn hàng</a>
              </li>
              <li>
                <a href="#">Tuyển dụng</a>
              </li>
              <li>
                <a href="#">Tin thời trang</a>
              </li>
              <li>
                <a href="#">AZ Eco Uniform</a>
              </li>
              <li>
                <a href="#">Hệ thống cửa hàng</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>CHÍNH SÁCH KHÁCH HÀNG</h4>
            <ul>
              <li>
                <a href="#">Chính sách bảo hành</a>
              </li>
              <li>
                <a href="#">Chính sách bảo mật</a>
              </li>
              <li>
                <a href="#">Khách hàng thân thiết</a>
              </li>
              <li>
                <a href="#">Giao hàng 2H</a>
              </li>
              <li>
                <a href="#">Chính sách đổi trả</a>
              </li>
              <li>
                <a href="#">Câu hỏi thường gặp</a>
              </li>
              <li>
                <a href="#">Hợp tác nhượng quyền</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>HƯỚNG DẪN MUA SẮM</h4>
            <ul>
              <li>
                <a href="#">Hướng dẫn mua hàng Online</a>
              </li>
              <li>
                <a href="#">Hướng dẫn kiểm tra hàng Member</a>
              </li>
              <li>
                <a href="#">Thanh toán qua Fundiin</a>
              </li>
              <li>
                <a href="#">Hướng dẫn tích điểm</a>
              </li>
            </ul>
            <div className="footer-social-icons">
              <a href="#">📘</a>
              <a href="#">📸</a>
              <a href="#">💬</a>
              <a href="#">🎵</a>
              <a href="#">▶️</a>
              <a href="#">🛒</a>
            </div>
          </div>
        </footer>

        {toastVisible && (
          <div
            style={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              padding: '10px 20px',
              background: '#333',
              color: '#fff',
              borderRadius: 5,
              zIndex: 9999,
            }}
          >
            {toastMessage}
          </div>
        )}
      </>
    );
  }
}
