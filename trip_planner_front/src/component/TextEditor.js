import { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import axios from "axios";

Quill.register("modules/ImageResize", ImageResize);

const TextEditor = (props) => {
  const data = props.data;
  const setData = props.setData;
  const url = props.url;

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const files = input.files;
      if (files !== null) {
        const form = new FormData();
        form.append("image", files[0]);
        axios
          .post(url, form, {
            headers: {
              contentType: "multipart/form-data",
              processData: false,
            },
          })
          .then((res) => {
            const editor = quillRef.current.getEditor();
            console.log(editor);
            const range = editor.getSelection();
            const backServer = process.env.REACT_APP_BACK_SERVER;
            editor.insertEmbed(
              range.index,
              "image",
              backServer + res.data.data
            );
            editor.setSelection(range.index + 1);
          })
          .catch((res) => {
            console.log(res);
          });
      }
    };
  };
  const quillRef = useRef();
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockqoute",
    "list",
    "bullet",
    "align",
    "image",
    "color",
  ];

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image", "video"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    };
  }, []);
  return (
    <ReactQuill
      ref={quillRef}
      formats={formats}
      theme="snow"
      value={data}
      onChange={setData}
      modules={modules}
    />
  );
};

export default TextEditor;
