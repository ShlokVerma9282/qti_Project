import { useState } from "react";
import AccordionHeader from "./AccordionHeader";
import C1 from "../C1_Component";
import C2 from "../C2_Component";
import C3 from "../C3_Component";
import C4 from "../C4_Component";
import Stepper from "../stepper";

const CHECKOUT_STEPS = [
    {
      name: "Project Info",
      Component: () => <div>Provide your Project Info </div>,
    },
    {
      name: "Project Intro Video",
      Component: () => <div>Provide your Project Intro Video.</div>,
    },
    {
      name: "Project Builder",
      Component: () => <div>Complete Project Builder.</div>,
    },
    {
      name: "Project Price",
      Component: () => <div> Enter Project Price</div>,
    },
  
    {
      name: "Certificate Template",
      Component: () => <div> Provide Certificate Templete</div>,
    },
  ];

export default function Accordion() {

    // State to track which accordion item is active
    const [activeIndex, setActiveIndex] = useState(null);
    //https://purecode.ai/blogs/tailwind-accordion/
    //https://www.geeksforgeeks.org/accordion-template-using-reactjs-and-tailwind/
    // Function to toggle accordion item
    const toggleAccordion = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };
    
    return (
        <div className="p-3 m-2">
            <div key={0} className="border-2 mb-4 rounded-md">
                {/* Accordion header */}
                <AccordionHeader
                    toggleAccordion={toggleAccordion}
                    elementIndex={0}
                    activeIndex={activeIndex}
                    sectionTitle="Project Info"
                />
                {/* Accordion content */}
                {activeIndex === 0 && (
                    <C1/>
                )}
            </div>
            <div key={1} className="border-2 mb-4 rounded-md">
                {/* Accordion header */}
                <AccordionHeader
                    toggleAccordion={toggleAccordion}
                    elementIndex={1}
                    activeIndex={activeIndex}
                    sectionTitle="Project Intro Video"
                />
                {/* Accordion content */}
                {activeIndex === 1 && (
                    <C2 />
                )}
            </div>
            <div key={2} className="border-2 mb-4 rounded-md">
                {/* Accordion header */}
                <AccordionHeader
                    toggleAccordion={toggleAccordion}
                    elementIndex={2}
                    activeIndex={activeIndex}
                    sectionTitle="Project Builder"
                />
                {/* Accordion content */}
                {activeIndex === 2 && (
                    <C3 />
                )}
            </div>
            <div key={3} className="border-2 mb-4 rounded-md">
                {/* Accordion header */}
                <AccordionHeader
                    toggleAccordion={toggleAccordion}
                    elementIndex={3}
                    activeIndex={activeIndex}
                    sectionTitle="Project Price"
                />
                {/* Accordion content */}
                {activeIndex === 3 && (
                    <C4 />
                )}
            </div>
            <div key={4} className="border-2 mb-4 rounded-md">
                {/* Accordion header */}
                <AccordionHeader
                    toggleAccordion={toggleAccordion}
                    elementIndex={4}
                    activeIndex={activeIndex}
                    sectionTitle="Additional Information"
                />
                {/* Accordion content */}
                {activeIndex === 4 && (
                    <div className="p-4 bg-white">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Morbi facilisis ligula pulvinar libero dapibus, eget
                        pulvinar mi commodo. Donec ac consectetur ante.
                        Praesent sollicitudin sapien et convallis egestas.
                        Nam non tempus purus. Nullam nec pharetra justo.
                        Donec sit amet efficitur velit. Aliquam pulvinar,
                        turpis a egestas lacinia, dolor mi varius leo,
                        vel lobortis eros ex nec est.
                    </div>
                )}
            </div>
            <div key={5} className="border-2 mb-4 rounded-md">
                {/* Accordion header */}
                <AccordionHeader
                    toggleAccordion={toggleAccordion}
                    elementIndex={5}
                    activeIndex={activeIndex}
                    sectionTitle="Certificate Template"
                />
                {/* Accordion content */}
                {activeIndex === 5 && (
                    <div className="p-4 bg-white">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Morbi facilisis ligula pulvinar libero dapibus, eget
                        pulvinar mi commodo. Donec ac consectetur ante.
                        Praesent sollicitudin sapien et convallis egestas.
                        Nam non tempus purus. Nullam nec pharetra justo.
                        Donec sit amet efficitur velit. Aliquam pulvinar,
                        turpis a egestas lacinia, dolor mi varius leo,
                        vel lobortis eros ex nec est.
                    </div>
                )}
            </div>
            <Stepper stepsConfig={CHECKOUT_STEPS}></Stepper>
        </div>
    )
}