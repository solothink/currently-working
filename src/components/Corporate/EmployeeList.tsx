import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EmployeeTable from "./EmployeeTable"; // Import the table component
import { useListEmployees } from "@/hooks/useEmployee"; // Use your custom hook

const EmployeeList = () => {
  const [page, setPage] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [limit] = useState(5); // Items per page

  // Use the custom hook to fetch employee data
  const { data, isLoading, isError, error } = useListEmployees({
    limit,
    offset: (page - 1) * limit,
  });

  // Update employees when data changes
  useEffect(() => {
    if (data) {
      setEmployees(data);
    }
  }, [data]);

  // Handle errors
  useEffect(() => {
    if (isError && error) {
      toast.error("Failed to fetch employees");
    }
  }, [isError, error]);

  if (isLoading) {
    return <div>Loading employees...</div>;
  }

  if (isError) {
    return <div>Error loading employees. Please try again later.</div>;
  }

  return (
    <div>
      <EmployeeTable
        employees={employees}
        currentPage={page}
        itemsPerPage={limit}
        onPageChange={setPage}
      />
    </div>
  );
};

export default EmployeeList;
