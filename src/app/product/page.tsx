"use client";
import React, { Component } from 'react';
import '../css/bao.css'
export default class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImage: '/img/somi.webp',
      selectedColor: '/img/gry.webp',
      selectedSize: 'M',
      qty: 1,
      showSizeModal: false,
      toastMessage: '',
      showToast: false,
    };
    this.toastTimeout = null;
  }
  componentDidMount() {
    // Load selected color and size from localStorage if available
    const selectedColor = localStorage.getItem('selectedColor');
    const selectedSize = localStorage.getItem('selectedSize');
    if (selectedColor) {
      this.setState({ selectedColor });
    }
    if (selectedSize) {
      this.setState({ selectedSize });
    }

    // Save recently viewed product
    const viewed = {
      name: 'Áo sơ mi oxford nam ngắn tay fitted - Smartshirt',
      image: this.state.mainImage,
      time: new Date().toISOString(),
    };
    let viewedItems = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    viewedItems.unshift(viewed);
    viewedItems = viewedItems.slice(0, 5);
    localStorage.setItem('recentlyViewed', JSON.stringify(viewedItems));

    // Add ESC key listener for modal close
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
  }

  handleKeyDown = (e) => {
    if (e.key === 'Escape' && this.state.showSizeModal) {
      this.setState({ showSizeModal: false });
    }
  };

  handleThumbnailClick = (src) => {
    this.setState({ mainImage: src });
  };

  handleColorClick = (src) => {
    this.setState({ selectedColor: src });
    localStorage.setItem('selectedColor', src);
  };

  handleSizeClick = (size) => {
    this.setState({ selectedSize: size });
    localStorage.setItem('selectedSize', size);
  };

  handleQtyChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      this.setState({ qty: value });
    }
  };

  toggleSizeModal = () => {
    this.setState((prev) => ({ showSizeModal: !prev.showSizeModal }));
  };

  showToast = (message) => {
    this.setState({ toastMessage: message, showToast: true });
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.setState({ showToast: false });
    }, 3000);
  };

  handleAddToCart = () => {
    const { qty, selectedSize, selectedColor } = this.state;
    const cartItem = {
      name: 'Áo sơ mi oxford nam ngắn tay fitted - Smartshirt',
      size: selectedSize || 'Mặc định',
      color: selectedColor || 'Không có',
      qty,
      price: '441.000 ₫',
    };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.showToast('Đã thêm sản phẩm vào giỏ hàng');
  };

  render() {
    const {
      mainImage,
      selectedColor,
      selectedSize,
      qty,
      showSizeModal,
      toastMessage,
      showToast,
    } = this.state;

    const thumbnails = [
      '/img/ao1.webp',
      '/img/ao2.webp',
      '/img/ao3.webp',
      '/img/ao4.webp',
      '/img/ao3.webp',
      '/img/ao4.webp',
    ];

    const colors = [
      '/img/gry.webp',
      '/img/freen.webp',
      '/img/freen.webp',
      '/img/gry.webp',
    ];

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    return (
      <>
        <div className="breadcrumb">
          Trang chủ > Thời Trang Nam > Áo Nam > GIÁ TỐT >{' '}
          <strong>Áo sơ mi oxford nam ngắn tay fitted - Smartshirt</strong>
        </div>

        <div className="container">
          <div className="left-column">
            <div className="thumbnail-column">
              {thumbnails.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Thumb ${idx + 1}`}
                  onClick={() => this.handleThumbnailClick(src)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
            <div className="main-image">
              <img src={mainImage} alt="Áo sơ mi chính" />
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
                {colors.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Color ${idx + 1}`}
                    className={selectedColor === src ? 'selected' : ''}
                    onClick={() => this.handleColorClick(src)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>
            <div className="sizes">
              {sizes.map((size) => (
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
              <button onClick={this.toggleSizeModal}>Hướng dẫn chọn size</button>
            </div>

            {showSizeModal && (
              <div
                className="size-modal"
                onClick={this.toggleSizeModal}
                style={{ display: 'flex' }}
              >
                <div
                  className="size-modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
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

            <div style={{ marginTop: '20px' }}>
              <label htmlFor="qty">Số lượng:</label>
              <input
                type="number"
                id="qty"
                min="1"
                value={qty}
                onChange={this.handleQtyChange}
                style={{ width: '60px', margin: '0 10px' }}
              />
              <button
                onClick={this.handleAddToCart}
                style={{
                  padding: '8px 16px',
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>

        {showToast && (
          <div
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              padding: '10px 20px',
              background: '#333',
              color: '#fff',
              borderRadius: '5px',
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
