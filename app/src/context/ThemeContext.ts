import { createContext } from "react";


export interface ITheme {
    background: string;
    foreground: string;
    name: string;
    toggle: () => void;
}

export interface IThemes{
    light: ITheme;
    dark: ITheme;
}

export const themes: IThemes = {
    light: {
        background: 'bg-gray-600',
        foreground: 'text-black',
        name: 'light',
        toggle: () => {}
    },
    dark: {
        background: 'bg-black',
        foreground: 'text-white',
        name: 'dark',
        toggle: () => {}
    }
}

export const ThemeContext = createContext<ITheme>(themes.light);