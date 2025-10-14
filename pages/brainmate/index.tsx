import React, { useState } from "react";
import Head from "next/head";
import Layout from "../../components/layout";

const BrainmatePage = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <Layout>
      <Head>
        <title>Brainmate - Your Smart Exam Helper</title>
        <meta
          name="description"
          content="Meet Brainmate, your AI-powered exam assistant designed to help you understand questions and make learning smoother."
        />
        <link rel="stylesheet" href="/css/brainmate.css" />
      </Head>

      <div className="brainmate-container">
        {/* Tabs Navigation */}
        <div className="tabs-wrapper">
          <div className="tabs-navigation">
            <button
              className={`tab-btn ${activeTab === "about" ? "active" : ""}`}
              onClick={() => setActiveTab("about")}
            >
              About Brainmate
            </button>
            <button
              className={`tab-btn ${
                activeTab === "how-to-use" ? "active" : ""
              }`}
              onClick={() => setActiveTab("how-to-use")}
            >
              How To Use Brainmate
            </button>
            <button
              className={`tab-btn ${activeTab === "accuracy" ? "active" : ""}`}
              onClick={() => setActiveTab("accuracy")}
            >
              Accuracy Disclaimer
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="tab-content-wrapper">
          {/* About Brainmate Tab */}
          {activeTab === "about" && (
            <div className="tab-content active">
              <div className="content-section">
                <div className="illustration-box">
                  <img
                    src="/images/brainmate/brainmate-info-1.png"
                    alt="Brainmate AI Robot Assistant"
                    className="illustration-image"
                  />
                </div>

                <h2 className="section-title">
                  📢 Meet Brainmate – Your Smart Exam Helper!
                </h2>
                <p className="section-text">
                  Studying for an exam can feel overwhelming, but you don't have
                  to do it alone anymore. Brainmate is your built-in AI
                  assistant, designed to help you understand the questions
                  inside the app and make learning smoother. Think of it as a
                  calm, knowledgeable friend who's always ready to explain
                  things and answer every answer.
                </p>

                <h3 className="subsection-title">What is Brainmate?</h3>
                <p className="section-text">
                  Brainmate isn't a general chatbot that chats about
                  everything—it's focused entirely on your study content. Its
                  purpose is simple: to help you understand each question
                  deeply, recognize common traps, and strengthen your exam
                  readiness. Brainmate combines AI language understanding with
                  subject-specific knowledge to guide you whenever you're stuck.
                </p>

                <h3 className="subsection-title">How Brainmate Works</h3>
                <p className="section-text">
                  At its core, Brainmate is powered by{" "}
                  <strong>advanced AI language models</strong> (built on
                  technology similar to ChatGPT-4). When you ask a question,
                  Brainmate doesn't just search for the meaning, looks for the
                  relevant concept, and then explains it back to you in simple,
                  supportive language. Instead of just giving you the answer, it
                  helps you see <em>how</em> to reach it, so you actually learn
                  in the process.
                </p>
                <p className="section-text">
                  Brainmate can clarify confusing terms, point out why other
                  options are incorrect, offer guidance on difficult reasoning,
                  and give you extra tips related to the question and even guide
                  you through your thought process. Everything it provides stays
                  strictly within the context of your practice content.
                </p>
              </div>
            </div>
          )}

          {/* How To Use Brainmate Tab */}
          {activeTab === "how-to-use" && (
            <div className="tab-content active">
              <div className="content-section">
                <div className="illustration-box">
                  <img
                    src="/images/brainmate/brainmate-info-2.png"
                    alt="How to use Brainmate - Student studying with AI assistant"
                    className="illustration-image"
                  />
                </div>

                <p className="section-text">
                  You can find Brainmate directly on each Question Screen, ready
                  to assist whenever you need extra help.
                </p>

                <h3 className="subsection-title">Asking Questions</h3>
                <p className="section-text">
                  When you're unsure about a question, you can either tap one of
                  our <strong>quick suggestions</strong> that appear below the
                  question or <strong>type your own question</strong> directly
                  into the chat bar. Brainmate will instantly respond with
                  explanations, clarifications, or step-by-step
                  guidance—especially effective for
                  <strong> hard or confusing questions</strong> where you need
                  more detailed reasoning.
                </p>

                <h3 className="subsection-title">Daily Limit</h3>
                <p className="section-text">
                  Brainmate is completely free to use but currently supports{" "}
                  <strong>up to 100 messages per day</strong>. This helps ensure
                  fair performance and equal access for all learners.
                </p>

                <h3 className="subsection-title">Tips for Effective Use</h3>
                <p className="section-text">
                  To make the most out of Brainmate:
                </p>
                <ul className="tips-list">
                  <li>
                    <strong>
                      Use the quick options when they're the fastest way to get
                      help matched to your current question.
                    </strong>
                  </li>
                  <li>
                    <strong>Type your own questions</strong> when you want a
                    deeper explanation or help with a tough one.
                  </li>
                  <li>
                    <strong>Be clear and specific:</strong> The more precise
                    your question, the better Brainmate can assist.
                  </li>
                  <li>
                    <strong>Stay focused on exam topics.</strong> Brainmate only
                    assists with the test-related content available in the app.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Accuracy Disclaimer Tab */}
          {activeTab === "accuracy" && (
            <div className="tab-content active">
              <div className="content-section">
                <div className="illustration-box">
                  <img
                    src="/images/brainmate/brainmate-info-3.png"
                    alt="Accuracy Disclaimer - Important information"
                    className="illustration-image"
                  />
                </div>

                <h2 className="section-title">
                  Why Brainmate Might Occasionally Be Wrong 🤔
                </h2>
                <p className="section-text">
                  Brainmate uses natural language models that generate responses
                  based on patterns from extensive training and logical
                  reasoning. This means it can sometimes mislead vague or
                  complex questions, or phrase explanations imperfectly. It
                  doesn't "know" information, it predicts what's most likely
                  correct based on the data it's trained on.
                </p>

                <h3 className="subsection-title">Limited Scope</h3>
                <p className="section-text">
                  Brainmate only answers question-related content within the
                  app. If you ask about unrelated subjects, personal advice, or
                  topics outside the practice questions, its responses might not
                  be reliable. It also doesn't replace textbooks, teachers, or
                  official resources—use those sources to confirm important
                  details.
                </p>

                <h3 className="subsection-title">Variations in Input</h3>
                <p className="section-text">
                  Because everyone writes differently, Brainmate may
                  misunderstand slang, incomplete sentences, or overly technical
                  phrasing. Providing clear context helps it give better
                  answers.
                </p>

                <h3 className="subsection-title">Data Limitations</h3>
                <p className="section-text">
                  Although Brainmate has been trained on curated educational
                  content, some explanations might feel outdated or biased
                  depending on the source materials. It doesn't access real-
                  time databases or the most up-to-date, confidential data.
                </p>

                <h3 className="subsection-title">Continuous Improvement</h3>
                <p className="section-text">
                  Our team is constantly refining Brainmate's responses through
                  updates and user feedback. If something seems off, it's
                  helping us know. Every message helps Brainmate become a more
                  reliable study partner for everyone.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BrainmatePage;
