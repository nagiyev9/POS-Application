import { useState } from "react";
import { Button, Carousel, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel.jsx";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 200) {
        message.success(data.message);
        navigate("/login");
      }
      else if (res.status === 403) {
        message.error('This Email is already registered!');
      }
      else if (res.status === 400) {
        const fieldErrors = data.errors.map((error) => ({
          name: error.field,
          errors: [error.message],
        }));
        message.error(fieldErrors[0].errors[0]);
      } else {
        message.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen">
        <div className="flex justify-between h-full">
          <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
            <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
            <Form layout="vertical" onFinish={onFinish} form={form}>
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: "Username is required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    required: true,
                    message: "E-mail is required!",
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
                    message: "Password is required!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="passwordAgain"
                label="Confirm Password"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  size="large"
                  loading={loading}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
            <div className="flex justify-center absolute left-0 bottom-10 w-full flex-wrap">
              Already have an account?&nbsp;{" "}
              <Link to="/login" className="text-blue-600">
                Login here
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
                    title="Statistic"
                    desc="Widely Held Statistics"
                  />
                  <AuthCarousel
                    img="/images/customer.svg"
                    title="Customer Experience"
                    desc="Customers Satisfied with the Product at the End of the Experience"
                  />
                  <AuthCarousel
                    img="/images/admin.svg"
                    title="Admin Panel"
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

export default RegisterPage;
