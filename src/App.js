import Dashboard1 from "../Dashboard1";
// import Sidebar from './component/Sidebar';
import { BrowserRouter } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <>
      <section className="App">
        <BrowserRouter>
          <Dashboard1 />
        </BrowserRouter>
      </section>
    </>
  );
}

export default App;
