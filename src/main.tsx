import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { Toaster } from "sonner";

import { LanguageProvider } from "./locales/LanguageContext.tsx";
import { AdminProvider } from "./context/AdminContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminProvider>
      <LanguageProvider>
        <ThemeProvider>
          <AppWrapper>
            <App />
            <Toaster richColors position="top-right" />
          </AppWrapper>
        </ThemeProvider>
      </LanguageProvider>
    </AdminProvider>
    ,
  </StrictMode>,
);
