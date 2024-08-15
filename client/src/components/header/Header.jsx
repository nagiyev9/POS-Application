import React from "react";
import "./index.css";
import { Input, Badge, message } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ setSearch }) => {
  const card = useSelector((state) => state.card);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm("Are you sure logout?")) {
      localStorage.removeItem("popUser");
      navigate("/login");
      message.success("Logout successful.");
    }
  };

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to="/" >
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </Link>
        </div>
        <div
          className="header-search flex-1 flex justify-center"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        >
          <Input
            size="large"
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="menu-links">
          <Link to={"/"} className={`menu-link ${pathname === '/' && 'active'}`}>
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Home</span>
          </Link>
          <Badge
            count={card.cardItems.length}
            offset={[0, 0]}
            className="md:flex hidden"
          >
            <Link to={"/card"} className={`menu-link ${pathname === '/card' && 'active'}`}>
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Basket</span>
            </Link>
          </Badge>
          <Link to={"/invoice"} className={`menu-link ${pathname === '/invoice' && 'active'}`}>
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Invoices</span>
          </Link>
          <Link to={"/customer"} className={`menu-link ${pathname === '/customer' && 'active'}`}>
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Customer</span>
          </Link>
          <Link to={"/statistic"} className={`menu-link ${pathname === '/statistic' && 'active'}`}>
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Statistic</span>
          </Link>
          <div onClick={logOut}>
            <Link className={`menu-link`}>
              <LogoutOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Logout</span>
            </Link>
          </div>
        </div>
        <Badge
          count={card.cardItems.length}
          offset={[0, 0]}
          className="md:hidden flex"
        >
          <Link to={"/card"} className={`menu-link ${pathname === '/card' && 'active'}`}>
            <ShoppingCartOutlined className="text-2xl" />
            <span className="md:text-xs text-[10px]">Basket</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
