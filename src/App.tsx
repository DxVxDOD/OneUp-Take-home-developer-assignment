import { useState } from "react";
import Widget from "./components/Widget";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main>
        <Widget />
      </main>
    </>
  );
}

export default App;
