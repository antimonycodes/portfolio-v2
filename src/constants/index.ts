import imgOne from "../assets/one.png";
import two from "../assets/two.png";
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

const bentoSocialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: "/images/fb.svg",
  },
  {
    name: "Instagram",
    href: "https://www.facebook.com/",
    icon: "/images/insta.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.facebook.com/",
    icon: "/images/linkedin.svg",
  },
  {
    name: "WhatsApp",
    href: "https://www.facebook.com/",
    icon: "/images/whatsapp.svg",
  },
];

const iconsList = [
  {
    name: "html",
    image: "/images/html.svg",
  },
  {
    name: "css",
    image: "/images/css.svg",
  },
  {
    name: "javascript",
    image: "/images/js.svg",
  },
  {
    name: "react",
    image: "/images/react.svg",
  },
  {
    name: "typescript",
    image: "/images/ts.svg",
  },
  {
    name: "github",
    image: "/images/github.svg",
  },
  {
    name: "gsap",
    image: "/images/gsap.svg",
  },
  {
    name: "threejs",
    image: "/images/threejs.svg",
  },
  {
    name: "figma",
    image: "/images/figma.svg",
  },
  {
    name: "aws",
    image: "/images/aws.svg",
  },
];

const slides = [
  {
    id: 1,
    title: "Sofi",
    img: "/images/p1.png",
  },
  {
    id: 2,
    title: "Jasmina",
    img: "/images/p2.png",
  },
  {
    id: 3,
    title: "d.tampe",
    img: "/images/p3.png",
  },
  {
    id: 4,
    title: "Blimp.gr",
    img: "/images/p4.png",
  },
  {
    id: 5,
    title: "Hawk Style Design",
    img: "/images/p5.png",
  },
  {
    id: 6,
    title: "Lewis",
    img: "/images/p6.png",
  },
  {
    id: 7,
    title: "Sofi",
    img: "/images/p1.png",
  },
];

const testimonials = [
  {
    name: "John Miller",
    pos: "Founder of ModernEdge Solutions",
    review:
      "David Jhon turned our vision into a stunning, functional platform that our customers love. Their creativity and technical expertise truly set them apart.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Emily Carter",
    pos: "UX Designer at PixelWorks Studio",
    review:
      "David Jhon consistently brings fresh ideas and innovative solutions. Their passion for creativity and attention to detail elevate every project.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Sarah Lopez",
    pos: "Entrepreneur and Small Business Owner",
    review:
      "Exceeded my expectations with a unique and beautifully designed product that works flawlessly. Their creative touch is outstanding.",
    imgPath: "/images/client3.png",
  },
  {
    name: "David Chen",
    pos: "Project Manager at CreativeSphere Agency",
    review:
      "Blends technical skills with bold creativity to deliver exceptional results. They push boundaries and elevate every project they work on.",
    imgPath: "/images/client4.png",
  },
];

const footerIconsList = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: "/images/b-fb.svg",
  },
  {
    name: "Instagram",
    href: "https://www.facebook.com/",
    icon: "/images/b-insta.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.facebook.com/",
    icon: "/images/b-linked.svg",
  },
  {
    name: "WhatsApp",
    href: "https://www.facebook.com/",
    icon: "/images/b-whatsapp.svg",
  },
];

export const projects = [
  {
    id: 1,
    name: "Mobile Accessories E-commerce",
    description:
      "An online store specializing in phone accessories including cases, chargers, cables, and power banks with MagSafe compatibility.",
    href: "",
    image: imgOne,
    bgImage: two,
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Node.js" },
      { id: 4, name: "MongoDB" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 2,
    name: "Plant Shop E-commerce",
    description:
      "An online store specializing in rare and decorative plants with a clean, user-friendly interface.",
    href: "",
    image: "/assets/projects/plant-shop.jpg",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Stripe API" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 3,
    name: "Apple Tech Marketplace",
    description:
      "An e-commerce platform for Apple products and accessories with deals and category filtering.",
    href: "",
    image: "/assets/projects/apple-tech-store.jpg",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "Blazor" },
      { id: 2, name: "ASP.NET Core" },
      { id: 3, name: "SQL Server" },
      { id: 4, name: "Bootstrap" },
    ],
  },
  {
    id: 4,
    name: "Electronics & Gadgets Store",
    description:
      "A multi-category online shop featuring electronics, home appliances, and gaming gear with special offers.",
    href: "",
    image: "/assets/projects/electronics-store.jpg",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "Vue.js" },
      { id: 2, name: "Laravel" },
      { id: 3, name: "MySQL" },
      { id: 4, name: "SCSS" },
    ],
  },
  {
    id: 5,
    name: "Home Decor Marketplace",
    description:
      "A curated collection of designer home decor items, including furniture and artisan vases.",
    href: "",
    image: "/assets/projects/home-decor-store.jpg",
    bgImage: "/assets/backgrounds/table.jpg",
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
    image: "/assets/projects/game-store.jpg",
    bgImage: "/assets/backgrounds/curtains.jpg",
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

export {
  navItems,
  bentoSocialLinks,
  iconsList,
  slides,
  testimonials,
  footerIconsList,
};
