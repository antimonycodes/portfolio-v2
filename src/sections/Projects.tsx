import GradientSpheres from "../components/GradientDpheres";
import TitleHeader from "../components/TitleHeader";
import Works from "./Works";

const Projects = () => {
  return (
    <section
      className="w-full bg-[#0B0D01] h-full flex-center relative"
      id="projects"
    >
      {/* <GradientSpheres
        sphere1Class="projects-gradient-sphere projects-sphere-1"
        sphere2Class="projects-gradient-sphere projects-sphere-2"
      /> */}
      {/* <GradientSpheres
        sphere1Class="about-gradient-sphere about-sphere-1"
        sphere2Class="about-gradient-sphere about-sphere-2"
      /> */}

      <div className="w-full md:my-40 my-20 relative z-10">
        <div className="container mx-auto md:p-0 px-5">
          <TitleHeader
            title="My PROJECTS"
            number="03"
            text="Check my recent project below for your Goal"
          />
        </div>
        <div className="md:mt-20 mt-10">
          <Works />
        </div>
      </div>
    </section>
  );
};

export default Projects;
