// Packages

import { useRef } from "react";

import clsx from "clsx";

// Components

import { motion, AnimatePresence } from "framer-motion";

import Editor from "@monaco-editor/react";

// Styles

import styles from "@/styles/index.module.scss";

import pageStyles from "@/components/styles/page.module.scss";
import Image from "next/image";
import frameStyles from "@/components/styles/frame.module.scss";

export default function Page({
  windowState,
  terminalState,
  explorerState,
}: {
  windowState: {
    windowResizing: boolean;
    setWindowResizing: (windowResizing: boolean) => void;
  };
  terminalState: {
    terminalVisible: boolean;
    setTerminalVisible: (terminalVisible: boolean) => void;
    terminalHeight: number;
    setTerminalHeight: (terminalHeight: number) => void;
    renderTerminalHeight: number;
    setRenderTerminalHeight: (renderTerminalHeight: number) => void;
    terminalResizing: boolean;
    setTerminalResizing: (terminalResizing: boolean) => void;
  };
  explorerState: {
    explorerVisible: boolean;
    setExplorerVisible: (explorerVisible: boolean) => void;
    explorerWidth: number;
    setExplorerWidth: (explorerWidth: number) => void;
    renderExplorerWidth: number;
    setRenderExplorerWidth: (renderExplorerWidth: number) => void;
    explorerResizing: boolean;
    setExplorerResizing: (explorerResizing: boolean) => void;
  };
}) {
  const { windowResizing, setWindowResizing } = windowState;

  const {
    terminalVisible,
    setTerminalVisible,
    terminalHeight,
    setTerminalHeight,
    renderTerminalHeight,
    setRenderTerminalHeight,
    terminalResizing,
    setTerminalResizing,
  } = terminalState;

  const {
    explorerVisible,
    setExplorerVisible,
    explorerWidth,
    setExplorerWidth,
    renderExplorerWidth,
    setRenderExplorerWidth,
    explorerResizing,
    setExplorerResizing,
  } = explorerState;

  const monacoRef = useRef(null);

  function handleEditorWillMount(monaco: any) {
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

  const getEditorTransitions = () => {
    if (windowResizing) return "none";

    const transitions = [];

    if (!explorerResizing) {
      transitions.push("max-width 0.25s, min-width 0.25s, left 0.25s");
    }

    if (!terminalResizing) {
      transitions.push("max-height 0.25s, min-height 0.25s");
    }

    if (transitions.length === 0) return "none";

    return transitions.join(", ");
  };

  return (
    <div
      className={pageStyles.container}
      style={{
        height: terminalVisible
          ? `calc(100% - ${
              (terminalResizing ? renderTerminalHeight : terminalHeight) - 25
            }px)`
          : "100%",
        width: explorerVisible
          ? `calc(100% - ${
              (explorerResizing ? renderExplorerWidth : explorerWidth) - 40
            }px)`
          : "100%",
        minHeight: terminalVisible
          ? `calc(100% - ${
              (terminalResizing ? renderTerminalHeight : terminalHeight) - 25
            }px)`
          : "100%",
        maxHeight: terminalVisible
          ? `calc(100% - ${
              (terminalResizing ? renderTerminalHeight : terminalHeight) - 25
            }px)`
          : "100%",
        minWidth: explorerVisible
          ? `calc(100% - ${
              (explorerResizing ? renderExplorerWidth : explorerWidth) - 40
            }px)`
          : "100%",
        maxWidth: explorerVisible
          ? `calc(100% - ${
              (explorerResizing ? renderExplorerWidth : explorerWidth) - 40
            }px)`
          : "100%",
        left: explorerVisible
          ? `${(explorerResizing ? renderExplorerWidth : explorerWidth) - 40}px`
          : "0px",
        // background: "red",
        transition: getEditorTransitions(),
      }}
    >
      {/*<motion.div*/}
      {/*  className={pageStyles.run_container}*/}
      {/*  layout="position"*/}
      {/*  transition={{*/}
      {/*    duration: terminalResizing ? 0 : 0.25,*/}
      {/*    ...(!terminalResizing && {*/}
      {/*      type: "spring",*/}
      {/*      stiffness: 400,*/}
      {/*      damping: 35,*/}
      {/*    }),*/}
      {/*  }}*/}
      {/*>*/}
      <div className={pageStyles.run_container}>
        <Image
          src="assets/editor/run.svg"
          alt="Run"
          width={24}
          height={24}
          className={pageStyles.run}
          draggable={false}
        />
      </div>

      {/*</motion.div>*/}

      {/*<motion.div*/}
      {/*  className={pageStyles.editor_container}*/}
      {/*  initial={{*/}
      {/*      */}
      {/*  }}*/}
      {/*  layout="position"*/}
      {/*  transition={{*/}
      {/*    duration: explorerResizing ? 0 : 0,*/}
      {/*    ...(!explorerResizing && {*/}
      {/*      type: "spring",*/}
      {/*      stiffness: 400,*/}
      {/*      damping: 35,*/}
      {/*    }),*/}
      {/*  }}*/}
      {/*>*/}
      <div className={pageStyles.editor_container}>
        <Editor
          className={pageStyles.editor}
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
      {/*</motion.div>*/}
    </div>
  );
}
