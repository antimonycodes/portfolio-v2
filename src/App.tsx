import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import TechStack from "./sections/TechStack";
import Preloader from "./components/Preloader";

import Services from "./sections/Services";
// import InkBoard from "./sections/Notes";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= duration) {
        clearInterval(timer);
        setIsLoaded(true);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="">
      <AnimatePresence>
        {!isLoaded && <Preloader progress={progress} />}
      </AnimatePresence>
      {isLoaded && (
        <>
          <Hero />
          <Services />
          {/* <About /> */}
          <TechStack />
          <Projects />
          <Contact />
          {/* <InkBoard /> */}
        </>
      )}
    </div>
  );
}

export default App;
