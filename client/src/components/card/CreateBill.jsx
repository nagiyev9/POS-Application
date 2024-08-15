import { Input, Modal, Select, Button, Card, Form, message } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cardSlice";
import { useNavigate } from "react-router-dom";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const card = useSelector((state) => state.card);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch("http://localhost:5000/api/invoice/add-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          ...values,
          subTotal: card.total,
          tax: ((card.total * card.tax) / 100).toFixed(2),
          totalAmount: (card.total + (card.total * card.tax) / 100).toFixed(2),
          cardItems: card.cardItems,
        }),
      });

      if (res.status === 200) {
        setIsModalOpen(false);
        message.success("Invoice created successfully");
        dispatch(reset());
        navigate("/invoice");
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="New Order"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Customer Name"
          name="costumerName"
          rules={[{ required: true, message: "Name must be required" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          label="Tel Number"
          name="costumerNumber"
          rules={[{ required: true, message: "Phone number is required" }]}
        >
          <Input placeholder="Enter your number" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Payment Method"
          name="paymentMethod"
          rules={[{ required: true, message: "Choose payment method" }]}
        >
          <Select placeholder="Select payment method">
            <Select.Option value="cash">Cash</Select.Option>
            <Select.Option value="card">Card</Select.Option>
          </Select>
        </Form.Item>
        <Card>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{card.total > 0 ? card.total.toFixed(2) : 0}$</span>
          </div>
          <div className="flex justify-between my-2">
            <span>VAT {card.tax}%</span>
            <span className="text-red-600">
              {(card.total * card.tax) / 100 > 0
                ? `+${((card.total * card.tax) / 100).toFixed(2)}`
                : 0}
              $
            </span>
          </div>
          <div className="flex justify-between">
            <b>Grand Total</b>
            <b>
              {card.total + (card.total * card.tax) / 100 > 0
                ? (card.total + (card.total * card.tax) / 100).toFixed(2)
                : 0}
              $
            </b>
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-4"
              type="primary"
              size="large"
              htmlType="submit"
              disabled={card.cardItems.length === 0}
            >
              Order All
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;
