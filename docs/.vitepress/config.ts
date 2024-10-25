import { defineConfig } from "vitepress";
import * as navbars from "./navbars";
import * as sidebars from "./sidebars";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Terminal Keeper",
  description:
    "Elevate your terminal experience! Effortlessly configuration, seamlessly restore your last session, and manage sessions with ease. Personalize your workspace with colorful themes and boost productivity by importing commands swiftly.",
  head: [
    ["link", { rel: "icon", type: "image/png", href: "/assets/logo.png" }],
  ],
  lastUpdated: true,
  locales: {
    root: {
      label: "English",
      lang: "en-US",
      themeConfig: {
        nav: navbars.en,
        sidebar: sidebars.en,
      },
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/assets/logo.svg",
    search: {
      provider: "local",
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/nguyenngoclongdev/vs-terminal-keeper",
      },
      // { icon: "twitter", link: "https://twitter.com/vs-terminal-keeper" },
    ],
    editLink: {
      pattern: 'https://github.com/nguyenngoclongdev/vs-terminal-keeper/edit/main/docs/:path'
    },
    // carbonAds: {
    //   code: 'your-carbon-code',
    //   placement: 'your-carbon-placement'
    // },
    footer: {
      message:
        'Released under the <a href="https://github.com/nguyenngoclongdev/vs-terminal-keeper/blob/main/LICENSE">MIT License</a>.',
      copyright:
        'Copyright © 2022 <a href="https://github.com/nguyenngoclongdev">Nguyen Ngoc Long</a>',
    },
  },
});
