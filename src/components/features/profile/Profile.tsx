"use client";

import { useState } from "react";
import { Check, Edit2, User } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import Avatar from "@/shared/Avatar";
import Select from "@/shared/Select";
import Textarea from "@/shared/Textarea";
import FileUpload from "@/components/ui/forms/FileUpload";
import { ProfileResponse } from "@/lib/profile-service";
import { useAccountStore } from "@/store/accountStore";
import SwitchProfile from "@/components/SwitchProfile";

const groupData = (profile: ProfileResponse) => {
  return {
    account: {
      name: profile.name,
      profile_picture: profile.customer_details.profile_picture,
    },
    contact: {
      email: profile.email,
      mobile_number: profile.mobile_number,
    },
    corporate: {
      employee_id: profile.customer_details.employee_id,
      department: profile.customer_details.department,
    },
    membership: {
      loyalty_points: profile.customer_details.loyalty_points,
      membership_status: profile.customer_details.membership_status,
    },
    personal: {
      gender: profile.customer_details.gender,
      date_of_birth: profile.customer_details.date_of_birth,
      address: profile.customer_details.address,
      // language: profile.customer_details.language,
    },
    emergency: {
      emergency_contact_name: profile.customer_details.emergency_contact_name,
      emergency_contact_phone: profile.customer_details.emergency_contact_phone,
    },
    preferences: {
      preferred_language: profile.customer_details.preferred_language,
      dietary_restrictions: profile.customer_details.dietary_restrictions,
      special_requests: profile.customer_details.special_requests,
      // allergy_restrictions: profile.customer_details.allergy_restrictions,
    },
    documents: {
      id_proof_type: profile.customer_details.id_proof_type,
      id_proof: profile.customer_details.id_proof,
      pan_card: profile.customer_details.pan_card,
      pan_card_number: profile.customer_details.pan_card_number,
      aadhar_card: profile.customer_details.aadhar_card,
      aadhar_card_number: profile.customer_details.aadhar_card_number,
    },
  };
};

const renderRadio = (
  name: string,
  id: string,
  label: string,
  defaultChecked?: boolean,
  onchange?: (value: string) => void,
) => {
  return (
    <div className="flex items-center">
      <input
        defaultChecked={defaultChecked}
        id={id + name}
        name={name}
        type="radio"
        onChange={(e) => onchange && onchange(e.target.value)}
        className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
      />
      <label
        htmlFor={id + name}
        className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
      >
        {label}
      </label>
    </div>
  );
};

export default function ProfileComponent({
  profile,
  onUpdateProfile, // Accept the prop here
}: {
  profile: ProfileResponse;
  onUpdateProfile?: (updatedProfile: ProfileResponse) => void; // Make it optional
}) {
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [profileData, setProfileData] = useState(groupData(profile));
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // Preview states for avatar and document
  const [avatarPreview, setAvatarPreview] = useState<string>(
    profileData.account.profile_picture?.toString() || "",
  );
  const [documentPreview, setDocumentPreview] = useState<string>(
    profileData.documents.id_proof?.toString() || "",
  );

  // Handler for avatar file change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Handler for document file change
  const handleDocumentChange = (file: File | null) => {
    if (file) {
      setSelectedFile(file);
      setDocumentPreview(URL.createObjectURL(file));
    }
  };
  const { activeGroup } = useAccountStore();

  const handleEdit = (group: string, field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [group]: {
        ...prev[group as keyof typeof prev],
        [field]: value,
      },
    }));
    console.log("Profile data ", profileData);
  };

  const handleSave = (section: string) => {
    // If onUpdateProfile exists, call it with the updated profile data
    if (onUpdateProfile) {
      const updatedSection = {
        ...profileData[section as keyof typeof profileData],
      };

      const updatedProfile = {
        ...profile,
        name: profileData.account.name,
        customer_details: {
          ...profile.customer_details,
          ...profileData[section as keyof typeof profileData],

          profile_picture: selectedAvatar
            ? selectedAvatar
            : profile.customer_details.profile_picture,
          id_proof: selectedFile
            ? selectedFile
            : profile.customer_details.id_proof,
          id_proof_type: profileData.documents.id_proof_type,
        },
      };
      console.log("update section ", section, updatedSection);

      console.log("Updated profile ", updatedProfile);
      onUpdateProfile(updatedProfile);
    }
    setEditMode((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleEditMode = (section: string) => {
    // Only toggle edit mode without calling onUpdateProfile
    setEditMode((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderProfileCard = (
    title: string,
    data: Record<string, any>,
    editable: boolean = true,
  ) => (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-lg font-semibold capitalize">{title}</h3>
        {editable && (
          <ButtonPrimary
            onClick={() =>
              editMode[title] ? handleSave(title) : toggleEditMode(title)
            }
          >
            {editMode[title] ? (
              <Check className="h-4 w-4" />
            ) : (
              <Edit2 className="h-4 w-4" />
            )}
          </ButtonPrimary>
        )}
      </CardHeader>
      <CardContent>
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="mb-4">
            <Label className="text-sm font-medium">
              {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </Label>
            {editMode[title] && editable ? (
              (() => {
                switch (true) {
                  case key === "gender":
                    return (
                      <Select
                        className="mt-1.5"
                        value={value as string}
                        onChange={(e) =>
                          handleEdit(title.toLowerCase(), key, e.target.value)
                        }
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Select>
                    );
                  case key === "preferred_language":
                    return (
                      <Select
                        className="mt-1.5"
                        value={value as string}
                        onChange={(e) =>
                          handleEdit(title.toLowerCase(), key, e.target.value)
                        }
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Other">Other</option>
                      </Select>
                    );
                  case key.includes("restrictions") ||
                    key === "special_requests":
                    return (
                      <Textarea
                        className="mt-1.5"
                        value={value as string}
                        onChange={(e) =>
                          handleEdit(title.toLowerCase(), key, e.target.value)
                        }
                      />
                    );
                  default:
                    return (
                      <Input
                        id={key}
                        value={value as string}
                        onChange={(e) =>
                          handleEdit(title.toLowerCase(), key, e.target.value)
                        }
                        className="mt-1"
                        type={key === "date_of_birth" ? "date" : "text"}
                      />
                    );
                }
              })()
            ) : (
              <div className="mt-1 text-sm">{value as string}</div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <Card className="mb-6 relative">
            <CardContent className="flex flex-col items-center pt-6">
              <div className="absolute right-1 top-1">
                <ButtonPrimary
                  onClick={() =>
                    editMode["account"]
                      ? handleSave("account")
                      : toggleEditMode("account")
                  }
                >
                  {editMode["account"] ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Edit2 className="h-4 w-4" />
                  )}
                </ButtonPrimary>
              </div>
              <div className="relative rounded-full overflow-hidden flex">
                <Avatar sizeClass="w-32 h-32" imgUrl={avatarPreview} />
                {editMode["account"] && (
                  <>
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="mt-1 text-xs">Change Image</span>
                    </div>
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleAvatarChange}
                    />
                  </>
                )}
              </div>
              {editMode["account"] ? (
                <>
                  <Input
                    id={"name"}
                    value={profileData.account.name}
                    onChange={(e) =>
                      handleEdit("account", "name", e.target.value)
                    }
                    className="mt-1"
                    type={"text"}
                  />
                </>
              ) : (
                <h2 className="text-2xl font-bold mt-4">
                  {profileData.account.name}
                </h2>
              )}
              <p className="text-sm text-muted-foreground">
                <SwitchProfile showLabel={false} />
              </p>
            </CardContent>
          </Card>
          {renderProfileCard("main", profileData.contact, false)}
        </div>
        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeGroup?.name === "CORPORATE-GRP" &&
              renderProfileCard("corporate", profileData.corporate, false)}
            {activeGroup?.name === "B2C-GRP" &&
              renderProfileCard("membership", profileData.membership, false)}
            {renderProfileCard("personal", profileData.personal)}
            {renderProfileCard("emergency", profileData.emergency)}
            {renderProfileCard("preferences", profileData.preferences)}
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-lg font-semibold">Documents</h3>
                <ButtonPrimary
                  onClick={() =>
                    editMode["documents"]
                      ? handleSave("documents")
                      : toggleEditMode("documents")
                  }
                >
                  {editMode["documents"] ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Edit2 className="h-4 w-4" />
                  )}
                </ButtonPrimary>
              </CardHeader>
              <CardContent>
                <div>
                  <Label>ID proof type</Label>
                  {editMode["documents"] ? (
                    <>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {renderRadio(
                          "id_proof_type",
                          "ADHAR CARD",
                          "Adhar Card",
                          profileData.documents.id_proof_type === "ADHAR CARD",
                          () => {
                            handleEdit(
                              "documents",
                              "id_proof_type",
                              "ADHAR CARD",
                            );
                          },
                        )}
                        {renderRadio(
                          "id_proof_type",
                          "DRIVING LICENCE",
                          "Driving License",
                          profileData.documents.id_proof_type ===
                            "DRIVING LICENCE",
                          () => {
                            handleEdit(
                              "documents",
                              "id_proof_type",
                              "DRIVING LICENCE",
                            );
                          },
                        )}
                        {renderRadio(
                          "id_proof_type",
                          "VOTER ID CARD",
                          "Voter ID",
                          profileData.documents.id_proof_type ===
                            "VOTER ID CARD",
                          () => {
                            handleEdit(
                              "documents",
                              "id_proof_type",
                              "VOTER ID CARD",
                            );
                          },
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="mt-1 text-sm">
                      {profileData.documents.id_proof_type}
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <Label>Current ID Proof</Label>

                  {editMode["documents"] ? (
                    <>
                      {documentPreview && (
                        <img
                          src={documentPreview}
                          alt="Document preview"
                          className="mt-2 w-32 h-auto"
                        />
                      )}
                      <FileUpload
                        onFileSelect={handleDocumentChange}
                        className="mt-2"
                      />
                    </>
                  ) : documentPreview ? (
                    <img
                      src={documentPreview}
                      alt="Document preview"
                      className="mt-2 w-32 h-auto"
                    />
                  ) : (
                    <FileUpload
                      onFileSelect={handleDocumentChange}
                      className="mt-2"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* <Card className="mt-6">
        <CardHeader>
          <h3 className="text-lg font-semibold">Profiles</h3>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {profile.groups.map((group) => (
              <div key={group.id} className="flex items-center space-x-2">
                <Label>{group.name}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
