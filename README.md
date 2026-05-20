# Security-Risk-Experience

## どんなアプリケーション？

フィッシングメール見分けゲーム
外れサイトへアクセスするとサポート詐欺の警告画面が出てきて利用者を驚かせる

## python環境について

pythonのパッケージ管理ツールにuvを用いています.
入れなくても多分動きますが，入れれるなら入れるととても便利です．
仮想環境を自動で作成，アクティベートしてくれます．

### uvインストール方法

windows powershellで以下のコマンドを入力
`powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`

macOS/Linux ターミナルで以下のコマンドを入力
`curl -LsSf https://astral.sh/uv/install.sh | sh`

### 基本的なコマンド

flask起動

`uv run -m app.app`

依存関係の同期（インストール）
runをする前にこのコマンドを実行しておく

`uv sync`

他のコマンドの参考サイト
<https://speakerdeck.com/mickey_kubo/pythonpatukeziguan-li-uv-wan-quan-ru-men>

## フロント開発環境について

Node.jsを用いるのでインストールしていないならインストール必須です

### Node.jsインストール方法

nvmからインストールする方法がお勧めです.

[このリンク](https://github.com/coreybutler/nvm-windows/releases "https://github.com/coreybutler/nvm-windows/releases")
からnvm-setup.zipを入手し解凍後インストーラーを起動します．

nvmのインストール終了後，`nvm install 24.14.0`でNode.jsをインストールできます．
インストール終了後，`node -v`と`npm -v`で正常にインストールされているか確認してください.

### 基本的な使い方

インストール終了後，リポジトリの該当ディレクトリ内で
`npm install`
を実行します.

（開発環境での）起動コマンド
ホットリロードによって変更がリアルタイムで反映されるので，開発しやすいと思います.

`npm run dev`

ライブラリ追加(例)

`npm install tailwindcss @tailwindcss/vite`

viteを使っているので，プラグインの追加が必要なパッケージがあるみたいです.
そのライブラリのガイドを参照すると詳しいことが書いてあります.  
例

```javascript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```
