import { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import Edit from "./Edit";
import "./style.css";

const Categories = ({ categories, setCategories, setFiltered, products }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("All");

  useEffect(() => {
    if (categoryTitle === "All") {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter((product) => product.category === categoryTitle)
      );
    }
  }, [categoryTitle, products, setFiltered]);

  return (
    <ul className="flex gap-4 md:flex-col text-lg">
      {categories.map((category) => (
        <li
          key={category._id}
          className={`category-item ${category.title === categoryTitle && '!bg-pink-700'}`}
          onClick={() => setCategoryTitle(category.title)}
        >
          <span>{category.title}</span>
        </li>
      ))}
      <li
        className="category-item !bg-purple-800 hover:placeholder-opacity-90"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl" />
      </li>
      <li
        className="category-item !bg-orange-800 hover:placeholder-opacity-90"
        onClick={() => setIsEditModalOpen(true)}
      >
        <EditOutlined className="md:text-2xl" />
      </li>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
      <Edit
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </ul>
  );
};

export default Categories;
