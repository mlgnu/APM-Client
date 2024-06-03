import { RichTextEditor, Link } from "@mantine/tiptap";
import { useRichTextEditorContext } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Button, Modal } from "@mantine/core";
import { editAnnouncement, makeAnnouncement } from "../../data/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { useEffect } from "react";

let content = "";

export function AnnouncementsEditor(props: any) {
  if (props.edit == true) {
    content = props.description;
  } else content = "";
  const queryClient = useQueryClient();
  const { mutate: make } = useMutation({
    mutationFn: makeAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      notifications.show({
        title: "Announcement Made",
        message: "Announcement has been made",
        autoClose: 3000,
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: "Could not make announcement",
        autoClose: 3000,
        color: "red",
      });
    },
  });

  const { mutate: edit } = useMutation({
    mutationFn: editAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      notifications.show({
        title: "Announcement Edited",
        message: "Announcement has been edited",
        autoClose: 3000,
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: "Could not edit announcement",
        autoClose: 3000,
        color: "red",
      });
    },
  });

  console.log(props);

  const editorExtensions = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
  });

  const focus = useEffect(() => {
    editorExtensions?.chain().focus().run();
  }, [editorExtensions]);

  return (
    <>
      <RichTextEditor
        style={{
          minHeight: "500px",
        }}
        editor={editorExtensions}
        autoFocus
      >
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
      <Button
        onClick={() => {
          if (editorExtensions?.getText() === "") {
            notifications.show({
              title: "Empty Announcement",
              message: "Announcement cannot be empty",
              autoClose: 3000,
              color: "red",
            });
          } else {
            if (props.edit) {
              console.log(props);
              edit({
                id: props.id,
                announcement: editorExtensions?.getHTML()!,
              });
            } else {
              make(editorExtensions?.getHTML()!);
            }
            editorExtensions?.chain().clearContent(true);
            modals.closeAll();
            // props.closeModal();
          }
        }}
        style={{ width: "100%" }}
        mt={10}
      >
        {props.edit ? "Edit Announcement" : "Make Announcement"}
      </Button>
    </>
  );
}

// function GetText() {

// }
