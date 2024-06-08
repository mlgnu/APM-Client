import {
  Modal,
  ScrollArea,
  Textarea,
  Badge,
  Center,
  Box,
  Transition,
  Burger,
  Alert,
  Menu,
  rem,
  Portal,
  CloseButton,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconInfoCircle, IconMessage, IconSend2 } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { MessageList } from "./MessageList";
import { MessageCard } from "./MessageCard";
import { useFetchChat } from "../../hooks/useFetchChat";
import { useSendMessage } from "../../hooks/useSendMessage";

type MessageAdvisorProps = {
  isAdvisor: boolean;
  messageDisclosure: unknown;
};

export const MessageAdvisor = ({
  isAdvisor,
  messageDisclosure,
}: MessageAdvisorProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [chatId, setChatId] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<JSX.Element[]>([]);
  const [burgerOpened, { toggle: burgerToggle }] = useDisclosure(true);
  const { mutate: sendMessageMutate } = useSendMessage(chatId);
  const [fetchInterval, setFetchInterval] = useState(1000);
  const isMobile = useMediaQuery("(max-width: 50em)");

  const chat = useFetchChat(fetchInterval, isAdvisor, chatId);
  useEffect(() => {
    if (chat.data) {
      setMessages(
        chat.data.map((message) => (
          <MessageCard
            key={message.id}
            message={message.content}
            isSender={message.isSender}
          />
        )),
      );
    }
  }, [chat.data]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
      });
    }
  }, [chatId, messages]);

  useEffect(() => {
    if (opened) {
      setFetchInterval(1000);

      return () => {
        setFetchInterval(0);
      };
    }
  }, [opened]);

  const sendMessage = (message: string) => {
    if (!message) {
      return;
    }
    sendMessageMutate({ message, recieverId: chatId, isAdvisor });
    setMessages((prevMessages) => [
      ...prevMessages,
      <MessageCard key={Date.now()} message={message} isSender={true} />,
    ]);
    if (textAreaRef.current) {
      textAreaRef.current.value = "";
    }
  };

  return (
    <>
      <Menu.Item
        onClick={open}
        leftSection={
          <IconMessage style={{ width: rem(14), height: rem(14) }} />
        }
      >
        Message
      </Menu.Item>
      <Portal>
        <Modal
          fullScreen={isMobile}
          withinPortal={true}
          opened={opened}
          withCloseButton={false}
          onClose={close}
          size="70%"
        >
          {chatId === -1 ? (
            <Alert
              variant="light"
              color="blue"
              title="No Assignments Yet!"
              icon={<IconInfoCircle />}
            >
              {isAdvisor
                ? "No students have been assigned to you yet."
                : "No advisor has been assigned to you yet."}
            </Alert>
          ) : (
            <>
              <Modal.Header>
                <Burger opened={burgerOpened} onClick={burgerToggle} />
                <CloseButton
                  onClick={close}
                  style={{ marginLeft: 10 }}
                  size="lg"
                />
              </Modal.Header>
              <Box
                style={{
                  display: "flex",
                }}
              >
                <Transition
                  mounted={burgerOpened}
                  transition="fade-right"
                  duration={400}
                  timingFunction="ease"
                >
                  {(styles) => (
                    <MessageList styles={styles} setChatId={setChatId} />
                  )}
                </Transition>
                <Box style={{ marginLeft: 10, flexGrow: "1" }}>
                  <ScrollArea
                    viewportRef={scrollAreaRef}
                    offsetScrollbars
                    scrollHideDelay={500}
                    h={isMobile ? "calc(100vh - 130px)" : "calc(100vh - 200px)"}
                  >
                    {messages}
                  </ScrollArea>
                  <Box style={{ display: "flex", marginTop: "auto" }}>
                    <Textarea
                      ref={textAreaRef}
                      style={{ flexGrow: 1, marginRight: 10 }}
                      autosize
                      placeholder="Send Message"
                      radius="md"
                      variant="filled"
                      minRows={1}
                    ></Textarea>
                    <Badge color="blue" size="xl" circle>
                      <Center>
                        <IconSend2
                          onClick={() =>
                            sendMessage(textAreaRef.current?.value || "")
                          }
                          color="white"
                        />
                      </Center>
                    </Badge>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Modal>
      </Portal>
    </>
  );
};
