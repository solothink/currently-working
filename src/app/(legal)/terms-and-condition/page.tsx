/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import TermsAndConditions from "./HotelTermsAndCondtions";
// import Header from '../components/Header';

export const metadata: Metadata = {
  title: "Terms and Conditions | Idbook Hospitality™",
  description:
    "Review the Terms and Conditions governing your use of Idbook Hospitality's services. Understand your rights and obligations, our policies on bookings, cancellations, and general usage of our website and application.",
};

const Terms: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* <Header /> */}

      <div className="flex flex-col items-center">
        <div className="relative w-full">
          <Image
            src="/images/redhalfspan.png"
            alt="redhalfspan"
            width={300}
            height={100}
            className="absolute -left-16 -top-8"
          />
        </div>

        <div className="flex flex-wrap justify-center items-start mt-16 px-4">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-3xl font-bold mb-4">Terms & Condition</h1>
            <p className="text-lg">
              Welcome to Idbook Hospitality Private Ltd! Please carefully review
              the following terms, which establish a legally binding agreement
              between you, the user, and Idbook Private Ltd. These terms govern
              the use of the website, mobile app, and any other platform
              collectively referred to as "Idbook" and its related services.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            {/* <Image
              src="/images/privacypic.png"
              alt="privacypic"
              width={500}
              height={300}
              className="w-full h-auto"
            /> */}
          </div>
        </div>

        <div className="mt-16 px-4 md:px-16">
         <TermsAndConditions />

          <h2 className="text-2xl font-bold mt-8 mb-4">Cookies</h2>
          <p className="mb-4">
            We employ the use of cookies. By accessing www.idbookhotels.com, you
            agreed to use cookies in agreement with the Idbook Hospitality
            Private Limited's Privacy Policy.
          </p>
          <p className="mb-4">
            Most interactive websites use cookies to let us retrieve the user's
            details for each visit. Cookies are used by our website to enable
            the functionality of certain areas to make it easier for people
            visiting our website. Some of our affiliate/advertising partners may
            also use cookies.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">License</h2>
          <p className="mb-4">
            Unless otherwise stated, Idbook Hospitality Private Limited and/or
            its licensors own the intellectual property rights for all material
            on www.idbookhotels.com. All intellectual property rights are
            reserved. You may access this from www.idbookhotels.com for your own
            personal use subjected to restrictions set in these terms and
            conditions.
          </p>
          <p className="mb-4">You must not:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>Republish material from www.idbookhotels.com</li>
            <li>
              Sell, rent or sub-license material from www.idbookhotels.com
            </li>
            <li>
              Reproduce, duplicate or copy material from www.idbookhotels.com
            </li>
            <li>Redistribute content from www.idbookhotels.com</li>
          </ul>
          <p className="mb-4">
            This Agreement shall begin on the date hereof. Our Terms and
            Conditions were created with the help of the Free Terms and
            Conditions Generator.
          </p>
          <p className="mb-4">
            Parts of this website offer an opportunity for users to post and
            exchange opinions and information in certain areas of the website.
            Idbook Hospitality Private Limited does not filter, edit, publish or
            review Comments prior to their presence on the website. Comments do
            not reflect the views and opinions of Idbook Hospitality Private
            Limited, its agents and/or affiliates. Comments reflect the views
            and opinions of the person who post their views and opinions. To the
            extent permitted by applicable laws, Idbook Hospitality Private
            Limited shall not be liable for the Comments or for any liability,
            damages or expenses caused and/or suffered as a result of any use of
            and/or posting of and/or appearance of the Comments on this website.
          </p>
          <p className="mb-4">
            Idbook Hospitality Private Limited reserves the right to monitor all
            Comments and to remove any Comments which can be considered
            inappropriate, offensive or causes breach of these Terms and
            Conditions.
          </p>
          <p className="mb-4">You warrant and represent that:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>
              You are entitled to post the Comments on our website and have all
              necessary licenses and consents to do so;
            </li>
            <li>
              The Comments do not invade any intellectual property right,
              including without limitation copyright, patent or trademark of any
              third party;
            </li>
            <li>
              The Comments do not contain any defamatory, libelous, offensive,
              indecent or otherwise unlawful material which is an invasion of
              privacy
            </li>
            <li>
              The Comments will not be used to solicit or promote business or
              custom or present commercial activities or unlawful activity.
            </li>
          </ul>
          <p className="mb-4">
            You hereby grant Idbook Hospitality Private Limited a non-exclusive
            license to use, reproduce, edit and authorize others to use,
            reproduce and edit any of your Comments in any and all forms,
            formats or media.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Hyperlinking to our Content
          </h2>
          <p className="mb-4">
            The following organizations may link to our Website without prior
            written approval:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>Government agencies;</li>
            <li>Search engines;</li>
            <li>News organizations;</li>
            <li>
              Online directory distributors may link to our Website in the same
              manner as they hyperlink to the Websites of other listed
              businesses; and
            </li>
            <li>
              System wide Accredited Businesses except soliciting non-profit
              organizations, charity shopping malls, and charity fundraising
              groups which may not hyperlink to our Web site.
            </li>
          </ul>
          <p className="mb-4">
            These organizations may link to our home page, to publications or to
            other Website information so long as the link: (a) is not in any way
            deceptive; (b) does not falsely imply sponsorship, endorsement or
            approval of the linking party and its products and/or services; and
            (c) fits within the context of the linking party's site.
          </p>
          <p className="mb-4">
            We may consider and approve other link requests from the following
            types of organizations:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>
              commonly-known consumer and/or business information sources;
            </li>
            <li>dot.com community sites;</li>
            <li>associations or other groups representing charities;</li>
            <li>online directory distributors;</li>
            <li>internet portals;</li>
            <li>accounting, law and consulting firms; and</li>
            <li>educational institutions and trade associations.</li>
          </ul>
          <p className="mb-4">
            We will approve link requests from these organizations if we decide
            that: (a) the link would not make us look unfavorably to ourselves
            or to our accredited businesses; (b) the organization does not have
            any negative records with us; (c) the benefit to us from the
            visibility of the hyperlink compensates the absence of Idbook
            Hospitality Private Limited; and (d) the link is in the context of
            general resource information.
          </p>
          <p className="mb-4">
            These organizations may link to our home page so long as the link:
            (a) is not in any way deceptive; (b) does not falsely imply
            sponsorship, endorsement or approval of the linking party and its
            products or services; and (c) fits within the context of the linking
            party's site.
          </p>
          <p className="mb-4">
            If you are one of the organizations listed in paragraph 2 above and
            are interested in linking to our website, you must inform us by
            sending an e-mail to Idbook Hospitality Private Limited. Please
            include your name, your organization name, contact information as
            well as the URL of your site, a list of any URLs from which you
            intend to link to our Website, and a list of the URLs on our site to
            which you would like to link. Wait 2-3 weeks for a response.
          </p>
          <p className="mb-4">
            Approved organizations may hyperlink to our Website as follows:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>By use of our corporate name; or</li>
            <li>By use of the uniform resource locator being linked to; or</li>
            <li>
              By use of any other description of our Website being linked to
              that makes sense within the context and format of content on the
              linking party's site.
            </li>
          </ul>
          <p className="mb-4">
            No use of Idbook Hospitality Private Limited's logo or other artwork
            will be allowed for linking absent a trademark license agreement.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">iFrames</h2>
          <p className="mb-4">
            Without prior approval and written permission, you may not create
            frames around our Webpages that alter in any way the visual
            presentation or appearance of our Website.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Content Liability</h2>
          <p className="mb-4">
            We shall not be hold responsible for any content that appears on
            your Website. You agree to protect and defend us against all claims
            that is rising on your Website. No link(s) should appear on any
            Website that may be interpreted as libelous, obscene or criminal, or
            which infringes, otherwise violates, or advocates the infringement
            or other violation of, any third party rights.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Reservation of Rights
          </h2>
          <p className="mb-4">
            We reserve the right to request that you remove all links or any
            particular link to our Website. You approve to immediately remove
            all links to our Website upon request. We also reserve the right to
            amen these terms and conditions and it's linking policy at any time.
            By continuously linking to our Website, you agree to be bound to and
            follow these linking terms and conditions.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Removal of links from our website
          </h2>
          <p className="mb-4">
            If you find any link on our Website that is offensive for any
            reason, you are free to contact and inform us any moment. We will
            consider requests to remove links but we are not obligated to or so
            or to respond to you directly.
          </p>
          <p className="mb-4">
            We do not ensure that the information on this website is correct, we
            do not warrant its completeness or accuracy; nor do we promise to
            ensure that the website remains available or that the material on
            the website is kept up to date.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Disclaimer</h2>
          <p className="mb-4">
            To the maximum extent permitted by applicable law, we exclude all
            representations, warranties and conditions relating to our website
            and the use of this website. Nothing in this disclaimer will:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>
              limit or exclude our or your liability for death or personal
              injury;
            </li>
            <li>
              limit or exclude our or your liability for fraud or fraudulent
              misrepresentation;
            </li>
            <li>
              limit any of our or your liabilities in any way that is not
              permitted under applicable law; or
            </li>
            <li>
              exclude any of our or your liabilities that may not be excluded
              under applicable law.
            </li>
          </ul>
          <p className="mb-4">
            The limitations and prohibitions of liability set in this Section
            and elsewhere in this disclaimer: (a) are subject to the preceding
            paragraph; and (b) govern all liabilities arising under the
            disclaimer, including liabilities arising in contract, in tort and
            for breach of statutory duty.
          </p>
          <p className="mb-4">
            As long as the website and the information and services on the
            website are provided free of charge, we will not be liable for any
            loss or damage of any nature.
          </p>
        </div>

        <div className="relative w-full mt-16">
          {/* <Image
            src="/images/greenhalfspan.png"
            alt="greenhalfspan"
            width={300}
            height={100}
            className="absolute -right-16 -bottom-8"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Terms;
