import React from "react";
import { Button, Form, Input, message, Modal, Select } from "antd";

const Add = ({ isAddModalOpen, setIsAddModalOpen, categories, setProducts, refreshProducts }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await fetch("http://localhost:5000/api/product/add-product", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(values),
      });
      message.success("Product added successfully!");
      form.resetFields();
      await refreshProducts();
      setIsAddModalOpen(false); 
    } catch (error) {
      message.error("Something Went Wrong");
      console.log(error);
    }
  };

  return (
    <Modal
      title="Add New Product"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Product Name"
          name="title"
          rules={[{ required: true, message: "Please input product name!" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>
        <Form.Item
          label="Product Image"
          name="img"
          rules={[{ required: true, message: "Please input product image!" }]}
        >
          <Input placeholder="Enter product image" />
        </Form.Item>
        <Form.Item
          label="Product Price"
          name="price"
          rules={[{ required: true, message: "Please input product price!" }]}
        >
          <Input placeholder="Enter product price" />
        </Form.Item>
        <Form.Item
          label="Product Category"
          name="category"
          rules={[{ required: true, message: "Please input product category!" }]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={categories}
          />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
