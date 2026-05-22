import { useEffect, useState } from "react";

type Popup = {
    id: number;
    message: string;
    left: number;
    top: number;
};

function ScamPage() {
    const [progress, setProgress] = useState(0);
    const [scanStatus, setScanStatus] = useState("Scanning Downloads...");
    const [cmdLines, setCmdLines] = useState<string[]>([]);
    const [popups, setPopups] = useState<Popup[]>([]);

    useEffect(() => {
        const scanMessages = [
            "Scanning Downloads...",
            "Checking Browser Cache...",
            "Analyzing Password Database...",
            "Inspecting Startup Programs...",
            "Threat detected...",
            "Registry access detected...",
        ];

        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                const next = Math.min(prev + Math.random() * 5, 100);

                setScanStatus(
                    scanMessages[Math.floor(Math.random() * scanMessages.length)]
                );

                if (next >= 100) {
                    clearInterval(progressTimer);
                }

                return next;
            });
        }, 500);

        return () => clearInterval(progressTimer);
    }, []);

    useEffect(() => {
        const lines = [
            "Initializing Defender Engine...",
            "Checking System32...",
            "Trojan detected...",
            "Browser passwords accessed...",
            "Credential leak suspected...",
            "Security breach confirmed...",
            "Remote access attempt detected...",
        ];

        let index = 0;

        const cmdTimer = setInterval(() => {
            if (index >= lines.length) {
                clearInterval(cmdTimer);
                return;
            }

            setCmdLines((prev) => [...prev, lines[index]]);
            index++;
        }, 900);

        return () => clearInterval(cmdTimer);
    }, []);

    useEffect(() => {
        const messages = [
            "Unauthorized access detected",
            "Banking credentials may be compromised",
            "Suspicious network activity found",
            "Windows Firewall disabled",
            "Remote connection attempt detected",
            "Your files may be at risk",
            "Browser passwords exposed",
            "Trojan spreading detected",
        ];

        const popupTimer = setInterval(() => {
            const popup: Popup = {
                id: Date.now(),
                message: messages[Math.floor(Math.random() * messages.length)],
                left: Math.random() * (window.innerWidth - 340),
                top: Math.random() * (window.innerHeight - 240),
            };

            setPopups((prev) => [...prev, popup]);

            setTimeout(() => {
                setPopups((prev) =>
                    prev.filter((item) => item.id !== popup.id)
                );
            }, 7000);
        }, 1800);

        return () => clearInterval(popupTimer);
    }, []);

    useEffect(() => {
        const enterFullscreen = async () => {
            try {
                if (!document.fullscreenElement) {
                    await document.documentElement.requestFullscreen();
                }
            } catch {
                // ブラウザの制限で失敗することがあるため無視
            }
        };

        enterFullscreen();

        document.addEventListener("click", enterFullscreen);
        document.addEventListener("keydown", enterFullscreen);

        return () => {
            document.removeEventListener("click", enterFullscreen);
            document.removeEventListener("keydown", enterFullscreen);
        };
    }, []);

    return (
        <div className="scam-page">
            <div className="windows-frame">
                <div className="titlebar">
                    <div className="title-left">
                        <div className="defender-icon"></div>
                        <span>Windows Security</span>
                    </div>

                    <div className="window-buttons">
                        <div>─</div>
                        <div>□</div>
                        <div>✕</div>
                    </div>
                </div>

                <div className="main-area">
                    <div className="sidebar">
                        <div className="sidebar-item active">
                            Virus & threat protection
                        </div>

                        <div className="sidebar-item">Account protection</div>
                        <div className="sidebar-item">Firewall & network</div>
                        <div className="sidebar-item">App & browser control</div>
                        <div className="sidebar-item">Device security</div>
                    </div>

                    <div className="content">
                        <div className="header">
                            <div className="alert-circle">!</div>

                            <div>
                                <div className="headline">Threats found</div>

                                <div className="subheadline">
                                    Microsoft Defender Antivirus found threats.
                                </div>
                            </div>
                        </div>

                        <div className="threat-box">
                            <div className="threat-title">
                                Trojan:Win32/CredentialStealer
                            </div>

                            <div className="threat-level">Severe</div>

                            <div className="threat-description">
                                This program is dangerous and executes commands from an attacker.
                            </div>
                        </div>

                        <div className="scan-section">
                            <div className="scan-header">
                                Quick scan in progress...
                            </div>

                            <div className="progress-wrapper">
                                <div
                                    id="progress-bar"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>

                            <div id="scan-status">{scanStatus}</div>
                        </div>

                        <div className="cmd-box">
                            {cmdLines.map((line, index) => (
                                <div key={index}>{"> " + line}</div>
                            ))}
                        </div>

                        <div className="warning-banner">
                            Your passwords and banking information may be at risk.
                        </div>

                        <button
                            className="action-button"
                            onClick={() => {
                                alert("これは教育用のサポート詐欺体験画面です。");
                            }}
                        >
                            Contact Microsoft Support
                        </button>

                        <div className="footer-note">
                            Cybersecurity awareness simulation
                        </div>
                    </div>
                </div>
            </div>

            {popups.map((popup) => (
                <div
                    key={popup.id}
                    className="fake-popup"
                    style={{
                        left: `${popup.left}px`,
                        top: `${popup.top}px`,
                    }}
                >
                    <div className="popup-header">
                        Windows Security Alert
                    </div>

                    <div className="popup-body">
                        <div className="popup-icon">⚠</div>

                        <div className="popup-message">
                            {popup.message}
                        </div>

                        <button className="popup-button">
                            Scan Now
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ScamPage;