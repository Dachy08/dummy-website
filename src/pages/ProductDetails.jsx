"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import "../styles/ProductDetails.css"

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        console.log("Fetching product with ID:", id)
        // Using the single product endpoint from the documentation
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch product details")
        }
        const data = await response.json()
        console.log("Product details:", data)
        setProduct(data)
        setLoading(false)
      } catch (error) {
        console.error("Product details fetch error:", error)
        setError(error.message)
        setLoading(false)
      }
    }

    fetchProductDetails()
  }, [id])

  if (loading) return <div className="loading">Loading product details...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!product) return <div className="not-found">Product not found</div>

  // Ensure product has images array
  const images = Array.isArray(product.images) ? product.images : [product.thumbnail]

  return (
    <div className="product-details-container">
      <Link to="/" className="back-button">
        ← Back to Products
      </Link>

      <div className="product-details">
        <div className="product-images">
          <div className="main-image-container">
            <img
              src={images[activeImage] || "/placeholder.svg"}
              alt={product.title}
              className="main-image"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "https://via.placeholder.com/400"
              }}
            />
          </div>
          {images.length > 1 && (
            <div className="image-thumbnails">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  className={`thumbnail ${activeImage === index ? "active" : ""}`}
                  onClick={() => setActiveImage(index)}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "https://via.placeholder.com/80"
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info-details">
          <div className="product-header">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-brand">Brand: {product.brand}</p>
            <div className="product-rating">
              <span className="stars">{"★".repeat(Math.round(product.rating || 0))}</span>
              <span className="rating-value">{product.rating || 0}/5</span>
            </div>
          </div>

          <div className="product-pricing">
            <div className="price-container">
              <span className="current-price">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="original-price">
                  ${Math.round(product.price / (1 - product.discountPercentage / 100))}
                </span>
              )}
            </div>
            {product.discountPercentage > 0 && (
              <span className="discount-badge">{Math.round(product.discountPercentage)}% OFF</span>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-meta">
            <div className="meta-item">
              <span className="meta-label">Category:</span>
              <span className="meta-value">{product.category}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Stock:</span>
              <span className="meta-value">{product.stock} units</span>
            </div>
          </div>

          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
