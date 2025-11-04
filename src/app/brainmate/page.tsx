"use client";
import React, { useState } from "react";
import Footer from "@/components/footer/footer";
import Head from "./head";

const BrainmatePage = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <>
      <Head />
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
                  Studying for an exam can feel overwhelming, but you don’t have
                  to do it alone anymore. Brainmate is your built-in AI
                  assistant designed to help you understand the questions inside
                  the app and make learning smoother. Think of it as a calm,
                  knowledgeable friend who’s always ready to explain the “why”
                  behind every answer.
                </p>

                <h3 className="subsection-title">What is Brainmate?</h3>
                <p className="section-text">
                  Brainmate isn’t a general chatbot that chats about
                  everything—it’s focused entirely on your study questions. Its
                  purpose is simple: to help you understand each question
                  deeply, recognize common traps, and strengthen your exam
                  readiness. Brainmate combines AI language understanding with
                  subject-specific knowledge to guide you whenever you’re stuck.
                </p>

                <h3 className="subsection-title">How Brainmate Works</h3>
                <p className="section-text">
                  At its core, Brainmate is powered by{" "}
                  <strong>advanced AI technology based on ChatGPT-4</strong>,
                  trained specifically for exam-style content. When you ask a
                  question, Brainmate interprets the meaning, looks for the
                  relevant concept, and then explains it in clear,
                  easy-to-follow language. Instead of just giving you the
                  answer, it helps you see how to reach it, so you actually
                  learn from every interaction.
                </p>
                <p className="section-text">
                  Brainmate can clarify confusing terms, point out why other
                  options are incorrect, offer short study tips related to the
                  question, and even guide you through hard questions step by
                  step so you can understand the reasoning behind them.
                  Everything it provides stays strictly within the context of
                  your practice content.
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
                  You can find Brainmate directly on each{" "}
                  <strong>Question Screen</strong>, ready to assist whenever you
                  need extra help.
                </p>

                <h3 className="subsection-title">Asking Questions</h3>
                <p className="section-text">
                  When you’re unsure about a question, you can{" "}
                  <strong>either tap one of the suggested options</strong> shown
                  below the question or{" "}
                  <strong>
                    type your own question directly into the chat bar
                  </strong>
                  . Brainmate will instantly respond with explanations,
                  clarifications, or step-by-step guidance—especially useful for
                  <strong> hard or confusing questions</strong> where you need
                  more detailed reasoning.
                </p>

                <h3 className="subsection-title">Daily Limit</h3>
                <p className="section-text">
                  Brainmate is completely free to use but currently supports{" "}
                  <strong>up to 100 messages per day</strong>. This helps ensure
                  smooth performance and fair access for all learners.
                </p>

                <h3 className="subsection-title">Tips for Effective Use</h3>
                <p className="section-text">
                  To make the most out of Brainmate:
                </p>
                <ul className="tips-list">
                  <li>
                    <strong>Use the quick options</strong> when they're the
                    fastest way to get help matched to your current question.
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
                  based on patterns from study materials, not human reasoning.
                  This means it can sometimes misread vague or complex
                  questions, or phrase explanations imperfectly. It doesn’t
                  “know” information—it predicts what’s most likely correct
                  based on the data it was trained on.
                </p>

                <h3 className="subsection-title">Limited Scope</h3>
                <p className="section-text">
                  Brainmate only answers <strong>question-related</strong>{" "}
                  content within the app. If you ask about unrelated subjects,
                  personal advice, or topics outside the practice questions, its
                  replies may not be reliable. It also doesn’t replace
                  textbooks, teachers, or official references—use those sources
                  to confirm important details.
                </p>

                <h3 className="subsection-title">Variations in Input</h3>
                <p className="section-text">
                  Because everyone writes differently, Brainmate may
                  misinterpret slang, incomplete sentences, or overly technical
                  phrasing. Providing clear context helps it give better
                  answers.
                </p>

                <h3 className="subsection-title">Data Limitations</h3>
                <p className="section-text">
                  Although Brainmate has been trained on curated educational
                  content, some explanations might reflect outdated or biased
                  information from source materials. It doesn’t access real-time
                  databases or confidential data.
                </p>

                <h3 className="subsection-title">Continuous Improvement</h3>
                <p className="section-text">
                  Our team is constantly refining Brainmate’s responses through
                  updates and user feedback. If you spot something incorrect or
                  unclear, let us know. Every message helps Brainmate become a
                  more accurate and dependable learning partner for everyone.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BrainmatePage;
