import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ContactForm from "../components/ContactForm";
import Earth3D from "../components/Earth";
import TitleHeader from "../components/TitleHeader";
// import { bentoSocialLinks } from "../constants";

const Contact = () => {
  const contactRef = useRef(null);
  const isInView = useInView(contactRef, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={contactRef}
      className="relative bg-black flex-center "
    >
      <div className="w-full h-full container md:my-40 my-20">
        <TitleHeader
          title="Contact Me"
          number="04"
          text="Let's collaborate on tailored, sustainable solutions"
        />

        <div className="mt-20 grid md:grid-cols-2 grid-cols-1 gap-10 relative">
          {/* Earth */}
          <div className="relative w-full h-full flex justify-center items-center">
            <div className="w-full h-full min-h-[400px] ">
              <Earth3D className="w-full h-full" />
            </div>

            {/* Contact form overlay on mobile */}
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="absolute inset-0 flex justify-center items-center md:hidden"
            >
              <div className="lg:bg-black/60 backdrop-blur-xl p-5 rounded-lg w-[90%] lg:shadow-lg lg:shadow-purple-800/40 border border-white/10">
                <ContactForm />
              </div>
            </motion.div>
          </div>

          {/* Contact form & socials for desktop */}
          <div className="hidden md:flex flex-col gap-10">
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 shadow-lg shadow-purple-800/40 border border-white/10">
              <ContactForm />
            </div>

            {/* Social Links (optional) */}
            {/* {bentoSocialLinks.map((item, index) => (
              <div
                key={index}
                className="bg-black-300 rounded-2xl p-7 group cursor-pointer"
              >
                <div className="flex justify-between items-center h-full">
                  <div className="flex items-center md:gap-5">
                    <img src={item.icon} alt={item.icon} />
                    <h1 className="gradient-title md:text-3xl text-xl ms-5 font-medium">
                      {item.name}
                    </h1>
                  </div>
                  <div className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                    <img
                      src="/images/arrowupright.svg"
                      alt="arrow-up"
                      className="md:scale-100 scale-50"
                    />
                  </div>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
