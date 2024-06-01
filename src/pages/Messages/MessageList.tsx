import { NavLink, Box } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useFetchContacts } from "../../hooks/useFetchContacts";

type MessageListProps = {
  setChatId: React.Dispatch<React.SetStateAction<number>>;
  styles: React.CSSProperties;
};

export const MessageList = ({ setChatId, styles }: MessageListProps) => {
  const [active, setActive] = useState(0);
  const contacts = useFetchContacts();
  console.log(contacts.data, "contacts");
  useEffect(() => {
    if (contacts.data?.length == 0) {
      setChatId(-1);
      return;
    }
    setChatId(contacts.data?.[active].id || 0);
  }, [active, contacts.data, setChatId]);

  if (contacts.data?.length == 0) {
    return;
  }
  const contactsNav = contacts.data?.map((contact, index) => {
    return (
      <NavLink
        href="#"
        key={contact.id}
        active={index === active}
        label={contact.firstName + " " + contact.lastName}
        onClick={() => setActive(index)}
      />
    );
  });
  console.log(contactsNav);
  return <Box style={styles}>{contactsNav}</Box>;
};
