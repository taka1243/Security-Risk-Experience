import { useEffect, useState } from "react";
import "./App.css";
import ScamPage from "./pages/ScamPage";

type Mail = {
  id: number;
  type: string;
  layout?: string;
  isPhishing: boolean;
  subject: string;
  senderName: string;
  senderEmail: string;
  body: string;
  linkText: string;
  linkUrl: string;
  suspiciousPoints: string[];
};

type UrlPopup = {
  x: number;
  y: number;
  url: string;
  isPhishing: boolean;
};

function App() {
  const [page, setPage] = useState<"start" | "game" | "scam" | "result">("start");
  const [mailIndex, setMailIndex] = useState(0);
  const [mail, setMail] = useState<Mail | null>(null);
  const [totalMails, setTotalMails] = useState(0);
  const [, setSelectedAnswer] = useState<"safe" | "phishing" | "">("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [urlPopup, setUrlPopup] = useState<UrlPopup | null>(null);

  useEffect(() => {
    fetch("/api/questions/count")
      .then((res) => res.json())
      .then((data) => setTotalMails(data.count));
  }, []);

  useEffect(() => {
    if (page !== "game") return;

    fetch(`/api/question/${mailIndex + 1}`)
      .then((res) => res.json())
      .then((data) => setMail(data));
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
      setPage("scam");
      return;
    }

    setScore(score + 10);
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
    setUrlPopup(null);
    setMail(null);
  };

  if (page === "start") {
    return (
      <div className="start-screen">
        <h1>Security Risk Experience</h1>
        <p>メールを見分けて、フィッシング被害を防ごう</p>
        <button onClick={() => setPage("game")}>START</button>
      </div>
    );
  }

  if (page === "scam") {
    return <ScamPage />;
  }

  if (page === "result") {
    return (
      <div className="result-screen">
        <h1>Game Clear!</h1>
        <p>Score: {score} / {totalMails * 10}</p>

        <button
          onClick={() => {
            setMailIndex(0);
            setSelectedAnswer("");
            setShowResult(false);
            setIsCorrect(null);
            setScore(0);
            setUrlPopup(null);
            setMail(null);
            setPage("start");
          }}
        >
          Play Again
        </button>
      </div>
    );
  }

  if (!mail) {
    return <div className="loading">読み込み中...</div>;
  }

  const layoutClass = `layout-${mail.layout ?? "default"}`;

  return (
    <div
      className={`app ${layoutClass}`}
      onClick={() => {
        setUrlPopup(null);
      }}
    >
      <div className="mail-window">
        <div className="mail-toolbar">
          <span className="mail-count">
            {mailIndex + 1} / {totalMails}
          </span>
          <span className="mail-category">{mail.type}</span>
        </div>

        <div className="brand-header">
          <div className="brand-logo">{mail.senderName.charAt(0)}</div>

          <div>
            <div className="brand-name">{mail.senderName}</div>
            <div className="brand-sub">
              {mail.isPhishing ? "重要なお知らせ" : "公式通知"}
            </div>
          </div>
        </div>

        <div className="mail-header">
          <div className={mail.isPhishing ? "mail-type danger" : "mail-type safe"}>
            {mail.isPhishing ? "要注意メール" : "通常メール"}
          </div>

          <h1>{mail.subject}</h1>

          <div className="sender-area">
            <div>
              <div className="sender-name">{mail.senderName}</div>
              <div className="sender-email">{mail.senderEmail}</div>
            </div>
          </div>
        </div>

        <div className="mail-body">
          {mail.body.split("\n").map((line, index) => {
            if (line.trim() === "") {
              return <div key={index} className="blank-line" />;
            }

            return <p key={index}>{line}</p>;
          })}

          <a
            href={mail.linkUrl}
            title={mail.linkUrl}
            className={mail.isPhishing ? "mail-link suspicious-link" : "mail-link normal-link"}
            onContextMenu={(event) => {
              event.preventDefault();
              event.stopPropagation();

              setUrlPopup({
                x: event.clientX + 16,
                y: event.clientY - 10,
                url: mail.linkUrl,
                isPhishing: mail.isPhishing,
              });
            }}
            onClick={(event) => {
              event.preventDefault();

              if (mail.isPhishing) {
                setPage("scam");
                return;
              }

              setUrlPopup({
                x: event.clientX + 16,
                y: event.clientY - 10,
                url: mail.linkUrl,
                isPhishing: mail.isPhishing,
              });
            }}
          >
            {mail.linkText}
          </a>
        </div>

        <div className="answer-area">
          <p>このメールはフィッシングメールだと思いますか？</p>

          <div className="answer-buttons">
            <button className="safe-answer-button" onClick={() => handleAnswer("safe")}>
              安全なメール
            </button>

            <button className="phishing-answer-button" onClick={() => handleAnswer("phishing")}>
              フィッシングメール
            </button>
          </div>
        </div>

        {showResult && (
          <div className={isCorrect ? "result-box correct-result" : "result-box wrong-result"}>
            <h2>{isCorrect ? "正解です" : "不正解です"}</h2>

            <p>
              このメールは
              <strong>
                {mail.isPhishing ? " フィッシングメール " : " 通常メール "}
              </strong>
              です。
            </p>

            <h3>確認ポイント</h3>

            <ul>
              {mail.suspiciousPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>

            <button onClick={goNextMail}>次のメールへ</button>
          </div>
        )}
      </div>

      {urlPopup && (
        <div
          style={{
            position: "fixed",
            left: `${urlPopup.x}px`,
            top: `${urlPopup.y}px`,
            zIndex: 99999,
            width: "360px",
            maxWidth: "calc(100vw - 32px)",
            background: "#ffffff",
            border: urlPopup.isPhishing ? "2px solid #dc2626" : "2px solid #2563eb",
            borderRadius: "14px",
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.28)",
            overflow: "hidden",
          }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              background: urlPopup.isPhishing ? "#dc2626" : "#2563eb",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: "15px",
            }}
          >
            {urlPopup.isPhishing ? "⚠ URLを確認してください" : "✅ URL確認"}
          </div>

          <div style={{ padding: "14px 16px" }}>
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                fontWeight: 800,
                marginBottom: "8px",
              }}
            >
              リンク先URL
            </div>

            <div
              style={{
                padding: "10px",
                borderRadius: "10px",
                background: "#f8fafc",
                border: "1px solid #cbd5e1",
                color: "#0f172a",
                fontSize: "13px",
                lineHeight: 1.6,
                wordBreak: "break-all",
              }}
            >
              {urlPopup.url}
            </div>

            <div
              style={{
                marginTop: "10px",
                fontSize: "13px",
                lineHeight: 1.6,
                color: urlPopup.isPhishing ? "#b91c1c" : "#1d4ed8",
                fontWeight: 700,
              }}
            >
              {urlPopup.isPhishing
                ? "公式サイトに似せた偽URLの可能性があります。"
                : "企業・サービスに沿ったURLです。"}
            </div>

            <button
              style={{
                marginTop: "12px",
                width: "100%",
                border: "none",
                borderRadius: "10px",
                padding: "10px",
                background: "#111827",
                color: "#ffffff",
                fontWeight: 800,
                cursor: "pointer",
              }}
              onClick={() => setUrlPopup(null)}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;