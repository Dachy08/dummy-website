import ProductCard from "./ProductCard"
import "../styles/ProductList.css"

function ProductList({ products, loading, error }) {
  if (loading) return <div className="loading">Loading products...</div>
  if (error) return <div className="error">Error: {error}</div>

  // Check if products is an array and has items
  if (!Array.isArray(products) || products.length === 0) {
    return <div className="no-products">No products found</div>
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
