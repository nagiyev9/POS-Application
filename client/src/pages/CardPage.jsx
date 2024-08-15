import { useRef, useState } from "react";
import { Button, Card, Popconfirm, Table, Input, Space } from "antd";
import Header from "../components/header/Header";
import CreateBill from "../components/card/CreateBill";
import { useSelector } from "react-redux";
import { deleteCard, increase, decrease } from "../redux/cardSlice";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { message } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const CardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const card = useSelector((state) => state.card);
  const dispatch = useDispatch();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchedColumn("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Product Image",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (text) => {
        return <img src={text} alt="" className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Product Price",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return <span>{text.toFixed(2)}$</span>;
      },
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Product Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <div className="flex items-center">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={
                <PlusCircleOutlined
                  onClick={() => dispatch(increase(record))}
                />
              }
            />
            <span className="font-bold w-6 inline-block text-center">
              {record.quantity}
            </span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={
                <MinusCircleOutlined
                  onClick={() => {
                    if (record.quantity === 1) {
                      if (window.confirm("Are You Sure Remove This Product?")) {
                        dispatch(deleteCard(record));
                        message.success("Product Removed");
                      }
                    } else {
                      dispatch(decrease(record));
                    }
                  }}
                />
              }
            />
          </div>
        );
      },
    },
    {
      title: "Grand Total",
      render: (_, record) => {
        return <span>{(record.price * record.quantity).toFixed(2)}$</span>;
      },
    },
    {
      title: "Actions",
      dataIndex: "price",
      key: "price",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Are You Sure Remove This Product?"
            onConfirm={() => {
              dispatch(deleteCard(record));
              message.success("Product Removed");
            }}
            danger
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Remove
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <Table
          dataSource={card.cardItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{ x: 1000, y: 300 }}
          rowKey={(i) => i._id}
        />
        <div className="card-total flex justify-end mt-4">
          <Card className="w-72">
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
            <Button
              className="mt-4 w-full"
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}
              disabled={card.cardItems.length === 0}
            >
              Order All
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CardPage;
