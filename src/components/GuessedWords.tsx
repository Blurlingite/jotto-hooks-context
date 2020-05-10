import React from "react";
import stringsModule from "../helpers/strings";
import languageContext from "../contexts/languageContext";

type guessedWordType = { guessedWord: string; letterMatchCount: number };

const GuessedWords = (props: any) => {
  const language = React.useContext(languageContext);
  let contents;
  if (props.guessedWords.length === 0) {
    contents = (
      <span data-test="guess-instructions">
        {stringsModule.getStringByLanguage(language, "guessPrompt")}
      </span>
    );
  } else {
    const guessedWordsRows = props.guessedWords.map(
      (word: guessedWordType, index: number) => (
        <tr data-test="guessed-word" key={index}>
          <td>{word.guessedWord}</td>
          <td>{word.letterMatchCount}</td>
        </tr>
      )
    );
    contents = (
      <div data-test="guessed-words">
        <h3> {stringsModule.getStringByLanguage(language, "guessedWords")}</h3>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>
                {stringsModule.getStringByLanguage(
                  language,
                  "guessColumnHeader"
                )}
              </th>
              <th>
                {stringsModule.getStringByLanguage(
                  language,
                  "matchingLettersColumnHeader"
                )}
              </th>
            </tr>
          </thead>
          <tbody>{guessedWordsRows}</tbody>
        </table>
      </div>
    );
  }
  return <div data-test="component-guessed-words">{contents}</div>;
};

export default GuessedWords;
