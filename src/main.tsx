import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles/global.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/dates/styles.css";
//import App from './App.tsx';
//import './index.css';
import { Box, createTheme, MantineProvider, rem } from "@mantine/core";
import { HeaderMegaMenu } from "./components/Header.tsx";
import { CollapsedAppShell } from "./components/AppShell.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes } from "react-router-dom";
import { RoutesHandler } from "./pages/RoutesHandler.tsx";
import { AnnouncementsEditor } from "./pages/Announcements/AnnouncementsEditor.tsx";
import { Notifications } from "@mantine/notifications";
import { ContextModalProps, ModalsProvider } from "@mantine/modals";
import { Profile } from "./pages/Profile/Profile.tsx";
import { UserContext } from "./utils/UserContext.ts";
import { fetchUser } from "./utils/fetchUser.ts";
import { App } from "./App.tsx";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const theme = createTheme({
  primaryColor: "blue",
  colors: {
    blue: [
      "#e7f5ff",
      "#d0ebff",
      "#a5d8ff",
      "#74c0fc",
      "#4dabf7",
      "#339af0",
      "#228be6",
      "#1c7ed6",
      "#1971c2",
      "#1864ab",
    ],
  },

  headings: {
    fontFamily: "Roboto, sans-serif",
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },
});

dayjs.extend(customParseFormat);

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider defaultColorScheme="light" theme={theme}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </MantineProvider>,
);
