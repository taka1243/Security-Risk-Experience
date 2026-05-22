import { useEffect, useState } from "react";

type ScamPageProps = {
    onBack: () => void;
};

const scanMessages = [
    "Checking browser cache...",
    "Analyzing saved credentials...",
    "Inspecting suspicious redirect...",
    "Detecting unauthorized access...",
    "Verifying network activity...",
];

const logLines = [
    "Security scan started...",
    "Suspicious URL access detected...",
    "Potential credential exposure found...",
    "Untrusted support page pattern detected...",
    "User action required...",
];

const popupMessages = [
    "不審なリンクへのアクセスを検出しました",
    "個人情報の入力を求める画面に注意してください",
    "電話番号に連絡しないでください",
    "公式サイトを自分で開いて確認してください",
];

function ScamPage({ onBack }: ScamPageProps) {
    const [progress, setProgress] = useState(0);
    const [scanMessage, setScanMessage] = useState(scanMessages[0]);
    const [logs, setLogs] = useState<string[]>([]);
    const [popupMessage, setPopupMessage] = useState(popupMessages[0]);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = Math.min(prev + 5, 100);

                setScanMessage(
                    scanMessages[Math.floor(Math.random() * scanMessages.length)]
                );

                return next;
            });
        }, 500);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        let index = 0;

        const timer = setInterval(() => {
            if (index >= logLines.length) {
                clearInterval(timer);
                return;
            }

            setLogs((prev) => [...prev, logLines[index]]);
            index++;
        }, 900);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setPopupMessage(
                popupMessages[Math.floor(Math.random() * popupMessages.length)]
            );
        }, 2200);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="scam-page">
            <div className="scam-window">
                <header className="scam-titlebar">
                    <div className="scam-title-left">
                        <div className="scam-shield">!</div>
                        <span>Security Warning Simulation</span>
                    </div>

                    <button
                        className="scam-close-button"
                        onClick={onBack}
                    >
                        ✕
                    </button>
                </header>

                <div className="scam-main">
                    <aside className="scam-sidebar">
                        <div className="scam-sidebar-active">
                            Virus & threat protection
                        </div>
                        <div>Account protection</div>
                        <div>Firewall & network</div>
                        <div>App & browser control</div>
                        <div>Device security</div>
                    </aside>

                    <main className="scam-content">
                        <div className="simulation-ribbon">
                            教育用シミュレーション / 実在の警告ではありません
                        </div>

                        <section className="scam-hero">
                            <div className="scam-alert-icon">⚠</div>

                            <div>
                                <h1>Threats found</h1>
                                <p>
                                    不安をあおる警告画面が表示された場合は、
                                    電話番号へ連絡したり、個人情報を入力したりしないでください。
                                </p>
                            </div>
                        </section>

                        <section className="scam-grid">
                            <div className="scam-threat-card">
                                <div className="card-label">Detected item</div>

                                <h2>Trojan:Demo/CredentialRisk</h2>

                                <p className="scam-danger">
                                    Risk level: Severe
                                </p>

                                <p>
                                    この画面は、サポート詐欺でよく使われる
                                    「恐怖を与えて連絡させる」演出を学ぶための疑似画面です。
                                </p>
                            </div>

                            <div className="scam-popup-card">
                                <strong>Security Alert</strong>
                                <p>{popupMessage}</p>
                            </div>
                        </section>

                        <section className="scam-scan-card">
                            <div className="scam-scan-header">
                                <span>Quick scan in progress...</span>
                                <strong>{Math.floor(progress)}%</strong>
                            </div>

                            <div className="scam-progress">
                                <div
                                    className="scam-progress-bar"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <p>{scanMessage}</p>
                        </section>

                        <section className="scam-log">
                            {logs.map((line, index) => (
                                <div key={index}>{"> " + line}</div>
                            ))}
                        </section>

                        <section className="scam-learning-box">
                            <h3>この画面で学ぶポイント</h3>

                            <ul>
                                <li>突然の警告で不安をあおる画面は注意する</li>
                                <li>表示された電話番号やサポート窓口には連絡しない</li>
                                <li>公式サイトを自分で開いて確認する</li>
                                <li>ブラウザを閉じられないように見せる演出に惑わされない</li>
                            </ul>
                        </section>

                        <div className="scam-actions">
                            <button
                                className="scam-red-button"
                                onClick={() => {
                                    alert(
                                        "これは教育用デモです。実際のサポート窓口ではありません。"
                                    );
                                }}
                            >
                                Contact Support
                            </button>

                            <button
                                className="scam-back-button"
                                onClick={onBack}
                            >
                                問題に戻る
                            </button>
                        </div>

                        <div className="scam-note">
                            Cybersecurity awareness simulation
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default ScamPage;