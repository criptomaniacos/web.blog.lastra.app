import type { Config } from "tailwindcss";

const colors = (() => {
  const colors = {
    brand: {
      green: {
        50: "#E3F2ED", // Mais próximo de 500
        100: "#C7E5DB",
        200: "#ABD8C9",
        300: "#90CCB8",
        400: "#74BFa6", // Um pouco mais escuro
        500: "#1EC189",
        600: "#1AB377",
        700: "#149561",
        800: "#0D774A",
        900: "#085E3B",
        950: "#043F29",
        DEFAULT: "#1EC189",
      },
      purple: {
        50: "#EDE5F4", // Mais próximo de 500
        100: "#DCCBEF",
        200: "#CCB2E9",
        300: "#BB98E4",
        400: "#AB7FDE", // Um pouco mais escuro
        500: "#7E3BAE",
        600: "#6F359D",
        700: "#602F8B",
        800: "#52297A",
        900: "#431F67",
        950: "#341759",
        DEFAULT: "#7E3BAE",
      },
      pink: {
        50: "#F8E4F1", // Mais próximo de 500
        100: "#F1C9E3",
        200: "#EAAED5",
        300: "#E393C7",
        400: "#DC78B9", // Um pouco mais escuro
        500: "#C3127D",
        600: "#A70F6E",
        700: "#8B0C5E",
        800: "#70094F",
        900: "#55063F",
        950: "#3B0430",
        DEFAULT: "#C3127D",
      },
      orange: {
        50: "#FDEDE0", // Mais próximo de 500
        100: "#FBDCCC",
        200: "#F9CBB7",
        300: "#F7BAA3",
        400: "#F5A98F", // Um pouco mais escuro
        500: "#FC8947",
        600: "#E77A3E",
        700: "#D26B35",
        800: "#BD5C2C",
        900: "#A84D23",
        950: "#933E1B",
        DEFAULT: "#FC8947",
      },
    },
  };

  return {
    ...colors,
  };
})();

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./public/**/*.{html,js}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        ...colors,
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;

//https://s.cmania.co/guru/95c3cfef-3fdc-477d-b8cc-7bf0b2d659d4?name=[field id="fname"]&amp;email=[field id="femail"]&amp;nome=[field id="fname"]
