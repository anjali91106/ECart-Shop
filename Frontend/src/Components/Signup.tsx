import { useState } from "react";
import { Button } from "./ui/button"
import axios from "axios";
import { toast, Toaster } from "sonner";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";

interface ErrorResponse {
  message: string;
}

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    age: 0,
    gender: "",
    email: "",
    password: "",
    phoneNo: ""
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };


  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://ecart-shop.onrender.com/user/sign-up",
        userData
      );
      localStorage.setItem("data", res.data.user);
      console.log(res.data.user);
      toast(`Signup successful! `, {
        action: {
          label: "OK",
          onClick: () => navigate("/log-in"),
        },
      });
    } catch (err: unknown) {
      if (axios.isAxiosError<ErrorResponse>(err)) {
        const message = err.response?.data?.message || err.message;
        // console.error(message);
        toast.error(message);
      } else {
        // console.error(err);
        toast.error("Unexpected error occurred!");
      }
    }
  };


  return (
    <Card className="w-fit md:w-100">
      <CardHeader>
        <CardTitle>Create new account with ShopSphere</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" name="password" type="password" required
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="name">Name</Label>
              </div>
              <Input id="name" name="name" type="text" required
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="age">Age</Label>
              </div>
              <Input id="age" name="age" type="number" required
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="phoneNo">PhoneNo.</Label>
              </div>
              <Input id="phoneNo" name="phoneNo" type="number" required
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="Gender">Type Your Gender: </Label>
              </div>
              <Input id="gender" name="gender" type="gender" required
                onChange={handleChange}
              />
            </div>
          </div>

          <Button type="submit" className="w-fit m-1">
            SignUp
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col">
        <Button className="w-fit m-auto text-white"
          onClick={() => {
            window.location.href = "http://localhost:3000/auth/google";
          }}
        >
          SignUp with Google
        </Button>
        <p className="text-black/50">
          If already have an account then log-In
        </p>
        <Button className="w-fit m-auto"
          onClick={() => {
            navigate('/log-in')
          }}
        >
          LogIn
        </Button>
      </CardFooter>
      <Toaster position="top-left" />
    </Card>
  )
}

export default Signup
