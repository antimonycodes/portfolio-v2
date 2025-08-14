// src/App.jsx (or App.js) - Updated to pass progress state to Preloader
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import About from "./sections/About";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import TechStack from "./sections/TechStack";
import Preloader from "./components/Preloader";
import ServiceSummary from "./sections/Summary";
import Works from "./sections/Works";
// import SwimmingGame from "./sections/Game";
import SwimGame from "./sections/Game";
import SwimmingGame3D from "./sections/Game";
import Services from "./sections/Services";
// import Preloader from "./Preloader";

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
        </>
      )}
    </div>
  );
}

export default App;
