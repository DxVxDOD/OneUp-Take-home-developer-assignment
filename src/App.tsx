import Widget from "./components/Widget";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <main className="main">
        <Toaster />
        <Widget />
      </main>
    </>
  );
}

export default App;
