---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Terminal Keeper
  text: Elevate your terminal experience!
  tagline: Effortlessly configuration, seamlessly restore your last session, and manage sessions with ease. Personalize your workspace with colorful themes and boost productivity by importing commands swiftly.
  image:
    src: ./assets/showcase.gif
    alt: Terminal Keeper Showcase
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: What is Terminal Keeper?
      link: /guide/introduction
    - theme: alt
      text: View on GitHub
      link: https://github.com/nguyenngoclongdev/vs-terminal-keeper

features:
  - title: Session Management
    details: "Easily add, edit or delete sessions, keeping your workspace tidy."
    icon: 🎉
  - title: Commands Importing
    details: "Quickly import commands from files like package.json, pipenv, Makefile, grunt, gradle, gulp, ant, and more."
    icon: ⚡
  - title: Easy Configuration
    details: "Quickly create templates to simplify your terminal setup."
    icon: ⏮
  - title: "Restore Last Session Automatically"
    details: "Start your day smoothly by bringing back your last terminal session when you open the app."
    icon: 📄
  - title: "Session Saving (Coming Soon)"
    details: "Preserve your current terminal session along with its icon, color, and all terminal configurations."
    icon: 🐚
  - title: "Customizable Themes"
    details: "Personalize your terminal with a variety of colorful themes for icons and colors that brighten your workspace."
    icon: 🌈
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://marketplace.visualstudio.com/avatar?userid=f646e0a0-1d9e-66b7-a70f-90c56c421541',
    name: "Nico Kupfer",
    title: "⭐⭐⭐⭐⭐",
    desc: "Very good! And our team uses it now too. Allows us to have a predefined set of terminals, each with its own command, color, icon... and open all of them with a shortcut. I recommend trying, especially if you're frustrated by the amount of terminals you have to open every time. Thank you Nguyen."
  },
  {
    avatar: 'https://marketplace.visualstudio.com/avatar?userid=dd94f89c-9c16-6c9d-896e-83c6ac3480f1',
    name: "David Swanson",
    title: "⭐⭐⭐⭐⭐",
    desc: "One of the best, most efficient extensions I have found. You click install. You easily configure each terminal in the session.json, and then it just works. I remotely develop. I can easily log-in to my remote server session with VSCode, run Terminal activate, and there are all my terminals."
  },
  {
    avatar: 'https://marketplace.visualstudio.com/avatar?userid=c7b239e1-60b0-687e-8671-0fa701cfb760',
    name: "J Williams",
    title: "⭐⭐⭐⭐⭐",
    desc: "Really nice extension. The documentation found on the Overview page was totally comprehensive for my needs/first-time setup. I've recommended it to my entire team already. Great work!"
  },
  {
    avatar: 'https://marketplace.visualstudio.com/avatar?userid=61a7824b-b9d4-46a5-b993-104f60814d5e',
    name: "Aurélien R",
    title: "⭐⭐⭐⭐⭐",
    desc: "Was looking for an extension like this for a while! You saved me a lot of time, thanks!"
  },
  {
    avatar: 'https://marketplace.visualstudio.com/avatar?userid=e42f8bc0-20c5-60d1-a98d-d545c9b0ff01',
    name: "John Murphy",
    title: "⭐⭐⭐⭐⭐",
    desc: "Pretty cool extension, highly customizable and cool and useful features. Kind of annoying you have to customize your shell from the config(session.json), wish you could auto-save currently opened sessions from the ctrl+shift+p vs code menu. Besides that it's great!!! Thanks to the creator of this app!!!"
  },
  {
    avatar: 'https://github.com/webia1.png',
    name: "webia1",
    title: "⭐⭐⭐⭐⭐",
    desc: "Thank you for creating such a fantastic extension. We rely on it daily, and it has greatly enhanced our workflow. Our teams work within an Nx MonoRepo, developing different apps and running various sessions.",
  },
  {
    avatar: 'https://marketplace.visualstudio.com/avatar?userid=5ce8a91a-9f6e-68f9-910c-4568cf794c13',
    name: "AutomateAce",
    title: "⭐⭐⭐⭐⭐",
    desc: "This is exactly the extension I needed. I love it! It is inconvenient to configure each project individually due to the presence of separate sessions.json files. It would be much more convenient if there were a feature to set configurations globally at the local level."
  },
  {
    avatar: 'https://marketplace.visualstudio.com/avatar?userid=2e9ea7fd-eae0-6b66-885d-61de9f8848fc',
    name: "Max Pauwels",
    title: "⭐⭐⭐⭐⭐",
    desc: "I'd like to thank the creator of this extension for releasing this, it's an excellent tool!"
  },
  {
    avatar: 'https://marketplace.visualstudio.com/avatar?userid=5f6f9573-a2df-4005-a5f0-6397aa6bc22f',
    name: "Blair M.",
    title: "⭐⭐⭐⭐⭐",
    desc: "Keeps things organized by having pre-defined terminal tabs with pre-typed or pre-run commands."
  },
  {
    avatar: 'https://marketplace.visualstudio.com/avatar?userid=4302b4c9-68c9-6528-b524-3bbc1a17c516',
    name: "Ninh Nguyen Do",
    title: "⭐⭐⭐⭐⭐",
    desc: "It saved me couple days."
  },
  {
    avatar: 'https://marketplace.visualstudio.com/avatar?userid=f4195676-9c49-6d6b-9d35-b2cbc7599da8',
    name: "Jean-Daniel KLEIN",
    title: "⭐⭐⭐⭐⭐",
    desc: "Excellent, keep everything clean and tidy, thx a lot"
  },
]
</script>

<br>

## Our wall of love

See what the community is saying about Terminal Keeper. Share the love!

<VPTeamMembers size="small" :members="members" />
