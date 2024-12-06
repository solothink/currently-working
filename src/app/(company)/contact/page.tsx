import React, { FC } from "react";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SocialsList from "@/shared/SocialsList";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Idbook hotels™ - Get in Touch for Support & Inquiries",
  description:
    "Have questions or need assistance? Contact Idbook hotels™ via phone, email, or WhatsApp. Reach us at +91 81001 50924 or info@idbookhotels.com. Visit our office in Gurugram, Haryana, or fill out the form online for any inquiries. Connect with us on social media for updates.",
};

export interface PageContactProps {}

const info = [
  {
    title: "ADDRESS",
    desc: " VPO- SARHAUL,SEC-18,GURUGRAM,Haryana, 122001",
    icon: "las la-map-marker-alt",
    link: "",
  },
  {
    title: "PHONE",
    desc: "+91 8645663143",
    icon: "las la-phone",
    link: "tel:+918645663143",
  },
  {
    title: "EMAIL",
    desc: "support@idbookhotels.com",
    icon: "las la-envelope",
    link: "mailto:support@idbookhotels.com",
  },
  {
    title: "Whatsapp",
    desc: " +91 8800150924",
    icon: "lab la-whatsapp ",
    link: "wa.me://918800150924",
  },
];

const PageContact: FC<PageContactProps> = ({}) => {
  return (
    <div className={`nc-PageContact overflow-hidden`}>
      <div className="mb-24 lg:mb-32">
        <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Contact
        </h2>
        <div className="container max-w-7xl mx-auto">
          <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 ">
            <div className="max-w-sm space-y-8">
              <p className="text-neutral-500 dark:text-neutral-400">
                If you have a question that has not been answered on our
                website, please get in touch with us via contact details listed
                below or fill in the form on the right.
              </p>
              {info.map((item, index) => (
                <div key={index}>
                  {/* <a href={item.link} className=""> */}
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider flex items-center space-x-2 group ">
                    <span className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100  dark:bg-neutral-800 dark:text-neutral-300 mr-2 text-xl">
                      <i className={item.icon}></i>
                    </span>
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                  {/* </a> */}
                </div>
              ))}
              <div>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  🌏 SOCIALS
                </h3>
                <SocialsList
                  className="mt-2"
                  itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300"
                />
              </div>
            </div>
            <div>
              <form className="grid grid-cols-1 gap-6" action="#" method="post">
                <label className="block">
                  <Label>Full name</Label>

                  <Input
                    placeholder="Example Doe"
                    type="text"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>Phone</Label>

                  <Input
                    type="tel"
                    placeholder="123-456-7890"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>Email address</Label>

                  <Input
                    type="email"
                    placeholder="example@example.com"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>Message</Label>

                  <Textarea className="mt-1" rows={6} />
                </label>
                <div>
                  <ButtonPrimary type="submit">Send Message</ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageContact;
