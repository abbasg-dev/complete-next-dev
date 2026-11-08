import { useEffect, useState } from "react";
import axios from "axios";

function Translate({ language, text }) {
  const [translated] = useTranslation(text, language);

  return (
    <div className="translate">
      <label className="label">Output</label>
      <h1 className="title">{translated.replace("&#39;", "'")}</h1>
    </div>
  );
}

const useTranslation = (text, language) => {
  const [translated, setTranslated] = useState("");

  useEffect(() => {
    if (!text) {
      return;
    }

    const cancelToken = axios.CancelToken.source();

    doTranslation(text, language, cancelToken, setTranslated);

    return () => {
      try {
        cancelToken.cancel();
      } catch (err) {}
    };
  }, [text, language]);

  return [translated];
};

const debounce = (fn) => {
  let id = null;

  return (...args) => {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      fn(...args);
      id = null;
    }, 300);
  };
};

const doTranslation = debounce(
  async (input, languageCode, cancelToken, callback) => {
    try {
      const { data } = await axios.get(
        "https://api.mymemory.translated.net/get",
        {
          params: {
            q: input,
            langpair: `en|${languageCode}`,
          },
          cancelToken: cancelToken.token,
        },
      );

      callback(data.responseData.translatedText);
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.log(err.response?.data || err.message);
        callback("");
      }
    }
  },
);

export default Translate;
