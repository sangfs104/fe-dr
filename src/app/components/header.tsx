// 'use client';

// import React from 'react';

// export default function HeaderHome() {
//   return (
//     <>
//       {/* Topbar */}
//       <div className="topbar reveal-flip-left">
//         <div className="left"><i className="fas fa-map-marker-alt"></i> Find a Store</div>
//         <div className="right">
//           <a href="#"><i className="fab fa-twitter"></i></a>
//           <a href="#"><i className="fab fa-facebook-f"></i></a>
//           <a href="#"><i className="fab fa-instagram"></i></a>
//           <a href="#"><i className="fab fa-youtube"></i></a>
//         </div>
//       </div>

//       {/* Header */}
//       <header>
//         {/* Logo */}
//         <div className="logo">
//          <span>
//   <img
//     style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
//     src="/img/logo2.png"
//     alt="TeeSpace Logo"
//   />
// </span>

        
//         </div>

//         <div className="search-bar">
//           <span className="search-icon">
//             <i className="fa-solid fa-magnifying-glass"></i>
//           </span>
//           <input type="text" placeholder="What are you looking for?" />
//           <button>Search</button>
//         </div>

//         {/* Hotline & Icons */}
//         <div className="right-section">
//           <div className="hotline">
//             <div><i className="fas fa-headset"></i> Hotline: 19008188</div>
//             <small>Pickup your order for free</small>
//           </div>
//           <div className="icons">
//             <a href="#"><i className="fas fa-user"></i></a>
//             <a href="#"><i className="fas fa-star"></i><span className="badge">0</span></a>
//             <a href="#"><i className="fas fa-shopping-bag"></i><span className="badge">0</span></a>
//           </div>
//         </div>
//       </header>

//       <nav>
//         <div className="menu-item reveal-blur">
//           <a href="#" className="active">
//             Home <span className="arrow"><i className="fas fa-chevron-down"></i></span>
//           </a>
//           <ul className="dropdown">
//             <li><a href="#">Home 1</a></li>
//             <li><a href="#">Home 2</a></li>
//           </ul>
//         </div>
//         <div className="menu-item">
//           <a href="#">
//             TeeSpace <span className="arrow"><i className="fas fa-chevron-down"></i></span>
//           </a>
//           <ul className="dropdown">
//             <li><a href="#">T-Shirt</a></li>
//             <li><a href="#">Hoodie</a></li>
//           </ul>
//         </div>
//         <div className="menu-item">
//           <a href="#">
//             Shop <span className="arrow"><i className="fas fa-chevron-down"></i></span>
//           </a>
//           <ul className="dropdown">
//             <li><a href="#">All Products</a></li>
//             <li><a href="#">Sale</a></li>
//           </ul>
//         </div>
//         <div className="menu-item">
//           <a href="#">
//             Blog <span className="arrow"><i className="fas fa-chevron-down"></i></span>
//           </a>
//           <ul className="dropdown">
//             <li><a href="#">Latest Posts</a></li>
//             <li><a href="#">News</a></li>
//           </ul>
//         </div>
//         <div className="menu-item">
//           <a href="#">
//             Pages <span className="arrow"><i className="fas fa-chevron-down"></i></span>
//           </a>
//           <ul className="dropdown">
//             <li><a href="#">About</a></li>
//             <li><a href="#">Contact</a></li>
//           </ul>
//         </div>
//         <div className="sale-badge">
//           <i className="fas fa-fire"></i> Extra <span>Sale 30% off</span>
//         </div>
//       </nav>
//     </>
//   );
// }
'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faHeadset,
  faUser,
  faStar,
  faShoppingBag,
  faMagnifyingGlass,
  faChevronDown,
  faFire,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebookF,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

export default function HeaderHome() {
  return (
    <>
      {/* Topbar */}
      <div className="topbar reveal-flip-left">
        <div className="left">
          <FontAwesomeIcon icon={faMapMarkerAlt} /> Find a Store
        </div>
        <div className="right">
          <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
        </div>
      </div>

      {/* Header */}
      <header>
        <div className="logo">
          <span>
            <img
              style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
              src="/img/logo2.png"
              alt="TeeSpace Logo"
            />
          </span>
        </div>

        <div className="search-bar">
          <span className="search-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <input type="text" placeholder="What are you looking for?" />
          <button>Search</button>
        </div>

        {/* Hotline & Icons */}
        <div className="right-section">
          <div className="hotline">
            <div><FontAwesomeIcon icon={faHeadset} /> Hotline: 19008188</div>
            <small>Pickup your order for free</small>
          </div>
          <div className="icons">
            <a href="#"><FontAwesomeIcon icon={faUser} /></a>
            <a href="#"><FontAwesomeIcon icon={faStar} /><span className="badge">0</span></a>
            <a href="#"><FontAwesomeIcon icon={faShoppingBag} /><span className="badge">0</span></a>
          </div>
        </div>
      </header>

      <nav>
        <div className="menu-item reveal-blur">
          <a href="#" className="active">
            Home <span className="arrow"><FontAwesomeIcon icon={faChevronDown} /></span>
          </a>
          <ul className="dropdown">
            <li><a href="#">Home 1</a></li>
            <li><a href="#">Home 2</a></li>
          </ul>
        </div>
        <div className="menu-item">
          <a href="#">
            TeeSpace <span className="arrow"><FontAwesomeIcon icon={faChevronDown} /></span>
          </a>
          <ul className="dropdown">
            <li><a href="#">T-Shirt</a></li>
            <li><a href="#">Hoodie</a></li>
          </ul>
        </div>
        <div className="menu-item">
          <a href="#">
            Shop <span className="arrow"><FontAwesomeIcon icon={faChevronDown} /></span>
          </a>
          <ul className="dropdown">
            <li><a href="#">All Products</a></li>
            <li><a href="#">Sale</a></li>
          </ul>
        </div>
        <div className="menu-item">
          <a href="#">
            Blog <span className="arrow"><FontAwesomeIcon icon={faChevronDown} /></span>
          </a>
          <ul className="dropdown">
            <li><a href="#">Latest Posts</a></li>
            <li><a href="#">News</a></li>
          </ul>
        </div>
        <div className="menu-item">
          <a href="#">
            Pages <span className="arrow"><FontAwesomeIcon icon={faChevronDown} /></span>
          </a>
          <ul className="dropdown">
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="sale-badge">
          <FontAwesomeIcon icon={faFire} /> Extra <span>Sale 30% off</span>
        </div>
      </nav>
    </>
  );
}
