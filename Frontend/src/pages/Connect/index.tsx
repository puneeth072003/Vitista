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

import { IConnect } from "@/interface";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Connect() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messages, setMessages] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log(`${BACKEND_URL}/v1/signin`);
    const res = await axios.get<IConnect>(`${BACKEND_URL}/v1/signin`, {
      params: { username, password },
    });

    console.log(res.data);
    if (res.data && "error" in res.data) {
      setMessages("Invalid Username or Password");
      setError(true);
      const setOut = setTimeout(() => setError(false), 5000);
      clearTimeout(setOut);
    } else {
      setSuccess(true);
      const setOut = setTimeout(() => setError(false), 5000);
      clearTimeout(setOut);
      navigate("/");
    }
  };

  const handleSignup = async () => {
    const payload = {
      Username: username,
      Password: password,
    };
    const res = await axios.post<IConnect>(`${BACKEND_URL}/v1/login`, payload);
    if ("error" in res.data) {
      setError(true);
      setMessages("Username has been Taken. Try to set another Username.");
      const setOut = setTimeout(() => setError(false), 5000);
      clearTimeout(setOut);
    } else {
      setSuccess(true);
      const setOut = setTimeout(() => setError(false), 5000);
      clearTimeout(setOut);
      navigate("/");
    }
  };

  return (
    <>
      {error ? (
        <>
          <Alert variant="destructive" className="w-[80%] absolute left-[10%]">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{messages}</AlertDescription>
          </Alert>
        </>
      ) : (
        <></>
      )}
      {success ? (
        <>
          <Alert
            variant="default"
            className="w-[80%] absolute left-[10%] bg-transparent"
          >
            <FontAwesomeIcon className="h-4 w-4" icon={faThumbsUp} />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{messages}</AlertDescription>
          </Alert>
        </>
      ) : (
        <></>
      )}
      <main className="flex flex-col justify-center items-center h-[80vh]  ">
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
