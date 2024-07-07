import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { loginRoute } from "../utils/ApiRoutes.js";
import image1 from "../assets/Left.png";
const Signin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user != null) {
      navigate("/");
    }
  }, []);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { password, email } = values;
    const response = await axios.post(loginRoute, {
      email,
      password,
    });
    if (response.status === 200) {
      const data = response;
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
      console.log("login success");
    } else {
      console.log("Error in login:", response.data);
    }
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div class="flex mx-16">
        <div class="w-2/5 h-screen">
          <img class="w-full h-full" src={image1} alt="" />
        </div>
        <div class="w-1/2 flex justify-center items-center">
          <div class="bg-white h-2/5 w-2/5">
            <div className="w-[450px]">
              <div className="text-4xl font-normal">
                <h1>Sign up</h1>
              </div>
              <h1>
                Don't have an account?{" "}
                <span className="text-[#38CB8A]">
                  <Link to="/signup">Sign Up</Link>
                </span>
              </h1>
            </div>
            <br />
            <form action="" onSubmit={(event) => handleSubmit(event)}>
              <br />
              <div className="flex flex-col space-y-1.5">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  min="3"
                />
              </div>
              <br />
              <br />
              <div className="flex flex-col space-y-1.5 relative">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
                <br />
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
