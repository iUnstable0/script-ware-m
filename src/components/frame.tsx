// Packages

import { useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";

import { invoke } from "@tauri-apps/api/tauri";

// import { useHotkeys } from "react-hotkeys-hook";

// import { Resizable } from "react-resizable";
import { Resizable } from "re-resizable";

import clsx from "clsx";

import { appWindow } from "@/lib/window";

// Components

import Image from "next/image";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

// Styles

import frameStyles from "@/components/styles/frame.module.scss";

// Fonts

import { Mulish } from "next/font/google";

const mulish = Mulish({ subsets: ["latin"] });

// Types

import type { Pages } from "@/types/pages";

export default function Component({
  pageState,
  terminalState,
  editorState,
}: {
  pageState: {
    page: Pages;
    setPage: (page: Pages) => void;
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
  editorState: {
    editorVisible: boolean;
    setEditorVisible: (editorVisible: boolean) => void;
  };
}): JSX.Element {
  const router = useRouter();

  const [updateMaximized, setUpdateMaximized] = useState<boolean>(false),
    [maximized, setMaximized] = useState<boolean>(false);

  const [innerHeight, setInnerHeight] = useState<number>(0),
    [intervalRan, setIntervalRan] = useState<boolean>(false);

  const [reloadSpin, setReloadSpin] = useState<boolean>(false);

  const { page, setPage } = pageState,
    {
      terminalVisible,
      setTerminalVisible,
      terminalHeight,
      setTerminalHeight,
      renderTerminalHeight,
      setRenderTerminalHeight,
      terminalResizing,
      setTerminalResizing,
    } = terminalState,
    { editorVisible, setEditorVisible } = editorState;

  // useHotkeys("*", async (_, handler: any) => {
  //   await invoke("log", {
  //     content: handler,
  //   });
  // });

  useEffect(() => {
    (async () => {
      setMaximized(await (await appWindow()).isMaximized());
    })();
  }, [updateMaximized]);

  useEffect(() => {
    if (intervalRan) return;

    setIntervalRan(true);

    setInterval(() => setInnerHeight(window.innerHeight), 1);
  }, []);

  useEffect(() => {
    setUpdateMaximized(!updateMaximized);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        data-tauri-drag-region
        className={clsx(frameStyles.bar, frameStyles.topbar)}
        onClick={() => setUpdateMaximized(!updateMaximized)}
      >
        <div
          data-tauri-drag-region
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "10px",
            marginBottom: "6px",
            marginTop: "3px",
          }}
          onClick={() => setUpdateMaximized(!updateMaximized)}
        >
          {/*<Image*/}
          {/*  src="logo.svg"*/}
          {/*  alt="Script-Ware Logo"*/}
          {/*  width={35}*/}
          {/*  height={35}*/}
          {/*  className={frameStyles.logo}*/}
          {/*/>*/}
          <p
            data-tauri-drag-region
            className={mulish.className}
            style={{
              color: "#e2e2e2",
              fontSize: "16px",
              fontWeight: 700,
              fontStyle: "italic",
            }}
            onClick={() => setUpdateMaximized(!updateMaximized)}
          >
            Script
          </p>
          <p
            data-tauri-drag-region
            className={mulish.className}
            style={{
              color: "#2b72e0",
              fontSize: "16px",
              fontWeight: 700,
              fontStyle: "italic",
            }}
            onClick={() => setUpdateMaximized(!updateMaximized)}
          >
            -
          </p>
          <p
            data-tauri-drag-region
            className={mulish.className}
            style={{
              color: "#e2e2e2",
              fontSize: "16px",
              fontWeight: 700,
              fontStyle: "italic",
              marginLeft: "-2px",
            }}
            onClick={() => setUpdateMaximized(!updateMaximized)}
          >
            Ware
          </p>
        </div>
        <div></div>
        <div onClick={() => setUpdateMaximized(!updateMaximized)}>
          {/*<Image*/}
          {/*  src="assets/frame/notifications.svg"*/}
          {/*  alt="Files"*/}
          {/*  width={24}*/}
          {/*  height={24}*/}
          {/*  className={frameStyles.topbar_item}*/}
          {/*  // style={{*/}
          {/*  //   marginRight: "6px",*/}
          {/*  // }}*/}
          {/*/>*/}
          {/*<Image*/}
          {/*  src="assets/frame/settings.svg"*/}
          {/*  alt="Files"*/}
          {/*  width={24}*/}
          {/*  height={24}*/}
          {/*  className={frameStyles.topbar_item}*/}
          {/*/>         */}
          <Image
            src="assets/frame/minimize.svg"
            alt="Minimize"
            width={22}
            height={22}
            className={frameStyles.topbar_item}
            onClick={async () => await (await appWindow()).minimize()}
            draggable={false}
          />
          {/*<div className={frameStyles.topbar_item_maximize}>*/}

          {maximized ? (
            <Image
              src="assets/frame/unmaximize.svg"
              alt="Unmaximize"
              width={16}
              height={16}
              className={frameStyles.topbar_item_maximize}
              onClick={async () => {
                const isMaximized = await (await appWindow()).isMaximized();

                await (
                  await appWindow()
                )[`${isMaximized ? "un" : ""}maximize`]();

                setMaximized(!isMaximized);
              }}
              draggable={false}
            />
          ) : (
            <Image
              src="assets/frame/maximize.svg"
              alt="Maximize"
              width={16}
              height={16}
              className={frameStyles.topbar_item_maximize}
              onClick={async () => {
                const isMaximized = await (await appWindow()).isMaximized();

                await (
                  await appWindow()
                )[`${isMaximized ? "un" : ""}maximize`]();

                setMaximized(!isMaximized);
              }}
              draggable={false}
            />
          )}

          {/*  <Image*/}
          {/*    src="assets/frame/unmaximize.svg"*/}
          {/*    alt="Unmaximize"*/}
          {/*    width={16}*/}
          {/*    height={16}*/}
          {/*    style={{*/}
          {/*      opacity: `${maximized ? "1" : "0"}`,*/}
          {/*      transition: "all 0.25s",*/}
          {/*    }}*/}
          {/*    onClick={async () => {*/}
          {/*      const isMaximized = await (await appWindow()).isMaximized();*/}

          {/*      await (*/}
          {/*        await appWindow()*/}
          {/*      )[`${isMaximized ? "un" : ""}maximize`]();*/}

          {/*      setMaximized(isMaximized);*/}
          {/*    }}*/}
          {/*    draggable={false}*/}
          {/*  />*/}
          {/*</div>*/}
          <Image
            src="assets/frame/close_small.svg"
            alt="Close"
            width={22}
            height={22}
            className={frameStyles.topbar_item_close}
            onClick={async () => await (await appWindow()).close()}
            draggable={false}
          />
        </div>
      </div>

      <div data-tauri-drag-region className={frameStyles.leftbar_container}>
        <div
          data-tauri-drag-region
          className={clsx(frameStyles.bar, frameStyles.leftbar)}
        >
          <div
            style={{
              paddingLeft: "2px",
              // marginLeft: "2px",
            }}
          >
            <Image
              src="assets/frame/home.svg"
              alt="Home"
              width={24}
              height={24}
              className={clsx(
                frameStyles.leftbar_item,
                frameStyles.leftbar_item_top,
                page === "home" && frameStyles.leftbar_item_active
              )}
              style={{
                marginTop: "4px",
              }}
              draggable={false}
              onClick={() => setPage("home")}
            />
            <Image
              src="assets/frame/folder.svg"
              alt="Files"
              width={24}
              height={24}
              className={clsx(
                frameStyles.leftbar_item,
                frameStyles.leftbar_item_top,
                page === "editor" && frameStyles.leftbar_item_active
              )}
              draggable={false}
              onClick={() => setPage("editor")}
            />
            <Image
              src="assets/frame/library.svg"
              alt="Script Library"
              width={24}
              height={24}
              className={clsx(
                frameStyles.leftbar_item,
                frameStyles.leftbar_item_top,
                page === "library" && frameStyles.leftbar_item_active
              )}
              draggable={false}
              onClick={() => setPage("library")}
            />
          </div>
          <div>
            <AnimatePresence>
              {page === "editor" && (
                <motion.div
                  key="toggle-terminal-visible-btn"
                  initial={{
                    opacity: 0,
                    transform: "scale(0.8)",
                  }}
                  animate={{
                    opacity: 1,
                    transform: "scale(1)",
                  }}
                  exit={{
                    opacity: 0,
                    transform: "scale(0.8)",
                  }}
                  transition={{
                    duration: 0.15,
                  }}
                >
                  <Image
                    src="assets/frame/terminal.svg"
                    alt="Terminal"
                    width={24}
                    height={24}
                    className={clsx(
                      frameStyles.leftbar_item,
                      frameStyles.leftbar_item_bottom,
                      terminalVisible && frameStyles.leftbar_item_active
                    )}
                    draggable={false}
                    onClick={() => setTerminalVisible(!terminalVisible)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/*<AnimatePresence>*/}
      {/*  {terminalVisible && (*/}

      <Resizable
        defaultSize={{
          width: "100%",
          height: 100,
        }}
        minHeight={100}
        maxHeight={innerHeight - 100}
        size={{ width: "100%", height: terminalHeight }}
        onResizeStart={(e, direction, ref) => {
          setTerminalResizing(true);
        }}
        onResize={(e, direction, ref, d) => {
          // setTerminalHeight(terminalHeight + d.height);
          // console.log(terminalHeight + d.height);
          //
          setRenderTerminalHeight(terminalHeight + d.height);
        }}
        onResizeStop={(e, direction, ref, d) => {
          setTerminalHeight(terminalHeight + d.height);
          setTerminalResizing(false);
        }}
        className={frameStyles.terminal_container}
        style={{
          // background: "red",
          opacity: page === "editor" ? (terminalVisible ? 1 : 0) : 0,
          zIndex: page === "editor" ? (terminalVisible ? 1 : -1) : -1,
        }}
      >
        {/*<div*/}
        {/*  className={frameStyles.terminal_container}*/}
        {/*  style={{*/}
        {/*    opacity: page === "editor" ? (terminalVisible ? 1 : 0) : 0,*/}
        {/*    zIndex: page === "editor" ? (terminalVisible ? 1 : -1) : -1,*/}
        {/*    height: `${terminalHeight}px`,*/}
        {/*  }}*/}
        {/*>*/}
        <div className={frameStyles.terminal}></div>
        {/*</div>*/}
      </Resizable>

      {/*  )}*/}
      {/*</AnimatePresence>*/}

      <div
        data-tauri-drag-region
        className={clsx(frameStyles.bar, frameStyles.bottombar)}
      >
        <div></div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LayoutGroup>
            <AnimatePresence>
              {page === "editor" && (
                <motion.div
                  key="reload-editor-btn"
                  style={{
                    marginRight: "6px",
                  }}
                  initial={{
                    opacity: 0,
                    transform: "scale(0.8)",
                  }}
                  animate={{
                    opacity: 1,
                    transform: "scale(1)",
                  }}
                  exit={{
                    opacity: 0,
                    transform: "scale(0.8)",
                  }}
                  transition={{
                    duration: 0.15,
                  }}
                  layout
                >
                  <Image
                    src="assets/frame/reload.svg"
                    alt="Reload"
                    width={12}
                    height={12}
                    className={clsx(
                      frameStyles.bottombar_item,
                      frameStyles.bottombar_item_right,
                      frameStyles.bottombar_item_reload,
                      reloadSpin && frameStyles.bottombar_item_reload_spin
                    )}
                    draggable={false}
                    onClick={() => {
                      if (!editorVisible || reloadSpin) return;

                      setReloadSpin(true);
                      setEditorVisible(false);

                      setTimeout(() => {
                        setEditorVisible(true);
                        setReloadSpin(false);
                      }, 250);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              style={{
                color: "#e2e2e2",
                fontSize: "12px",
                marginRight: "10px",
              }}
              transition={{ duration: 0.15 }}
              layout
            >
              Not Injected
            </motion.div>
          </LayoutGroup>
        </div>
      </div>

      {/*<div data-tauri-drag-region className={frameStyles.rightbar_container}>*/}
      {/*  <div*/}
      {/*    data-tauri-drag-region*/}
      {/*    className={clsx(frameStyles.bar, frameStyles.rightbar)}*/}
      {/*  ></div>*/}
      {/*</div>*/}
    </>
  );
}
