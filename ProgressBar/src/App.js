import "./app.css";
import CheckoutStepper from "./Components/Stepper";

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

function App() {
  return (
    <div>
      <h2>Checkout</h2>
      <CheckoutStepper stepsConfig={CHECKOUT_STEPS} />
    </div>
  );
}

export default App;