// import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";

import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
// import { LogIn } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true);
      const res = await axios.post(
        "https://instaclone-byankur-backend.onrender.com/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        setInput({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center  items-center w-screen h-screen">
      <form
        onSubmit={signupHandler}
        className="shadow-lg flex flex-col gap-4 p-8"
      >
        <div className="my-4">
          <div className="flex flex-col items-center mt-10 px-4">
            <div className="flex items-center gap-1.5">
              <span className="text-3xl">
                <FaInstagram />
              </span>
              <span className="font-bold text-2xl tracking-wide bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
                InstaClone
              </span>
            </div>
            <p className="mt-2 font-serif text-sm bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
              by Ankur
            </p>
          </div>
          <p className="text-xs text-center  text-gray-600 font-serif">
            Signup to see photos and videos from your friends
          </p>
        </div>

        <div>
          <span className="py-2 font-medium">Username</span>
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>

        <div>
          <span className="py-2 font-medium">Email</span>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>

        <div>
          <span className="py-2 font-medium">Password</span>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>

        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait
          </Button>
        ) : (
          <Button type="submit">SignUp</Button>
        )}

        <span className="text-center">
          Already have an account ?
          <Link className="text-blue-600" to="/login">
            {" "}
            Login{" "}
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
