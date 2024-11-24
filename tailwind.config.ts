import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
                  boxShadow: {
        smallEmboss: 'inset -1.25px -1.25px 1.25px rgba(255,255,255,0.2), inset 2.5px 2.5px 2.5px rgba(0,0,0,0.4)',
      },
            colors: {
                "custom-purple": "#792990",

                primary: "#350545",
                secondary: "#aaa6c3",
                yellowcustom: "#ffb947",
            },
            fontFamily: {
                sans: ["Plus Jakarta Sans", "sans-serif"],
                mono: ["Ubuntu Mono", "monospace"],
            },
            backgroundImage: {
                "custom-gradient": `radial-gradient(
circle at top center,
hsla(286, 55%, 36%, 0.5) 0%,
hsla(222, 0%, 0%, 0) 50%,
hsla(222, 0%, 0%, 0) 100%
)`,
                "modern-gradient":
                    "linear-gradient(90deg, #350545 0%, #792990 50%, #350545 100%)",
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
                "spin-clockwise": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" }
                },

                "spin-counterclockwise": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(-360deg)" }
                },
                fadeIn: {
                    "0%": { opacity: "0", transform: "translateY(-10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
            animation: {
                "spin-clockwise": "spin-clockwise 2s linear infinite",
                "spin-counterclockwise": "spin-counterclockwise 2s linear infinite",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                'fade-in': 'fadeIn 0.5s ease forwards',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
