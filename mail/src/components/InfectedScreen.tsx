type InfectedScreenProps = {
  onRetry: () => void;
};

function InfectedScreen({ onRetry }: InfectedScreenProps) {
  return (
    <div className="infected-screen">
      <div className="infected-box">
        <h1>⚠ ウイルス感染！！！ ⚠</h1>

        <p>
          フィッシングメールを本物のメールと
          間違えてしまいました。
        </p>

        <p>
          怪しいリンクを開くと、
          個人情報の流出や端末の危険につながります。
        </p>

        <button className="retry-button" onClick={onRetry}>
          もう一度挑戦する
        </button>
      </div>
    </div>
  );
}

export default InfectedScreen;