const React = require("react");
const { useState } = require("react");
const { TiTick } = require("react-icons/ti");
require("./stepper.css");

const Stepper = () => {
  const steps = ["Course-Creation", "Course-Settings", "Course-Price", "Course-Thumbnail",'Course-Intro'];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      { className: "flex justify-between" },
      steps.map((step, i) =>
        React.createElement(
          "div",
          {
            key: i,
            className: `step-item ${
              currentStep === i + 1 && "active"
            } ${i + 1 < currentStep || complete ? "complete" : ""}`,
          },
          React.createElement(
            "div",
            { className: "step" },
            i + 1 < currentStep || complete ? React.createElement(TiTick, { size: 24 }) : i + 1
          ),
          React.createElement("p", { className: "text-black" }, step)
        )
      )
    ),
    !complete &&
      React.createElement(
        "button",
        {
          className: "btn",
          onClick: () => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          },
        },
        currentStep === steps.length ? "Finish" : "Next"
      )
  );
};

module.exports = Stepper;
