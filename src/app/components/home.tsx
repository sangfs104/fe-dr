// app/page.tsx
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <div className="banner-container reveal-banner">
        <Image
          id="banner-image"
          className="reveal-banner-item delay-1"
          src="/img/banner.jpg"
          alt="Banner"
          width={1200}
          height={400}
        />
      </div>

      <div className="dots reveal-banner-item delay-2" id="dots">
        <span className="dot active" data-index="0"></span>
        <span className="dot" data-index="1"></span>
        <span className="dot" data-index="2"></span>
      </div>

      <h2 className="shop">Shopping by Categories</h2>

      <div className="categories reveal">
        <div className="category">
          <div className="circle">
            <Image src="/img/mau1.jpg" alt="T-shirt" width={100} height={100} />
          </div>
          <div className="category-title">T-shirt<sup>15</sup></div>
        </div>

        <div className="category">
          <div className="circle">
            <Image src="/img/mau2.jpg" alt="Long-sleeves" width={100} height={100} />
          </div>
          <div className="category-title">Long-sleeves<sup>8</sup></div>
        </div>

        <div className="category">
          <div className="circle">
            <Image src="/img/mau3.jpg" alt="Sweater" width={100} height={100} />
          </div>
          <div className="category-title">Sweater<sup>18</sup></div>
        </div>

        <div className="category">
          <div className="circle">
            <Image src="/img/mau4.jpg" alt="Hoodies" width={100} height={100} />
          </div>
          <div className="category-title">Hoodies<sup>9</sup></div>
        </div>

        <div className="category">
          <div className="circle">
            <Image src="/img/mau4.jpg" alt="Tanktop" width={100} height={100} />
          </div>
          <div className="category-title">Tanktop<sup>6</sup></div>
        </div>
      </div>

      <div className="container reveal">
        {/* Card 1 */}
        <div className="card reveal">
          <div className="card-text">
            <h2>Thousands of free templates</h2>
            <p>Free and easy way to bring your ideas to life</p>
            <button className="btn">Explore More →</button>
          </div>
          <div className="card-images">
            <Image src="/img/sp1.webp" alt="Image 1" width={100} height={100} />
            <Image src="/img/sp2.webp" alt="Image 2" width={100} height={100} />
            <Image src="/img/sp3.webp" alt="Image 3" width={100} height={100} />
            <Image src="/img/sp4.webp" alt="Image 4" width={100} height={100} />
          </div>
        </div>

        {/* Card 2 */}
        <div className="card reveal">
          <div className="card-text">
            <h2>Create your unique style</h2>
            <p>Free and easy way to create your ideas to life</p>
            <button className="btn">Shop Now →</button>
          </div>
          <div className="card-image-single">
            <Image src="/img/sp5.webp" alt="T-shirt" width={200} height={200} />
          </div>
        </div>
      </div>
    </>
  );
}
