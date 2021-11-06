import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import RepoCard from "./index.tsx";
import { addEm, dateTrans } from "./utils";

describe("Test RepoCard", () => {
  it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<RepoCard />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("emphasized search text", () => {
    const wrapper = shallow(<div>{addEm("test", "te")}</div>);
    expect(wrapper.find("em").hasClass("emText")).toBe(true);
  });

  test("don't show nowYear", () => {
    expect(dateTrans("2021-11-06", "2021-11-06", "2021")).toBe("6 Nov ");
  });

  test("show year before nowYear", () => {
    expect(dateTrans("2021-11-06", "2020-11-06", "2021")).toBe("6 Nov 2020");
  });
});
