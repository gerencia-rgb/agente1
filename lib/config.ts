import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "¿Qué es Traza?",
    prompt: "¿Qué es Traza?",
    icon: "circle-question",
  },
  {
    label: "Quiero realizar un registro",
    prompt: "Quiero realizar un registro",
    icon: "pencil",
  },
];

export const PLACEHOLDER_INPUT = "Escribe tu mensaje...";

export const GREETING = "¡Hola! ¿En qué puedo ayudarte hoy?";

export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
  color: {
    grayscale: {
      hue: 220,
      tint: 6,
      shade: theme === "dark" ? -1 : -4,
    },
    accent: {
      primary: theme === "dark" ? "#f1f5f9" : "#0f172a",
      level: 1,
    },
  },
  radius: "round",
  // Add other theme options here
  // chatkit.studio/playground to explore config options
});

// Custom ChatKit Configuration
export const CUSTOM_CHATKIT_CONFIG = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
    timeout: 30000,
  },
  features: {
    fileUpload: {
      enabled: true,
      maxSize: 10 * 1024 * 1024, // 10MB
      allowedTypes: ["image/*", "text/*", "application/pdf"],
      maxFiles: 5,
    },
    voiceInput: {
      enabled: true,
      language: "es-ES",
    },
    markdown: {
      enabled: true,
      codeHighlighting: true,
    },
  },
  ui: {
    animations: true,
    showTimestamps: true,
    showAvatars: true,
    compactMode: false,
  },
};
