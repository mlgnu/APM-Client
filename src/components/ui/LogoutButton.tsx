import { Button } from "@mantine/core";

const LogoutButton = () => {
  return (
    <Button
      component="a"
      href={import.meta.env.VITE_API_URL`/auth/google/logout`}
    >
      Log Out
    </Button>
  );
};
export default LogoutButton;
