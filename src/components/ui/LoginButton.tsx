import { Button } from "@mantine/core";

const LoginButton = () => {
  const handleLogin = async () => {
    try {
      window.location.href =
        import.meta.env.VITE_API_URL + "/auth/google/login";
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Button
      style={{ marginLeft: "auto" }}
      onClick={handleLogin}
      variant="contained"
      color="primary"
    >
      Log In
    </Button>
  );
};

export default LoginButton;
