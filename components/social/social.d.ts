import type { JSX } from "react";

export interface ISocial {
  links: {
    id: number;
    title: string;
    href: string;
    icon: JSX.Element;
  }[];
}
