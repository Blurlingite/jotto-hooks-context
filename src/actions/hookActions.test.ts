import moxios from "moxios";

import { getSecretWord } from "./hookActions";

describe("moxios tests", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  // needs to be async b/c we are waiting for our moxios response
  test("calls the getSecretWord callback on axiios response", async () => {
    const secretWord = "party";

    // handles any axios calls during the test
    moxios.wait(() => {
      // get most recent axios call
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord,
      });
    });

    // mock getSecretWord, call it with that mock, and then make sure the mock was called with the response from moxios
    // create mock for callback arg
    const mockGetSecretWord = jest.fn();
    await getSecretWord(mockGetSecretWord);

    // see if mock ran with correct argument
    expect(mockGetSecretWord).toHaveBeenCalledWith(secretWord);
  });
});
