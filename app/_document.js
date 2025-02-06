import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.firebaseConfig = {
                  apiKey: "${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}",
                  authDomain: "${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}",
                  projectId: "${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}",
                  storageBucket: "${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}",
                  messagingSenderId: "${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}",
                  appId: "${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}",
                };
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
