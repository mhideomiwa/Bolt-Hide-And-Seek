/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")], // This is the key part!
    theme: {
        extend: {
            colors: {
                lightBackground: "#E0E7D1",
                darkBackground: "#1B3A4B",
                primaryColor: "#FF8C00",
                secondaryColor: "#157A6E",
                tertiaryColor: "#B82601",
            }
        },
    },
    plugins: [],
}
