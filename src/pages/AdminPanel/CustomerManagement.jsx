import Header from "@/shared/components/AdminPanel/Header";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";
import React from "react";


const CustomerManagement = () => {
const [customers, setCustomers] = useState(() => {
  const savedCustomers = sessionStorage.getItem("customers");
  return savedCustomers ? JSON.parse(savedCustomers) : initialCustomers;
});
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [blockDialogOpen, setBlockDialogOpen] = useState(false);

  const [customerToChange, setCustomerToChange] = useState(null);

  /* __________________________________  SEARCH + FILTER_________________________ */

  const filteredCustomers = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchText) ||
        customer.email.toLowerCase().includes(searchText) ||
        customer.phone.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  useEffect(() => {
    sessionStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  /* __________________________________VIEW CUSTOMER_________________________ */

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  /* __________________________________ OPEN BLOCK DIALOG __________________________________ */

  const handleOpenBlockDialog = (customer) => {
    setCustomerToChange(customer);
    setBlockDialogOpen(true);
  };

  /* __________________________________ CLOSE BLOCK DIALOG __________________________________ */
  const handleCloseBlockDialog = () => {
    setBlockDialogOpen(false);
    setCustomerToChange(null);
  };
  /* __________________________________BLOCK / UNBLOCK CUSTOMER__________________________________ */
  const handleBlockUnblock = () => {
    if (!customerToChange) {
      return;
    }

    const newStatus =
      customerToChange.status === "Blocked" ? "Active" : "Blocked";

    setCustomers((previousCustomers) =>
      previousCustomers.map((customer) =>
        customer.id === customerToChange.id
          ? {
              ...customer,
              status: newStatus,
            }
          : customer,
      ),
    );

    setSelectedCustomer((previousCustomer) => {
      if (!previousCustomer || previousCustomer.id !== customerToChange.id) {
        return previousCustomer;
      }

      return {
        ...previousCustomer,
        status: newStatus,
      };
    });

    handleCloseBlockDialog();
  };
  /* __________________________________ clear btn __________________________________ */

  const handleClearFilter = () => {
    setSearch("");
    setStatusFilter("All");
  };

  /* __________________________________  CUSTOMER DETAILS PAGE __________________________________ */

  if (selectedCustomer) {
    return (
      <CustomerDetails
        customer={selectedCustomer}
        onBack={() => setSelectedCustomer(null)}
        blockDialogOpen={blockDialogOpen}
        customerToChange={customerToChange}
        onOpenBlockDialog={handleOpenBlockDialog}
        onCloseBlockDialog={handleCloseBlockDialog}
        onConfirmBlock={handleBlockUnblock}
      />
    );
  }

  //____________________total customer count ____________________
  const totalCustomers = customers.length;

  const totalActiveCustomers = customers.filter(
    (customer) => customer.status === "Active",
  ).length;

  const totalBlockedCustomers = customers.filter(
    (customer) => customer.status === "Blocked",
  ).length;

  /* _________________________________ CUSTOMER LIST PAGE__________________________________ */

  return (
    <div>
      <Sidebar />
      <Header />
      <h1>Customer Management </h1>
    </div>
  );
};

export default CustomerManagement;
