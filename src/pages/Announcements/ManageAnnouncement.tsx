import { Button, Container, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { RichTextEditor } from "@mantine/tiptap";
import { useMakeAnnouncement } from "../../hooks/Announcement/useMakeAnnouncement";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EditAnnouncementParams,
  useEditAnnouncement,
} from "../../hooks/Announcement/useEditAnnouncement";

export const ManageAnnouncement = () => {
  const { state } = useLocation() as { state: EditAnnouncementParams };
  const annForm = useForm({
    initialValues: {
      title: state?.title || "",
      description: state?.announcement || "",
    },

    validate: {
      title: (value) => (value.length < 1 ? "Title is required" : null),
      description: (value) =>
        value.length <= 0 ? "Description is required" : null,
    },
  });

  const annEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: annForm.values.description,
    onUpdate({ editor }) {
      annForm.setFieldValue("description", editor.getHTML());
    },
  });

  useEffect(() => {
    annEditor?.chain().focus().run();
  }, [annEditor]);
  const navigate = useNavigate();

  const { mutate: makeAnnouncement } = useMakeAnnouncement();
  const { mutate: editAnnouncement } = useEditAnnouncement();

  const handleSubmit = () => {
    annForm.validate();
    if (annForm.isValid()) {
      if (state?.id) {
        editAnnouncement({
          id: state.id,
          title: annForm.values.title,
          announcement: annForm.values.description,
        });
        navigate("/");
        return;
      }
      makeAnnouncement({
        title: annForm.values.title,
        announcement: annForm.values.description,
      });
      navigate("/");
    }
  };

  return (
    <Container>
      <TextInput
        mb={10}
        placeholder="Announcement Title"
        {...annForm.getInputProps("title")}
      />
      <RichTextEditor
        style={{
          minHeight: "500px",
        }}
        editor={annEditor}
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
      {annForm.errors.description && (
        <Text size="sm" c="red">
          {annForm.errors.description}
        </Text>
      )}

      <Button fullWidth onClick={handleSubmit} mt={10}>
        Make Announcemet
      </Button>
    </Container>
  );
};
