import React from "react";
import stringsModule from "../helpers/strings";
import languageContext from "../contexts/languageContext";

const Congrats = (props: any) => {
  // consume language context
  const language = React.useContext(languageContext);
  if (props.success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, "congrats")}
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

// const mapStateToProps = ({ success }: { success: boolean }) => {
//   return { success };
// };

export default Congrats;
