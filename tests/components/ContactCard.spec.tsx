import React from "react";
import renderer from "react-test-renderer";

import ContactCard from "../../src/components/ContactCard";

describe("<ContactCard />", () => {
  test("renders correctly", () => {
    const tree = renderer
      .create(<ContactCard />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});