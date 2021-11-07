import { shallow } from "enzyme";
import { ProviderContext } from "./provider";

let TestComponent;
beforeAll(() => {
  TestComponent = () => (
    <ProviderContext>
      <div />
    </ProviderContext>
  );
});

describe("Test Provider", () => {
  it("Renders without crashing", () => {
    const element = shallow(<TestComponent />);
    expect(element).toEqual({});
  });
});
