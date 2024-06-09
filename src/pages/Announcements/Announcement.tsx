import {
  Accordion,
  ActionIcon,
  Button,
  Modal,
  Popover,
  Text,
} from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";
import { ManageAnnouncement } from "./ManageAnnouncement";
import { useContext, useState } from "react";
import { notifications } from "@mantine/notifications";
import { removeAnnouncement } from "../../data/api";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";
import { AnnouncementsEditor } from "./AnnouncementsEditor";
import { UserContext } from "../../utils/UserContext";
import { TypographyStylesProvider } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { EditAnnouncementParams } from "../../hooks/Announcement/useEditAnnouncement";

type AnnouncementProps = {
  isEditor: boolean;
  key: number;
  id: string;
  date: string;
  description: string;
  title: string;
};

export function Announcement({
  title,
  isEditor,
  key,
  id,
  date,
  description,
}: AnnouncementProps) {
  const user = useContext(UserContext);
  console.log(user);
  console.log("from user context: announcement1");
  const queryClient = useQueryClient();

  const openDeleteAnnoundementModal = () =>
    modals.openConfirmModal({
      title: "Delete Announcement",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this announcement? This action is
          destructive and you will cannot retrieve removed announcements back.
        </Text>
      ),
      labels: { confirm: "Delete announcement", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: () => remove(id),
    });

  const navigate = useNavigate();
  const handleEditAnn = () => {
    navigate("/announcement/manage", {
      state: {
        id: id,
        title: title,
        announcement: description,
      } as EditAnnouncementParams,
    });
  };

  const { mutate: remove } = useMutation({
    mutationFn: removeAnnouncement,
    onSuccess: () => {
      notifications.show({
        title: "Deleted Successfully",
        message: "Announcement has been deleted",
        autoClose: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
  const [popOpened, setpopOpened] = useState(false);
  return (
    <Accordion.Item
      style={{ position: "relative" }}
      // mx={200}
      key={id}
      value={id}
    >
      {isEditor && (
        <Popover
          opened={popOpened}
          onChange={setpopOpened}
          position="left-start"
          arrowPosition="side"
          width={100}
          //position="left"
          withArrow
          shadow="md"
        >
          <Popover.Target>
            <ActionIcon
              onClick={() => setpopOpened((o) => !o)}
              variant="light"
              aria-label="Settings"
              style={{ position: "absolute", top: "10px", right: "50px" }}
            >
              <IconAdjustments
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown style={{ padding: "0px" }}>
            <Button
              style={{ width: "100px", zIndex: "100" }}
              radius="xs"
              variant="light"
              onClick={() => {
                handleEditAnn();
                setpopOpened(false);
              }}
            >
              Edit
            </Button>
            <Button
              style={{ width: "100px" }}
              radius="xs"
              variant="light"
              color="red"
              onClick={openDeleteAnnoundementModal}
            >
              Delete
            </Button>
          </Popover.Dropdown>
        </Popover>
      )}

      <Accordion.Control style={{ marginLeft: "100" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Text size="lg" fw={500}>
            {title}
          </Text>
          <Text size="sm" c="dimmed" mr="100px">
            {date}
          </Text>
        </div>
      </Accordion.Control>
      <Accordion.Panel>
        <TypographyStylesProvider>
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </TypographyStylesProvider>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
