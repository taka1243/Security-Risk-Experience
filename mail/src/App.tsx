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
  const [page, setPage] = useState<
    "start" | "game" | "scam" | "result"
  >("start");

  const [mailIndex, setMailIndex] = useState(0);

  const [mail, setMail] = useState<Mail | null>(null);

  const [totalMails, setTotalMails] = useState(0);

  const [, setSelectedAnswer] = useState<
    "safe" | "phishing" | ""
  >("");

  const [showResult, setShowResult] = useState(false);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [score, setScore] = useState(0);

  const [life, setLife] = useState(3);

  const [combo, setCombo] = useState(0);

  const [maxCombo, setMaxCombo] = useState(0);

  const [urlPenaltyCount, setUrlPenaltyCount] = useState(0);

  useEffect(() => {
    fetch("/api/questions/count")
      .then((res) => res.json())
      .then((data) => {
        setTotalMails(data.count);
      });
  }, []);

  useEffect(() => {
    if (page !== "game") return;

    fetch(`/api/question/${mailIndex + 1}`)
      .then((res) => res.json())
      .then((data) => {
        setMail(data);
      });
  }, [mailIndex, page]);

  const handleAnswer = async (answer: "safe" | "phishing") => {
    if (!mail) return;

    setSelectedAnswer(answer);

    const res = await fetch("/api/answer", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        questionId: mail.id,
        answer,
      }),
    });

    const result = await res.json();

    setIsCorrect(result.correct);

    if (result.goToSupportScam) {
      const nextLife = life - 1;

      setLife(nextLife);
      setCombo(0);

      if (nextLife <= 0) {
        setPage("result");
        return;
      }

      setPage("scam");
      return;
    }

    const nextCombo = combo + 1;
    const comboBonus = Math.floor(nextCombo / 2) * 5;
    const basePoint = mail.isPhishing ? 20 : 10;

    setCombo(nextCombo);
    setMaxCombo(Math.max(maxCombo, nextCombo));
    setScore(score + basePoint + comboBonus);
    setShowResult(true);
  };

  const goNextMail = () => {
    if (mailIndex + 1 >= totalMails) {
      setPage("result");
      return;
    }

    setMailIndex(mailIndex + 1);
    setSelectedAnswer("");
    setShowResult(false);
    setIsCorrect(null);
    setMail(null);
  };

  if (page === "start") {
    return (
      <div className="start-screen">
        <div className="start-card">
          <div className="start-badge">
            Click Trap
          </div>

          <h1>Click Trap</h1>

          <p className="start-subtitle">
            フィッシングメールを見抜き、危険なリンクや不審なメールから身を守る体験型ゲームです。
          </p>

          <div className="start-rule-grid">
            <div className="start-rule-card">
              <div className="rule-icon">✉️</div>
              <h3>メールを確認</h3>
              <p>件名・送信元・本文・リンク先をよく確認しましょう。</p>
            </div>

            <div className="start-rule-card">
              <div className="rule-icon">❤️</div>
              <h3>ライフ制</h3>
              <p>間違えるとライフが減ります。0になるとゲーム終了です。</p>
            </div>

            <div className="start-rule-card">
              <div className="rule-icon">🔥</div>
              <h3>コンボボーナス</h3>
              <p>連続正解するとスコアにボーナスが加算されます。</p>
            </div>
          </div>

          <div className="start-warning">
            ⚠️ 怪しいリンクを押すと減点されます
          </div>

          <button
            className="start-main-button"
            onClick={async () => {
              await fetch("/api/questions/reset", {
                method: "POST",
              });

              setMailIndex(0);
              setMail(null);
              setScore(0);
              setLife(3);
              setCombo(0);
              setMaxCombo(0);
              setUrlPenaltyCount(0);
              setShowResult(false);
              setIsCorrect(null);
              setPage("game");
            }}
          >
            ゲームを開始する
          </button>
        </div>
      </div>
    );
  }

  if (page === "scam") {
    return (
      <ScamPage
        onBack={() => {
          setShowResult(false);
          setIsCorrect(null);
          setPage("game");
        }}
      />
    );
  }

  if (page === "result") {
    const lifeBonus = life * 20;
    const finalScore = score + lifeBonus;
    const isGameOver = life <= 0;

    return (
      <div className="result-screen">
        <div className="result-card">
          <div
            className={
              isGameOver
                ? "result-badge result-badge-danger"
                : "result-badge result-badge-clear"
            }
          >
            {isGameOver ? "GAME OVER" : "GAME CLEAR"}
          </div>

          <h1>
            {isGameOver ? "ゲーム終了" : "クリア！"}
          </h1>

          <p className="result-lead">
            {isGameOver
              ? "ライフがなくなりました。もう一度挑戦してみましょう。"
              : "すべての問題に挑戦しました。判定結果を確認しましょう。"}
          </p>

          <div className="final-score-box">
            <span>Final Score</span>
            <strong>{finalScore}</strong>
          </div>

          <div className="result-grid">
            <div className="score-card">
              <span>基本スコア</span>
              <strong>{score}</strong>
            </div>

            <div className="score-card">
              <span>ライフボーナス</span>
              <strong>+{lifeBonus}</strong>
            </div>

            <div className="score-card">
              <span>最大コンボ</span>
              <strong>{maxCombo}</strong>
            </div>

            <div className="score-card">
              <span>誤クリック減点</span>
              <strong>-{urlPenaltyCount * 10}</strong>
            </div>

            <div className="score-card">
              <span>残りライフ</span>
              <strong>{life > 0 ? "❤️".repeat(life) : "0"}</strong>
            </div>

            <div className="score-card">
              <span>出題数</span>
              <strong>{totalMails}</strong>
            </div>
          </div>

          <div className="result-comment">
            {finalScore >= totalMails * 20
              ? "素晴らしい判定力です。怪しいメールを冷静に確認できています。"
              : finalScore >= totalMails * 10
                ? "良い結果です。送信元やURLをさらに意識するとより安全です。"
                : "メール内のリンクを押す前に、送信元とURLを確認する習慣をつけましょう。"}
          </div>

          <button
            className="result-main-button"
            onClick={async () => {
              await fetch("/api/questions/reset", {
                method: "POST",
              });

              setMailIndex(0);
              setSelectedAnswer("");
              setShowResult(false);
              setIsCorrect(null);
              setScore(0);
              setLife(3);
              setCombo(0);
              setMaxCombo(0);
              setUrlPenaltyCount(0);
              setMail(null);
              setPage("start");
            }}
          >
            もう一度プレイする
          </button>
        </div>
      </div>
    );
  }

  if (!mail) {
    return <div className="loading">読み込み中...</div>;
  }

  return (
    <div className="app">
      <div className="mail-app-frame">

        {/* TOP BAR */}

        <div className="mail-topbar">

          <div className="mail-service-name">
            Mail Viewer
          </div>

          <div className="mail-status">

            <span>
              {mailIndex + 1} / {totalMails}
            </span>

            <span>
              Combo: {combo}
            </span>

            <span>
              Life: {"❤️".repeat(life)}
            </span>

          </div>

        </div>

        {/* LAYOUT */}

        <div className="mail-layout">

          {/* SIDE MENU */}

          <aside className="mail-side-menu">

            <div className="side-menu-item active">
              受信トレイ
            </div>

            <div className="side-menu-item">
              スター付き
            </div>

            <div className="side-menu-item">
              送信済み
            </div>

            <div className="side-menu-item">
              迷惑メール
            </div>

          </aside>

          {/* MAIL READER */}

          <main className="mail-reader">

            {/* TOOLBAR */}

            <div className="mail-reader-toolbar">

              <button>戻る</button>

              <button>アーカイブ</button>

              <button>削除</button>

              <button>その他</button>

            </div>

            {/* MAIL CARD */}

            <article className="mail-card-real">

              {/* SUBJECT */}

              <div className="mail-subject-row">

                <h1>
                  {mail.subject}
                </h1>

                <span
                  className={
                    mail.isPhishing
                      ? "mail-risk-badge danger"
                      : "mail-risk-badge safe"
                  }
                >
                  判定対象
                </span>

              </div>

              {/* META */}

              <div className="mail-meta-real">

                <div
                  className={
                    mail.isPhishing
                      ? "mail-avatar danger-avatar"
                      : "mail-avatar safe-avatar"
                  }
                >
                  {mail.senderName.charAt(0)}
                </div>

                <div className="mail-meta-text">

                  <div className="mail-sender-line">

                    <strong>
                      {mail.senderName}
                    </strong>

                    <span>
                      &lt;{mail.senderEmail}&gt;
                    </span>

                  </div>

                  <div className="mail-to-line">
                    To: 自分
                  </div>

                </div>

                <div className="mail-date">
                  今日 10:24
                </div>

              </div>

              {/* MAIL BODY */}

              <div className="mail-content-real">

                {
                  mail.body
                    .split("\n")
                    .map((line, index) => {

                      if (line.trim() === "") {

                        return (
                          <div
                            key={index}
                            className="mail-space"
                          />
                        );
                      }

                      return (
                        <p key={index}>
                          {line}
                        </p>
                      );

                    })
                }

                {/* LINK */}

                <a
                  href={mail.linkUrl}
                  className={
                    mail.isPhishing
                      ? "real-mail-link danger-link"
                      : "real-mail-link safe-link"
                  }
                  onClick={(event) => {

                    event.preventDefault();

                    if (mail.isPhishing) {

                      const nextLife =
                        life - 1;

                      setScore(
                        Math.max(
                          0,
                          score - 10
                        )
                      );

                      setLife(nextLife);

                      setCombo(0);

                      setUrlPenaltyCount(
                        urlPenaltyCount + 1
                      );

                      if (nextLife <= 0) {

                        setPage("result");

                        return;
                      }

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

                {/* URL PREVIEW */}

                <div className="url-preview-box">

                  リンク先:
                  {" "}
                  {mail.linkUrl}

                </div>

              </div>

            </article>

            {/* JUDGE PANEL */}

            <div className="judge-panel">

              <p>
                このメールは
                フィッシングメールだと思いますか？
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
                    handleAnswer("phishing")
                  }
                >
                  フィッシングメール
                </button>

              </div>

            </div>

            {/* RESULT */}

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

          </main>

        </div>

      </div>
    </div>
  );
}

export default App;