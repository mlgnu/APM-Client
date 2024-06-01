import { Button } from "@mantine/core";
import axios from "axios"; // Make sure to install axios: npm install axios

const LoginButton = () => {
  const handleLogin = async () => {
    try {
      window.location.href = "http://localhost:3001/api/auth/google/login";
      // Send a request to your backend server to initiate the OAuth flow
      // const response = await axios.get(
      //   "http://localhost:3001/api/auth/google/login",
      // );
      // console.log(response.data); // Assuming the backend returns data upon success
      // Redirect or handle the response as needed
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Button onClick={handleLogin} variant="contained" color="primary">
      Log In
    </Button>
  );
};

export default LoginButton;
