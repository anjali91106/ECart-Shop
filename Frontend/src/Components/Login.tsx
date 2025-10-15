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

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };


  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/user/log-in",
        userData
      );
      console.log(res.data);
      toast("LogIn successful!", {
        action: {
          label: "OK",
          onClick: () => navigate("/"),
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
        <CardTitle>Log In with ShopSphere</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogIn}>
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
          </div>

          <Button type="submit" className="w-fit m-1">
            LogIn
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-fit m-auto text-white"
            onClick={() => {
              window.location.href = "http://localhost:3000/auth/google";
            }}
          >
            LogIn with Google
          </Button>
      </CardFooter>
      <Toaster position="top-left" />
    </Card>
  )
}

export default Login
