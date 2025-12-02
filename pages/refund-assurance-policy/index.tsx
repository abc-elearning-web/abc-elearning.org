import Head from "next/head";
import React from 'react'

const RefundAssurancePolicy = () => {
  return (
    <>
      <Head>
        <title>Refund Assurance Policy - ABC E-Learning</title>
        <meta name="description" content="Our money-back guarantee ensures you can study with confidence. If you don't pass your official exam, we'll refund your PRO subscription." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white max-w-screen-lg mx-auto">
        <img width="100%"
          src="/images/refund-assurance-policy/refund-assurance-policy.png"
          alt="Referral Program Icon" />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2 text-center">
            Refund Assurance Policy
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Effective date: October 8, 2025
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            At our app, your satisfaction and success are our top priorities. Every subscription comes with our money-back guarantee—so you can study with total confidence knowing that if you don't pass your official exam, we'll refund your most recent payment for our PRO subscription.
          </p>

          <p className="text-gray-700 mb-4">
            To qualify for the refund, please make sure all of the following conditions are met:
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li className="text-gray-700">
              The refund request must come from the same individual who purchased the subscription. Transfers or shared accounts are not eligible.
            </li>
            <li className="text-gray-700">
              You must have completed the entire course before taking the official exam.
            </li>
            <li className="text-gray-700">
              You must provide proof of a failed result from your official exam within 7 days of receiving the result.
            </li>
            <li className="text-gray-700">
              The exam must be taken within 30 days from the end date of your most recent PRO subscription.
            </li>
            <li className="text-gray-700">
              The refund amount will be equal to your most recent PRO subscription payment. If you purchased at a discounted rate, the refunded amount will reflect that discounted total.
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            To submit a claim, please email{" "}
            <a
              href="mailto:support@abc-elearning.org"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              support@abc-elearning.org
            </a>{" "}
            with:
          </p>

          <ol className="list-decimal pl-6 mb-6 space-y-2">
            <li className="text-gray-700">
              A screenshot confirming that you have completed the full course.
            </li>
            <li className="text-gray-700">
              A copy of your official exam score report showing a failed result.
            </li>
            <li className="text-gray-700">
              Proof of your most recent PRO subscription payment.
            </li>
          </ol>

          <p className="text-gray-700 leading-relaxed">
            Once we confirm eligibility, we'll process your refund or reimbursement promptly. Our app reserves the right to update or revise this guarantee at any time.
          </p>
        </div>
      </div>
    </>
  )
}

export default RefundAssurancePolicy