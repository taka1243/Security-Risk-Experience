import { useEffect, useState } from "react";

import "./App.css";

import ScamPage from "./pages/ScamPage";

type Mail = {
  id: number;
  type: string;

  isPhishing: boolean;

  subject: string;

  senderName: string;
  senderEmail: string;

  body: string;

  linkText: string;
  linkUrl: string;

  suspiciousPoints: string[];
};

function App() {

  /*
    PAGE
  */

  const [page, setPage] = useState<
    "start" |
    "game" |
    "scam" |
    "result"
  >("start");

  /*
    MAIL DATA
  */

  const [mailIndex, setMailIndex] =
    useState(0);

  const [mail, setMail] =
    useState<Mail | null>(null);

  const [totalMails, setTotalMails] =
    useState(0);

  /*
    GAME STATE
  */

  const [, setSelectedAnswer] = useState<
    "safe" | "phishing" | ""
  >("");

  const [showResult, setShowResult] =
    useState(false);

  const [isCorrect, setIsCorrect] =
    useState<boolean | null>(null);

  const [score, setScore] =
    useState(0);

  /*
    LOAD TOTAL MAIL COUNT
  */

  useEffect(() => {

    fetch("/api/questions/count")
      .then((res) => res.json())
      .then((data) => {

        setTotalMails(data.count);

      });

  }, []);

  /*
    LOAD MAIL
  */

  useEffect(() => {

    if (page !== "game") return;

    fetch(
      `/api/question/${mailIndex + 1}`
    )
      .then((res) => res.json())
      .then((data) => {

        setMail(data);

      });

  }, [mailIndex, page]);

  /*
    ANSWER
  */

  const handleAnswer = async (
    answer: "safe" | "phishing"
  ) => {

    if (!mail) return;

    setSelectedAnswer(answer);

    const res = await fetch(
      "/api/answer",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          questionId: mail.id,
          answer,
        }),
      }
    );

    const result =
      await res.json();

    setIsCorrect(
      result.correct
    );

    /*
      WRONG
    */

    if (
      result.goToSupportScam
    ) {

      setPage("scam");

      return;
    }

    /*
      CORRECT
    */

    setScore(score + 10);

    setShowResult(true);
  };

  /*
    NEXT MAIL
  */

  const goNextMail = () => {

    if (
      mailIndex + 1 >=
      totalMails
    ) {

      setPage("result");

      return;
    }

    setMailIndex(
      mailIndex + 1
    );

    setSelectedAnswer("");

    setShowResult(false);

    setIsCorrect(null);
  };

  /*
    START PAGE
  */

  if (page === "start") {

    return (
      <div className="start-screen">

        <h1>
          Security Risk Experience
        </h1>

        <button
          onClick={() => {

            setPage("game");

          }}
        >
          START
        </button>

      </div>
    );
  }

  /*
    SCAM PAGE
  */

  if (page === "scam") {

    return <ScamPage />;
  }

  /*
    RESULT PAGE
  */

  if (page === "result") {

    return (
      <div className="result-screen">

        <h1>
          Game Clear!
        </h1>

        <p>
          Score:
          {" "}
          {score}
          {" / "}
          {totalMails * 10}
        </p>

        <button
          onClick={() => {

            setMailIndex(0);

            setSelectedAnswer("");

            setShowResult(false);

            setIsCorrect(null);

            setScore(0);

            setPage("start");
          }}
        >
          Play Again
        </button>

      </div>
    );
  }

  /*
    LOADING
  */

  if (!mail) {

    return (
      <div>
        読み込み中...
      </div>
    );
  }

  /*
    GAME PAGE
  */

  return (
    <div className="app">

      <div className="mail-window">

        <div className="mail-toolbar">

          <span className="mail-count">

            {mailIndex + 1}
            {" / "}
            {totalMails}

          </span>

        </div>

        <div className="mail-header">

          <div className="mail-type-label">
            判定対象メール
          </div>

          <h1
            className={
              mail.isPhishing
                ? "phishing-title"
                : "normal-title"
            }
          >
            {mail.subject}
          </h1>

          <div className="sender-area">

            <div
              className={
                mail.isPhishing
                  ? "avatar phishing-avatar"
                  : "avatar normal-avatar"
              }
            >
              {
                mail.senderName
                  .charAt(0)
              }
            </div>

            <div>

              <div className="sender-name">
                {mail.senderName}
              </div>

              <div className="sender-email">
                {mail.senderEmail}
              </div>

            </div>

          </div>

        </div>

        <div
          className={
            mail.isPhishing
              ? "mail-body phishing-body"
              : "mail-body normal-body"
          }
        >

          {
            mail.body
              .split("\n")
              .map(
                (
                  line,
                  index
                ) => {

                  if (
                    line.trim() === ""
                  ) {

                    return (
                      <div
                        key={index}
                        className="blank-line"
                      />
                    );
                  }

                  return (
                    <p key={index}>
                      {line}
                    </p>
                  );
                }
              )
          }

          <a
            href={mail.linkUrl}
            className={
              mail.isPhishing
                ? "mail-link suspicious-link"
                : "mail-link normal-link"
            }
            onClick={(event) => {

              event.preventDefault();

              if (
                mail.isPhishing
              ) {

                setPage("scam");

                return;
              }

              alert(
                "これは学習用の疑似リンクです。"
              );
            }}
          >
            {mail.linkText}
          </a>

        </div>

        <div className="answer-area">

          <p>
            このメールは
            フィッシングメール
            だと思いますか？
          </p>

          <div className="answer-buttons">

            <button
              className="safe-answer-button"
              onClick={() =>
                handleAnswer("safe")
              }
            >
              安全なメール
            </button>

            <button
              className="phishing-answer-button"
              onClick={() =>
                handleAnswer(
                  "phishing"
                )
              }
            >
              フィッシングメール
            </button>

          </div>

        </div>

        {
          showResult && (
            <div
              className={
                isCorrect
                  ? "result-box correct-result"
                  : "result-box wrong-result"
              }
            >

              <h2>

                {
                  isCorrect
                    ? "正解です"
                    : "不正解です"
                }

              </h2>

              <p>

                このメールは

                <strong>

                  {
                    mail.isPhishing
                      ? " フィッシングメール "
                      : " 通常メール "
                  }

                </strong>

                です。

              </p>

              {
                mail.isPhishing && (
                  <>

                    <h3>
                      怪しいポイント
                    </h3>

                    <ul>

                      {
                        mail.suspiciousPoints.map(
                          (
                            point,
                            index
                          ) => (
                            <li key={index}>
                              {point}
                            </li>
                          )
                        )
                      }

                    </ul>

                  </>
                )
              }

              <button
                onClick={goNextMail}
              >
                次のメールへ
              </button>

            </div>
          )
        }

      </div>

    </div>
  );
}

export default App;