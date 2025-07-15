/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      fontSize: {
        h1: ["20px", { lineHeight: "24px", fontWeight: "700" }],
        h2: ["18px", { lineHeight: "21.6px", fontWeight: "700" }],
        sub1: ["16px", { lineHeight: "19.2px", fontWeight: "600" }],
        sub2: ["16px", { lineHeight: "19.2px", fontWeight: "500" }],
        sub3: ["13px", { lineHeight: "15.6px", fontWeight: "700" }],
        sub4: ["12px", { lineHeight: "14.4px", fontWeight: "700" }],
        body1: ["14px", { lineHeight: "16.8px", fontWeight: "500" }],
        body2: ["13px", { lineHeight: "15.6px", fontWeight: "500" }],
        body3: ["12px", { lineHeight: "14.4px", fontWeight: "400" }],
      },
      colors: {
        "ct-main-blue-200": "#2167FF",
        "ct-main-blue-100": "#368BFF",
        "ct-sub-blue-300": "#0077EB",
        "ct-sub-blue-200": "#008CFF",
        "ct-sub-blue-100": "#60A3FE",
        "ct-black-300": "#000000",
        "ct-black-200": "#121212",
        "ct-black-100": "#333333",
        "ct-white": "#FFFFFF",
        "ct-gray-500": "#404040",
        "ct-gray-400": "#5C5C5C",
        "ct-gray-300": "#828282",
        "ct-gray-200": "#B4B4B4",
        "ct-gray-100": "#EDEDED",
        "ct-blue-gray-100": "#7D9AC3",
        "ct-red-100": "#FF3535",
        "ct-light-blue-100": "#E5F0FF",
      },
      boxShadow: {
        "recruit-card": "0px 0px 5px 0px rgba(255,255,255, 0.01)",
        "find-card": "0px 0px 10px 0px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
