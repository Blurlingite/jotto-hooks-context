import React from "react";
import stringsModule from "../helpers/strings";
import languageContext from "../contexts/languageContext";

interface ComponentProps {
  secretWord: string;
}
function Input(props: ComponentProps) {
  const language = React.useContext(languageContext);
  const [currentGuess, setCurrentGuess] = React.useState("");

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
            setCurrentGuess("");
          }}
        >
          {stringsModule.getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
}

export default Input;
