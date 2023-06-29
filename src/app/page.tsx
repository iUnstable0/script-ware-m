"use client";

// Packages

import { useState, useEffect } from "react";

import { Gradient } from "@/lib/gradient";

// Components

import { motion, AnimatePresence } from "framer-motion";

// import Editor from "@monaco-editor/react";

import Frame from "@/components/frame";

import Home from "@/components/pages/home";
import Editor from "@/components/pages/editor";
import Library from "@/components/pages/library";

// Styles

import styles from "@/styles/index.module.scss";

// Types

import type { Pages } from "@/types/pages";

export default function Page() {
  const [page, setPage] = useState<Pages>("editor");

  const [terminalVisible, setTerminalVisible] = useState<boolean>(false),
    [editorVisible, setEditorVisible] = useState<boolean>(true);

  // const monacoRef = useRef(null);

  // function handleEditorWillMount(monaco) {
  // here is the monaco instance
  // do something before editor is mounted
  //   monaco.editor.defineTheme("default", {
  //     base: "vs-dark",
  //     inherit: true,
  //     rules: [
  //       {
  //         foreground: "#cccccc",
  //         token: "operator",
  //       },
  //       {
  //         foreground: "#cccccc",
  //         token: "text",
  //       },
  //       {
  //         foreground: "#ffc800",
  //         token: "number",
  //       },
  //       {
  //         foreground: "#aef195",
  //         token: "string",
  //       },
  //       {
  //         foreground: "#666666",
  //         token: "comment",
  //         fontStyle: "italic",
  //       },
  //       {
  //         foreground: "#84d6f7",
  //         token: "global",
  //       },
  //       {
  //         foreground: "#f86d7b",
  //         token: "keyword",
  //       },
  //       {
  //         foreground: "#84d6f7",
  //         token: "type",
  //       },
  //       {
  //         foreground: "#ffc800",
  //         token: "bool",
  //       },
  //       // {
  //       // 	foreground: "#6ccc9e",
  //       // 	token: "exglobal",
  //       // },
  //     ],
  //     colors: {
  //       "editor.background": "#FFFFFF00",
  //       "editorWidget.background": "#121d2e",
  //       "editorWidget.border": "#1d2e3e",
  //       "minimap.background": "#FFFFFF00",
  //       // "scrollbar.shadow": "#FFFFFF00",
  //       "scrollbarSlider.background": "#294e6f35",
  //       "scrollbarSlider.hoverBackground": "#294e6f35",
  //       "scrollbarSlider.activeBackground": "#294e6f35",
  //       "editor.lineHighlightBorder": "#FFFFFF00",
  //       "editor.lineHighlightBackground": "#294e6f35",
  //       // "editor.scrollbarSlider.background": "#FFFFFF00",
  //       // "editor.minimap.background": "#FFFFFF00",
  //       // "editor.lineHighlightBackground": "#FFFFFF00",
  //     },
  //   });
  // }

  // function handleEditorDidMount(editor, monaco) {
  //   // here is another way to get monaco instance
  //   // you can also store it in `useRef` for further usage
  //   monacoRef.current = monaco;
  // }

  useEffect(() => {
    const gradient: any = new Gradient();

    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <>
      <div
        className={styles["gradient_blur"]}
        style={{
          borderRadius: "10px",
        }}
      />
      <canvas
        className={styles["gradient_canvas"]}
        id="gradient-canvas"
        style={{
          borderRadius: "10px",
        }}
      />

      <Frame
        pageState={{
          page,
          setPage,
        }}
        terminalVisibleState={{
          terminalVisible,
          setTerminalVisible,
        }}
        editorVisibleState={{
          editorVisible,
          setEditorVisible,
        }}
      />

      {/*<AnimatePresence>*/}
      {/*  {page === "home" && (*/}
      {/*    <motion.div*/}
      {/*      key={page}*/}
      {/*      initial={{*/}
      {/*        opacity: 0,*/}
      {/*        display: "none",*/}
      {/*      }}*/}
      {/*      animate={{*/}
      {/*        opacity: 1,*/}
      {/*        display: "block",*/}
      {/*        transition: {*/}
      {/*          delay: 0.15,*/}
      {/*        },*/}
      {/*      }}*/}
      {/*      exit={{*/}
      {/*        opacity: 0,*/}
      {/*      }}*/}
      {/*      transition={{*/}
      {/*        duration: 0.15,*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <Home />*/}
      {/*    </motion.div>*/}
      {/*  )}*/}

      {/*  {page === "editor" && (*/}
      {/*    <motion.div*/}
      {/*      key={page}*/}
      {/*      initial={{*/}
      {/*        opacity: 0,*/}
      {/*        display: "none",*/}
      {/*      }}*/}
      {/*      animate={{*/}
      {/*        opacity: 1,*/}
      {/*        display: "block",*/}
      {/*        transition: {*/}
      {/*          delay: 0.15,*/}
      {/*        },*/}
      {/*      }}*/}
      {/*      exit={{*/}
      {/*        opacity: 0,*/}
      {/*      }}*/}
      {/*      transition={{*/}
      {/*        duration: 0.15,*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <Editor />*/}
      {/*    </motion.div>*/}
      {/*  )}*/}

      {/*  {page === "library" && (*/}
      {/*    <motion.div*/}
      {/*      key={page}*/}
      {/*      initial={{*/}
      {/*        opacity: 0,*/}
      {/*        display: "none",*/}
      {/*      }}*/}
      {/*      animate={{*/}
      {/*        opacity: 1,*/}
      {/*        display: "block",*/}
      {/*        transition: {*/}
      {/*          delay: 0.15,*/}
      {/*        },*/}
      {/*      }}*/}
      {/*      exit={{*/}
      {/*        opacity: 0,*/}
      {/*      }}*/}
      {/*      transition={{*/}
      {/*        duration: 0.15,*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <Library />*/}
      {/*    </motion.div>*/}
      {/*  )}*/}
      {/*</AnimatePresence>*/}

      {/*<AnimatePresence>*/}
      <div
        className={styles.page_container}
        style={{
          opacity: page === "home" ? 1 : 0,
          userSelect: "none",
        }}
      >
        <Home />
      </div>

      {/*{editorVisible && (*/}
      {/*  <motion.div*/}
      {/*    key={page}*/}
      {/*    initial={{*/}
      {/*      opacity: 0,*/}
      {/*      display: "none",*/}
      {/*    }}*/}
      {/*    animate={{*/}
      {/*      opacity: 1,*/}
      {/*      display: "block",*/}
      {/*      transition: {*/}
      {/*        delay: 0.15,*/}
      {/*      },*/}
      {/*    }}*/}
      {/*    exit={{*/}
      {/*      opacity: 0,*/}
      {/*    }}*/}
      {/*    transition={{*/}
      {/*      duration: 0.15,*/}
      {/*    }}*/}
      {/*  >*/}
      {editorVisible && (
        <div
          className={styles.page_container}
          style={{
            opacity: page === "editor" ? 1 : 0,
          }}
        >
          <Editor
            terminalVisibleState={{ terminalVisible, setTerminalVisible }}
          />
        </div>
      )}

      {/*  </motion.div>*/}
      {/*)}*/}
      {/*</AnimatePresence>*/}

      {/*<div className={styles.container}>*/}
      {/*<Editor*/}
      {/*  // height="90vh"*/}
      {/*  // height="100vh"*/}
      {/*  className={styles.container}*/}
      {/*  defaultLanguage="lua"*/}
      {/*  defaultValue="-- some comment"*/}
      {/*  beforeMount={handleEditorWillMount}*/}
      {/*  onMount={handleEditorDidMount}*/}
      {/*  theme="default"*/}
      {/*  options={{*/}
      {/*    lineNumbers: "on",*/}
      {/*    roundedSelection: true,*/}
      {/*    scrollBeyondLastLine: true,*/}
      {/*    readOnly: false,*/}
      {/*    scrollbar: {*/}
      {/*      useShadows: true,*/}
      {/*      verticalHasArrows: false,*/}
      {/*    },*/}
      {/*    showFoldingControls: "always",*/}
      {/*    smoothScrolling: true,*/}
      {/*    colorDecorators: true,*/}
      {/*    automaticLayout: true,*/}
      {/*    folding: true,*/}
      {/*    dragAndDrop: true,*/}
      {/*    links: true,*/}
      {/*    minimap: { enabled: false },*/}
      {/*    acceptSuggestionOnEnter: "on",*/}
      {/*    autoClosingBrackets: "always",*/}
      {/*    autoClosingQuotes: "always",*/}
      {/*    autoClosingOvertype: "always",*/}
      {/*    detectIndentation: true,*/}
      {/*    autoIndent: "full",*/}
      {/*    insertSpaces: true,*/}
      {/*    cursorBlinking: "phase",*/}
      {/*    formatOnPaste: true,*/}
      {/*    formatOnType: true,*/}
      {/*    snippetSuggestions: "bottom",*/}
      {/*    stickyTabStops: true,*/}
      {/*    wordBasedSuggestionsOnlySameLanguage: false,*/}
      {/*  }}*/}
      {/*/>*/}
      {/*</div>*/}
    </>
  );
}
