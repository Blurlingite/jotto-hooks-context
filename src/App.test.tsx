import React from "react";
import { mount } from "enzyme";
import App from "../src/App";
import { findByTestAttr } from "../test/testUtils";
import hookActions from "../src/actions/hookActions";
const mockGetSecretWord = jest.fn();

const setup = () => {
  // reset mock before each test
  mockGetSecretWord.mockClear();
  // replace actual function with the mock temporarily
  hookActions.getSecretWord = mockGetSecretWord;
  // using mount b/c useEffect doesn't work with shallow yet
  // http://github.com/airbnb/enzyme/issues/2086
  return mount(<App />);
};

test("App renders w/o error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.length).toBe(1);
});

describe("getSecretWord calls", () => {
  test("getSecretWord gets called on App mount", () => {
    setup();

    // check if secret word was updated
    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  test("secretWord does npt update on App update", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    // wrapper.update() doesn't trigger update
    // (issue forked from https://github.com/airbnb/enzyme/issues/2091)
    wrapper.setProps();

    // check if secret word was updated
    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});
