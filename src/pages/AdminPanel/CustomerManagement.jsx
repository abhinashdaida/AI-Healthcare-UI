import React, { useEffect, useMemo, useState } from "react";

import { Paper, Typography } from "@mui/material";


import Header from "@/shared/components/AdminPanel/Header";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";

import CustomerDetails from "./CustomerDetails";

import BlockCustomerDialog from "@/shared/components/AdminPanel/CustomerManagement/BlockCustomerDialog";
import CustomerFilters from "@/shared/components/AdminPanel/CustomerManagement/CustomerFilters";
import CustomerStats from "@/shared/components/AdminPanel/CustomerManagement/CustomerStats";
import CustomerTable from "@/shared/components/AdminPanel/CustomerManagement/CustomerTable";

import { initialCustomers } from "@/shared/constants/AdminPanel/CustomersData";


/* _________________________________CustomerManagement______________________*/

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
    <div className="min-h-screen bg-[#F8F9FB] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      {/* Header */}
      <Header />

      {/* Main */}

      <main className="ml-[248px] h-screen overflow-hidden bg-[#F8F9FB] pt-[75px]">
        <div className="flex h-full min-h-0 flex-col p-6">
          {/*   PAGE HEADER */}
          <div className="mb-6 flex shrink-0 items-center justify-between">
            <div>
              <Typography
                sx={{
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                Customer Management
              </Typography>

              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#6B7280",
                  marginTop: "4px",
                }}
              >
                Manage customers, orders and account status
              </Typography>
            </div>
            {/* Customer Count */}
            <CustomerStats
              totalCustomers={totalCustomers}
              totalActiveCustomers={totalActiveCustomers}
              totalBlockedCustomers={totalBlockedCustomers}
            />
          </div>
          {/* FILTERS */}
          <Paper
            elevation={0}
            className="mb-5 shrink-0 rounded-[10px] border border-[#E5E7EB] bg-white p-4"
          >
            <CustomerFilters
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onClear={handleClearFilter}
            />
          </Paper>
          {/* CUSTOMER TABLE */}
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <CustomerTable
              customers={filteredCustomers}
              onView={handleViewCustomer}
              onBlockUnblock={handleOpenBlockDialog}
            />

            <div className="mt-4 pb-4">
              {/* RESULT COUNT */}
              <div className="mt-4">
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#6B7280",
                  }}
                >
                  Showing {filteredCustomers.length} of {customers.length}{" "}
                  customers
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* BLOCK / UNBLOCK DIALOG */}
      <BlockCustomerDialog
        open={blockDialogOpen}
        customer={customerToChange}
        onClose={handleCloseBlockDialog}
        onConfirm={handleBlockUnblock}
      />
    </div>
  );
};

export default CustomerManagement;
