"use client";

// Packages

import { useEffect, useRef } from "react";

import { Gradient } from "@/lib/gradient";

// Components

import Editor from "@monaco-editor/react";

import Frame from "@/components/frame";

// Styles

import styles from "@/styles/index.module.scss";

export default function Page() {
  const monacoRef = useRef(null);

  function handleEditorWillMount(monaco) {
    // here is the monaco instance
    // do something before editor is mounted
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
        "editorWidget.background": "#121d2e",
        "editorWidget.border": "#1d2e3e",
        "minimap.background": "#FFFFFF00",
        // "scrollbar.shadow": "#FFFFFF00",
        "scrollbarSlider.background": "#294e6f35",
        "scrollbarSlider.hoverBackground": "#294e6f35",
        "scrollbarSlider.activeBackground": "#294e6f35",
        "editor.lineHighlightBorder": "#FFFFFF00",
        "editor.lineHighlightBackground": "#294e6f35",
        // "editor.scrollbarSlider.background": "#FFFFFF00",
        // "editor.minimap.background": "#FFFFFF00",
        // "editor.lineHighlightBackground": "#FFFFFF00",
      },
    });
  }

  function handleEditorDidMount(editor, monaco) {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    monacoRef.current = monaco;
  }

  useEffect(() => {
    const gradient: any = new Gradient();

    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <div>
      <div className={styles["gradient-blur"]} />
      <canvas className={styles["gradient-canvas"]} id="gradient-canvas" />

      <Frame />

      {/*<div className={styles.container}>*/}
      <Editor
        // height="90vh"
        // height="100vh"
        className={styles.container}
        defaultLanguage="lua"
        defaultValue="-- some comment"
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
      {/*</div>*/}
    </div>
  );
}
