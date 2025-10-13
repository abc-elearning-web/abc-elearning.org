import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Brainmate = () => {
  const { query } = useRouter();
  const { appName } = query;
  const [isGlitching, setIsGlitching] = useState(false);
  const [particleCount, setParticleCount] = useState(0);
  const [isMatrixActive, setIsMatrixActive] = useState(true);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);

    const particleInterval = setInterval(() => {
      setParticleCount((prev) => (prev + 1) % 50);
    }, 100);

    const matrixInterval = setInterval(() => {
      setIsMatrixActive((prev) => !prev);
    }, 5000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(particleInterval);
      clearInterval(matrixInterval);
    };
  }, []);

  return (
    <>
      <Head>
        <title>🧠 BRAINMATE — NEURAL OVERLOAD ACTIVATED 🧠</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/css/brainmate.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Creepster&family=Butcherman&family=Chakra+Petch:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Matrix Rain Background */}
      <div className={`matrix-rain ${isMatrixActive ? "active" : ""}`}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="matrix-column"
            style={{ left: `${i * 3.33}%` }}
          >
            {Array.from({ length: 25 }).map((_, j) => (
              <div
                key={j}
                className="matrix-char"
                style={{ animationDelay: `${Math.random() * 3}s` }}
              >
                {Math.random() > 0.5 ? "1" : "0"}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Glitch Overlay */}
      <div className={`glitch-overlay ${isGlitching ? "active" : ""}`}></div>

      {/* Cyber Grid Background */}
      <div className="cyber-grid-bg"></div>

      <main className="wrapper">
        {/* INSANE Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <div className="glitch-text">
              <h1 className={`main-title ${isGlitching ? "glitch" : ""}`}>
                <span className="layer-1">🧠 BRAINMATE 🧠</span>
                <span className="layer-2">🧠 BRAINMATE 🧠</span>
                <span className="layer-3">🧠 BRAINMATE 🧠</span>
              </h1>
            </div>
            <p className="hero-subtitle neon-text">
              ⚡ NEURAL OVERLOAD ACTIVATED ⚡
            </p>
            <div className="cyber-grid"></div>
          </div>

          {/* Floating Particles */}
          {Array.from({ length: particleCount }).map((_, i) => (
            <div
              key={i}
              className="floating-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              {
                ["💥", "⚡", "🔥", "🧠", "💀", "👁️", "🤖", "⚡", "💎", "🌟"][
                  Math.floor(Math.random() * 10)
                ]
              }
            </div>
          ))}
        </section>

        {/* INSANE Content card */}
        <section className="card cyber-card">
          {/* About Brainmate */}
          <div className="section">
            <h2 className="section-title cyber-title">
              <span className="icon glitch-icon">📢</span>
              <span className="title-text">ABOUT BRAINMATE</span>
              <span className="title-glitch">ABOUT BRAINMATE</span>
            </h2>
            <p className="lead cyber-text">
              🔥 MEET BRAINMATE – YOUR NEURAL OVERLOAD ASSISTANT! 🔥
              <br />
              Studying for an exam can feel like a CYBER ATTACK on your brain,
              but you don't have to fight alone anymore! Brainmate is your
              BUILT-IN AI NEURAL NETWORK designed to HACK into your study
              questions and make learning EXPLODE with understanding! Think of
              it as a CYBER-PUNK friend who's always ready to DECODE the "why"
              behind every answer! ⚡
            </p>

            <div className="info-box cyber-box">
              <h3 className="cyber-heading">🤖 WHAT IS BRAINMATE? 🤖</h3>
              <p className="cyber-paragraph">
                Brainmate isn't some basic chatbot that chats about
                everything—it's a NEURAL OVERLOAD SYSTEM focused entirely on
                your study questions! Its purpose is SIMPLE: to HACK your brain
                and help you understand each question deeply, recognize common
                TRAPS, and strengthen your exam readiness to MAXIMUM LEVEL!
                Brainmate combines AI language understanding with
                subject-specific knowledge to guide you whenever you're STUCK in
                the matrix! 🧠⚡
              </p>
            </div>

            <div className="info-box cyber-box">
              <h3 className="cyber-heading">⚡ HOW BRAINMATE WORKS ⚡</h3>
              <p className="cyber-paragraph">
                At its core, Brainmate is powered by ADVANCED AI TECHNOLOGY
                based on ChatGPT-4, trained specifically for exam-style content!
                When you ask a question, Brainmate INTERPRETS the meaning, looks
                for the relevant concept, and then EXPLAINS it in clear,
                easy-to-follow language! Instead of just giving you the answer,
                it helps you see how to reach it, so you actually LEARN from
                every interaction! 🚀
              </p>
              <p className="cyber-paragraph">
                Brainmate can CLARIFY confusing terms, point out why other
                options are incorrect, offer short study tips related to the
                question, and even guide you through hard questions step by step
                so you can understand the reasoning behind them! Everything it
                provides stays strictly within the context of your practice
                content! 💥
              </p>
            </div>
          </div>

          {/* How to Use Brainmate */}
          <div className="section">
            <h2 className="section-title cyber-title">
              <span className="icon glitch-icon">💬</span>
              <span className="title-text">HOW TO USE BRAINMATE</span>
              <span className="title-glitch">HOW TO USE BRAINMATE</span>
            </h2>
            <p className="lead cyber-text">
              You can find Brainmate directly on each Question Screen, ready to
              assist whenever you need extra help! 🚀
            </p>

            <div className="feature-grid cyber-grid-features">
              <div className="feature-card cyber-feature-card">
                <div className="feature-icon cyber-icon">💬</div>
                <h3 className="cyber-feature-title">ASKING QUESTIONS</h3>
                <p className="cyber-feature-text">
                  When you're unsure about a question, you can either tap one of
                  the suggested options shown below the question or type your
                  own question directly into the chat bar! Brainmate will
                  instantly respond with explanations, clarifications, or
                  step-by-step guidance—especially useful for hard or confusing
                  questions where you need more detailed reasoning! ⚡
                </p>
              </div>

              <div className="feature-card cyber-feature-card">
                <div className="feature-icon cyber-icon">⚙️</div>
                <h3 className="cyber-feature-title">DAILY LIMIT</h3>
                <p className="cyber-feature-text">
                  Brainmate is completely free to use but currently supports up
                  to 100 messages per day! This helps ensure smooth performance
                  and fair access for all learners! 🔥
                </p>
              </div>

              <div className="feature-card cyber-feature-card">
                <div className="feature-icon cyber-icon">💡</div>
                <h3 className="cyber-feature-title">TIPS FOR EFFECTIVE USE</h3>
                <ul className="tips-list cyber-tips">
                  <li className="cyber-tip">
                    Use the quick options when available—they're the fastest way
                    to get help matched to your current question! ⚡
                  </li>
                  <li className="cyber-tip">
                    Type your own questions when you want a deeper explanation
                    or help with a tough one! 🧠
                  </li>
                  <li className="cyber-tip">
                    Be clear and specific! The more precise your question, the
                    better Brainmate can assist! 💎
                  </li>
                  <li className="cyber-tip">
                    Stay focused on exam topics! Brainmate only assists within
                    the test-related content available in the app! 🎯
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Accuracy Disclaimer */}
          <div className="section">
            <h2 className="section-title cyber-title">
              <span className="icon glitch-icon">🤔</span>
              <span className="title-text">ACCURACY DISCLAIMER</span>
              <span className="title-glitch">ACCURACY DISCLAIMER</span>
            </h2>
            <div className="disclaimer-box cyber-disclaimer">
              <h3 className="cyber-disclaimer-title">
                WHY BRAINMATE MIGHT OCCASIONALLY BE WRONG 🤔
              </h3>
              <p className="cyber-disclaimer-text">
                Brainmate uses natural language models that generate responses
                based on patterns from study materials, not human reasoning!
                This means it can sometimes misread vague or complex questions,
                or phrase explanations imperfectly! It doesn't "know"
                information—it predicts what's most likely correct based on the
                data it was trained on! ⚠️
              </p>

              <div className="disclaimer-points cyber-disclaimer-points">
                <div className="disclaimer-point cyber-disclaimer-point">
                  <h4 className="cyber-point-title">LIMITED SCOPE</h4>
                  <p className="cyber-point-text">
                    Brainmate only answers question-related content within the
                    app! If you ask about unrelated subjects, personal advice,
                    or topics outside the practice questions, its replies may
                    not be reliable! It also doesn't replace textbooks,
                    teachers, or official references—use those sources to
                    confirm important details! 🎯
                  </p>
                </div>

                <div className="disclaimer-point cyber-disclaimer-point">
                  <h4 className="cyber-point-title">VARIATIONS IN INPUT</h4>
                  <p className="cyber-point-text">
                    Because everyone writes differently, Brainmate may
                    misinterpret slang, incomplete sentences, or overly
                    technical phrasing! Providing clear context helps it give
                    better answers! 💡
                  </p>
                </div>

                <div className="disclaimer-point cyber-disclaimer-point">
                  <h4 className="cyber-point-title">DATA LIMITATIONS</h4>
                  <p className="cyber-point-text">
                    Although Brainmate has been trained on curated educational
                    content, some explanations might reflect outdated or biased
                    information from source materials! It doesn't access
                    real-time databases or confidential data! 📊
                  </p>
                </div>

                <div className="disclaimer-point cyber-disclaimer-point">
                  <h4 className="cyber-point-title">CONTINUOUS IMPROVEMENT</h4>
                  <p className="cyber-point-text">
                    Our team is constantly refining Brainmate's responses
                    through updates and user feedback! If you spot something
                    incorrect or unclear, let us know! Every message helps
                    Brainmate become a more accurate and dependable learning
                    partner for everyone! 🚀
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Brainmate;
