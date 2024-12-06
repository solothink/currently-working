import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { FaUsers, FaCalendarAlt, FaFileAlt, FaWallet } from "react-icons/fa";
import Link from "next/link";

interface AdminPanelProps {
  adminName?: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ adminName = "Admin" }) => {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-primary-800 dark:text-primary-200 mb-2">
          Hello {adminName},
        </h1>
        <p className="text-xl font-body text-neutral-600 dark:text-neutral-300 mb-8">
          Welcome to your Admin Console. Manage all features below.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<FaUsers className="w-8 h-8" />}
            title="Workforce Management"
            description="Manage employees and set policies for increased efficiency."
            actionText="Manage"
            link="/employees"
          />
          <FeatureCard
            icon={<FaCalendarAlt className="w-8 h-8" />}
            title="Booking Enquiries"
            description="Create and process all your booking requests."
            actionText="Submit Enquiries"
            link="/corporate-booking"
          />
          <FeatureCard
            icon={<FaFileAlt className="w-8 h-8" />}
            title="Travel Report"
            description="Access and analyze comprehensive travel data and statistics."
            actionText="View Report"
            link="/travel-report"
          />
          <FeatureCard
            icon={<FaWallet className="w-8 h-8" />}
            title="Wallet"
            description="Manage funds and transactions for seamless operations."
            actionText="Access Wallet"
            link="/wallet"
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  actionText,
  link,
}) => {
  return (
    <Card className="bg-white dark:bg-neutral-800 flex flex-col h-full">
      <CardHeader className="flex flex-col space-y-4 pb-2">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary-100 dark:bg-primary-800 rounded-full flex-shrink-0">
            {icon}
          </div>
          <div className="flex-grow min-h-[4rem] flex items-center">
            <h2 className="text-xl font-display font-semibold text-primary-700 dark:text-primary-300 line-clamp-2">
              {title}
            </h2>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <p className="text-neutral-600 dark:text-neutral-300 mb-4 font-body flex-grow">
          {description}
        </p>
        <Link href={link} passHref className="mt-auto w-full">
          <Button variant="primary" size="sm" className="w-full">
            {actionText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default AdminPanel;
