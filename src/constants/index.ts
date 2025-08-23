import learnishDashboard from "../assets/learnish.png";
import reactScafford from "../assets/bee-scafforrdpng.png";
import toolz from "../assets/Screenshot_23-8-2025_101947_localhost.jpeg";
import moviebox from "../assets/Screenshot_23-8-2025_102349_moviebox-pi.vercel.app.jpeg";
import flycoin from "../assets/Screenshot_23-8-2025_102655_flycoin.vercel.app.jpeg";
import sms from "../assets/image.png";
const navItems = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Testimonials",
    href: "#testimonials",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

export const projects = [
  {
    id: 1,
    name: "Learnish",
    description: "An ai powered learning platform",
    link: "https://learnish-ai.vercel.app/",
    href: "https://github.com/antimonycodes/Learnish",
    image: learnishDashboard,
    bgImage: learnishDashboard,
    frameworks: [
      { id: 1, name: "Cloudinary" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Neon" },
      { id: 4, name: "Gemini Api" },
      { id: 5, name: "Youtube Api" },
    ],
  },
  {
    id: 2,
    name: "Creator Toolz",
    description:
      "An ai powered toolz for creators, with advanced features for content  and image generation.",
    href: "https://github.com/antimonycodes/multi-toolz",
    link: "",
    image: toolz,
    bgImage: toolz,
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "NodeJs" },
      { id: 3, name: "Neon" },
      { id: 4, name: "Gemini Api" },
      { id: 5, name: "Cloudinary" },
    ],
  },
  {
    id: 3,
    name: "Moviebox",
    description: " A movie discovery platform using TMDB API.",
    href: "https://github.com/antimonycodes/moviebox",
    link: "https://moviebox-pi.vercel.app",
    image: moviebox,
    bgImage: moviebox,
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "TMDB Api" },
      { id: 3, name: "Framer motion" },
      { id: 4, name: "LLM" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 4,
    name: "Fly Coin",
    description:
      "A landingpage for a web3 project showcasing its features and benefits.",
    href: "https://github.com/antimonycodes/Flycoin",
    link: "https://flycoin.vercel.app/",
    image: flycoin,
    bgImage: flycoin,
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Framer Motion" },
      { id: 3, name: "Gsap" },
      { id: 4, name: "" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 5,
    name: "School Management System",
    description:
      "A comprehensive platform for managing school operations, including student enrollment, attendance tracking, and grade management.",
    href: "",
    link: "",
    image: sms,
    bgImage: sms,
    frameworks: [
      { id: 1, name: "Angular" },
      { id: 2, name: "Firebase" },
      { id: 3, name: "GraphQL" },
      { id: 4, name: "Material UI" },
    ],
  },
  {
    id: 6,
    name: "Bee React Scafford",
    description:
      "An npm package to install react and other important development packages at a go.",
    href: "https://github.com/antimonycodes/bee-react-scaffold",
    image: reactScafford,
    bgImage: reactScafford,
    frameworks: [
      { id: 1, name: "Bash" },
      { id: 2, name: "Npm" },
      { id: 3, name: "" },
      { id: 4, name: "" },
    ],
  },
];
export const socials = [
  { name: "Instagram", href: "https://www.instagram.com/ali.sanatidev/reels/" },
  {
    name: "Youtube",
    href: "https://www.youtube.com/channel/UCZhtUWTtk3bGJiMPN9T4HWA",
  },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/ali-sanati/" },
  { name: "GitHub", href: "https://github.com/Ali-Sanati" },
];

export { navItems };
