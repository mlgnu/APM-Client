import { Box, Card, Paper, Text } from "@mantine/core";

type MessageCardProps = {
  message: string;
  isSender: boolean;
};

export const MessageCard = ({ message, isSender }: MessageCardProps) => {
  return (
    <Paper
      shadow="xs"
      radius="md"
      p="7px"
      style={{
        maxWidth: 400,
        width: "fit-content",
        backgroundColor: isSender ? "" : "#2196F3",
        allignItems: "flex-end",
        marginLeft: isSender ? "" : "auto",
        marginBottom: 7,
      }}
    >
      <Text truncate="end" size="md" c={isSender ? "" : "white"}>
        {message}
      </Text>
    </Paper>
  );
};
