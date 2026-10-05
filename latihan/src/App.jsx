import { useState } from 'react'
import './App.css'
import { produk } from './data/produk'
import Card from './components/Card'

function App() {
  const [filter, setFilter] = useState('all') // 'all', 'ready', 'out'
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProduk = produk.filter((item) => {
    const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase())
    if (filter === 'ready') return matchesSearch && item.stok > 0
    if (filter === 'out') return matchesSearch && item.stok === 0
    return matchesSearch
  })

  const totalProduk = produk.length
  const totalTersedia = produk.filter((p) => p.stok > 0).length

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="catalog-header">
        <div className="header-badge">✨ Koleksi Terbaru</div>
        <h1 className="catalog-title">Katalog Produk</h1>
        <p className="catalog-subtitle">
          Temukan berbagai pilihan produk berkualitas dengan penawaran dan harga terbaik.
        </p>

        {/* Quick Stats */}
        <div className="stats-row">
          <div className="stat-pill">
            <span className="stat-num">{totalProduk}</span>
            <span className="stat-text">Total Item</span>
          </div>
          <div className="stat-pill stat-ready">
            <span className="stat-num">{totalTersedia}</span>
            <span className="stat-text">Tersedia</span>
          </div>
          <div className="stat-pill stat-out">
            <span className="stat-num">{totalProduk - totalTersedia}</span>
            <span className="stat-text">Habis</span>
          </div>
        </div>
      </header>

      {/* Filter & Search Bar */}
      <div className="catalog-controls">
        <div className="search-box">
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Cari nama produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm('')}
              title="Hapus pencarian"
            >
              ×
            </button>
          )}
        </div>

        <div className="filter-tabs">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Semua ({totalProduk})
          </button>
          <button
            className={`filter-btn ${filter === 'ready' ? 'active' : ''}`}
            onClick={() => setFilter('ready')}
          >
            Tersedia ({totalTersedia})
          </button>
          <button
            className={`filter-btn ${filter === 'out' ? 'active' : ''}`}
            onClick={() => setFilter('out')}
          >
            Habis ({totalProduk - totalTersedia})
          </button>
        </div>
      </div>

      {/* Product List Grid */}
      {filteredProduk.length > 0 ? (
        <div className="list">
          {filteredProduk.map((p) => (
            <Card
              key={p.id}
              nama={p.nama}
              harga={p.harga}
              stok={p.stok}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>Produk Tidak Ditemukan</h3>
          <p>Coba gunakan kata kunci lain atau ubah filter pencarian.</p>
        </div>
      )}

      {/* Footer */}
      <footer className="catalog-footer">
        <p>© 2026 Toko Katalog • Dibuat dengan React & Vite</p>
      </footer>
    </div>
  )
}

export default App
