import React from "react";
import renderer from "react-test-renderer";

import LinkCatalog from "../../src/components/LinkCatalog";
import LinkAccordion from "../../src/components/LinkAccordion";

jest.mock("../../src/components/LinkAccordion");

describe("<LinkCatalog />", () => {
  test("renders correctly", () => {
    const tree = renderer
      .create(<LinkCatalog />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});