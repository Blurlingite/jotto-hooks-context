import React from "react";
import { shallow } from "enzyme";
import Input from "../components/Input";
import { findByTestAttr } from "../../test/testUtils";

const setup = (secretWord = "party") => {
  return shallow(<Input secretWord={secretWord} />);
};

test("Input renders w/o error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper: any;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({});
  });
  test("state updates with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");

    // these 2 lines simulate input box getting a value of "train"
    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent); // simulate onChange, so it's like entering the word "train" & clicking the submit button

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });
});
