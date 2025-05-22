"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Categories from "../components/Categories"
import ProductList from "../components/ProductList"
import "../styles/Home.css"

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchQuery = searchParams.get("search")

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        let url = "https://dummyjson.com/products"

        // If search query is provided, use search endpoint
        if (searchQuery) {
          url = `https://dummyjson.com/products/search?q=${searchQuery}`
        }
        // If category is selected, use category endpoint
        else if (selectedCategory) {
          url = `https://dummyjson.com/products/category/${selectedCategory}`
        }

        console.log("Fetching from URL:", url)
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        const data = await response.json()
        console.log("Products data:", data)

        // Check if products property exists in the response
        if (!data.products && Array.isArray(data)) {
          // If data is directly an array, use it
          setProducts(data)
        } else if (data.products) {
          // If data has a products property, use that
          setProducts(data.products)
        } else {
          // If neither, set empty array
          setProducts([])
        }

        setLoading(false)
      } catch (error) {
        console.error("Fetch error:", error)
        setError(error.message)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory, searchQuery])

  const handleSelectCategory = (category) => {
    setSelectedCategory(category)
  }

  return (
    <div className="home-container">
      <Categories onSelectCategory={handleSelectCategory} selectedCategory={selectedCategory} />

      <div className="products-section">
        <h1>
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : selectedCategory
              ? `${typeof selectedCategory === "string" ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace(/-/g, " ") : selectedCategory}`
              : "All Products"}
        </h1>
        <ProductList products={products} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default Home
