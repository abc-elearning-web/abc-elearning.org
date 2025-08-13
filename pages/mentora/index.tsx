import Head from "next/head";
import { useEffect } from "react";

const Mentora = () => {

    useEffect(() => {
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                // Remove active class from all tabs and contents
                document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab
                tab.classList.add('active');

                // Show corresponding content
                const contentId = tab.getAttribute('href').substring(1);
                document.getElementById(contentId).classList.add('active');
            });
        });
    }, []);

    return (
        <>
            <Head>
                <title>Mentora AI</title>
                <meta name="description" content="Mentora AI" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="/css/mentora.css" />
            </Head>
            <div className="container">
                <nav className="nav-tabs">
                    <a href="#about" className="nav-tab active">About Mentora</a>
                    <a href="#how-to-use" className="nav-tab">How To Use Mentora</a>
                    <a href="#disclaimer" className="nav-tab">Accuracy Disclaimer</a>
                </nav>

                <div className="content">
                    <div id="about" className="tab-content active">
                        <div className="hero">
                            <img src="/images/mentora/image1.jpg" alt="About Mentora" />
                            <h1><span className="emoji">📢</span> Meet <span className="highlight">✨Mentora✨</span> – Your 24/7 Study Companion!</h1>
                        </div>

                        <div className="description">
                            You're preparing for a big exam? Feeling overwhelmed?  Wish you had a personal tutor available 24/7? Well, wish no more!  Meet Mentora, your new AI-powered study buddy, built to help you ace those tests.
                        </div>

                        <div className="section">
                            <h2 className="section-title">What is Mentora?</h2>
                            <p>More than just a chatbot, Mentora is a game-changer.  Think of it as having a highly skilled, incredibly patient tutor who lives right inside your phone or tablet. This isn't about rote memorization; it's about understanding, mastering concepts, and building confidence.  We've poured countless hours into research and development to create the most effective test preparation app, and Mentora is the culmination of that effort.</p>
                        </div>

                        <div className="section">
                            <h2 className="section-title">How Mentora's AI Chatbot Works</h2>

                            <h3 className="section-title">Smart Algorithm – Personalized & Adaptive Learning</h3>
                            <p>At the heart of Mentora's AI chatbot is a sophisticated algorithm that constantly learns and adapts based on your performance and interactions. It's like having a personal tutor who observes your strengths and weaknesses and then crafts a customized learning plan just for you.</p>

                            <h3 className="section-title">AI Model – Powered by ChatGPT-4.0</h3>
                            <p>Mentora is built on ChatGPT-4.0, an advanced AI language model designed to understand natural language and generate intelligent, context-aware responses. Unlike traditional rule-based chatbots, it uses deep learning and natural language processing (NLP) to analyze your queries and provide clear hints and explanations. This allows Mentora to assist you in real-time, whether you need help understanding a complex concept, clarifying a question, or receiving study tips tailored to your exam.</p>

                            <h3 className="section-title">Training – A Knowledge Base Built for Test Prep</h3>
                            <p>Mentora is specifically trained for exam preparation, making it much more than a general AI assistant. It has been trained on comprehensive exam question banks, key study materials, and official references, ensuring its responses align with exam structures and commonly tested topics. By integrating domain-specific knowledge, Mentora provides reliable explanations and targeted study support to help you navigate your test prep efficiently.</p>
                        </div>

                        <div className="section">
                            <h2 className="section-title">The Power of Mentora</h2>
                            <ul className="feature-list">
                                <li>Personalized Learning Experience: Mentora tailors its recommendations based on your progress, helping you stay on track with relevant study suggestions. It ensures you focus on areas that need improvement while avoiding unnecessary repetition.</li>
                                <li>Encourages Independent Thinking: Instead of providing direct answers, Mentora offers hints and guidance to help you analyze problems and think critically. This approach strengthens problem-solving skills and long-term understanding.</li>
                                <li>Real-Time, Relevant Support: Mentora provides instant, context-aware assistance when you need it, helping you overcome challenges efficiently without disrupting your study flow.</li>
                                <li>Improves Study Efficiency: Mentora designs the most efficient study path to help you reach your target in the shortest time possible. With intelligent hints, timely reminders, and personalized guidance, it keeps you focused on essential concepts, ensuring every study session is optimized for maximum results.</li>
                            </ul>
                        </div>
                    </div>

                    <div id="how-to-use" className="tab-content">
                        <div className="hero">
                            <img src="/images/mentora/image2.jpg" alt="How to use Mentora" />
                            <h1>How to use Mentora</h1>
                        </div>

                        <div className="description">
                            <p>Mentora is an intelligent learning assistant designed to support your study process. With its ability to provide contextual guidance and personalized recommendations, it helps you learn more effectively.</p>
                            <p>You'll find Mentora right on <strong>the Main Screen</strong> and <strong>the Question Screen</strong>, making it easily accessible whenever you need assistance.</p>
                        </div>


                        <div className="section">
                            <h2 className="section-title">How to use Mentora efficiently?</h2>

                            <div className="section">
                                <h3 className="section-title"><span className="rocket-emoji">🚀</span>Using AI-Generated Recommendations for Quick Assistance</h3>
                                <p>Mentora adapts to your progress by offering tailored recommendations and insightful guidance, ensuring that every suggestion aligns with your learning path. Simply select the most suitable option, and the AI will provide the necessary support.</p>
                                <p>These AI-generated recommendations help you stay on track without having to manually input your queries, saving time and improving study efficiency.</p>
                            </div>

                            <div className="section">
                                <h3 className="section-title"><span className="rocket-emoji">🚀</span>Manually Entering Questions as Needed</h3>
                                <p>In addition to selecting AI-generated recommendations, you can ask Mentora direct questions based on your specific learning needs.</p>
                            </div>

                            <div className="section">
                                <h3 className="section-title"><span className="rocket-emoji">🚀</span>Tips for Using Mentora Effectively</h3>
                                <p>To make the most of Mentora, keep these key points in mind:</p>
                                <ul className="tips-list">
                                    <li>Use AI-generated recommendations → Save time by selecting tailored suggestions from Mentora.</li>
                                    <li>Think critically → AI is a tutor, not a replacement for independent learning. Always verify information and apply critical thinking.</li>
                                    <li>Be specific with your questions → Clear and precise questions lead to more relevant responses.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div id="disclaimer" className="tab-content">
                        <div className="hero">
                            <img src="/images/mentora/image3.jpg" alt="Accuracy Disclaimer" />
                            <h1>Accuracy Disclaimer</h1>
                        </div>

                        <div className="section">
                            <h2 className="section-title"><span className="thinking-emoji">🤔</span>Why Does Mentora Make Mistakes?</h2>

                            <div className="disclaimer-box">
                                <h3 className="section-title">AI Lacks Human-Like Understanding</h3>
                                <p>Mentora is built on advanced natural language processing models like GPT-4, which have been trained on vast amounts of text data. However, it does not "think" or "understand" like a human—it predicts words and phrases based on patterns rather than genuine comprehension. This means:</p>
                                <ul className="tips-list">
                                    <li>It may misinterpret complex, vague, or ambiguous questions.</li>
                                    <li>It does not have real-world experience like a human expert.</li>
                                    <li>It cannot independently verify the latest news or updates unless explicitly programmed to do so.</li>
                                </ul>
                            </div>

                            <div className="disclaimer-box">
                                <h3 className="section-title">Limited Scope of Knowledge</h3>
                                <p>Mentora is specifically designed to answer questions related to the app’s content level and study path. It cannot provide information beyond this scope. If you ask questions unrelated to the app's subject matter or its practice question, responses may be irrelevant, incomplete, or incorrect.</p>
                                <p>Mentora does not replace external resources, such as official textbooks, real-world expert advice, or professional consultations.</p>
                                <p>If a topic is outside its training data, it may try to generate a response based on similar concepts, which can lead to inaccuracies.</p>
                            </div>

                            <div className="disclaimer-box">
                                <h3 className="section-title">Variability in User Input</h3>
                                <p>People communicate in different ways, and while Mentora is trained to understand a wide range of expressions, it may struggle with:</p>
                                <ul className="tips-list">
                                    <li>Unusual phrasing or slang that doesn’t match typical study-related questions.</li>
                                    <li>Highly technical or domain-specific queries that require expertise beyond its knowledge base.</li>
                                    <li>Incomplete or unclear questions, where it must guess the user’s intent.</li>
                                </ul>
                            </div>

                            <div className="disclaimer-box">
                                <h3 className="section-title">Data Limitations and Possible Biases</h3>
                                <p>Mentora learns from publicly available sources and curated training materials. However, this means:</p>
                                <ul className="tips-list">
                                    <li>Some responses might be based on outdated, incomplete, or biased information.</li>
                                    <li>AI can reflect biases present in the data it was trained on.</li>
                                    <li>It does not have real-time access to confidential, proprietary, or unpublished sources.</li>
                                </ul>
                            </div>

                            <div className="section">
                                <h2 className="section-title"><span className="rocket-emoji">🚀</span>How We're Improving Mentora</h2>

                                <div className="disclaimer-box">
                                    <h3 className="section-title">Continuous Learning & Updates</h3>
                                    <p>We are constantly refining Mentora to improve its ability to understand varied user inputs, provide clearer explanations, and expand its knowledge base with regular updates. These enhancements ensure more accurate and relevant study support.</p>
                                </div>

                                <div className="disclaimer-box">
                                    <h3 className="section-title">Focused & Reliable Study Assistance</h3>
                                    <p>Mentora is designed to stay within its defined learning scope, avoiding speculative or unrelated answers while encouraging users to verify critical information with trusted sources. This focus helps maintain reliability and ensures that responses align with your study path.</p>
                                </div>

                                <div className="disclaimer-box">
                                    <h3 className="section-title">User Feedback Matters</h3>
                                    <p>Your feedback is essential in improving Mentora. If you encounter an incorrect or unclear response, let us know so we can fine-tune the system. For important facts, always cross-check with official references to ensure accuracy.</p>
                                </div>

                                <p className="description">We are committed to continuously improving Mentora to provide smarter, more effective study support. Thank you for being part of this journey!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Mentora;