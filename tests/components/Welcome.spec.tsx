import React from "react";
import renderer from "react-test-renderer";

import Welcome from "../../src/components/Welcome";
import Typewriter from 'typewriter-effect';

jest.mock("typewriter-effect");

describe("<Welcome />", () => {
  test("renders correctly", () => {
    const tree = renderer
      .create(<Welcome />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});