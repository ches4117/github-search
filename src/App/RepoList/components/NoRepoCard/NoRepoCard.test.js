import ReactDOM from "react-dom";
import NoRepoCard from "./index.tsx";

describe("Test NoRepoCard", () => {
  it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<NoRepoCard />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
