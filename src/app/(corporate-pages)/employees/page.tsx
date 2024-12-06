"use client";

import React, { useState } from "react";
import EmployeeList from "@/components/Corporate/EmployeeList";
import InviteEmployeeForm from "@/components/Corporate/InviteCorporateEmployeeForm";
import { PlusIcon } from "@heroicons/react/24/solid";
import { MdPeopleAlt } from "react-icons/md";
import Breadcrumb from "@/components/ui/navigation/Breadcrumb";

// Main Employees Page Component
const EmployeesPage: React.FC = () => {
  const breadcrumbItems = [
    { label: "Admin", href: "/admin" },
    { label: "Employees", icon: <MdPeopleAlt /> },
  ];

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 sm:mx-8 transition duration-300">
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      {/* Header Section */}
      <HeaderSection onOpenInviteModal={() => setIsInviteModalOpen(true)} />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow transition duration-300">
          <div className="p-6">
            <EmployeeList />
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <Modal onClose={() => setIsInviteModalOpen(false)}>
          <InviteEmployeeForm
            onSuccess={() => {
              setIsInviteModalOpen(false);
              // Refresh function to update the table can be added here
            }}
          />
        </Modal>
      )}
    </div>
  );
};

// Header Component Props Type
interface HeaderSectionProps {
  onOpenInviteModal: () => void; // Define the type for the prop
}

// Header Section Component
const HeaderSection: React.FC<HeaderSectionProps> = ({ onOpenInviteModal }) => (
  <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            Employees
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-300">
            Manage your organization&apos;s employees and send invitations
          </p>
        </div>
        <button
          onClick={onOpenInviteModal}
          className="inline-flex items-center px-4 py-2 border border-transparent 
                     shadow-sm text-sm font-medium rounded-lg text-white 
                     bg-primary-600 hover:bg-primary-700 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 
                     focus:ring-primary-500 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Invite Employee
        </button>
      </div>
    </div>
  </div>
);

// Modal Component Props Type
interface ModalProps {
  children: React.ReactNode; // Define the type for children
  onClose: () => void; // Define the type for the onClose prop
}

// Modal Component
const Modal: React.FC<ModalProps> = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
        <h2 className="text-xl font-display font-semibold text-neutral-900 dark:text-white">
          Invite New Employee
        </h2>
        <button
          onClick={onClose}
          className="text-neutral-500 hover:text-neutral-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

// For Next.js page implementation
const EmployeesNextPage: React.FC = () => (
  <>
    <head>
      <title>Employees Management | Your Company</title>
      <meta
        name="description"
        content="Manage your organization's employees and send invitations"
      />
    </head>
    <EmployeesPage />
  </>
);

export default EmployeesNextPage;
