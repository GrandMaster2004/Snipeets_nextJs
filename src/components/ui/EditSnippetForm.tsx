"use client";
import { Editor } from "@monaco-editor/react";
import type { Snippet } from "@prisma/client";
import { Button } from "@/components/ui/button";
// import saveSnippet from "@/actions";
import { saveSnippet } from "@/actions";
import { useState } from "react";

export const EditsnippetForm = ({ snippet }: { snippet: Snippet }) => {
  const [code, setCode] = useState(snippet.code);

  const changeEventHandler = (value: string = "") => {
    setCode(value);
  };
  const saveSnippetAction = saveSnippet.bind(null, snippet.id, code);
  return (
    <div className="flex flex-col gap-4">
      <form action={saveSnippetAction} className="items-center justify-between">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl">Your Code Editor</h1>
          <Button type="submit">Save</Button>
        </div>

        <Editor
          height="40vh"
          defaultLanguage="javascript"
          defaultValue={code}
          onChange={changeEventHandler}
          className=" my-4"
          theme="vs-dark"
        />
      </form>
    </div>
  );
};

export default EditsnippetForm;
