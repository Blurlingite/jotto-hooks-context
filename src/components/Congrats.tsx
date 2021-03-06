import React from "react";
import stringsModule from "../helpers/strings";
import languageContext from "../contexts/languageContext";
import successContext from "../contexts/successContext";

const Congrats = () => {
  const [success]: any = successContext.useSuccess();
  // consume language context
  const language = React.useContext(languageContext);
  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, "congrats")}

          <button
            className="btn btn-primary mb-2"
            style={{ marginLeft: "10px" }}
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

export default Congrats;
