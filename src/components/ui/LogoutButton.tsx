import { Button } from '@mantine/core';

const LogoutButton = () => {
  return (
    <Button component="a" href="http://localhost:3001/api/auth/google/logout">
      Log Out
    </Button>
  );
};
export default LogoutButton;
