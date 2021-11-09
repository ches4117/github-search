import "intersection-observer";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Search from "./index.tsx";
import { ProviderContext } from "../../context/provider";

const setup = () => {
  render(
    <ProviderContext>
      <MemoryRouter initialEntries={[{ word: "test" }]}>
        <Search />
      </MemoryRouter>
    </ProviderContext>
  );
};

describe("Test Search", () => {
  it("Renders without crashing", () => {
    setup();
  });
});
