import learnishDashboard from "../assets/learnish.png";
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
    description:
      "An online store specializing in phone accessories including cases, chargers, cables, and power banks with MagSafe compatibility.",
    link: "https://learnish-ai.vercel.app/",
    image: learnishDashboard,
    bgImage: learnishDashboard,
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Neon" },
      { id: 4, name: "LLM" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 2,
    name: "Creator Toolz",
    description:
      "An online store specializing in rare and decorative plants with a clean, user-friendly interface.",
    href: "",
    image: learnishDashboard,
    bgImage: learnishDashboard,
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "NodeJs" },
      { id: 3, name: "Neon" },
      { id: 4, name: "LLM" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 3,
    name: "Moviebox",
    description:
      "An e-commerce platform for Apple products and accessories with deals and category filtering.",
    href: "",
    image: learnishDashboard,
    bgImage: learnishDashboard,
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "TMBD Api" },
      { id: 3, name: "Neon" },
      { id: 4, name: "LLM" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 4,
    name: "Fly Coin",
    description:
      "A multi-category online shop featuring electronics, home appliances, and gaming gear with special offers.",
    href: "",
    image: learnishDashboard,
    bgImage: learnishDashboard,
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
    name: "Unab Energy",
    description:
      "A curated collection of designer home decor items, including furniture and artisan vases.",
    href: "",
    image: learnishDashboard,
    bgImage: learnishDashboard,
    frameworks: [
      { id: 1, name: "Angular" },
      { id: 2, name: "Firebase" },
      { id: 3, name: "GraphQL" },
      { id: 4, name: "Material UI" },
    ],
  },
  {
    id: 6,
    name: "Digital Game Store",
    description:
      "A gaming platform featuring discounted titles, top sellers, and genre-based browsing.",
    href: "",
    image: learnishDashboard,
    bgImage: learnishDashboard,
    frameworks: [
      { id: 1, name: "Svelte" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "MongoDB" },
      { id: 4, name: "Chakra UI" },
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
