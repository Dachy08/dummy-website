"use client"

import { useState, useEffect } from "react"
import "../styles/Categories.css"

function Categories({ onSelectCategory, selectedCategory }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Using the categories endpoint from the documentation
        const response = await fetch("https://dummyjson.com/products/categories")
        if (!response.ok) {
          throw new Error("Failed to fetch categories")
        }
        const data = await response.json()
        console.log("Categories data:", data)
        setCategories(data)
        setLoading(false)
      } catch (error) {
        console.error("Categories fetch error:", error)
        setError(error.message)
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) return <div className="loading">Loading categories...</div>
  if (error) return <div className="error">Error: {error}</div>

  // Helper function to format category name
  const formatCategoryName = (category) => {
    if (typeof category !== "string") {
      return String(category) // Convert to string if not already a string
    }

    // Capitalize first letter and replace hyphens with spaces
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")
  }

  return (
    <div className="categories-container">
      <h2>Categories</h2>
      <div className="categories-list">
        <button
          className={`category-item ${selectedCategory === null ? "active" : ""}`}
          onClick={() => onSelectCategory(null)}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`category-item ${selectedCategory === category ? "active" : ""}`}
            onClick={() => onSelectCategory(category)}
          >
            {formatCategoryName(category)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Categories
