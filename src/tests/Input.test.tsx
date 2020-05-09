import React from "react";
import { mount } from "enzyme";
import Input from "../components/Input";
import { findByTestAttr } from "../../test/testUtils";
import languageContext from "../contexts/languageContext";

const setup = ({
  language,
  secretWord,
}: {
  language: string;
  secretWord: string;
}) => {
  language = language || "en";
  secretWord = secretWord || "party";
  return mount(
    <languageContext.Provider value={language}>
      <Input secretWord={secretWord} />
    </languageContext.Provider>
  );
};

test("Input renders w/o error", () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper: any;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    // Replace React's useState with our fake function (jest.fn())
    // We will return an array with an empty string and our mockSetCurrentGuess
    // We want to return mockSetCurrentGuess so we can see when useState is called, so we pass it into the array
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

  test("field is cleared upon submit button click", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");

    // pass in an empty preventDefault function to avoid error after using evt.preventDefault in component
    submitButton.simulate("click", {
      preventDefault() {},
    });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});

describe("languagePicker", () => {
  test("correctly renders submit string in english", () => {
    const wrapper = setup({ language: "en" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("Submit");
  });
  test("correctly renders submit string in emoji", () => {
    const wrapper = setup({ language: "emoji" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("🚀");
  });
});
