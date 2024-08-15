import React from "react";
import { Button, message } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard, increase, decrease, reset } from "../../redux/cardSlice";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const card = useSelector((state) => state.card);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold tracking-wide">
        Basket Items
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {card.cardItems.length > 0 ? (
          card.cardItems.map((item) => (
            <li className="cart-item flex justify-between" key={item._id}>
              <div className="flex items-center">
                <img
                  src={item.img}
                  alt=""
                  className="w-16 h-16 object-cover cursor-pointer"
                  onClick={() => {
                    dispatch(deleteCard(item));
                    message.success("Product Removed");
                  }}
                />
                <div className="flex flex-col ml-2">
                  <b>{item.title}</b>
                  <span>
                    {item.price}$ x {item.quantity}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Button
                  type="primary"
                  size="small"
                  className="w-full flex items-center justify-center !rounded-full"
                  icon={
                    <PlusCircleOutlined
                      onClick={() => dispatch(increase(item))}
                    />
                  }
                />
                <span className="font-bold w-6 inline-block text-center">
                  {item.quantity}
                </span>
                <Button
                  type="primary"
                  size="small"
                  className="w-full flex items-center justify-center !rounded-full"
                  icon={
                    <MinusCircleOutlined
                      onClick={() => {
                        if (item.quantity === 1) {
                          if (
                            window.confirm("Are You Sure Remove This Product?")
                          ) {
                            dispatch(deleteCard(item));
                            message.success("Product Removed");
                          }
                        } else {
                          dispatch(decrease(item));
                        }
                      }}
                    />
                  }
                />
              </div>
            </li>
          ))
        ).reverse() : (
          <p className="text-center">Basket is empty</p>
        )}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Subtotal</b>
            <span>{card.total > 0 ? card.total.toFixed(2) : 0}$</span>
          </div>
          <div className="flex justify-between p-2">
            <b>VAT {card.tax}%</b>
            <span className="text-red-700">
              {(card.total * card.tax) / 100 > 0
                ? `+${((card.total * card.tax) / 100).toFixed(2)}`
                : 0}
              $
            </span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Grand Total</b>
            <span className="text-xl">
              {card.total + (card.total * card.tax) / 100 > 0
                ? (card.total + (card.total * card.tax) / 100).toFixed(2)
                : 0}
              $
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button 
          type="primary" 
          size="large" 
          className="w-full"
          disabled={card.cardItems.length === 0}
          onClick={() => {
            navigate("/card");
          }}
          >
            Order Now
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full mt-2 flex items-center justify-center"
            icon={<ClearOutlined />}
            danger
            disabled={card.cardItems.length === 0}
            onClick={() => {
              if (window.confirm("Are You Sure Remove All Products?")) {
                dispatch(reset());
                message.success("All Products Removed");
              }
            }}
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
