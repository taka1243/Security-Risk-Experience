import { useState } from "react";
import "./App.css";

import phishingMails from "./data/phishingMails";

function App() {
  const [mailIndex, setMailIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<"safe" | "phishing" | "">("");
  const [showResult, setShowResult] = useState(false);

  const mail = phishingMails[mailIndex];

  const dangerWords = [
    "本日中",
    "至急",
    "重要",
    "停止",
    "制限",
    "回答必須",
    "未確認",
    "影響",
    "失効",
    "お早めに",
  ];

  const isAttachment =
    mail.linkText.includes("📎") ||
    mail.linkUrl.endsWith(".zip") ||
    mail.linkUrl.endsWith(".pdf") ||
    mail.linkUrl.endsWith(".docx");

  const renderBodyLine = (line: string) => {
    if (!mail.isPhishing) {
      return line;
    }

    let parts: string[] = [line];

    dangerWords.forEach((word) => {
      parts = parts.flatMap((part) => {
        if (!part.includes(word)) {
          return [part];
        }

        const splitParts = part.split(word);
        const result: string[] = [];

        splitParts.forEach((splitPart, index) => {
          result.push(splitPart);

          if (index < splitParts.length - 1) {
            result.push(word);
          }
        });

        return result;
      });
    });

    return parts.map((part, index) => {
      if (dangerWords.includes(part)) {
        return (
          <span key={index} className="danger-word">
            {part}
          </span>
        );
      }

      return part;
    });
  };

  const handleAnswer = (answer: "safe" | "phishing") => {
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const isCorrect =
    (selectedAnswer === "phishing" && mail.isPhishing) ||
    (selectedAnswer === "safe" && !mail.isPhishing);

  const goNextMail = () => {
    setMailIndex((mailIndex + 1) % phishingMails.length);
    setSelectedAnswer("");
    setShowResult(false);
  };

  const goPrevMail = () => {
    setMailIndex((mailIndex - 1 + phishingMails.length) % phishingMails.length);
    setSelectedAnswer("");
    setShowResult(false);
  };

  return (
    <div className="app">
      <div className="mail-window">
        <div className="mail-toolbar">
          <button onClick={goPrevMail}>←</button>
          <button>アーカイブ</button>
          <button>迷惑メール</button>
          <button>削除</button>
          <span className="mail-count">
            {mailIndex + 1} / {phishingMails.length}
          </span>
        </div>

        <div className="mail-header">
          <div className="mail-type-label">
            {mail.isPhishing ? "判定対象メール" : "通常メール"}
          </div>

          <h1 className={mail.isPhishing ? "phishing-title" : "normal-title"}>
            {mail.subject}
          </h1>

          <div className="sender-area">
            <div className={mail.isPhishing ? "avatar phishing-avatar" : "avatar normal-avatar"}>
              {mail.senderName.charAt(0)}
            </div>

            <div>
              <div className="sender-name">{mail.senderName}</div>
              <div className="sender-email">{mail.senderEmail}</div>
            </div>
          </div>
        </div>

        <div className={mail.isPhishing ? "mail-body phishing-body" : "mail-body normal-body"}>
          {mail.body.split("\n").map((line, index) => {
            if (line.trim() === "") {
              return <div key={index} className="blank-line" />;
            }

            return <p key={index}>{renderBodyLine(line)}</p>;
          })}

          {isAttachment ? (
            <a
              href={mail.linkUrl}
              className="attachment-card"
              onClick={(event) => {
                event.preventDefault();
                alert("これは学習用の疑似添付ファイルです。実際には開かないでください。");
              }}
            >
              <div className="attachment-icon">📎</div>
              <div>
                <div className="attachment-name">{mail.linkText.replace("📎", "").trim()}</div>
                <div className="attachment-info">ZIP ファイル</div>
              </div>
            </a>
          ) : (
            <a
              href={mail.linkUrl}
              className={mail.isPhishing ? "mail-link suspicious-link" : "mail-link normal-link"}
              onClick={(event) => {
                event.preventDefault();
                alert("これは学習用の疑似リンクです。");
              }}
            >
              {mail.linkText}
            </a>
          )}
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
              <strong>{mail.isPhishing ? " フィッシングメール " : " 通常メール "}</strong>
              です。
            </p>

            {mail.isPhishing ? (
              <>
                <h3>怪しいポイント</h3>
                <ul>
                  {mail.suspiciousPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="normal-explanation">
                送信元ドメインや本文内容が比較的自然で、強い脅しや不自然な外部URL誘導がありません。
              </p>
            )}

            <button onClick={goNextMail}>次のメールへ</button>
          </div>
        )}

        {!showResult && (
          <div className="next-area">
            <button onClick={goNextMail}>次のメールへ</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;