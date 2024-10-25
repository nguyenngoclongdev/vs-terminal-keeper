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
    desc: "Very good! And our team uses it now too. Allows us to have a predefined set of terminals, each with its own command, color, icon... and open all of them with a shortcut. I recommend trying, especially if you're frustrated by the amount of terminals you have to open every time. Thank you Nguyen.",
    // links: [
    //   {  
    //     icon: { 
    //       svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path fill="#f35325" d="M0 0h10v10H0z"/><path fill="#81bc06" d="M11 0h10v10H11z"/><path fill="#05a6f0" d="M0 11h10v10H0z"/><path fill="#ffba08" d="M11 11h10v10H11z"/></svg>'
    //     },
    //     link: "https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper&ssr=false#review-details" 
    //   }
    // ]
  },
  {
    avatar: 'https://marketplace.visualstudio.com/avatar?userid=dd94f89c-9c16-6c9d-896e-83c6ac3480f1',
    name: "David Swanson",
    title: "⭐⭐⭐⭐⭐",
    desc: "One of the best, most efficient extensions I have found. You click install. You easily configure each terminal in the session.json, and then it just works. I remotely develop. I can easily log-in to my remote server session with VSCode, run Terminal activate, and there are all my terminals.",
    // links: [
    //   {  
    //     icon: { 
    //       svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path fill="#f35325" d="M0 0h10v10H0z"/><path fill="#81bc06" d="M11 0h10v10H11z"/><path fill="#05a6f0" d="M0 11h10v10H0z"/><path fill="#ffba08" d="M11 11h10v10H11z"/></svg>'
    //     },
    //     link: "https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper&ssr=false#review-details" 
    //   }
    // ]
  },
  {
    avatar: 'https://marketplace.visualstudio.com/avatar?userid=c7b239e1-60b0-687e-8671-0fa701cfb760',
    name: "J Williams",
    title: "⭐⭐⭐⭐⭐",
    desc: "Really nice extension. The documentation found on the Overview page was totally comprehensive for my needs/first-time setup. I've recommended it to my entire team already. Great work!",
    // links: [
    //   {  
    //     icon: { 
    //       svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path fill="#f35325" d="M0 0h10v10H0z"/><path fill="#81bc06" d="M11 0h10v10H11z"/><path fill="#05a6f0" d="M0 11h10v10H0z"/><path fill="#ffba08" d="M11 11h10v10H11z"/></svg>'
    //     },
    //     link: "https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper&ssr=false#review-details" 
    //   }
    // ]
  },
  {
    avatar: 'https://marketplace.visualstudio.com/avatar?userid=61a7824b-b9d4-46a5-b993-104f60814d5e',
    name: "Aurélien R",
    title: "⭐⭐⭐⭐⭐",
    desc: "Was looking for an extension like this for a while! You saved me a lot of time, thanks!",
    // links: [
    //   {  
    //     icon: { 
    //       svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path fill="#f35325" d="M0 0h10v10H0z"/><path fill="#81bc06" d="M11 0h10v10H11z"/><path fill="#05a6f0" d="M0 11h10v10H0z"/><path fill="#ffba08" d="M11 11h10v10H11z"/></svg>'
    //     },
    //     link: "https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper&ssr=false#review-details" 
    //   }
    // ]
  },
  {
    avatar: 'https://marketplace.visualstudio.com/avatar?userid=e42f8bc0-20c5-60d1-a98d-d545c9b0ff01',
    name: "John Murphy",
    title: "⭐⭐⭐⭐⭐",
    desc: "Pretty cool extension, highly customizable and cool and useful features. Kind of annoying you have to customize your shell from the config(session.json), wish you could auto-save currently opened sessions from the ctrl+shift+p vs code menu. Besides that it's great!!! Thanks to the creator of this app!!!",
    // links: [
    //   {  
    //     icon: { 
    //       svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path fill="#f35325" d="M0 0h10v10H0z"/><path fill="#81bc06" d="M11 0h10v10H11z"/><path fill="#05a6f0" d="M0 11h10v10H0z"/><path fill="#ffba08" d="M11 11h10v10H11z"/></svg>'
    //     },
    //     link: "https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper&ssr=false#review-details" 
    //   }
    // ]
  },
  {
    avatar: 'https://github.com/webia1.png',
    name: "webia1",
    title: "⭐⭐⭐⭐⭐",
    desc: "Thank you for creating such a fantastic extension. We rely on it daily, and it has greatly enhanced our workflow. Our teams work within an Nx MonoRepo, developing different apps and running various sessions.",
    // links: [
    //   { icon: 'github', link: 'https://github.com/webia1' }
    // ]
  },
  {
    avatar: 'https://marketplace.visualstudio.com/avatar?userid=2e9ea7fd-eae0-6b66-885d-61de9f8848fc',
    name: "Max Pauwels",
    title: "⭐⭐⭐⭐⭐",
    desc: "I'd like to thank the creator of this extension for releasing this, it's an excellent tool!",
    // links: [
    //   {  
    //     icon: { 
    //       svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path fill="#f35325" d="M0 0h10v10H0z"/><path fill="#81bc06" d="M11 0h10v10H11z"/><path fill="#05a6f0" d="M0 11h10v10H0z"/><path fill="#ffba08" d="M11 11h10v10H11z"/></svg>'
    //     },
    //     link: "https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper&ssr=false#qna" 
    //   }
    // ]
  },
  {
    avatar: 'https://marketplace.visualstudio.com/avatar?userid=5f6f9573-a2df-4005-a5f0-6397aa6bc22f',
    name: "Blair M.",
    title: "⭐⭐⭐⭐⭐",
    desc: "Keeps things organized by having pre-defined terminal tabs with pre-typed or pre-run commands.",
    // links: [
    //   {  
    //     icon: { 
    //       svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path fill="#f35325" d="M0 0h10v10H0z"/><path fill="#81bc06" d="M11 0h10v10H11z"/><path fill="#05a6f0" d="M0 11h10v10H0z"/><path fill="#ffba08" d="M11 11h10v10H11z"/></svg>'
    //     },
    //     link: "https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper&ssr=false#review-details" 
    //   }
    // ]
  },
  // {
  //   avatar: 'https://marketplace.visualstudio.com/avatar?userid=4302b4c9-68c9-6528-b524-3bbc1a17c516',
  //   name: "Ninh Nguyen Do",
  //   title: "⭐⭐⭐⭐⭐",
  //   desc: "It saved me couple days.",
  //   links: [
  //     {  
  //       icon: { 
  //         svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path fill="#f35325" d="M0 0h10v10H0z"/><path fill="#81bc06" d="M11 0h10v10H11z"/><path fill="#05a6f0" d="M0 11h10v10H0z"/><path fill="#ffba08" d="M11 11h10v10H11z"/></svg>'
  //       },
  //       link: "https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper&ssr=false#review-details" 
  //     }
  //   ]
  // }
]
</script>

<br>

# Feedback

Say hello to our awesome team.

<VPTeamMembers size="small" :members="members" />
