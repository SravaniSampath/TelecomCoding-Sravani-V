import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductViewer.css";

const ProductViewer = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    //Fetching APIS
    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Fetching Products
            const response = await axios.get("https://fakestoreapi.com/products");
            setProducts(response.data);
            setFilteredProducts(response.data);
            setError("");
        } catch (err) {
            setError("Failed to fetch products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    //Search  
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    //Fetching data by ID
    const getProductByID = (id) => {
        let fetchByIDURL = "https://fakestoreapi.com/products" +"/"+id
        return axios.get(fetchByIDURL)
           .then(res => (res.data));
    }
    const handleProductClick = async (productId) => {
        console.log(productId)
        setLoading(true);
        try {
            getProductByID(productId).then(res => {
                console.log(res)
                setSelectedProduct(res)
            })
            setError("");
        } catch (err) {
            setError("Failed to fetch product details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product">
            <h1>Product Search</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            {error && <p className="error">{error}</p>}
            {loading && <p>Loading...</p>}
            <div className="content">
                <div className="product-list">
                    <h2>Product List</h2>
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="product-item"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <p>{product.title}</p>
                        </div>
                    ))}
                </div>
                 {selectedProduct && ( 
                    <div className="product-details">
                        <h2>Product Details</h2>
                        <h3>{selectedProduct.title}</h3>
                        <img src={selectedProduct.image} alt={selectedProduct.title} />
                        <p><strong>Price:</strong> ${selectedProduct.price}</p>
                        <p><strong>Description:</strong> {selectedProduct.description}</p>
                    </div>
                 )} 
            </div>
        </div>
    );
};

export default ProductViewer;