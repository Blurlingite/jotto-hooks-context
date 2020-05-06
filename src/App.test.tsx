import React from "react";
import { mount } from "enzyme";
import App from "../src/App";
import { findByTestAttr } from "../test/testUtils";
import hookActions from "../src/actions/hookActions";
const mockGetSecretWord = jest.fn();

const setup = (secretWord: string | null = "party") => {
  // reset mock before each test
  mockGetSecretWord.mockClear();
  // replace actual function with the mock temporarily
  hookActions.getSecretWord = mockGetSecretWord;

  // mock useReducer to have secretWord as part of our state for the test
  // we are mocking the return value of a useReducer hook:
  // 1st param: desired state (the secretWord)
  // 2nd param: a placeholder mock function for the dispatch function (jest.fn()). This won't be part of our tests, just something to stop errors
  const mockUseReducer = jest.fn().mockReturnValue([{ secretWord }, jest.fn()]);
  // React's useReducer hook is now your mock function
  React.useReducer = mockUseReducer;
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

describe("secretWord is not null", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = setup("party");
  });
  test("renders App when secretWord is not null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");

    // check if app component exists
    expect(appComponent.exists()).toBe(true);
  });

  test("does not render spinner when secretWord is not null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");

    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe("secretWord is null", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = setup(null);
  });
  test("does not render App when secretWord is null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");

    // check if app component exists
    expect(appComponent.exists()).toBe(false);
  });

  test("renders spinner when secretWord is null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");

    expect(spinnerComponent.exists()).toBe(true);
  });
});
