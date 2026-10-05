const iconMap = {
  sepatu: '👟',
  tas: '🎒',
  topi: '🧢',
  kemeja: '👔',
  celana: '👖',
}

function Card({ nama, harga, stok }) {
  const isOutOfStock = stok === 0
  const lowerName = (nama || '').toLowerCase()
  const icon = iconMap[lowerName] || '📦'

  return (
    <div className={`card ${isOutOfStock ? 'card-out-of-stock' : ''}`}>
      <div className="card-badge-container">
        {isOutOfStock ? (
          <span className="badge badge-out">Habis</span>
        ) : (
          <span className="badge badge-in">Stok: {stok}</span>
        )}
      </div>

      <div className="card-media">
        <div className="card-icon">{icon}</div>
      </div>

      <div className="card-content">
        <span className="card-category">Fashion & Apparel</span>
        <h3 className="card-title">{nama}</h3>

        <div className="card-price-row">
          <span className="price-label">Harga</span>
          <span className="price-value">Rp {harga.toLocaleString('id-ID')}</span>
        </div>

        <button
          className="btn-buy"
          disabled={isOutOfStock}
          type="button"
        >
          {isOutOfStock ? (
            <span>Stok Habis</span>
          ) : (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Beli Sekarang</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default Card
