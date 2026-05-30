import { useState } from 'react';
import Link from 'next/link';

export default function Header({ searchQuery, onSearchChange, cartCount }) {
  return (
    <header className="header">
      <div className="header-container">
        <Link href="/products" className="logo">
          <h1>ProductVault</h1>
        </Link>
        <div className="header-actions">
          <div className="search-wrapper">
            <input
              type="text"
              data-testid="search-input"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="cart">
            <span className="cart-icon">🛒</span>
            <span data-testid="cart-count" className="cart-count">{cartCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
