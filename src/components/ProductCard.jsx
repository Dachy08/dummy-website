import { Link } from "react-router-dom"
import "../styles/ProductCard.css"

function ProductCard({ product }) {
  // Ensure product has all required properties
  if (!product || typeof product !== "object") {
    return null
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        <img
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.title || "Product"}
          className="product-image"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "https://via.placeholder.com/300"
          }}
        />
        {product.discountPercentage > 0 && (
          <div className="product-discount">{Math.round(product.discountPercentage)}% OFF</div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title || "Unnamed Product"}</h3>
        <p className="product-category">{product.category || "Uncategorized"}</p>
        <div className="product-price-container">
          <span className="product-price">${product.price || 0}</span>
          <span className="product-rating">★ {product.rating ? product.rating.toFixed(1) : "N/A"}</span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
