import Stacks from "../components/Stacks";
import TitleHeader from "../components/TitleHeader";

const TechStack = () => {
  return (
    <section
      className="w-full bg-black min-h-screen flex flex-col relative"
      id="techstack"
    >
      {/* Header Section */}
      <div className="flex-shrink-0 w-full md:pt-40 pt-20 pb-10">
        <div className="container mx-auto md:p-0 px-5">
          <TitleHeader
            title="TECH STACK"
            number="02"
            text="My Go-To Tools for Crafting Solutions"
          />
        </div>
      </div>

      {/* Stacks Section - Takes remaining height */}
      <div className="flex-1 relative min-h-0">
        <Stacks />
      </div>
    </section>
  );
};

export default TechStack;
