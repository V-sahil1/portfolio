import { FaLinkedinIn, FaGithub, FaInstagram, FaNpm } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import type { SocialLink } from "@/types";

export const socials: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sahil-vardekar-9430212a7/",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com/V-sahil1",
    icon: FaGithub,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/sahil__26/",
    icon: SiLeetcode,
  },
  {
    label: "npm",
    href: "https://www.npmjs.com/~batman_8",
    icon: FaNpm,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/v_sahil08/",
    icon: FaInstagram,
  },
];
