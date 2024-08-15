import { useEffect, useState } from "react";
import CardTotal from "../components/card/CardTotal.jsx";
import Categories from "../components/categories/Categories.jsx";
import Header from "../components/header/Header.jsx";
import Products from "../components/products/Products.jsx";
import { Spin } from "antd";

const HomePage = () => {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/product/get-all");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/category/get-all");
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  return (
    <>
      <Header setSearch={setSearch} />
      {products && categories ? (
        <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24 h-screen">
          <div className="categories overflow-auto max-h-[calc(100vh_-_105px)] md:pb-10">
            <Categories
              categories={categories}
              setCategories={setCategories}
              setFiltered={setFiltered}
              products={products}
            />
          </div>
          <div className="products flex-[8] max-h-[calc(100vh_-_105px)] overflow-y-auto pb-10 min-h-[500px]">
            <Products
              categories={categories}
              filtered={filtered}
              products={products}
              setProducts={setProducts}
              getProducts={getProducts}
              search={search}
            />
          </div>
          <div className="card-wrapper md:min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
            <CardTotal />
          </div>
        </div>
      ) : (
        <Spin size="large" className="absolute top-1/2 left-1/2"/>
      )}
    </>
  );
};

export default HomePage;
