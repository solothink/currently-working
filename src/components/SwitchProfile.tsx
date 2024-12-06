// components/SwitchProfile.tsx
"use client";

import { useState } from "react";
import { GroupType } from "@/types/user";
import { useAccountStore } from "@/store/accountStore";
import Label from "./Label";
import Select from "@/shared/Select";

interface SwitchProfileProps {
  showLabel?: boolean;
}

const SwitchProfile = (
  { showLabel = true }: SwitchProfileProps = {
    showLabel: true,
  },
) => {
  const { groups, activeGroup, setActiveGroup } = useAccountStore();
  const [selectedGroup, setSelectedGroup] = useState(activeGroup?.name || "");

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGroupName = event.target.value;
    setSelectedGroup(newGroupName);
    setActiveGroup(newGroupName as GroupType["name"]);
  };

  return (
    <div>
      {showLabel && (
        <Label className="text-sm font-medium text-gray-700">
          Switch Profile
        </Label>
      )}
      <Select
        className="mt-1.5 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={selectedGroup}
        onChange={handleGroupChange}
      >
        {groups.map((group: GroupType) => (
          <option key={group.id} value={group.name}>
            {group.name}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default SwitchProfile;
