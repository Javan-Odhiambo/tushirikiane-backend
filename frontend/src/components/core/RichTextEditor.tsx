"use client";

import { Button, Group, Stack } from "@mantine/core";
import { Link, RichTextEditor as MantineRichTextEditor } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

interface RichTextEditorProps {
  savedNotes: string;
  handleOnSave: (notes: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  savedNotes,
  handleOnSave,
}) => {
  const [content, setContent] = useState(savedNotes);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write something awesome ..." }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
    immediatelyRender: false,
  });

  const handleSave = () => {
    if (editor) {
      const html = editor.getHTML();
      setContent(html);
      handleOnSave(html);
    }
  };

  const handleCancel = () => {
    if (editor) {
      editor.commands.setContent(content);
    }
  };

  return (
    <Stack>
      <MantineRichTextEditor editor={editor}>
        <MantineRichTextEditor.Toolbar sticky stickyOffset={60}>
          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.Bold />
            <MantineRichTextEditor.Italic />
            <MantineRichTextEditor.Underline />
            <MantineRichTextEditor.Strikethrough />
            <MantineRichTextEditor.ClearFormatting />
            <MantineRichTextEditor.Highlight />
            <MantineRichTextEditor.Code />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.H1 />
            <MantineRichTextEditor.H2 />
            <MantineRichTextEditor.H3 />
            <MantineRichTextEditor.H4 />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.Blockquote />
            <MantineRichTextEditor.Hr />
            <MantineRichTextEditor.BulletList />
            <MantineRichTextEditor.OrderedList />
            <MantineRichTextEditor.Subscript />
            <MantineRichTextEditor.Superscript />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.Link />
            <MantineRichTextEditor.Unlink />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.AlignLeft />
            <MantineRichTextEditor.AlignCenter />
            <MantineRichTextEditor.AlignJustify />
            <MantineRichTextEditor.AlignRight />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.Undo />
            <MantineRichTextEditor.Redo />
          </MantineRichTextEditor.ControlsGroup>
        </MantineRichTextEditor.Toolbar>

        <MantineRichTextEditor.Content />
      </MantineRichTextEditor>

      <Group justify="flex-end" mt="sm">
        <Button variant="subtle" color="red" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </Group>
    </Stack>
  );
};

export default RichTextEditor;
