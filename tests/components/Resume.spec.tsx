import React from "react";
import renderer from "react-test-renderer";

import Resume from "../../src/components/Resume";

describe("<Resume />", () => {
  test("renders correctly", () => {
    const tree = renderer
      .create(<Resume />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});