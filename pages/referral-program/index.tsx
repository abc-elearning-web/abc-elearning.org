import Head from "next/head";

const ReferralProgram = () => {
    return (
        <>
            <Head>
                <title>Referral Program – Terms &amp; Conditions</title>
                <meta name="description" content="Referral Program – Terms &amp; Conditions" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="/css/referral-program.css" />
            </Head>

            <div>
                <img width="100%"
                    src="/images/referral-program/banner.jpg"
                    alt="Referral Program Icon" />
                <div className="hero">
                    <h1>Referral Program – Terms &amp; Conditions</h1>
                    <p>
                        Thank you for being an essential part of our community! Our Referral Program is designed to reward users who
                        help grow our community by inviting their friends to join our app. Both you (the Referrer) and your friends (the
                        Referees) will receive special benefits for participating.
                    </p>
                </div>

                <section>
                    <h2>I. HOW TO PARTICIPATE</h2>
                    <ol>
                        <li>The Referral Program is available to all users who have installed the app and registered an account.</li>
                        <li>To refer someone, simply enter the email address of the person you're inviting (the Referee) directly in the
                            referral section of the app.</li>
                        <li>A successful referral occurs when:
                            <ul>
                                <li>The Referee downloads the app using your unique link or code.</li>
                                <li>The Referee signs up and logs into their account using the email address you entered, and has never
                                    used the app before.</li>
                                <li>The Referee completes their very first Daily Challenge in the app.</li>
                            </ul>
                        </li>
                    </ol>
                </section>
                <section className="rewards">
                    <h2>II. REWARDS & BENEFITS</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>For the Referrer</th>
                                <th>For the Referee</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    You will receive <strong>15 Tokens</strong> for every successful referral. There's no limit – the more you
                                    share, the more Tokens you earn!
                                </td>
                                <td>
                                    Once they complete their first Daily Challenge, they'll receive <strong>15 Tokens</strong> as a welcome
                                    gift.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>


                <section>
                    <h2>III. USE YOUR TOKENS</h2>
                    <p>
                        Tokens can be redeemed for PRO access.<br />
                        <strong>15 Tokens = 1 day of PRO access.</strong><br />
                        You can collect and spend Tokens anytime to unlock premium features without a subscription.
                    </p>
                </section>

                <section>
                    <h2>IV. TERMS &amp; PROGRAM CHANGES</h2>
                    <ul>
                        <li>Tokens will be automatically added once all eligibility criteria are met.</li>
                        <li>We reserve the right to modify, pause, or terminate the Referral Program at any time without prior notice.
                        </li>
                        <li>We may review referral activity to ensure compliance and fairness.</li>
                    </ul>
                </section>

                <section>
                    <h2>V. VIOLATIONS &amp; MISUSE</h2>
                    <p>To maintain the integrity of the program, users must adhere to the following:</p>
                    <ul>
                        <li>Referral invitations are for personal, non-commercial use only.</li>
                        <li>Users must not:
                            <ul>
                                <li>Create fake or duplicate accounts.</li>
                                <li>Attempt to refer themselves through multiple devices or identities.</li>
                                <li>Use fraudulent means to exploit the system.</li>
                            </ul>
                        </li>
                        <li>Any abuse or violation of these terms may result in disqualification from the program and the revocation of
                            any earned rewards.</li>
                    </ul>
                </section>

                <section>
                    <p>
                        We're truly grateful for your support and participation. Your referrals help us
                        grow a vibrant, positive community. Thank you for helping us spread the word
                        and making our app even better! 🌟
                    </p>
                </section>
            </div>
        </>
    );
};

export default ReferralProgram;