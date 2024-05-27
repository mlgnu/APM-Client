import { relative } from "path";
import { AnnouncementsEditor } from "./AnnouncementsEditor";
import { ViewAnnouncements } from "./ViewAnnouncements";
import {
  Accordion,
  ActionIcon,
  Alert,
  Button,
  Container,
  LoadingOverlay,
  Modal,
  Notification,
  Pagination,
  Text,
} from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { EditorContext } from "../../context/EditorContext";
import { Announcement } from "./Announcement";
import { format, parseISO } from "date-fns";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAnnouncements } from "../../data/api";
import { ContextModalProps, ModalsProvider, modals } from "@mantine/modals";
import { UserContext } from "../../utils/UserContext";
import { useContext, useEffect, useState } from "react";
import classes from "./style/announcements.module.css";

type AnnouncementsProps = {
  isEditor: boolean;
};

export function Announcements({ isEditor }: AnnouncementsProps) {
  const user = useContext(UserContext);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["announcements", page],
    queryFn: () => getAnnouncements(page),
    placeholderData: keepPreviousData,
  });

  const [openedEditor, { open: openEditor, close: closeEditor }] =
    useDisclosure(false);
  console.log(data, "data");
  const announcements = data?.data?.payload.map((announcement: any) => (
    <Announcement
      isEditor={isEditor}
      key={announcement.id}
      id={announcement.id}
      date={formatDate(announcement.created_at)}
      description={announcement.announcement}
    />
  ));

  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Container size={1200}>
        <Accordion className={classes.announcements} variant="contained">
          {announcements}
        </Accordion>
      </Container>
      <Pagination
        className={classes.pagination}
        total={data?.data?.pages}
        onChange={setPage}
      />
      {isEditor && (
        <div style={{ position: "relative", minHeight: "100vh" }}>
          <ActionIcon
            style={{ position: "fixed", bottom: "20px", right: "20px" }}
            variant="filled"
            size="xl"
            aria-label="Settings"
            onClick={() => {
              modals.openContextModal({
                modal: "editor",
                title: "Announcements Mangager",
                size: "100%",
                innerProps: {
                  edit: false,
                  // description: '',
                  id: props.id,
                },
              });
            }}
          >
            <IconAdjustments
              style={{
                width: "70%",
                height: "70%",
              }}
              stroke={1.5}
            />
          </ActionIcon>
        </div>
      )}
      <Modal
        opened={openedEditor}
        onClose={closeEditor}
        title="Announcements Manager"
        size="100%"
      >
        <AnnouncementsEditor closeModal={closeEditor} />
      </Modal>
    </>
  );
}

function formatDate(date: any) {
  const parsedDate = parseISO(date);
  return format(parsedDate, "d MMMM yyyy");
}
