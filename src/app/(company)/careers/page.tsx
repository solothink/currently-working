import React, { FC } from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Careers | Idbook hotels™ - Join Our Team & Shape the Future of Hospitality",
  description:
    "Become an Idbookpreneur with Idbook hotels™! We’re looking for dynamic, agile thinkers ready to revolutionize the hospitality industry. Gain experience in a fast-paced startup environment, working on groundbreaking products and solutions. Explore exciting roles like Business Development Manager, Travel Expert, Zonal Heads, and more. Submit your CV today and join our journey toward excellence in hospitality.",
};

export interface PageCareersProps {}

const PageCareers: FC<PageCareersProps> = () => {
  return (
    <div className="nc-PageCareers overflow-hidden relative">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Careers at Idbook hotels</h1>
        <div
          className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6"
          role="alert"
        >
          <p className="font-bold">Coming Soon!</p>
          <p>
            We&apos;re working on bringing you exciting career opportunities.
            Please check back soon!
          </p>
        </div>
        <p className="text-lg mb-8">
          Our careers page is currently under development. We&apos;re excited to
          share upcoming job openings and opportunities to join our team in
          revolutionizing the travel industry.
        </p>
        <div className="bg-gray-100 p-6 rounded-lg max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Work With Us?</h2>
          <ul className="text-left list-disc pl-6 mb-4">
            <li>Innovative and dynamic work environment</li>
            <li>Opportunities for professional growth and development</li>
            <li>Competitive compensation and benefits</li>
            <li>Chance to make a real impact in the travel tech industry</li>
          </ul>
          <p>
            Stay tuned for exciting roles in technology, customer service,
            marketing, and more!
          </p>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            Interested in Future Opportunities?
          </h3>
          <p className="mb-4">
            While our careers page is being developed, you can express your
            interest by sending your resume to:
          </p>
          <p className="font-semibold text-blue-600">hr@idbookhotels.com</p>
        </div>

        <div>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageCareers;
