import React from "react";
// bước 1 : import formik : =>> formik chịu trách nhiệm xử lý các trạng thái trong form
import { useFormik } from "formik";
// bước 3 : import yup ==>> yup chịu trách nhiệm xử lý calidate cho form
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const navigate = useNavigate();

  // bước 2 : khai báo formik
  const formik = useFormik({
    initialValues: {
      useName: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    // bước 4 : sử dụng yup để viết các điều kiện cho ô Input
    validationSchema: Yup.object({
      useName: Yup.string()
        .min(5, "Cần nhiều hơn 5 ký tự")
        .max(25, "Không được nhập quá 25 ký tự")
        .required("Không được để trống"),
      fullName: Yup.string()
        .min(5, "Cần nhiều hơn 5 ký tự")
        .max(25, "Không được nhập quá 25 ký tự")
        .required("Không được để trống"),
      email: Yup.string()
        .email("Email chưa đúng định dạng")
        .required("Không được để trống"),

      password: Yup.string()
        .min(8, "Nhập nhiều hơn 8 ký tự")
        .required("Không được để trống"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Mật khẩu không trùng khớp")
        .required("Không được để trống"),
    }),
    onSubmit: async (values) => {
      const response = await axios.post("http://localhost:6886/user", {
        userName: values.useName,
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        followers: [],
        following: [],
        avata: [
          {
            image:
              "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-1.jpg",
            activeAvata: true,
          },
        ],
        status: false,
        condition: "unblock",
      });
      console.log(values);
      toast("😎 Bạn đã đăng ký tài khoản thành công 🤞🏻 !", {
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
        navigate("/login-user");
      }, 3000);

      // Đặt lại giá trị của ô input về rỗng
      formik.resetForm();
    },
  });

  // sự kiện onSumit

  // console.log("formik", formik.initialValues);

  return (
    <div>
      <div className="m-auto w-[350px] h-[730px] mt-2 ">
        {/* đăng ký */}
        <div className="w-full h-[500px] text-center border ">
          {/* logo */}
          <div className="h-[70px] pt-6  ">
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
                height: "40px",
                backgroundRepeat: " no-repeat",
                display: "inline-block",
              }}
            ></i>
          </div>
          {/* form */}
          <div className=" w-full h-[370px] flex flex-col items-center mt-5">
            <form onSubmit={formik.handleSubmit}>
              <input
                className="inline-block w-[260px] h-[30px] pl-2 rounded-xl outline-none border mb-3"
                type="text"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-xs text-red-500 h-[5px]">
                  {formik.errors.email}
                </p>
              )}

              <input
                className="inline-block  w-[260px] h-[30px] pl-2 rounded-xl outline-none border mb-3"
                type="text"
                placeholder="Tên đầy đủ"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
              />
              {formik.errors.fullName && formik.touched.fullName && (
                <p className="text-xs text-red-500 h-[5px]">
                  {formik.errors.fullName}
                </p>
              )}

              <input
                className="inline-block  w-[260px] h-[30px] pl-2 rounded-xl outline-none border mb-3"
                type="text"
                placeholder="Tên người dùng"
                name="useName"
                value={formik.values.useName}
                onChange={formik.handleChange}
              />
              {formik.errors.useName && formik.touched.useName && (
                <p className="text-xs text-red-500 h-[5px]">
                  {formik.errors.useName}
                </p>
              )}

              <input
                className="inline-block  w-[260px] h-[30px] pl-2 rounded-xl outline-none border mb-3"
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-xs text-red-500 h-[5px]">
                  {formik.errors.password}
                </p>
              )}

              <input
                className="inline-block  w-[260px] h-[30px] pl-2 rounded-xl outline-none border mb-3"
                type="password"
                placeholder="Xác nhận lại mật khẩu"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <p className="text-xs text-red-500 h-[5px]">
                    {formik.errors.confirmPassword}
                  </p>
                )}

              <button
                type="submit"
                className=" w-[260px] h-[36px] bg-blue-600 font-semibold text-white rounded-xl"
              >
                Đăng ký
              </button>
            </form>

            <ToastContainer />
          </div>
        </div>

        {/* đăng nhập */}
        <div className=" border w-full h-[80px] mt-2 flex flex-row justify-around items-center">
          <p>Bạn đã có tài khoản </p>
          <p className="font-semibold text-blue-500">Đăng nhập</p>
        </div>

        {/* tải ứng dụng */}
        <div className="mt-2 w-[350px] h-[80px] flex flex-col items-center ">
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
  );
}

export default Signin;
