# 家族の家事スケジューラー セットアップ手順

## ファイル構成

```
family-chores/
├── index.html              ← メインアプリ
├── manifest.json           ← PWA設定
├── sw.js                   ← Service Worker
├── supabase_tables.sql     ← DBテーブル定義
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── .github/
    └── workflows/
        └── deploy.yml      ← 自動デプロイ設定
```

---

## Step 1: Supabase セットアップ

1. https://supabase.com でアカウント作成・新規プロジェクト作成
2. **SQL Editor** を開き `supabase_tables.sql` の内容を貼り付けて **Run**
3. **Project Settings → API** で以下をメモ:
   - `Project URL`（例: `https://xxxx.supabase.co`）
   - `anon public` キー

---

## Step 2: GitHub リポジトリを作成

```bash
# リポジトリ名は family-chores にする（URLが /family-chores/ になる）
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/あなたのID/family-chores.git
git push -u origin main
```

---

## Step 3: GitHub Pages を有効化

1. リポジトリの **Settings → Pages**
2. **Source**: `GitHub Actions` を選択
3. main ブランチに push すると自動でデプロイされます

公開URL: `https://あなたのID.github.io/family-chores/`

---

## Step 4: アプリで Supabase に接続

1. 公開URLにアクセスしてアプリを開く
2. 下のナビから **設定** タブを開く
3. **Supabase 接続** に Step 1 でメモした URL と Key を入力
4. **接続する** をタップ → 「接続成功」と表示されればOK

接続情報はブラウザのローカルストレージに保存されるため、
次回以降は自動で接続されます。

---

## Step 5: 家族のスマホにインストール（PWA）

公開URLを家族に共有するだけです。

**iPhone (Safari):**
サイトを開く → 下の共有ボタン →「ホーム画面に追加」→「追加」

**Android (Chrome):**
サイトを開く → 右上メニュー → 「アプリをインストール」または「ホーム画面に追加」

---

## リポジトリ名を変えた場合

`manifest.json` の `start_url` と `scope` を変更してください:

```json
{
  "start_url": "/あなたのリポジトリ名/",
  "scope": "/あなたのリポジトリ名/"
}
```

`sw.js` の ASSETS 配列も同様に変更してください。

---

## オフライン動作について

Service Worker によりオフラインでも最後に読み込んだデータで動作します。
オンラインに戻ると自動で最新データに更新されます。
