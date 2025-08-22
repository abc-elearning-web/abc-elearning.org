import Head from "next/head";
import { useRouter } from "next/router";

const TokenInfo = () => {
  const { query } = useRouter();
  const { appName } = query;

  return (
    <>
      <Head>
        <title>Tokens — Your Reward Points</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/css/token-info.css" />
      </Head>
      <main className="wrapper">
        {/* Top banner */}
        <section className="hero">
          <img
            src="/images/token-info/banner.png"
            alt="Tokens banner"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        </section>

        {/* Content card */}
        <section className="card">
          <h1>Tokens — Your Reward Points</h1>

          {/* I. What Are Tokens? */}
          <h2 className="section-title">
            <span className="roman">I.</span> What Are Tokens?
          </h2>
          <p className="lead">
            Tokens are special points you earn while using the app. They reward
            your learning progress, consistency, and achievements. The more you
            learn and practice, the more tokens you can collect.
          </p>

          {/* II. How to Earn Tokens */}
          <h2 className="section-title">
            <span className="roman">II.</span> How to Earn Tokens
          </h2>
          <div className="table-wrap">
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                border: "1px solid #ddd",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "12px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    Condition
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "12px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    Tokens Earned
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                    • Complete 1 Core in Study Section for the first time. Each
                    Core only rewards once.
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                    <div className="tokens">
                      <span className="token-plain">
                        <img
                          src="https://raw.githubusercontent.com/abc-elearning-app/token-info/main/token.png"
                          alt="token"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.remove();
                          }}
                        />
                        +1 token
                      </span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                    • Get ≥10 correct answers in any Test; every 10 correct
                    answers = +1 token. Only extra correct answers from retakes
                    count.
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                    <div className="tokens">
                      <span className="token-plain">
                        <img
                          src="https://raw.githubusercontent.com/abc-elearning-app/token-info/main/token.png"
                          alt="token"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.remove();
                          }}
                        />
                        +1 token per 10
                      </span>
                      <div className="token-plain">correct answers</div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                    • Complete the Daily Challenge with all answers correct.
                    Only rewarded once per day.
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                    <div className="tokens">
                      <span className="token-plain">
                        <img
                          src="https://raw.githubusercontent.com/abc-elearning-app/token-info/main/token.png"
                          alt="token"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.remove();
                          }}
                        />
                        +1 token
                      </span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                    • Unlock a badge.
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                    <div className="tokens">
                      <span className="token-plain">
                        <img
                          src="https://raw.githubusercontent.com/abc-elearning-app/token-info/main/token.png"
                          alt="token"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.remove();
                          }}
                        />
                        +1 token per badge
                      </span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                    • Rank in Top 10 on the Weekly Leaderboard.
                    <span className="muted">Only rewarded once per week.</span>
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                    <div className="tokens">
                      <div className="token-plain">
                        <span className="token-label">Top 1:</span>
                        <img
                          src="https://raw.githubusercontent.com/abc-elearning-app/token-info/main/token.png"
                          alt="token"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.remove();
                          }}
                        />
                        +10 tokens
                      </div>
                      <div className="token-plain">
                        <span className="token-label">Top 2–3:</span>
                        <img
                          src="https://raw.githubusercontent.com/abc-elearning-app/token-info/main/token.png"
                          alt="token"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.remove();
                          }}
                        />
                        +7 tokens
                      </div>
                      <div className="token-plain">
                        <span className="token-label">Top 4–10:</span>
                        <img
                          src="https://raw.githubusercontent.com/abc-elearning-app/token-info/main/token.png"
                          alt="token"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.remove();
                          }}
                        />
                        +4 tokens
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                    • Log in successfully for the first time.
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                    <div className="tokens">
                      <span className="token-plain">
                        <img
                          src="https://raw.githubusercontent.com/abc-elearning-app/token-info/main/token.png"
                          alt="token"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.remove();
                          }}
                        />
                        +15 tokens
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="section-title">
            <span className="roman">III.</span> How to Use Tokens
          </h2>
          <p className="lead">
            Tokens can be exchanged for <strong>FREE PRO days</strong>:
          </p>

          <ul className="list token-exchange-list">
            <li>
              <img
                className="bullet-icon"
                src="https://raw.githubusercontent.com/abc-elearning-app/token-info/main/token.png"
                alt="token"
              />
              <span style={{ color: "#ffb000" }}>15 tokens</span> = 1 PRO day
            </li>
            <li>
              <img
                className="bullet-icon"
                src="https://raw.githubusercontent.com/abc-elearning-app/token-info/main/token.png"
                alt="token"
              />
              <span style={{ color: "#ffb000" }}>25 tokens</span> = 2 PRO days
            </li>
            <li>
              <img
                className="bullet-icon"
                src="https://raw.githubusercontent.com/abc-elearning-app/token-info/main/token.png"
                alt="token"
              />
              <span style={{ color: "#ffb000" }}>40 tokens</span> = 3 PRO days
            </li>
            <li>
              <img
                className="bullet-icon"
                src="https://raw.githubusercontent.com/abc-elearning-app/token-info/main/token.png"
                alt="token"
              />
              <span style={{ color: "#ffb000" }}>50 tokens</span> = 4 PRO days
            </li>
          </ul>

          {/* IV. Important Rules */}
          <h2 className="section-title">
            <span className="roman">IV.</span> Important Rules
          </h2>
          <ul className="list">
            <li>
              <span className="dot"></span>
              <span>
                Maximum token storage: <strong>50 tokens</strong>.
              </span>
            </li>
            <li>
              <span className="dot"></span>
              <span>
                If you reach 50 tokens and don't exchange them, you won't earn
                more until you spend some.
              </span>
            </li>
          </ul>

          {/* V. Want PRO Now Without Waiting? */}
          <h2 className="section-title">
            <span className="roman">V.</span> Want PRO Now Without Waiting?
          </h2>
          <p className="lead">
            If you don't want to spend time collecting tokens, you can
            <a
              className="link"
              href={
                appName
                  ? `https://abc-elearning.org/share/${appName}?query=buy-pro`
                  : "#"
              }
              rel="noopener"
            >
              {" "}
              buy PRO now
            </a>{" "}
            to unlock all features instantly.
          </p>
        </section>
      </main>
    </>
  );
};

export default TokenInfo;
