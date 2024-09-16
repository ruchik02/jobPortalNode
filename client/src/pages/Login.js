import React, { useState } from "react";
import InputForms from "../components/shared/InputForms";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // redux state
  const { loading } = useSelector((state) => state.alerts);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (data.success) {
        dispatch(hideLoading());
        localStorage.setItem("token", data.token);
        alert("Login Successfully");
        // toast.success("Login SUccessfully ");
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(hideLoading());
      alert(error)
      //   toast.error("Invalid Credintial please try again!");
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="form-container">
          <form className="card p-2" onSubmit={handleSubmit}>
            <img
              src="/assets/images/logo/logo1.png"
              alt="logo"
              height={350}
              width={400}
            />
            <InputForms
              htmlFor="email"
              labelText={"Email"}
              type={"email"}
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <InputForms
              htmlFor="password"
              labelText={"Password"}
              type={"password"}
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <div className="d-flex justify-content-between">
              <p>
                Not a user <Link to="/register">Register Here!</Link>{" "}
              </p>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
