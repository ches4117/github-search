import "intersection-observer";
import { render } from "@testing-library/react";
import Repolist from "./index.tsx";
import { ProviderContext } from "../../context/provider";
const setup = () => {
  render(
    <ProviderContext>
      <Repolist />
    </ProviderContext>
  );
};

describe("Test RepoList", () => {
  it("Renders without crashing", () => {
    setup();
  });
});
