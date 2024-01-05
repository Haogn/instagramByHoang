import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./LoginUser.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function LoginUser() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const [checkUser, setCheckUser] = useState({});
  const [inputForm, setInputForm] = useState({
    emailLogin: "",
    passwordLogin: "",
  });
  const { emailLogin, passwordLogin } = inputForm;

  const navigate = useNavigate();

  // onChange
  const handleChange = (e) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(inputForm);

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tìm người dùng với email nhập vào
    const userLogin = checkUser.find((user) => user.email === emailLogin);
    console.log("userLogin", userLogin);

    if (userLogin) {
      if (userLogin.password === passwordLogin) {
        if (userLogin.condition !== "block") {
          userLogin.status = true;
          const reponse = await axios.patch(
            `http://localhost:6886/user/${userLogin.id}`,
            userLogin
          );
          localStorage.setItem("dataLogin", JSON.stringify(userLogin));
          // Đăng nhập thành công, chuyển hướng hoặc thực hiện các hành động khác
          toast("😎 Bạn đã đăng nhập thành công! 🤞🏻", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/");
          }, 3000);
          setInputForm({
            emailLogin: "",
            passwordLogin: "",
          });
        } else {
          toast("❌❌❌ Lỗi đăng nhập, tài khoản của bạn đã bị khoá!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } else {
        // Sai mật khẩu
        toast("❌❌❌ Lỗi đăng nhập, mật khẩu không đúng!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      // Người dùng không tồn tại
      toast("❌❌❌ Lỗi đăng nhập, người dùng không tồn tại!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const loadUser = async () => {
    let result = await axios.get("http://localhost:6886/user");
    setCheckUser(result.data);
  };

  const handleNavigate = () => {
    navigate("/signin-user");
  };

  useEffect(() => {
    loadUser();
  }, []);

  // console.log("checkUser", checkUser);

  return (
    <div>
      <div className=" w-screen h-screen flex flex-row items-center justify-center">
        {/* trái hình ảnh */}
        <div className="w-[380px] h-[581px] ">
          <div className="relative">
            <img
              src="https://f19-zpc.zdn.vn/5759024910144576082/f75356165c948ecad785.jpg"
              alt=""
            />
          </div>
          <Slider className="slider-login" {...settings}>
            <div className="image-item">
              <div className="image">
                <img
                  src="https://b-f9-zpcloud.zdn.vn/4963600322008771189/d10c7e3f64bdb6e3efac.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className="image-item">
              <div className="image">
                <img
                  src="https://b-f9-zpcloud.zdn.vn/6507909607856546440/d4fefa926b37b969e026.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className="image-item">
              <div className="image">
                <img
                  src="https://b-f9-zpcloud.zdn.vn/488812553929635167/aa2f614af0ef22b17bfe.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className="image-item">
              <div className="image">
                <img
                  src="https://b-f9-zpcloud.zdn.vn/1946886871966092812/ecd06cacfd092f577618.jpg"
                  alt=""
                />
              </div>
            </div>
          </Slider>
        </div>
        {/* phải */}
        <div className="  w-[380px] h-[581px] ml-4 ">
          {/* Đăng nhập */}
          <div className="border h-[415px]">
            <div className="flex flex-col items-center">
              {/* logo */}
              <div className="h-[80px] mt-8 ">
                <i
                  data-visualcompletion="css-img"
                  aria-label="Instagram"
                  className=""
                  role="img"
                  style={{
                    backgroundImage: `url("https://static.cdninstagram.com/rsrc.php/v3/yx/r/WtxJZZ3-9ZP.png")`,
                    backgroundPosition: "0px 0px",
                    backgroundSize: "176px 186px",
                    width: "174px",
                    height: "50px",
                    backgroundRepeat: " no-repeat",
                    display: "inline-block",
                  }}
                ></i>
              </div>

              {/* form */}
              <div className="h-[265px] w-[260px] flex flex-col cursor-pointer">
                <form onSubmit={handleSubmit}>
                  <input
                    className="inline-block w-full h-[40px] pl-2 mb-4 outline-none border rounded-xl"
                    type="text"
                    placeholder="Email"
                    name="emailLogin"
                    value={emailLogin}
                    onChange={handleChange}
                  />
                  <input
                    className="inline-block w-full h-[40px] pl-2 outline-none border rounded-xl"
                    type="password"
                    placeholder="Mật khẩu"
                    name="passwordLogin"
                    value={passwordLogin}
                    onChange={handleChange}
                  />
                  <button
                    type="submit"
                    className="w-full h-[32px] mt-4 bg-sky-500 rounded-xl text-white font-semibold "
                  >
                    Đăng nhập
                  </button>
                </form>
                <ToastContainer />

                {/* Hoặc */}
                <div className=" w-[265px] h-[20px] flex items-center mt-4 ">
                  <p className="opacity-50">_________________</p>
                  <p className="opacity-50">Hoặc</p>
                  <p className="opacity-50">_________________</p>
                </div>
                {/* Đăng nhập bằng FB */}
                <div className=" w-full h-[20px] mt-2 font-semibold text-blue-800 text-center">
                  <i className="fa-brands fa-facebook"></i> Đăng nhập bằng
                  Facebook
                </div>

                {/* Quên mật khẩu */}
                <div className="text-center mt-4">Quên mật khẩu ?</div>
              </div>
            </div>
          </div>

          {/* Đăng ký */}
          <div className=" w-[380px] h-[60px] mt-2 flex justify-around items-center border ">
            <p className="mt-3">Bạn chưa có tài khoản ư ? </p>

            <p
              onClick={handleNavigate}
              className="mt-3 font-semibold text-blue-800 cursor-pointer"
            >
              Đăng ký
            </p>
          </div>

          {/* Tải ứng dụng */}
          <div className="mt-3 w-[380px] h-[80px] flex flex-col items-center ">
            <p>tải ứng dụng</p>
            <div>
              <img
                className="w-full object-cover"
                src="https://f9-zpcloud.zdn.vn/4677209805415442285/b47edad87253a00df942.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
