import { Box, Center, Flex, Title } from "@mantine/core";
import { IconError404 } from "@tabler/icons-react";

export const NotFound = () => {
  return (
    <Flex justify="center" align="center" direction="column">
      <IconError404 color="#228be6" size={200} />
      <Title c="blue.6" order={1}>
        Not Found
      </Title>
    </Flex>
  );
};
