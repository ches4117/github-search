import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import Repolist from "./index.tsx";
import { ProviderContext } from "../../context/provider";

const TestRepolist = shallow(
  <ProviderContext>
    <Repolist />
  </ProviderContext>
);

describe("Test RepoList", () => {
  it("Renders without crashing", () => {
    expect(TestRepolist).toEqual({});
  });

  it("Success close modal", () => {
    TestRepolist.find("button").simulate("click");
  });
});
