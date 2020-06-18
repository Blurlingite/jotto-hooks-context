import React from "react";
import "./App.css";
import hookActions from "./actions/hookActions";
import Input from "./components/Input";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import LanguagePicker from "./components/LanguagePicker";
import Congrats from "./components/Congrats";
import GuessedWords from "./components/GuessedWords";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    case "setLanguage":
      return { ...state, language: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}
function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
    language: "en",
  });

  const setSecretWord = (secretWord: string) =>
    dispatch({ type: "setSecretWord", payload: secretWord });

  const setLanguage = (language: string) => {
    dispatch({ type: "setLanguage", payload: language });
  };

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  if (!state.secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    );
  }

  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      {/* this provides the language to the components within it and we access the language through App's state with state.language*/}
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <successContext.SuccessProvider>
          <Congrats />
          <Input secretWord={state.secretWord} />
        </successContext.SuccessProvider>
        {/* <GuessedWords /> */}
      </languageContext.Provider>
    </div>
  );
}

export default App;
