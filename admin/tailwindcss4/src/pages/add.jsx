// src/pages/Add.jsx
import React, { useState } from "react";
import upload_area from "../assets/upload_area.png";
import axios from "axios";

const Add = ({ Token }) => {
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [quantity, setQuantity] = useState("");

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      formData.append("name", productName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("quantity", quantity); 
        const apiUrl = import.meta.env.VITE_BACKEND_URL;

      const response = await axios.post(
        `${apiUrl}/api/products/add-product`,
        formData,
        {
          headers: {
            token: Token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        console.log("Product Added Successfully!");
        console.log(response.data);
        alert("Product Added Successfully!");
       
        setProductName("");
        setPrice("");
        setDescription("");
        setCategory("Men");
        setSubCategory("TopWear");
        setQuantity("");
        setImages([]);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. See console for details.");
    }
  };

  return (
    <div className="p-4 md:p-8 my-4 md:my-10">
      <h1 className="text-xl md:text-2xl text-gray-700 font-bold mb-4 md:mb-6">
        Add New Product
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-2">
            Upload Images (up to 4)
          </p>
          <div className="flex flex-wrap gap-2 items-center">
            {images.length > 0 ? (
              images.map((img, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(img)}
                  alt={img.name}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain border border-gray-300"
                />
              ))
            ) : (
              <label htmlFor="file-input">
                <img
                  src={upload_area}
                  alt="Upload area"
                  className="w-24 h-24 md:w-32 md:h-32 object-contain border border-dashed border-gray-300 cursor-pointer"
                />
              </label>
            )}
            <input
              onChange={handleImageChange}
              type="file"
              id="file-input"
              multiple 
              accept="image/*"
              className="hidden"
            />
           
            <label
              htmlFor="file-input"
              className="cursor-pointer bg-gray-200 p-2 rounded"
            >
              Choose Files
            </label>
          </div>
        </div>
        {/* Product Name */}
        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-2">Product Name</p>
          <input
            type="text"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            placeholder="Product Name"
            className="border border-gray-600 px-2 py-1 w-full"
            required
          />
        </div>
        {/* ... other form fields (Description, Price, Category, etc.) are correct ... */}
        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-2">Product Description</p>
          <textarea
            type="text"
            placeholder="Product Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="border border-gray-600 px-2 py-1 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-2">Product Price</p>
          <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder="1000"
            className="border border-gray-600 px-2 py-1 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="border border-gray-700 px-2 py-1 w-full"
            name="category"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
          <div className="mb-4">
          <p className="text-gray-700 font-medium mb-2">Product SubCategory</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="border border-gray-700 px-2 py-1 w-full"
            name="subCategory"
          >
            <option value="TopWear">TopWear</option>
            <option value="BottomWear">BottomWear</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-2">Quantity</p>
          <input
            className="w-50 border border-gray-600 px-2 py-1"
            type="number"
            name="quantity"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
            placeholder="Quantity"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-gray-700 text-white px-4 py-2 w-full md:w-auto"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
