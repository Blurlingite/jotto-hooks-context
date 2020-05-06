import React from "react";
import "./App.css";
import hookActions from "./actions/hookActions";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}
function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
  });

  const setSecretWord = (secretWord: string) =>
    dispatch({ type: "setSecretWord", payload: secretWord });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);
  return <div data-test="component-app" />;
}

export default App;
