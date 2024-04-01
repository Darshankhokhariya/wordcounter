import React, { useState } from "react";

const Word = () => {
  const [paragraph, setParagraph] = useState("");
  const [keywords, setKeywords] = useState("");
  const [wordCount, setWordCount] = useState({});
  const [highlightedParagraph, setHighlightedParagraph] = useState("");
  const [keywordCount, setKeywordCount] = useState({});

  const countWords = () => {
    const words = paragraph.toLowerCase().match(/\b\w+\b/g);
    const wordCountObj = {};
    const keywordCountObj = {};

    if (words) {
      // Count words
      words.forEach((word) => {
        wordCountObj[word] = (wordCountObj[word] || 0) + 1;
      });

      // Highlight main keywords
      let highlighted = paragraph;
      const keywordList = keywords.split(",");
      keywordList.forEach((keyword) => {
        highlighted = highlighted.replace(
          new RegExp(`\\b${keyword.trim()}\\b`, "gi"),
          `<strong>${keyword.trim()}</strong>`
        );
      });

      setWordCount(wordCountObj);
      setHighlightedParagraph(highlighted);
      setKeywordCount(keywordCountObj);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "paragraph") {
      setParagraph(value);
    } else if (name === "keywords") {
      setKeywords(value);
    }
  };

  return (
    <div>
      <textarea
        name="paragraph"
        value={paragraph}
        onChange={handleInputChange}
        placeholder="Enter your paragraph"
        rows={5}
        cols={50}
      />
      <br />
      <input
        type="text"
        name="keywords"
        value={keywords}
        onChange={handleInputChange}
        placeholder="Enter main keywords separated by commas"
      />
      <br />
      <button onClick={countWords}>Count Words</button>
      <br />
      <h3>Word Count:</h3>
      <ul>
        {Object.entries(wordCount).map(([word, count]) => (
          <li key={word}>
            {word}: {count}
          </li>
        ))}
      </ul>
      <h3>Highlighted Paragraph:</h3>
      <p dangerouslySetInnerHTML={{ __html: highlightedParagraph }} />
      <h3>Keyword Count:</h3>
      <ul>
        {Object.entries(keywordCount).map(([keyword, count]) => (
          <li key={keyword}>
            {keyword}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Word;
