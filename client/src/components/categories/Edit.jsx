import { Button, Form, Input, message, Modal, Table } from "antd";
import React, { useState } from "react";

const Edit = ({ isEditModalOpen, setIsEditModalOpen, categories, setCategories }) => {
  const [form] = Form.useForm();
  const [editingRow, setEditingRow] = useState(null);

  const onFinish = async (values) => {
    try {
      const response = await fetch(`http://localhost:5000/api/category/update-category`, {
        method: "PUT",
        body: JSON.stringify({ ...values, categoryId: editingRow._id }),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      });
      
      if (response.ok) {
        message.success("Category updated successfully");
        setCategories(categories.map(item => {
          if (item._id === editingRow._id) {
            return { ...item, title: values.title };
          }
          return item;
        }));
        setEditingRow(null);
        form.resetFields(); 
      } else {
        message.error("Failed to update category");
      }
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        fetch('http://localhost:5000/api/category/delete-category', {
          method: 'DELETE',
          body: JSON.stringify({ categoryId: id }),
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        });
        message.success('Category deleted successfully');
        setCategories(categories.filter(item => item._id !== id));
      } catch (error) {
        message.error('Something went wrong');
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_, record) => {
        return editingRow && editingRow._id === record._id ? (
          <Form.Item name="title" initialValue={record.title} className="mb-0" style={{ margin: 0 }}>
            <Input />
          </Form.Item>
        ) : (
          <p>{record.title}</p>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const isEditing = editingRow && editingRow._id === record._id;
        return (
          <div className="flex justify-center">
            {!isEditing ? (
              <Button
                type="link"
                onClick={() => {
                  setEditingRow(record);
                  form.setFieldsValue({ title: record.title });
                }}
                className="pl-0"
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  type="link"
                  onClick={() => form.submit()}
                  className="text-gray-500"
                >
                  Save
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    setEditingRow(null);
                    form.resetFields();
                  }}
                  className="text-gray-500"
                >
                  Cancel
                </Button>
              </>
            )}
            <Button type="link" danger onClick={() => deleteCategory(record._id)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      open={isEditModalOpen}
      onCancel={() => setIsEditModalOpen(false)}
      title="Category Edit"
      footer={null}
    >
      <Form form={form} onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          pagination={false}
          columns={columns}
          rowKey="_id"
        />
      </Form>
    </Modal>
  );
};

export default Edit;
