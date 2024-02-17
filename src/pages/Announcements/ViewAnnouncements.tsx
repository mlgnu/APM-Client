import { getAnnouncements } from '../../data/api';
import { useQuery } from '@tanstack/react-query';
import { Announcement } from './Announcement';
import { Accordion, LoadingOverlay } from '@mantine/core';
import { format, parseISO } from 'date-fns';
// const announcements = getAnnouncements().then((announcements) =>
//   console.log(announcements),
// );

export function ViewAnnouncements() {
  const { data, isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: getAnnouncements,
  });
  console.log(data?.data);
  if (isLoading)
    return (
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
    );
  const announcements = data?.data?.map((announcement: any) => (
    <Announcement
      key={announcement.id}
      id={announcement.id}
      date={formatDate(announcement.created_at)}
      description={announcement.announcement}
    />
  ));
  console.log();
  return <Accordion variant="contained">{announcements}</Accordion>;
}

function formatDate(date: any) {
  const parsedDate = parseISO(date);
  return format(parsedDate, 'do MMMM yyyy');
}
