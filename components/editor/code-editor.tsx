"use client";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";
import { cn } from "@/lib/utils";
import ReactCodeMirror, {
  EditorView,
  highlightActiveLine,
} from "@uiw/react-codemirror";
import { FC, useEffect, useState } from "react";
import CodeTitleBar from "./code-title-bar";

interface CodeEditorProps {
  id: string;
  content: string;
  language: string;
  textSize: string;
  title: string;
  snipperAuthorId: string;
  currentUserId?: string;
  readOnly?: boolean;
}
export type ContentEditableEvent = React.SyntheticEvent<any, Event> & {
  target: {
    value: string;
  };
};

const CodeEditor: FC<CodeEditorProps> = ({
  id,
  content,
  language,
  textSize,
  title,
  snipperAuthorId,
  currentUserId,
  readOnly,
}) => {
  // const { mutate, pending } = useApiMutation(api.snippet.updateContent);
  // // const { data } = useSession();
  const [originalcontent, setOriginalcontent] = useState(content);
  const [extension, setExtension] = useState<any>(null);
  const [fileExtension, setFileExtension] = useState("");
  useEffect(() => {
    setOriginalcontent(content);
  }, [content]);

  useEffect(() => {
    // Find the selected language in your SUPPORTED_LANGUAGES array
    const languageDefinition = SUPPORTED_LANGUAGES.find(
      (lang: any) => lang.id === language
    );

    let fileExtension = "";
    if (languageDefinition) {
      setFileExtension(languageDefinition.fileExtension);
      // Load the extension for the selected language
      languageDefinition.extension().then(setExtension);
    }
  }, [language]);

  // const handleContentChange = (value: string, viewUpdate: ViewUpdate) => {
  //   mutate({
  //     id: id,
  //     content: value,
  //     userId: currentUserId,
  //   })
  //     .then(() => {
  //       toast.success("Content Updated");
  //     })
  //     .catch(() => {
  //       toast.error("Failed to update content");
  //     });
  // };

  return (
    <>
      <div className="flex flex-col w-[250px] md:w-full">
        <CodeTitleBar
          title={title}
          content={content}
          fileExtension={fileExtension}
          snippetId={id}
          snipperAuthorId={snipperAuthorId}
        />

        <ReactCodeMirror
          className={cn(
            "w-auto min-w-[250px] max-w-[5xl] max-h-[100%] overflow-y-auto"
          )}
          style={{
            fontSize: `${textSize}`,
          }}
          value={`${content}`}
          lang={`${language}`}
          extensions={[
            extension ? [extension] : [],
            EditorView.lineWrapping,
            highlightActiveLine(),
          ]}
          readOnly={readOnly ?? false}
          theme={"dark"}
          placeholder="//Enter code snippet here..."
          // onChange={handleContentChange}
        />
      </div>
    </>
  );
};

export default CodeEditor;
