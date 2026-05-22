const phishingMails = [
  {
    id: 1,
    type: "アカウント停止で脅す型",
    isPhishing: true,
    subject: "【重要】アカウント停止のお知らせ",
    senderName: "情報システム管理室",
    senderEmail: "support@example-security-check.com",
    body: `利用者各位

現在、お客様のアカウントにおいて不審なログインが検出されました。

安全確保のため、一時的にアカウント機能の制限を行っております。

下記のリンクよりご本人確認を行ってください。
確認が完了しない場合、アカウントは本日中に停止される可能性があります。

ご不明な点がございましたらお問い合わせください。`,
    linkText: "▼確認はこちら",
    linkUrl: "http://example-security-check.com",
    suspiciousPoints: [
      "「本日中」と急がせている",
      "個人名が書かれていない",
      "URLが公式サイトではない",
      "不審ログインの詳細説明がない",
    ],
  },

  {
    id: 2,
    type: "賞品や得で釣る型",
    isPhishing: true,
    subject: "【当選のお知らせ】Amazonギフト券 10,000円分プレゼント",
    senderName: "キャンペーン事務局",
    senderEmail: "campaign@gift-present-campaign.com",
    body: `お客様へ

日頃のご利用への感謝を込めて、抽選キャンペーンを実施しております。

このたび、お客様が「Amazonギフト券 10,000円分」の当選対象者に選ばれました。

賞品を受け取るには、以下のページより受け取り手続きを完了してください。

※本キャンペーンは本日23:59まで有効です。

期限を過ぎると受け取り権利は失効となります。

今後ともよろしくお願いいたします。`,
    linkText: "▼受け取りページ",
    linkUrl: "http://gift-present-campaign.com",
    suspiciousPoints: [
      "「突然の当選」で不自然",
      "応募した記憶がない",
      "URLが公式サイトではない",
      "「本日23:59まで」と急がせている",
      "送信元が曖昧で具体性がない",
    ],
  },

  {
    id: 3,
    type: "アカウント停止で脅す型",
    isPhishing: true,
    subject: "【重要】アカウント停止のお知らせ",
    senderName: "情報システム管理室",
    senderEmail: "security@security-check-account.com",
    body: `利用者各位

現在、お客様のアカウントにおいて不審なログインが確認されました。

安全確保のため、一部機能を一時的に制限しております。

下記のリンクより本人確認を行ってください。

確認が完了しない場合、アカウントは本日中に停止される可能性があります。

ご不明な点がございましたらお問い合わせください。`,
    linkText: "▼確認ページ",
    linkUrl: "http://security-check-account.com",
    suspiciousPoints: [
      "「本日中」と急がせている",
      "利用者名が書かれていない",
      "URLが公式ドメインではない",
      "不審ログインの詳細説明がない",
      "送信元情報が曖昧",
    ],
  },

  {
    id: 4,
    type: "学校や会社の事務連絡っぽく見せる型",
    isPhishing: true,
    subject: "【学生課より】履修登録情報確認のお願い",
    senderName: "学務サポートセンター",
    senderEmail: "support@university-support-check.com",
    body: `学生各位

現在、前期履修登録情報の確認作業を実施しております。

登録内容に不備がある場合、単位認定や成績処理に影響が出る可能性がありますので、必ずご確認ください。

以下のページにアクセスし、登録内容を確認してください。

なお、確認期限は本日17:00までとなっております。

ご協力よろしくお願いいたします。`,
    linkText: "▼確認ページ",
    linkUrl: "http://university-support-check.com",
    suspiciousPoints: [
      "「本日17:00まで」と急がせている",
      "正式な大学ドメインではないURL",
      "宛名が「学生各位」で具体名がない",
      "学校名や学籍番号など具体情報がない",
      "「単位認定に影響」と不安を煽っている",
    ],
  },

  {
    id: 5,
    type: "宅配や請求に見せる型",
    isPhishing: true,
    subject: "【お荷物のお届けについて】再配達手続きのお願い",
    senderName: "配送サポートセンター",
    senderEmail: "delivery@delivery-support-center.com",
    body: `お客様各位

ご不在のため、お荷物をお届けすることができませんでした。

再配達をご希望の場合は、下記ページより受け取り日時の設定をお願いいたします。

なお、保管期限を過ぎた場合、お荷物は返送される可能性があります。

お早めにご確認ください。`,
    linkText: "▼再配達受付ページ",
    linkUrl: "http://delivery-support-center.com",
    suspiciousPoints: [
      "宅配会社名が具体的に書かれていない",
      "URLが公式配送会社のドメインではない",
      "「お早めに」と急がせている",
      "荷物番号や注文情報が記載されていない",
      "宛名が「お客様各位」で曖昧",
    ],
  },

  {
    id: 6,
    type: "パスワード変更を装う型",
    isPhishing: true,
    subject: "【セキュリティ確認】パスワード変更のお願い",
    senderName: "アカウントセキュリティセンター",
    senderEmail: "security@account-security-reset.com",
    body: `お客様各位

お客様のアカウントに対して、通常とは異なるアクセスが確認されました。

安全確保のため、パスワードの再設定をお願いいたします。

以下のページより、現在のアカウント情報をご確認のうえ、新しいパスワードを設定してください。

なお、本日中に対応が行われない場合、一部サービスが利用できなくなる可能性があります。

ご協力よろしくお願いいたします。`,
    linkText: "▼パスワード再設定ページ",
    linkUrl: "http://account-security-reset.com",
    suspiciousPoints: [
      "「本日中」と急がせている",
      "URLが公式サイトのドメインではない",
      "宛名に個人名がない",
      "「通常とは異なるアクセス」の詳細説明がない",
      "送信元情報が曖昧",
    ],
  },

  {
    id: 7,
    type: "知人や上司を装う型",
    isPhishing: true,
    subject: "至急確認お願いします",
    senderName: "田中教授",
    senderEmail: "tanaka-prof@shared-file-check.com",
    body: `お疲れ様です。

会議資料を共有する予定だったのですが、学内システムの不具合で添付ができませんでした。

以下のリンクにアップロードしてあるので、確認をお願いします。

本日の会議で使用するため、確認後すぐに返信してください。

よろしくお願いします。`,
    linkText: "▼資料確認ページ",
    linkUrl: "http://shared-file-check.com",
    suspiciousPoints: [
      "普段使わない外部共有サイトを利用している",
      "URLが公式サービスではない",
      "「至急」「すぐに返信」と急がせている",
      "本人確認できる具体的な情報が少ない",
      "送信元メールアドレスが不自然な設定にできる",
    ],
  },

  {
    id: 8,
    type: "サポートを装う型",
    isPhishing: true,
    subject: "【重要】サポート窓口からのご連絡",
    senderName: "カスタマーサポートセンター",
    senderEmail: "support@support-center-help.com",
    body: `お客様各位

ご利用中のアカウントに関して、システム上の問題が確認されました。

問題解決のため、サポート担当者による確認作業が必要となっております。

以下のページにアクセスし、必要情報をご入力ください。

なお、一定期間内にご対応いただけない場合、一部サービスが停止される可能性があります。

ご理解とご協力をお願いいたします。`,
    linkText: "▼サポート確認ページ",
    linkUrl: "http://support-center-help.com",
    suspiciousPoints: [
      "サービス名が具体的に書かれていない",
      "URLが公式サポートサイトではない",
      "「サービス停止」で不安を煽っている",
      "宛名に個人名がない",
      "どのような問題か詳細説明がない",
    ],
  },

  {
    id: 9,
    type: "アンケートや出欠確認を装う型",
    isPhishing: true,
    subject: "【回答必須】授業出欠確認アンケート",
    senderName: "教育支援センター",
    senderEmail: "survey@student-questionnaire-check.com",
    body: `学生各位

授業運営改善のため、出欠確認を兼ねたアンケートを実施しております。

未回答の場合、出席状況の確認が正常に行えない可能性がありますので、必ずご回答ください。

以下のページよりアンケートへアクセスしてください。

回答期限は本日18:00までとなっております。

ご協力よろしくお願いいたします。`,
    linkText: "▼回答ページ",
    linkUrl: "http://student-questionnaire-check.com",
    suspiciousPoints: [
      "「回答必須」と強調して不安を煽っている",
      "URLが大学公式ドメインではない",
      "「本日18:00まで」と急がせている",
      "大学名や授業名など具体情報がない",
      "宛名が「学生各位」で曖昧",
    ],
  },

  {
    id: 10,
    type: "添付ファイルを開かせる型",
    isPhishing: true,
    subject: "【重要】請求書ファイル送付のお知らせ",
    senderName: "経理サポート窓口",
    senderEmail: "billing@invoice-confirmation-support.com",
    body: `お客様各位

ご利用料金に関する請求書を添付ファイルにて送付いたします。

内容をご確認のうえ、期日までにご対応をお願いいたします。

なお、未確認の場合、お支払い手続きに影響が出る可能性があります。

ご不明な点がございましたらお問い合わせください。`,
    linkText: "📎 invoice_confirmation.zip",
    linkUrl: "invoice_confirmation.zip",
    suspiciousPoints: [
      "添付ファイルがzip形式で不自然",
      "請求内容や利用サービスの詳細がない",
      "宛名に個人名がない",
      "「影響が出る可能性」と不安を煽っている",
      "送信元情報が曖昧",
    ],
  },

  {
  id: 11,
  type: "通常メール：Amazonセール通知",
  isPhishing: false,
  subject: "【Amazon】タイムセール祭り開催中",
  senderName: "Amazon.co.jp",
  senderEmail: "store-news@amazon.co.jp",
  body: `侑 様

Amazon タイムセール祭りが開催中です。

人気商品が期間限定価格で販売されています。

・ゲーミングデバイス
・PC周辺機器
・日用品
・ファッション

セール期間：
5月22日 9:00 ～ 5月24日 23:59

ぜひご利用ください。

Amazon.co.jp`,
  linkText: "セール会場を見る",
  linkUrl: "https://www.amazon.co.jp",
  suspiciousPoints: [],
},

{
  id: 12,
  type: "通常メール：Steamセール通知",
  isPhishing: false,
  subject: "Steamセールが開始されました",
  senderName: "Steam",
  senderEmail: "noreply@steampowered.com",
  body: `こんにちは。

ウィッシュリスト登録済みのゲームがセール対象になっています。

・Cyberpunk 2077
・ELDEN RING
・Hades II

セール終了まで残り48時間です。

Steamストアより詳細をご確認ください。`,
  linkText: "Steamストアを開く",
  linkUrl: "https://store.steampowered.com",
  suspiciousPoints: [],
},

{
  id: 13,
  type: "通常メール：GitHub通知",
  isPhishing: false,
  subject: "[GitHub] Pull request merged into main",
  senderName: "GitHub",
  senderEmail: "notifications@github.com",
  body: `Hello purasua6,

Your pull request has been successfully merged.

Repository:
ruha321/Security-Risk-Experience

Pull Request:
通常メール追加とUI改善 #12

Merged by:
ruha321

You’re receiving this email because you subscribed to notifications on this repository.`,
  linkText: "View pull request",
  linkUrl: "https://github.com/ruha321/Security-Risk-Experience",
  suspiciousPoints: [],
},

{
  id: 14,
  type: "通常メール：Googleセキュリティ通知",
  isPhishing: false,
  subject: "Google アカウントのログイン通知",
  senderName: "Google",
  senderEmail: "no-reply@accounts.google.com",
  body: `侑 様

お使いの Google アカウントに新しいログインがありました。

日時：
2026年5月22日 08:14

デバイス：
Windows Chrome

このログインに心当たりがある場合、対応は不要です。

Google アカウント チーム`,
  linkText: "Googleアカウントを確認する",
  linkUrl: "https://myaccount.google.com",
  suspiciousPoints: [],
},

{
  id: 15,
  type: "通常メール：Discord通知",
  isPhishing: false,
  subject: "New login detected",
  senderName: "Discord",
  senderEmail: "noreply@discord.com",
  body: `Hey purasua6,

We detected a login to your Discord account from a new location.

Location:
Tokyo, Japan

Device:
Chrome on Windows

If this was you, no further action is required.

Discord Security Team`,
  linkText: "Open Discord",
  linkUrl: "https://discord.com",
  suspiciousPoints: [],
},
];

export default phishingMails;