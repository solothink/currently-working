import React from "react";
import Image from "next/image";
import faqImage from "@/images/faq.png";
import { Metadata } from "next";
import { Accordion } from "./Accordion";

export const metadata: Metadata = {
  title:
    "Frequently Asked Questions (FAQ) | Idbook hotels™ - Your Queries Answered",
  description:
    "Find answers to common questions about Idbook hotels™ services, bookings, cancellations, payment options, and more. Our FAQ page provides valuable information to enhance your experience. If you have further inquiries, feel free to contact us directly. Explore our commitment to customer support and transparency.",
};

interface FAQItem {
  question: string;
  answer: string;
}

const hotelFAQs: FAQItem[] = [
  {
    question: "What is Idbook?",
    answer:
      "Idbook is India's hospitality company, disrupting the traditional industry by providing hourly stay and anytime check-in and check-out facility. We offer standardized rooms in different locations across the country on hourly basis.",
  },
  {
    question:
      "How is Idbook different from an online travel agent or an online marketplace of hotel rooms?",
    answer:
      "When you book Idbook hotels, you get a guaranteed amazing Idbook experience across all hotels under the Idbook network unlike an online marketplace where the end-user experience is not standardized. In short, when you book Idbook, you get to stay in Idbook and not any random XYZ hotel. Unlike most other companies, we follow pay per stay model, where the customers can book any Idbook hotel for minimum 4 hours of stay. In addition to that, the customer can check in at any time, instead of traditional 12 noon check-in.",
  },
  {
    question: "What is the minimum duration of stay in any hotel?",
    answer: "We provide a minimum length of 4-hours of stay.",
  },
  {
    question: "How big is the Idbook network?",
    answer:
      "We have presence over most places in NCR, and some part of other cities. Please check the app/website for our presence in different cities.",
  },
  {
    question: "What are the key features of 'standardized' Idbook?",
    answer:
      "The key features include AC rooms with TV, spotless linen, complimentary tea/coffee for 4 hours stay and complimentary breakfast for 8+ hours of stay, free Wi-Fi and hygienic washrooms.",
  },
  {
    question:
      "How much does an Idbook cost? Are there any hidden charges to be paid?",
    answer:
      "Rooms usually start at Rs 400 for short stays but can be lower than this price due to Sale, Coupon Discounts etc. There are no hidden charges.",
  },
  {
    question: "How can one book an Idbook?",
    answer:
      "Idbook can be booked in through our own Idbook app, through the www.Idbookhotels.com website and on phone by calling +91 81001 50924 or via whatsapp number +91 81001 50924. In addition, one can book Idbook through any of our partner online travel agents. However online travel agents might not be able to provide short duration of bookings",
  },
  {
    question: "Does any payment need to be made at the time of booking?",
    answer:
      "Customers have the option to either make an advance payment through our payment gateway in app/website or pay at the hotel during check-in/check-out.",
  },
  {
    question: "What are the standard check-in and check-out times?",
    answer:
      "Unlike traditional model, we do not have any standard check-in time. You can check-in at the time you like. You can select the check in time through our app/website/call/whatsapp.",
  },
  {
    question: "Can I get my booking revised?",
    answer:
      "Of course! Simply call us at +91 81001 50924 or whatsapp +91 81001 50924.",
  },
  {
    question: "Can I get my booking cancelled?",
    answer:
      "To cancel your booking, you have several options available: Utilize our website or mobile app. Contact us directly by calling +91 81001 50924. The applicable refund amount will be credited to you within 4 working days. Please be aware that it may take an additional 3-14 working days for the refund to reflect in your account, depending on the processing time of your bank. Please note: It's crucial to review the cancellation policy while making your reservation.",
  },
  {
    question:
      "What documents do I need to carry to the hotel to ensure a quick check-in?",
    answer:
      "You need to carry the confirmation e-mail/ booking ID sent to you at the time of booking and any of your ID proofs that should have your address and photograph. These include your passport, Aadhaar card, driving license and voter's ID card. Please note that PAN card does not qualify as an acceptable ID proof.",
  },
  {
    question:
      "I intend to stay at Idbook for a long period. Am I eligible for any special discounts?",
    answer:
      "You could be eligible for a special discount based on the duration of your stay. Please send an e-mail to booking@idbookhotels.com or call +91 81001 50924 for details.",
  },
  {
    question:
      "I am looking for corporate bookings with Idbook. How should I go about it?",
    answer:
      "For corporate bookings, please send an e-mail to corporates@idbookhotels.com or call +91 81001 50924",
  },
  {
    question: "I am a hotel owner. How can I partner with Idbook?",
    answer:
      "To join our ever-expanding network of hotels, simply call us at +91 81001 50924 and we will get back to you with all the details.",
  },
  {
    question: "I have further questions. How should I contact Idbook?",
    answer:
      "please send an e-mail to booking@idbookhotels.com or call +91 81001 50924.",
  },
];

const holidayFAQs: FAQItem[] = [
  {
    question: "What are holiday packages?",
    answer:
      "Booking holiday packages means accessing the readymade arrangement for the trip, including transportation, accommodation, sightseeing places, pick & drop, hospitality, etc. You need not worry about anything except your bag packing.",
  },
  {
    question: "Which is the best place to visit?",
    answer:
      "Every sight has its mesmerizing beauty, thrilling culture, vibrant features, amazing destinations, etc. However, some are places that attract thousands of tourists every day, such as holiday packages to the Maldives, holiday packages for Goa, holiday packages for Kashmir, holiday packages for Manali, Golden Temple, Shimla, Saputara, Bangalore, Dubai, Bali, etc.",
  },
  {
    question: "What is included in a package holiday?",
    answer:
      "Package holiday consists of mainly accommodation and transport. It may also include elements like flight booking, car hire, board (eg. breakfast only, half-board or all-inclusive), transfers, evaluated luggage and tourist activities, entertainment i.e. sightseeing, boat riding, and other travel services.",
  },
  {
    question: "Which is the best holiday packages company in India?",
    answer:
      "While choosing a holiday packages company in India, confirm the below aspects they cover: 1. Any time check-in and check-out from the hotel 2. Ensured security 3. Minimal cost 4. Neat, clean, safe, and secure accommodation 5. Facilities like good breakfast, Wi-Fi access, TV, AC, etc. 6. Transportation arrangement also for sightseeing places 7. Holiday packages with activities 8. Covering all covid-precautions. At Idbook, we serve you with all these facilities for 360° service.",
  },
  {
    question: "Where to book holiday packages?",
    answer:
      "You can perform the action from the best website to book vacation packages and flights or download our app for holiday packages and accommodation while sitting in the comfort of your home. Visit this holiday packages and tours page to explore the details and make the booking. Or Download the Idbook hotels app.",
  },
  {
    question: "How to book holiday packages in India?",
    answer:
      "You can explore a great number of holiday packages on the Idbook page. Then, explore the beauty of the place and check other inclusive details. Choose any convenient payment method and make the booking.",
  },
  {
    question:
      "What are the different modes of payment for booking a trip on Idbook hotels?",
    answer:
      "Idbook allows all modes of payment- Credit card, debit card, paytm wallet, UPI, Net banking, bank transfer.",
  },
  {
    question: "What is Idbook cancellation policy?",
    answer:
      "In case of cancellation, Before 30 days of the trip, 100% refund. Before 15 days, 50 % refund Before 1 week 30 % refund. Only flight charges will be applicable, according to flight company's norms.",
  },
  {
    question: "What is Idbook Refund Policy?",
    answer:
      "In case date would be changed and you want the refund, the process will be same as what above mentioned.",
  },
  {
    question: "Does Idbook offer any discount?",
    answer:
      "Idbook offer various types of offers and coupons, including banks offer, coupons code, pro membership offers, and we have 2 wallet option as well.",
  },
];

const FAQSection: React.FC<{ title: string; faqs: FAQItem[] }> = ({
  title,
  faqs,
}) => (
  <div className="mt-16">
    <h2 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-8 text-center">
      {title}
    </h2>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-6">
      {faqs.map((faq, index) => (
        <Accordion key={index} item={faq} />
      ))}
    </div>
  </div>
);

const Faq: React.FC = () => {
  return (
    <>
      <title>Frequently Asked Questions - Idbook</title>
      <meta
        name="description"
        content="Find answers to commonly asked questions about Idbook's hotel bookings and holiday packages."
      />
      <meta
        name="keywords"
        content="FAQ, Idbook, hotel bookings, holiday packages, travel"
      />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="sr-only">Frequently Asked Questions</h1>
          <div className="flex justify-center mb-12">
            <Image
              src={faqImage}
              alt="Frequently Asked Questions"
              width={300}
              height={150}
              className="rounded-lg shadow-md dark:shadow-none"
            />
          </div>
          <FAQSection title="FAQ for Hotels" faqs={hotelFAQs} />
          <FAQSection title="FAQ for Holidays" faqs={holidayFAQs} />
        </main>
      </div>
    </>
  );
};

export default Faq;
