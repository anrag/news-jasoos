import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const HTMLEditor = (props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Paste yout content here</p>",
    onUpdate({ editor }) {
      props.changeContent(editor.getHTML());
    },
  });

  return (
    <EditorContent
      editor={editor}
      style={{ backgroundColor: "#fff", width: "100%" }}
    />
  );
};

export default HTMLEditor;
