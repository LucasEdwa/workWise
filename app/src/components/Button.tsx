import { ReactNode, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


interface IButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?:  "submit" ;
}

export default function Button({ children, onClick }: IButtonProps) {
    const theme = useContext(ThemeContext);
    return (
        <button className={`px-4 py-2 rounded-2xl w-[20rem] ${theme.background} ${theme.foreground}`} onClick={onClick}>
            {children}
        </button>
    );
}