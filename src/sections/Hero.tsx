import { useEffect, useRef } from "react";
import { loadSlim } from "tsparticles-slim";
import Lottie from "lottie-react";

// Local imports
import GradientSpheres from "../components/GradientDpheres";
import HeroExperience from "../components/HeroExperience";

// Animated avatar (download from LottieFiles and place in assets folder)
import coderAnimation from "../assets/Coder.json";

const Hero = () => {
  const particlesInit = async (main: any) => {
    await loadSlim(main);
  };

  return (
    <section
      id="home"
      className="w-screen h-screen bg-black overflow-hidden relative text-[#e5e5e0] px-4 md:px-0"
    >
      {/* Main content */}
      <div className="w-full h-full flex items-center justify-center relative z-20">
        <div className="container relative w-full h-full max-w-7xl mx-auto">
          {/* Main text content */}
          <div className="flex flex-col justify-between h-full pt-16 md:pt-40 pb-16 md:pb-20">
            {/* Top section */}
            <div>
              <p className="text-sm md:text-2xl mb-2 md:mb-4">
                👋 Hey, I&apos;m Here
              </p>
              <h1 className="font-bold text-4xl md:text-8xl leading-tight mb-1 md:mb-2">
                AKINRINADE TOBILOBA
              </h1>
              <h1 className="font-bold text-4xl md:text-9xl leading-tight mb-4 md:mb-8">
                ANALYTICAL
              </h1>

              {/* Developer text - close to ANALYTICAL */}
              <div className="flex justify-end mb-8 md:mb-12">
                <div className="flex flex-col items-end">
                  <img
                    src="/images/shape.svg"
                    alt="shape"
                    className="w-8 h-8 md:w-auto md:h-auto mb-2 md:mb-0"
                  />
                  <h1 className="font-bold text-4xl md:text-9xl leading-tight">
                    DEVELOPER
                  </h1>
                </div>
              </div>
            </div>

            {/* Bottom section - just explore */}
            <div className="flex justify-start">
              <div className="flex flex-col items-center gap-2 md:gap-5">
                <p className="text-xs md:text-base">Explore</p>
                <img
                  src="images/arrowdown.svg"
                  alt="arrowdown"
                  className="w-5 h-5 md:w-7 md:h-7 animate-bounce"
                />
              </div>
            </div>
          </div>

          {/* Lottie avatar - responsive sizing */}
          <div className="absolute right-2 bottom-2 md:right-5 md:bottom-5 w-48 md:w-96 z-10 opacity-60 md:opacity-100">
            <Lottie animationData={coderAnimation} loop={true} />
          </div>
        </div>
      </div>

      {/* Experience / background */}
      <div className="w-full h-full absolute top-0 left-0">
        <HeroExperience />
      </div>
    </section>
  );
};

export default Hero;
