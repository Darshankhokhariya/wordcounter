import React, { useState, useEffect } from "react";
import {
  RxLetterCaseUppercase,
  RxLetterCaseLowercase,
  RxFontItalic,
  RxFontBold,
  RxLetterCaseCapitalize,
  RxReset,
} from "react-icons/rx";
import { Navbar } from "./Nav";

function Word() {
  const [inputText, setInputText] = useState("");
  const [fontStyle, setFontStyle] = useState(null);
  const [keywords, setKeywords] = useState({});
  const [paragraphs, setParagraphs] = useState(0);
  const [sentences, setSentences] = useState(0);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const countWords = () => {
    if (inputText?.length > 0) {
      const words = inputText.trim().split(/\s+/);
      return words.length;
    } else return 0;
  };

  const countParagraphs = () => {
    if (inputText?.length > 0) {
      const paragraphsArray = inputText.trim().split("\n");
      return paragraphsArray.length;
    } else return 0;
  };

  const countSentences = () => {
    if (inputText?.length > 0) {
      const sentencesArray = inputText.trim().split(/[.!?]+/);
      return sentencesArray.length;
    } else return 0;
  };

  const calculateReadingTime = () => {
    const wordsPerMinute = 200; // average reading speed
    const words = inputText.trim().split(/\s+/).length;
    const minutes = words / wordsPerMinute;
    return Math.ceil(minutes);
  };

  const calculateKeywords = () => {
    const words = inputText.trim().toLowerCase().split(/\s+/);
    const keywordsObj = {};
    words.forEach((word) => {
      if (keywordsObj[word]) {
        keywordsObj[word]++;
      } else {
        keywordsObj[word] = 1;
      }
    });
    setKeywords(keywordsObj);
  };

  const handleStyle = (style) => {
    setFontStyle(style);
  };

  const handleClear = () => {
    setInputText("");
    setFontStyle(null);
    setKeywords({});
    setParagraphs(0);
    setSentences(0);
  };

  useEffect(() => {
    // Calculate reading time whenever inputText changes
    calculateReadingTime();
    // Calculate keywords whenever inputText changes
    calculateKeywords();
    // Count paragraphs whenever inputText changes
    setParagraphs(countParagraphs());
    // Count sentences whenever inputText changes
    setSentences(countSentences());
  }, [inputText]);

  const facebookCharacterLimit = 6320; // Maximum characters for a Facebook post
  const twitterCharacterLimit = 280; // Maximum characters for a Tweet

  return (
    <>
      <div className=" bg-gray-100 flex flex-col items-center p-2 lg:p-8">
        <div className="w-[98%] lg:w-[80%] h-full  p-6 bg-white rounded-lg shadow-md flex flex-col  lg:flex-row gap-3">
          <div className="w-full lg:w-[75%]">
            <button
              onClick={handleClear}
              className="button m-2 py-1 px-3 rounded text-[12px] bg-sky-300 "
            >
              Clear
            </button>
            <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
              <div className="w-full mr-4">
                <textarea
                  rows="6"
                  value={inputText}
                  onChange={handleInputChange}
                  placeholder="Type here..."
                  className={`p-3 w-full outline-none rounded-xl border ${fontStyle}`}
                />
              </div>
              <div className=" flex-shrink-0 ">
                <div className="flex flex-row lg:flex-col gap-4">
                  <button
                    onClick={() => handleStyle("uppercase")}
                    className="button bg-slate-300 p-1 rounded"
                  >
                    <RxLetterCaseUppercase />
                  </button>
                  <button
                    onClick={() => handleStyle("lowercase")}
                    className="button bg-slate-300 p-1 rounded"
                  >
                    <RxLetterCaseLowercase />
                  </button>
                  <button
                    onClick={() => handleStyle("capitalize")}
                    className="button bg-slate-300 p-1 rounded"
                  >
                    <RxLetterCaseCapitalize />
                  </button>
                  <button
                    onClick={() => handleStyle("italic")}
                    className="button bg-slate-300 p-1 rounded"
                  >
                    <RxFontItalic />
                  </button>
                  <button
                    onClick={() => handleStyle("font-bold")}
                    className="button bg-slate-300 p-1 rounded"
                  >
                    <RxFontBold />
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center border p-4 rounded-lg bg-gray-200">
                <h1 className="text-xl font-semibold mb-2">WORDS</h1>
                <span className="text-3xl font-bold">{countWords()}</span>
              </div>
              <div className="text-center border p-4 rounded-lg bg-gray-200">
                <h1 className="text-xl font-semibold mb-2">CHARACTERS</h1>
                <span className="text-3xl font-bold">{inputText.length}</span>
              </div>
              <div className="text-center border p-4 rounded-lg bg-gray-200">
                <h1 className="text-xl font-semibold mb-2">READING TIME</h1>
                <span className="text-3xl font-bold">
                  {calculateReadingTime()} min
                </span>
              </div>
              <div className="text-center border p-4 rounded-lg bg-gray-200">
                <h1 className="text-xl font-semibold mb-2">PARAGRAPHS</h1>
                <span className="text-3xl font-bold">{paragraphs}</span>
              </div>
              <div className="text-center border p-4 rounded-lg bg-gray-200">
                <h1 className="text-xl font-semibold mb-2">SENTENCES</h1>
                <span className="text-3xl font-bold">{sentences}</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 w-full lg:w-[25%] rounded">
            <div className="text-center border p-4 rounded-lg  col-span-full">
              <h1 className="text-md font-semibold mb-2 text-start">
                KEYWORDS
              </h1>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(keywords).map(
                  (keyword) =>
                    keywords[keyword] > 1 && (
                      <div key={keyword}>
                        <span className="font-semibold">{keyword}</span>:{" "}
                        {keywords[keyword]}
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Word;
