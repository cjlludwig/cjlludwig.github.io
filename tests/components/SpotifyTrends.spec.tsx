import React from "react";
import renderer from "react-test-renderer";

import SpotifyTrends from "../../src/components/SpotifyTrends";

describe("<SpotifyTrends />", () => {
  test("renders correctly", () => {
    const tree = renderer
      .create(<SpotifyTrends />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});