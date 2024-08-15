import { Button, Form, Input, message, Select, Table, Modal } from "antd";
import React, { useEffect, useState } from "react";

const Edit = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/product/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

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

  const openEditModal = (record) => {
    setEditingItem(record);
    form.setFieldsValue(record); 
    setIsEditModalOpen(true);
  };

  const onFinish = async (values) => {
    try {
      await fetch("http://localhost:5000/api/product/update-product", {
        method: "PUT",
        body: JSON.stringify({ ...values, productId: editingItem._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Product Updated Successfully.");
      setIsEditModalOpen(false);
      setProducts(
        products.map((item) => {
          if (item._id === editingItem._id) {
            return { ...item, ...values };
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Something Went Wrong.");
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await fetch("http://localhost:5000/api/product/delete-product", {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Product successfully deleted.");
        setProducts(products.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Something Went Wrong.");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => <p>{record.title}</p>,
    },
    {
      title: "Product Image",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => (
        <img src={record.img} alt="" className="w-full h-20 object-cover" />
      ),
    },
    {
      title: "Product Price",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            className="pl-0"
            onClick={() => openEditModal(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => deleteCategory(record._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        scroll={{
          x: 1000,
          y: 400,
        }}
      />
      <Modal
        title="Edit Product"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
        key={editingItem._id}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={editingItem}
          key={editingItem._id}
        >
          <Form.Item
            name="title"
            label="Product Name"
            rules={[
              { required: true, message: "Product Name cannot be empty!" },
            ]}
          >
            <Input placeholder="Enter product name." />
          </Form.Item>
          <Form.Item
            name="img"
            label="Product Image"
            rules={[
              { required: true, message: "Product Image cannot be empty!" },
            ]}
          >
            <Input placeholder="Enter product image URL." />
          </Form.Item>
          <Form.Item
            name="price"
            label="Product Price"
            rules={[
              { required: true, message: "Product Price cannot be empty!" },
            ]}
          >
            <Input placeholder="Enter product price." />
          </Form.Item>
          <Form.Item
            name="category"
            label="Select Category"
            rules={[
              { required: true, message: "Category cannot be empty!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={categories}
            />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
