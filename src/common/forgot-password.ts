export const MailForgotPassword = (confirmLink: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>巻カレⓇのパスワード再設定のご案内</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <p style="color: #000;">巻カレⓇをご利用いただき、ありがとうございます。</p>
        <p style="color: #000;">下記リンクをクリックして、パスワード再設定を完了させてください。</p>
        <a href=${confirmLink} target="_blank">${confirmLink}</a>
        <p style="color: #000;">URLの有効期限は24時間です。</p>
        <p style="color: #000;">有効期限が切れてしまった場合は、再度パスワードを再設定の手続きをしてください。</p>
        <p style="color: #000;">-------------------------------------------------- </p>
        <p style="color: #000;">本メールは自動送信メールです。</p>
        <p style="color: #000;">返信をしないようお願いいたします。</p>
        <p style="color: #000;">お心当たりの無い場合は、恐れ入りますが、このメールを削除してください。</p>
      </body>
    </html>
  `;
};
