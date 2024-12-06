import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Button from "@/components/ui/button";
import {
  FaBuilding,
  FaGlobe,
  FaMapMarkerAlt,
  FaPencilAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { MdEmail, MdBusiness, MdDescription } from "react-icons/md";
import { BsFileEarmarkText, BsGeoAlt } from "react-icons/bs";

interface CompanyDetails {
  id: number;
  company_name: string;
  brand_name: string;
  company_logo: string | null;
  company_email: string;
  company_website: string;
  gstin_no: string;
  pan_no: string;
  registered_address: string;
  contact_email_address: string;
  country: string;
  latitude: number;
  longitude: number;
  approved: boolean;
  is_active: boolean;
}

interface CompanyDetailsCardProps {
  details: CompanyDetails;
  onEdit: () => void;
}

const CompanyDetailsCard = ({ details, onEdit }: CompanyDetailsCardProps) => {
  return (
    <div className="p-4 w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          Company Information
        </h2>
        <Button
          onClick={onEdit}
          className="bg-primary-600 hover:bg-primary-700 text-white"
          leftIcon={<FaPencilAlt className="w-4 h-4 mr-2" />}
        >
          Edit Details
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card className="bg-white dark:bg-neutral-800 shadow-md">
          <CardHeader className="border-b border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Basic Information
            </h3>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <FaBuilding className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1" />
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Company Name
                </p>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">
                  {details.company_name}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MdBusiness className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1" />
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Brand Name
                </p>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">
                  {details.brand_name}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-white dark:bg-neutral-800 shadow-md">
          <CardHeader className="border-b border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Contact Information
            </h3>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <MdEmail className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1" />
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Company Email
                </p>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">
                  {details.company_email}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaGlobe className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1" />
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Website
                </p>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">
                  {details.company_website}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Information */}
        <Card className="bg-white dark:bg-neutral-800 shadow-md">
          <CardHeader className="border-b border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Legal Information
            </h3>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <BsFileEarmarkText className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1" />
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  GSTIN Number
                </p>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">
                  {details.gstin_no}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MdDescription className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1" />
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  PAN Number
                </p>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">
                  {details.pan_no}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card className="bg-white dark:bg-neutral-800 shadow-md">
          <CardHeader className="border-b border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Location Details
            </h3>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1" />
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Registered Address
                </p>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">
                  {details.registered_address}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <BsGeoAlt className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1" />
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Country
                </p>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">
                  {details.country}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Information */}
        <Card className="bg-white dark:bg-neutral-800 shadow-md md:col-span-2">
          <CardHeader className="border-b border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Status
            </h3>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              {details.approved ? (
                <FaCheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <FaTimesCircle className="w-5 h-5 text-red-500" />
              )}
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Approval Status
                </p>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">
                  {details.approved ? "Approved" : "Not Approved"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {details.is_active ? (
                <FaCheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <FaTimesCircle className="w-5 h-5 text-red-500" />
              )}
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Active Status
                </p>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">
                  {details.is_active ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyDetailsCard;
