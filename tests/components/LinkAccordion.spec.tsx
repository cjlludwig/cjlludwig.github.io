import React from "react";
import renderer from "react-test-renderer";
// import { render, fireEvent, waitFor } from "@testing-library/react";

import LinkAccordion from "../../src/components/LinkAccordion";

// function renderLinkAccordion(props: Partial<Props> = {}) {
//   const defaultProps: Props = {
//     links: []
//   };

//   return render(<LinkAccordion {...defaultProps} {...props} />);
// }

describe("<LinkAccordion />", () => {
  test("renders correctly", () => {
    const tree = renderer
      .create(<LinkAccordion links={[]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  //   const { findByTestId } = renderLinkAccordion();

  //   const LinkAccordion = await findByTestId("link-accordion");
  
  //   expect(LinkAccordion).toHaveFormValues({
  //     username: "",
  //     password: "",
  //     remember: true
  //   });
  //   expect(true).toEqual(true);
});