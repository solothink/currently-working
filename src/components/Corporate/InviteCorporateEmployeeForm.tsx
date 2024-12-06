import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import Label from "../Label";
import Select from "@/shared/Select";
import Input from "../ui/forms/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useInviteEmployee } from "@/hooks/useEmployee"; // Import the mutation hook

interface InviteEmployeeFormData {
  email: string;
  gender: string;
  mobile_number: string;
  name: string;
  group_name: string;
  employee_id: string;
  department: string;
}

export interface InviteEmployeeFormProps {
  className?: string;
  onSuccess?: () => void;
}

const InviteEmployeeForm: React.FC<InviteEmployeeFormProps> = ({
  onSuccess = () => {},
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<InviteEmployeeFormData>();

  const { mutate, status } = useInviteEmployee(); // Use status to check the mutation state

  const isLoading = status === "pending"; // Determine if it's loading

  const onSubmit: SubmitHandler<InviteEmployeeFormData> = (data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Signup link sent successfully!");
        onSuccess();
      },
      onError: (error: any) => {
        if (error.response?.status === 400 && error.response.data.errors) {
          error.response.data.errors.forEach((err: any) => {
            setError(err.field as keyof InviteEmployeeFormData, {
              type: "manual",
              message: err.message,
            });
          });
        } else {
          toast.error(error.response?.data?.message || "An error occurred");
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Gender</Label>
          <Select className="mt-1.5" {...register("gender")}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
        </div>
        <div>
          <Input
            className="mt-1.5"
            label="Full Name"
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            errorMessage={errors.name?.message}
          />
        </div>
        <Input
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          className="border p-2"
          label="Email"
          errorMessage={errors.email?.message}
        />
        <Input
          {...register("mobile_number", {
            required: "Mobile number is required",
          })}
          placeholder="Mobile Number"
          className="border p-2"
          label="Mobile Number"
          errorMessage={errors.mobile_number?.message}
        />
        <div>
          <Label>Group Name</Label>
          <Select className="mt-1.5" {...register("group_name")}>
            <option value="DEFAULT">Default Group</option>
            <option value="Admin Group">Admin Group</option>
            <option value="Organization Group">Organization Group</option>
          </Select>
        </div>
        <div>
          <Input
            {...register("employee_id")}
            placeholder="Employee ID"
            className="border p-2"
            label="Employee ID"
            errorMessage={errors.employee_id?.message}
          />
        </div>
        <div>
          <Input
            {...register("department")}
            placeholder="Department"
            className="border p-2"
            label="Department"
            errorMessage={errors.department?.message}
          />
        </div>
      </div>

      <ButtonPrimary type="submit" className="mt-4" loading={isLoading}>
        {isLoading ? "Sending..." : "Send Invitation"}
      </ButtonPrimary>
    </form>
  );
};

export default InviteEmployeeForm;
