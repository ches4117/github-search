import { render, fireEvent } from "@testing-library/react";
import ErrorModal from "./index.tsx";

describe("Test NoRepoCard", () => {
  it("Renders without crashing", () => {
    const { getByText } = render(
      <ErrorModal error="test" showModal={() => {}} />
    );

    fireEvent.click(getByText("close"));
    expect(getByText("close")).toBeInTheDocument();
  });
});
