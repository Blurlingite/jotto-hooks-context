import React from "react";
import "./App.css";
import hookActions from "./actions/hookActions";
import Input from "./components/Input";
import languageContext from "./contexts/languageContext";
import guessedWordsContext from "./contexts/guessedWordsContext";
import successContext from "./contexts/successContext";
import LanguagePicker from "./components/LanguagePicker";
import Congrats from "./components/Congrats";
import GuessedWords from "./components/GuessedWords";

interface AppState {
  secretWord: string | null;
  language: string;
}

enum Action {
  "setSecretWord" = "setSecretWord",
  "setLanguage" = "setLanguage",
}

interface setSecretWord {
  type: Action.setSecretWord;
  payload: string;
}

interface setLanguage {
  type: Action.setLanguage;
  payload: string;
}

type AppActions = setSecretWord | setLanguage;

function reducer(state: AppState, action: AppActions) {
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
  // const isRevealed = true;

  const [isRevealed, setIsRevealed] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
    language: "en",
  });

  const setSecretWord = (secretWord: string) =>
    dispatch({ type: Action.setSecretWord, payload: secretWord });

  const setLanguage = (language: string) => {
    dispatch({ type: Action.setLanguage, payload: language });
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
      {isRevealed ? (
        <p>The secret word is {state.secretWord}</p>
      ) : (
        <p>
          The secret word is ?????
          <button
            className="btn btn-primary mb-2"
            style={{ marginLeft: "10px" }}
            onClick={(evt) => {
              evt.preventDefault();
              setIsRevealed(true);
            }}
          >
            Reveal Word
          </button>
        </p>
      )}

      <h1>Jotto</h1>
      {/* this provides the language to the components within it and we access the language through App's state with state.language*/}
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <guessedWordsContext.GuessedWordsProvider>
          <successContext.SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord} />
          </successContext.SuccessProvider>
          <GuessedWords />
        </guessedWordsContext.GuessedWordsProvider>
      </languageContext.Provider>
    </div>
  );
}

export default App;
