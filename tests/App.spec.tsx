import { render, screen } from '@testing-library/react';
import renderer from "react-test-renderer";
import App from '../src/App';

import ContactCard from "../src/components/ContactCard"
import Resume from "../src/components/Resume"
import Welcome from "../src/components/Welcome"
import Header from "../src/components/Header"

jest.mock("../src/components/ContactCard");
jest.mock("../src/components/LinkCatalog");
jest.mock("../src/components/Resume");
jest.mock("../src/components/Welcome");
jest.mock("../src/components/Header");

describe("<App />", () => {
  test("renders correctly", () => {
    const tree = renderer
      .create(<App />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
