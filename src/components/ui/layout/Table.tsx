const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table ref={ref} className="w-full caption-bottom text-sm" {...props} />
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className="border-b border-neutral-200" {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className="divide-y divide-neutral-200" {...props} />
));
TableBody.displayName = "TableBody";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className="h-12 px-4 text-left align-middle font-medium text-neutral-500"
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className="p-4 align-middle text-neutral-700" {...props} />
));
TableCell.displayName = "TableCell";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className="border-b transition-colors hover:bg-neutral-50/50"
    {...props}
  />
));
TableRow.displayName = "TableRow";

// Pagination Component
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-neutral-200">
    <div className="flex justify-between sm:hidden">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 disabled:opacity-50"
      >
        Next
      </button>
    </div>
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-neutral-700">
          Page <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{totalPages}</span>
        </p>
      </div>
      <div>
        <nav
          className="inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                currentPage === page
                  ? "bg-primary-500 text-white"
                  : "bg-white text-neutral-500 hover:bg-neutral-50"
              } border border-neutral-300`}
            >
              {page}
            </button>
          ))}
        </nav>
      </div>
    </div>
  </div>
);
