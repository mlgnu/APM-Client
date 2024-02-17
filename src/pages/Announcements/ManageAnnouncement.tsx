// import { Button, Modal, Text } from '@mantine/core';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { removeAnnouncement } from '../../data/api';
// import { notifications } from '@mantine/notifications';
// import { AnnouncementsEditor } from './AnnouncementsEditor';
// // import { useContext } from 'react';
// import { EditorContext } from '../../context/EditorContext';
// import { useDisclosure } from '@mantine/hooks';
// import { modals } from '@mantine/modals';

// export function ManageAnnouncement(props: any) {
//   const [openedModal, { open: openModal, close: closeModal }] =
//     useDisclosure(false);
//   const queryClient = useQueryClient();

//   const openDeleteAnnoundementModal = () =>
//     modals.openConfirmModal({
//       title: 'Delete Announcement',
//       centered: true,
//       children: (
//         <Text size="sm">
//           Are you sure you want to delete this announcement? This action is
//           destructive and you will cannot retrieve removed announcements back.
//         </Text>
//       ),
//       labels: { confirm: 'Delete announcement', cancel: "No don't delete it" },
//       confirmProps: { color: 'red' },
//       onConfirm: () => remove(props.id),
//     });

//   const { mutate: remove } = useMutation({
//     mutationFn: removeAnnouncement,
//     onSuccess: () => {
//       notifications.show({
//         title: 'Deleted Successfully',
//         message: 'Announcement has been deleted',
//         autoClose: 3000,
//       });
//       queryClient.invalidateQueries({ queryKey: ['announcements'] });
//     },
//   });

//   return (
//     <>
//       <Button
//         style={{ width: '100px', zIndex: '100' }}
//         radius="xs"
//         variant="light"
//         onClick={() => {
//           openModal();
//           // close();
//           //  openEditor();
//           //   props.closePopup(false);
//         }}
//       >
//         Edit
//       </Button>
//       <Button
//         style={{ width: '100px' }}
//         radius="xs"
//         variant="light"
//         color="red"
//         onClick={openDeleteAnnoundementModal}
//       >
//         Delete
//       </Button>

//       {/* <Modal
//         opened={openedModal}
//         onClose={closeModal}
//         title="Announcements Manager"
//         size="100%"
//       >
//         <AnnouncementsEditor closeModal={closeModal} />
//       </Modal> */}
//       {/* <Button onClick={() => openModal()}></Button> */}
//     </>
//   );
// }
