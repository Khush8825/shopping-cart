import React, { useEffect, useState } from "react";
import Header from "../Header/Header.component";
import ProductListingCard from "../ProductLisitingCard/ProductLisitngCard.component";
import "./ProductListing.style.css";

const ProductListing = () => {
  const [productsData, setProductsData] = useState("");
  const [categoryData, setCategoryData] = useState("");
  const [categoryId, setCategoryId] = useState("4r32433kjk43");
  const [isActive, setActive] = useState(false);
  const [categoryName, setCategoryName] = useState([]);
  const [currentCategory,setCurrentCategory] = useState("");

  const fetchData = async () => {
    const response = await fetch("http://localhost:3001/products");
    const getJsonResponse = await response.json();
    const categories = await fetch("http://localhost:3001/categories");
    const categoriesJson = await categories.json();
    setCategoryData(categoriesJson);
    setProductsData(getJsonResponse);
  };

  const handleCategoryClick = (id, name) => {
    const finalCategory = [...categoryName,name];
    setCategoryName(finalCategory);
    setCategoryId(id);
    if(finalCategory.length === 1) setActive(true);
    if (finalCategory[finalCategory.length - 1] === finalCategory[finalCategory.length - 2]) setActive(!isActive);
    if(finalCategory[finalCategory.length - 1] !== finalCategory[finalCategory.length - 2]) setActive(true);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div className="productPage">
        <div className="sidenav">
          {categoryData &&
            categoryData
              .sort((a, b) => a.order - b.order)
              .map(
                (item, index) =>
                  item.enabled && (
                    <>
                      <button
                        className=
                        {(categoryName[categoryName.length-1] === item.name) && isActive ? "categoryButtonActive" : 'categoryButton'}
                        onClick={() => handleCategoryClick(item.id, item.name)}
                      >
                        {item.name}
                      </button>
                      <hr />
                    </>
                  )
              )}
        </div>
        <div className="cards">
          {isActive && productsData &&
            productsData
              .sort((a, b) => a.order - b.order)
              .map((item) => {
                return (
                  categoryId === item.category && (
                    <ProductListingCard category={item} />
                  )
                );
              })}
          {!isActive && productsData &&
            productsData
              .sort((a, b) => a.order - b.order)
              .map((item) => {
                return (
                  <ProductListingCard category={item} />
                );
              })}
        </div>
      </div>
    </>
  );
};

export default ProductListing;
