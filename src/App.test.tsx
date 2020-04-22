import React from "react";
import { shallow } from "enzyme";
import { render } from "@testing-library/react";
import App from "../src/App";
import { findByTestAttr } from "../test/testUtils";

const setup = () => {
  return shallow(<App />);
};

test("App renders w/o error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.length).toBe(1);
});
