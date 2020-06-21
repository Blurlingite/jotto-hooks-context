import React from "react";
import stringsModule from "../helpers/strings";
import languageContext from "../contexts/languageContext";
import successContext from "../contexts/successContext";

interface ComponentProps {
  secretWord: string;
}
function Input({ secretWord }: { secretWord: string }) {
  const language = React.useContext(languageContext);
  const [success, setSuccess]: any = successContext.useSuccess();
  const [currentGuess, setCurrentGuess] = React.useState("");

  if (success) {
    return null;
  }
  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={stringsModule.getStringByLanguage(
            language,
            "guessInputPlaceholder"
          )}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={(evt) => {
            evt.preventDefault();

            if (currentGuess === secretWord) {
              setSuccess(true);
            }
            setCurrentGuess(""); // clear input box
          }}
        >
          {stringsModule.getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
}

export default Input;
