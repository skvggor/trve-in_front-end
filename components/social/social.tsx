import {
  AudioLines,
  FileCode,
  GithubIcon,
  Linkedin,
  Medal,
  Twitter,
} from "lucide-react";

import type { ISocial } from "@/components/social/social.d";

export default function Social() {
  const socialContent: ISocial = {
    links: [
      {
        id: 1,
        title: "GitHub",
        href: "https://github.com/skvggor",
        icon: (
          <GithubIcon
            color="#0ea5e9"
            width={24}
            height={24}
          />
        ),
      },
      {
        id: 2,
        title: "LeetCode",
        href: "https://leetcode.com/skvggor/",
        icon: (
          <FileCode
            color="#0ea5e9"
            width={24}
            height={24}
          />
        ),
      },
      {
        id: 3,
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/marcker",
        icon: (
          <Linkedin
            color="#0ea5e9"
            width={24}
            height={24}
          />
        ),
      },
      {
        id: 4,
        title: "Twitter",
        href: "https://twitter.com/skvggor",
        icon: (
          <Twitter
            color="#0ea5e9"
            width={24}
            height={24}
          />
        ),
      },
      {
        id: 5,
        title: "Strava",
        href: "https://www.strava.com/athletes/18616728",
        icon: (
          <Medal
            color="#0ea5e9"
            width={24}
            height={24}
          />
        ),
      },
      {
        id: 6,
        title: "Last.fm",
        href: "https://last.fm/user/skvggor",
        icon: (
          <AudioLines
            color="#0ea5e9"
            width={24}
            height={24}
          />
        ),
      },
    ],
  };

  const renderSocialLinks = socialContent.links.map((link) => (
    <li
      key={link.id}
      className="item"
    >
      <a
        className="link
          block
          duration-500
          hover:outline-white
          outline
          outline-2
          outline-sky-500
          outline-offset-1
          p-2
          rounded-full
          transition-all"
        href={link.href}
        title={link.title}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.icon}
      </a>
    </li>
  ));

  return (
    <section
      className="social
        flex
        flex-col
        items-center
        justify-center"
    >
      <ul
        className="icon-list
          gap-x-5
          grid
          grid-cols-6
          md:gap-x-6"
      >
        {renderSocialLinks}
      </ul>
    </section>
  );
}
