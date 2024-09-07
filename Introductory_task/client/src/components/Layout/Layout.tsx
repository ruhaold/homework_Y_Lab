import { FC, ReactNode } from "react";
import "./Layout.css";

interface ILayoutProps {
  children: ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
  return <div className={"layout"}>{children}</div>;
};
