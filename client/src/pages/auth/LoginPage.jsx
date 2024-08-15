import { useState } from "react";
import { Button, Carousel, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel.jsx";

const LoginPage = () => {
  const [lodaing, setLodaing] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLodaing(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ ...values }),
      });

      const user = await res.json();
      console.log(user);

      if (res.status === 200) {
        message.success("Login successfull");
        navigate("/");
        localStorage.setItem("popUser", JSON.stringify({
          username: user.username,
          email: user.email,
        }));
      } 
      else if (res.status === 404) {
        message.error('User not found!');
      }
      else if (res.status === 403) {
        message.error('User not found!');
      }
      setLodaing(false);
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
      setLodaing(false);
    }
  };

  return (
    <>
      <div className="h-screen">
        <div className="flex justify-between h-full">
          <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
            <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
            <Form
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                remember: false,
              }}
            >
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    required: true,
                    message: "E-mail must be required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Password must be required!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item name={"remember"} valuePropName="checked">
                <div className="flex justify-between items-center">
                  <Checkbox>Remember me</Checkbox>
                  <Link>Forgot password?</Link>
                </div>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  size="large"
                  loading={lodaing}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div className="flex justify-center absolute left-0 bottom-10 w-full flex-wrap">
              You don't have an account?&nbsp;{" "}
              <Link to={"/register"} className="text-blue-600">
                Register right here
              </Link>{" "}
            </div>
          </div>
          <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
            <div className="w-full h-full flex items-center">
              <div className="w-full">
                <Carousel className="!h-full px-6" autoplay>
                  <AuthCarousel
                    img="/images/responsive.svg"
                    title="Responsive"
                    desc="Compatibility with All Device Sizes"
                  />
                  <AuthCarousel
                    img="/images/statistic.svg"
                    title="İstatistikler"
                    desc="Widely Held Statistics"
                  />
                  <AuthCarousel
                    img="/images/customer.svg"
                    title="Müşteri Memnuniyeti"
                    desc="Customers Satisfied with the Product at the End of the Experience"
                  />
                  <AuthCarousel
                    img="/images/admin.svg"
                    title="Yönetici Paneli"
                    desc="Management from a Single Place"
                  />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
