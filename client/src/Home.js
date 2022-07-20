import React, { useEffect, useState } from "react";
import Banner from "./Components/Banner/Banner.component";
import Card from "./Components/Card/Card.component";

const Home = () => {
  const [categoryData, setCategoryData] = useState("");
  const fetchCategoryData = async () => {
    const response = await fetch("http://localhost:3001/categories");
    const getJsonResponse = await response.json();
    setCategoryData(getJsonResponse);
  }

  useEffect(() => {
    fetchCategoryData();
  }, []);
  return (
    <>
      <Banner />
      {categoryData &&
        categoryData
          .sort((a, b) => a.order - b.order)
          .map(
            (item, index) =>
              item.enabled && <Card category={item} left={index % 2} />
          )}
    </>
  );
};

export default Home;
