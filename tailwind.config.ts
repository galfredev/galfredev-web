import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)"],
                heading: ["var(--font-plus-jakarta)"],
            },
            colors: {
                nordic: {
                    blue: "hsl(var(--nordic-blue))",
                    steel: "hsl(var(--nordic-steel))",
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
