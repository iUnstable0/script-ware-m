// Packages

import { useRef } from "react";

import clsx from "clsx";

// Components

import Editor from "@monaco-editor/react";

// Styles

import styles from "@/styles/index.module.scss";

import pageStyles from "@/components/styles/page.module.scss";

export default function Page({
  terminalVisibleState,
}: {
  terminalVisibleState: {
    terminalVisible: boolean;
    setTerminalVisible: (terminalVisible: boolean) => void;
  };
}) {
  const { terminalVisible, setTerminalVisible } = terminalVisibleState;

  const monacoRef = useRef(null);

  function handleEditorWillMount(monaco) {
    monaco.editor.defineTheme("default", {
      base: "vs-dark",
      inherit: true,
      rules: [
        {
          foreground: "#cccccc",
          token: "operator",
        },
        {
          foreground: "#cccccc",
          token: "text",
        },
        {
          foreground: "#ffc800",
          token: "number",
        },
        {
          foreground: "#aef195",
          token: "string",
        },
        {
          foreground: "#666666",
          token: "comment",
          fontStyle: "italic",
        },
        {
          foreground: "#84d6f7",
          token: "global",
        },
        {
          foreground: "#f86d7b",
          token: "keyword",
        },
        {
          foreground: "#84d6f7",
          token: "type",
        },
        {
          foreground: "#ffc800",
          token: "bool",
        },
        // {
        // 	foreground: "#6ccc9e",
        // 	token: "exglobal",
        // },
      ],
      colors: {
        "editor.background": "#FFFFFF00",

        "editor.lineHighlightBorder": "#FFFFFF00",
        "editor.lineHighlightBackground": "#294e6f35",
        //
        "editorWidget.background": "#041322",
        "editorWidget.border": "#082c4f",

        "input.background": "#121d2e",

        "minimap.background": "#FFFFFF00",
        // "scrollbar.shadow": "#FFFFFF00",

        "scrollbarSlider.background": "#294e6f65",
        "scrollbarSlider.hoverBackground": "#3d699165",
        "scrollbarSlider.activeBackground": "#325b8065",

        // "editor.scrollbarSlider.background": "#FFFFFF00",
        // "editor.minimap.background": "#FFFFFF00",
        // "editor.lineHighlightBackground": "#FFFFFF00",
      },
    });
  }

  function handleEditorDidMount(editor: any, monaco: any) {
    monacoRef.current = monaco;
  }

  return (
    <div className={pageStyles.container}>
      <Editor
        className={clsx(
          pageStyles.editor,
          terminalVisible && pageStyles.editor_terminal
        )}
        defaultLanguage="lua"
        defaultValue={`print("Hello World!")`}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        theme="default"
        options={{
          lineNumbers: "on",
          roundedSelection: true,
          scrollBeyondLastLine: true,
          readOnly: false,
          scrollbar: {
            useShadows: true,
            verticalHasArrows: false,
          },
          showFoldingControls: "always",
          smoothScrolling: true,
          colorDecorators: true,
          automaticLayout: true,
          folding: true,
          dragAndDrop: true,
          links: true,
          minimap: { enabled: false },
          acceptSuggestionOnEnter: "on",
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          autoClosingOvertype: "always",
          detectIndentation: true,
          autoIndent: "full",
          insertSpaces: true,
          cursorBlinking: "phase",
          formatOnPaste: true,
          formatOnType: true,
          snippetSuggestions: "bottom",
          stickyTabStops: true,
          wordBasedSuggestionsOnlySameLanguage: false,
        }}
      />
    </div>
  );
}
