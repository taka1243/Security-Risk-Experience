import { useEffect, useState } from "react";

type ScamPageProps = {
    onBack: () => void;
};

const scanMessages = [
    "システムファイルを確認中...",
    "ブラウザキャッシュを確認中...",
    "保存された認証情報を確認中...",
    "不審な通信を検出...",
    "脅威を隔離できません...",
];

const alerts = [
    "不審なログインが検出されました",
    "保存済みパスワードが危険にさらされている可能性があります",
    "外部サーバーへの通信を検出しました",
    "ブラウザ設定が変更されています",
];

function ScamPage({ onBack }: ScamPageProps) {
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState(scanMessages[0]);
    const [logs, setLogs] = useState<string[]>([]);
    const [popup, setPopup] = useState(alerts[0]);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = Math.min(prev + 6, 100);
                setMessage(scanMessages[Math.floor(Math.random() * scanMessages.length)]);
                return next;
            });
        }, 500);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const logLines = [
            "Security scan started...",
            "Checking browser storage...",
            "Suspicious URL detected...",
            "Credential risk detected...",
            "User action required...",
        ];

        let index = 0;

        const timer = setInterval(() => {
            if (index >= logLines.length) return;
            setLogs((prev) => [...prev, logLines[index]]);
            index++;
        }, 900);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setPopup(alerts[Math.floor(Math.random() * alerts.length)]);
        }, 2000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="scam-page">
            <div className="scam-window">
                <div className="scam-titlebar">
                    <div className="scam-title-left">
                        <div className="scam-shield">!</div>
                        <span>Security Warning Simulation</span>
                    </div>
                    <button className="scam-close-button" onClick={onBack}>
                        ✕
                    </button>
                </div>

                <div className="scam-main">
                    <aside className="scam-sidebar">
                        <div className="scam-sidebar-active">Virus & threat protection</div>
                        <div>Account protection</div>
                        <div>Firewall & network</div>
                        <div>App & browser control</div>
                    </aside>

                    <section className="scam-content">
                        <div className="scam-alert-header">
                            <div className="scam-alert-icon">⚠</div>
                            <div>
                                <h1>Threats found</h1>
                                <p>この画面は教育用の疑似サポート詐欺体験です。</p>
                            </div>
                        </div>

                        <div className="scam-threat-card">
                            <h2>Trojan:Demo/CredentialRisk</h2>
                            <p className="scam-danger">Risk level: Severe</p>
                            <p>
                                不安をあおる警告画面が表示された場合、電話番号に連絡したり、
                                個人情報を入力したりしないでください。
                            </p>
                        </div>

                        <div className="scam-scan-card">
                            <div className="scam-scan-title">Quick scan in progress...</div>

                            <div className="scam-progress">
                                <div
                                    className="scam-progress-bar"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <p>{message}</p>
                        </div>

                        <div className="scam-log">
                            {logs.map((line, index) => (
                                <div key={index}>{"> " + line}</div>
                            ))}
                        </div>

                        <div className="scam-popup">
                            <strong>Security Alert</strong>
                            <p>{popup}</p>
                        </div>

                        <div className="scam-actions">
                            <button
                                className="scam-red-button"
                                onClick={() => {
                                    alert("これは教育用デモです。実際のサポート窓口ではありません。");
                                }}
                            >
                                Contact Support
                            </button>

                            <button className="scam-back-button" onClick={onBack}>
                                問題に戻る
                            </button>
                        </div>

                        <div className="scam-note">
                            Cybersecurity awareness simulation
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default ScamPage;