import { useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import ProductItem from "./ProductItem";
import Add from "./Add";
import { useNavigate } from "react-router-dom";

const Products = ({ categories, filtered, products, setProducts, getProducts, search }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {filtered.filter((product) => product.title.toLowerCase().includes(search))  
      
      .map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
      <div
        className="product-item border rounded-lg shadow-lg flex justify-center items-center bg-purple-800 hover:bg-purple-700 cursor-pointer transition-all select-none h-48"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="text-white text-3xl" />
      </div>
      <div className="product-item border rounded-lg shadow-lg flex justify-center items-center bg-orange-800 hover:bg-orange-700 cursor-pointer transition-all select-none h-48" onClick={() => navigate("/product")}>
        <EditOutlined className="text-white text-3xl"/>
      </div>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        products={products}
        categories={categories}
        setProducts={setProducts}
        refreshProducts={getProducts}
      />
    </div>
  );
};

export default Products;
