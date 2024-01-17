import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import { IConnectSuccess, IConnectRegister } from "@/interface";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { switchState } from "@/redux/slices/loadingSpinner";

import {
  setUsernameFromConnect,
  setUserStorageFromConnect,
  setToLocalStorage,
} from "@/redux/slices/userStorage";

import logo from "@/assets/icon.png";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Connect() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messages, setMessages] = useState(
    "Username has been Taken. Try to set another Username."
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(switchState(true));
    await axios
      .get<IConnectSuccess>(`${BACKEND_URL}/v1/signin`, {
        params: { username, password },
      })
      .then((res) => {
        dispatch(setUsernameFromConnect(res.data.username));
        dispatch(setToLocalStorage());
        setMessages("Login Successfull!");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        err?.response?.status === 400
          ? setMessages("Invalid Username or Password")
          : setMessages("Server Error");
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      })
      .finally(() => dispatch(switchState(false)));
  };

  const handleSignup = async () => {
    dispatch(switchState(true));
    const payload = {
      Username: username,
      Password: password,
    };
    await axios
      .post<IConnectSuccess>(`${BACKEND_URL}/v1/login`, payload)
      .then((res) => {
        const dateOfJoin = new Date().toString();

        const data: IConnectRegister = {
          username: res.data.username,
          firstName,
          dateOfJoin,
        };

        dispatch(setUserStorageFromConnect(data));
        dispatch(setToLocalStorage());
        setMessages("Sign Up Successfull!");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        err?.response?.status === 400
          ? setMessages("Username has been Taken. Try to set another Username.")
          : setMessages("Server Error");

        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      })
      .finally(() => dispatch(switchState(false)));
  };

  return (
    <>
      <main
        data-place="connect"
        className="flex flex-col justify-center items-center h-[85vh] gap-[2rem]"
      >
        {error && (
          <>
            <Alert
              variant="destructive"
              className="w-[80%] shadow shadow-[#00000017] bg-[#00000005] backdrop-blur absolute top-20"
            >
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle className="font-[Ubuntu]">Error</AlertTitle>
              <AlertDescription className="font-[Poppins]">
                {messages}
              </AlertDescription>
            </Alert>
          </>
        )}
        {success && (
          <>
            <Alert
              variant="default"
              className="w-[80%] shadow shadow-[#00000017] bg-[#00000005] backdrop-blur absolute top-20"
            >
              <FontAwesomeIcon className="h-4 w-4" icon={faThumbsUp} />
              <AlertTitle className="font-[Ubuntu]">Success</AlertTitle>
              <AlertDescription className="font-[Poppins]">
                {messages}
              </AlertDescription>
            </Alert>
          </>
        )}
        <div className="flex justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm gap-[2rem]">
          <img className="h-10 w-auto" src={logo} alt="Logo" />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Connect with Us
          </h2>
        </div>
        <Tabs defaultValue="login" className="w-inherit px-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Login to your Account with Username and Password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your Username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-[#212121] hover:bg-[#000] hover:text-[#44D9E6] hover:text-[0.95rem] transition-[font-size]"
                  onClick={handleLogin}
                >
                  Log In
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Sign Up to your Account with Username and Password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    placeholder="Enter your First Name..."
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your Username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-[#212121] hover:bg-[#000] hover:text-[#44D9E6] hover:text-[0.95rem] transition-[font-size]"
                  onClick={handleSignup}
                >
                  Sign Up
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}

export default Connect;
