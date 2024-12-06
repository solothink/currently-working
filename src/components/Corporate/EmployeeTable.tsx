import React from "react";
import { FaSearch } from "react-icons/fa";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Pagination,
} from "@/components/ui/table"; // Adjust path based on your folder structure

// Employee interface (Reflects nested 'user' structure)
interface Employee {
  employee_id: string;
  department: string;
  group_name: string;
  gender: string;
  user: {
    name: string;
    email: string;
    mobile_number: string;
  };
}

// Main EmployeeTable Component Props
interface EmployeeTableProps {
  employees: Employee[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

// EmployeeTable Component
const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full space-y-4">
      {/* Search Bar */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-lg shadow">
        <div className="flex items-center space-x-2">
          <FaSearch className="text-neutral-500" />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full p-2 text-sm border rounded-md dark:bg-neutral-900 dark:text-white"
          />
        </div>
      </div>

      {/* Employee Table */}
      <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "name",
                "email",
                "employee_id",
                "department",
                "group_name",
                "gender",
                "mobile_number",
              ].map((key) => (
                <TableHead
                  key={key}
                  className="cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700"
                >
                  <span className="capitalize">{key.replace("_", " ")}</span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentEmployees.map((employee, index) => (
              <TableRow key={employee.employee_id || index}>
                {/* Access 'name', 'email', 'mobile_number' from nested 'user' */}
                <TableCell>{employee.user?.name || "N/A"}</TableCell>
                <TableCell>{employee.user?.email || "N/A"}</TableCell>
                <TableCell>{employee.employee_id}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.group_name}</TableCell>
                <TableCell>{employee.gender}</TableCell>
                <TableCell>{employee.user?.mobile_number || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default EmployeeTable;
