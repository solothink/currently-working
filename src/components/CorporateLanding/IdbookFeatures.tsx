import Image from "next/image";

export default function IdbookFeatures() {
  return (
    <div className="mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-16 text-primary-900">
        There&apos;s more!
      </h2>
      <div className="relative">
        <div className="w-full h-[350px] relative overflow-hidden rounded-lg">
          <Image
            src="/corporate/features/business-person-hologram.svg"
            alt="Business person looking at holographic data"
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />
        </div>
        <div className="absolute -top-[40px] right-8 h-[430px]  bg-primary-700 text-white p-8 rounded shadow max-w-lg">
          <ul className="space-y-6 flex flex-col justify-evenly h-full ">
            <FeatureItem
              iconSrc="/corporate/features/gst-icon.svg"
              text="Hassle-Free GST"
            />
            <FeatureItem
              iconSrc="/corporate/features/invoice-icon.svg"
              text="Automatic and easy invoices"
            />
            <FeatureItem
              iconSrc="/corporate/features/dashboard-icon.svg"
              text="Dedicated dashboard to track payments"
            />
            <FeatureItem
              iconSrc="/corporate/features/mobile-app-icon.svg"
              text="Mobile app with built-in approval flow and custom budget limits"
            />
            <FeatureItem
              iconSrc="/corporate/features/support-icon.svg"
              text="Round-the-clock support of Idbook Team"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ iconSrc, text }: { iconSrc: string; text: string }) {
  return (
    <li className="flex items-start space-x-4">
      <div className="flex-shrink-0 mt-1">
        <Image src={iconSrc} alt="" width={24} height={24} />
      </div>
      <span className="text-sm">{text}</span>
    </li>
  );
}
