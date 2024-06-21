import React, { useState } from "react";
import axios from "axios";
import { Box, Button, IconButton, Alert } from "@mui/material";
import { AddPhotoAlternate, Delete } from "@mui/icons-material";
import "../../../css/style.css";

const categoryOptions = [
  "men-t-shirt",
  "men-shirt",
  "men-pants",
  "women-dress",
  "women-top",
];

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...filePreviews]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setShowCategoryPopup(false); // Close the popup after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("category", category);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const { data } = await axios.post("/api/v1/product/new", formData);
      setAlertMessage("Product created successfully!");
      setAlertSeverity("success");

      // Clear input fields after successful creation
      setProductName("");
      setPrice("");
      setStock("");
      setDescription("");
      setCategory("");
      setImages([]);
      setImagePreviews([]);
    } catch (error) {
      setAlertMessage("Error creating product: " + error.message);
      setAlertSeverity("error");
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1>Create Product</h1>

          {alertMessage && (
            <Alert
              severity={alertSeverity}
              onClose={() => setAlertMessage(null)}
              sx={{ mb: 2 }}
            >
              {alertMessage}
            </Alert>
          )}

          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            placeholder="Enter Product Name"
            name="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />

          <label htmlFor="category">Category</label>
          <input
            type="text"
            placeholder="Choose category"
            name="category"
            value={category}
            readOnly
            onClick={() => setShowCategoryPopup(true)}
          />
          <div className="category-select">
            <div className="category-dropdown">
              {showCategoryPopup && (
                <div className="category-options">
                  {categoryOptions.map((cat) => (
                    <div
                      key={cat}
                      className="category-option"
                      onClick={() => handleCategorySelect(cat)}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <label htmlFor="price">Price</label>
          <input
            type="number"
            placeholder="Enter Price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            placeholder="Enter Stock"
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            placeholder="Enter Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
          />

          <Button
            className="file-choose-btn"
            variant="contained"
            component="label"
            startIcon={<AddPhotoAlternate />}
            sx={{
              mt:2,
              mb: 2,
              px: 5,
              backgroundColor: "transparent",
              color: "gray",
              width: "100%",
              height: "4rem",
              fontSize:"1.5rem"
            }}
          >
            Select Images
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </Button>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
            {imagePreviews.map((src, index) => (
              <Box
                key={index}
                sx={{ position: "relative", display: "inline-block" }}
              >
                <Box
                  component="img"
                  src={src}
                  alt={`Preview ${index}`}
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    position: "absolute",
                    top: 0,
                    right:-30,
                    backgroundColor:"transparent",
                    color:"#fff" 
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>

          <div className="buttons">
            <button type="button" className="cancelbtn">
              Cancel
            </button>
            <button type="submit" className="signupbtn">
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
