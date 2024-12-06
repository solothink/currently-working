import Image from "next/image";

export default function IdbookPromise() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-primary-900">
        Idbook Promise
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <Image
            src="/corporate/promise.png"
            alt="Idbook Promise Illustration"
            width={500}
            height={500}
            layout="responsive"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-8">
          <PromiseItem
            icon="/corporate/piggy-bank.svg"
            title="Save Cost"
            description="Get easy access to 4000+ Idbook properties with up to 40% savings, manage all your company bookings on a single portal, and say good-bye to third-party commissions."
          />
          <PromiseItem
            icon="/corporate/clock.svg"
            title="Save Time"
            description="With Idbook's effortless interface, have all your bookings at your fingertips anytime you need them."
          />
          <PromiseItem
            icon="/corporate/shield.svg"
            title="Provide Transparency"
            description="Get invoices directly from us without any human intervention, and always be in the know."
          />
        </div>
      </div>
    </div>
  );
}

function PromiseItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <Image src={icon} alt={title} width={40} height={40} />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-primary-800 mb-2">{title}</h3>
        <p className="text-primary-600">{description}</p>
      </div>
    </div>
  );
}
