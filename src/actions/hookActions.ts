import axios from "axios";

// when this gets an axios response, it will use the passed in setSecretWord functtion to set the secret word
export const getSecretWord = async (setSecretWord: any) => {
  const response = await axios.get("http://localhost:3030");
  setSecretWord(response.data);
};

// default export for mocking convenience
export default {
  getSecretWord,
};
