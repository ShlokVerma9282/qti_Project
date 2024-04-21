import { useEffect, useRef, useState } from "react";

const CheckoutStepper = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const stepRef = useRef([]);

  useEffect(() => {
    stepRef.current[currentStep - 1]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [currentStep]);

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="relative">
        <div className="flex justify-between items-center">
          {stepsConfig.map((step, index) => {
            const isStepCompleted = currentStep > index + 1 || isComplete;
            const isCurrentStep = currentStep === index + 1;
            return (
              <div key={step.name} ref={(el) => (stepRef.current[index] = el)} className="step relative">
                <div className={`step-number ${isStepCompleted ? "bg-green-500 text-white" : "bg-gray-300"} flex justify-center items-center rounded-full w-8 h-8 z-10 relative`}>
                  {isStepCompleted ? <span>&#10003;</span> : <span>{index + 1}</span>}
                </div>
                {index < stepsConfig.length - 1 && <div className={`line h-0.5 ${isStepCompleted ? "bg-green-500" : "bg-gray-300"} w-full absolute left-0 top-4`}></div>}
                <div className="step-name">{step.name}</div>
              </div>
            );
          })}
        </div>
      </div>
      <>{ActiveComponent && <ActiveComponent />}</>
      {!isComplete && (
        <button className="btn mt-4" onClick={handleNext}>
          {currentStep === stepsConfig.length ? "Finish" : "Next"}
        </button>
      )}
    </div>
  );
};

export default CheckoutStepper;
