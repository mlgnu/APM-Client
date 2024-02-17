import { Button } from '@mantine/core';

const LoginButton = () => {
  return (
    <Button component="a" href="http://localhost:3001/api/auth/google/login">
      Log In
    </Button>
  );
};
export default LoginButton;
