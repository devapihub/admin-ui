import React, { Component, createContext } from "react";

export const THEMES = {
    light: {
        sidebar: { bg: "#1a1a2e", text: "rgba(255,255,255,0.6)", textActive: "#fff", border: "rgba(255,255,255,0.08)" },
        topbar: { bg: "#fff", text: "#1a1a2e", shadow: "0 1px 4px rgba(0,0,0,0.1)" },
        main: { bg: "#f0f2f5", text: "#1a1a2e" },
        dropdown: { bg: "#fff", border: "#f0f0f0", shadow: "0 4px 16px rgba(0,0,0,0.12)", textSub: "#888", text: "#333" },
        toggleIcon: "🌙",
    },
    dark: {
        sidebar: { bg: "#0d0d1a", text: "rgba(255,255,255,0.5)", textActive: "#fff", border: "rgba(255,255,255,0.06)" },
        topbar: { bg: "#1e1e2e", text: "#e0e0e0", shadow: "0 1px 4px rgba(0,0,0,0.4)" },
        main: { bg: "#12121f", text: "#e0e0e0" },
        dropdown: { bg: "#1e1e2e", border: "#2a2a3e", shadow: "0 4px 16px rgba(0,0,0,0.5)", textSub: "#888", text: "#e0e0e0" },
        toggleIcon: "☀️",
    },
};

export const ThemeContext = createContext({
    theme: THEMES.light,
    themeName: "light",
    toggleTheme: () => {},
});

class ThemeProvider extends Component {
    constructor(props) {
        super(props);
        const saved = localStorage.getItem("theme") || "light";
        this.state = { themeName: saved };
    }

    toggleTheme = () => {
        this.setState((prev) => {
            const next = prev.themeName === "light" ? "dark" : "light";
            localStorage.setItem("theme", next);
            return { themeName: next };
        });
    };

    render() {
        const { themeName } = this.state;
        return (
            <ThemeContext.Provider
                value={{
                    theme: THEMES[themeName],
                    themeName,
                    toggleTheme: this.toggleTheme,
                }}
            >
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}

export default ThemeProvider;
