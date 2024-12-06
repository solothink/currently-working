import React from "react";
import Image from "next/image";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
    <Image
      src={`/franchise/${icon}`}
      alt={title}
      width={120}
      height={120}
      className="mb-4"
    />
    <h3 className="text-xl font-semibold mb-2 text-primary-800 dark:primary-600">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
  </div>
);

const Features: React.FC = () => (
  <section className="relative py-24 w-full rounded-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon="signup-icon.svg"
          title="Sign Up Process"
          description='Click on "Join Idbook" button, share your basic details and sign up in just 30 minutes.'
        />
        <FeatureCard
          icon="commission-icon.svg"
          title="Commission Charges"
          description="Flat 20% service fee and Rs 40 on every check-in. GST as applicable."
        />
        <FeatureCard
          icon="payment-icon.svg"
          title="Payment Frequency"
          description="All daily pending dues will be automatically credited to your bank account."
        />
      </div>
    </div>
    <div className="absolute inset-0 w-full h-full">
      <Image
        src="/franchise/feature-bg.png"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-50"
      />
    </div>
  </section>
);

export default Features;
