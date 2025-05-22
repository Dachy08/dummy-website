"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/Navbar.css"

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Using the search endpoint from the documentation
      navigate(`/?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          DummyJSON Products
        </Link>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar
