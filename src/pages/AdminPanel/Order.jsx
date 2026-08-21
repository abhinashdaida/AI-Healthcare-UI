import Header from "@/shared/components/AdminPanel/Header";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";
import { initialCustomers } from "@/shared/constants/AdminPanel/CustomersData";
import { Icon } from "@iconify/react";
import {
  Box, Button, Chip, Dialog, DialogContent, Divider,
  FormControl, IconButton, InputAdornment, MenuItem,
  Select, TextField, Typography
} from "@mui/material";
import React, { useState } from "react";
 
const orders = initialCustomers.flatMap(c =>
  (c.orders || []).map(o => ({
    ...o,
    customer: c.name,
    phone: c.phone,
    email: c.email,
    address: `${c.address.street}, ${c.address.city}, ${c.address.state} - ${c.address.pincode}`,
    payment: o.payment || "Paid"
  }))
);
 
const statuses = [
  "Pending", "Processing", "Packed", "Shipped",
  "Delivered", "Cancelled", "Refunds", "Return"
];
 
const statusColors = {
  Pending: ["#FFF4DF", "#C77A00"],
  Processing: ["#FFF4DF", "#B56A00"],
  Packed: ["#EAF1FF", "#2563EB"],
  Shipped: ["#F2E9FF", "#7C3AED"],
  Delivered: ["#DCFCE7", "#15803D"],
  Cancelled: ["#FEE2E2", "#DC2626"],
  Paid: ["#DCFCE7", "#15803D"],
  COD: ["#FFF4DF", "#B56A00"]
};
 
const Tag = ({ value }) => {
  const c = statusColors[value] || ["#F1F5F9", "#475569"];
  return (
    <Chip label={value} size="small"
      sx={{ height: 26, borderRadius: 2, bgcolor: c[0],
        color: c[1], fontSize: 12, fontWeight: 500 }}
    />
  );
};
 
const Arrow = () => (
  <Icon icon="mdi:chevron-down" width="20"
    style={{ marginRight: 8 }} />
);
 
const Orders = () => {
  const [data, setData] = useState(orders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Orders");
  const [selected, setSelected] = useState(null);
 
  const updateStatus = (id, status) =>
    setData(list => list.map(o =>
      o.id === id ? { ...o, status } : o
    ));
 
  const printOrder = o => {
    const win = window.open("", "_blank", "width=800,height=900");
    if (!win) return alert("Please allow pop-ups to print the order.");
 
    win.document.write(`
      <html>
      <head>
        <title>${o.id}</title>
        <style>
          body{font-family:Arial;padding:40px;color:#111827}
          .invoice{max-width:700px;margin:auto}
          .box{background:#f8f9fa;padding:18px;border-radius:10px;margin:20px 0}
          .row{display:flex;justify-content:space-between;padding:8px 0}
        </style>
      </head>
      <body>
        <div class="invoice">
          <h1>Order Details - ${o.id}</h1>
          <h2>Customer Details</h2>
          <div class="box">
            <div class="row"><b>Name</b><span>${o.customer}</span></div>
            <div class="row"><b>Email</b><span>${o.email}</span></div>
            <div class="row"><b>Phone</b><span>${o.phone}</span></div>
            <div class="row"><b>Address</b><span>${o.address}</span></div>
          </div>
          <h2>Order Items</h2>
          <div class="box">${o.product}</div>
          <h2>Order Summary</h2>
          <div class="box">
            <div class="row"><b>Date</b><span>${o.date}</span></div>
            <div class="row"><b>Total</b>
              <b>₹${o.amount.toLocaleString("en-IN")}</b>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
 
    win.document.close();
    win.onload = () => {
      win.focus();
      win.print();
      win.close();
    };
  };
 
  const filtered = data.filter(o => {
    const s = search.toLowerCase();
    const searchMatch =
      !s ||
      o.id.toLowerCase().includes(s) ||
      o.customer.toLowerCase().includes(s) ||
      o.phone.includes(s);
 
    return searchMatch &&
      (filter === "All Orders" || o.status === filter);
  });
 
  return (
    <>
      <Header />
      <Sidebar />
 
      <Box component="main" sx={{
        ml: "248px", pt: "75px",
        width: "calc(100% - 248px)",
        minHeight: "100vh", bgcolor: "#F8FAFC"
      }}>
        <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
 
          <Typography sx={{
            fontSize: 29, fontWeight: 600, color: "#0F172A"
          }}>
            Orders
          </Typography>
 
          <Typography sx={{
            fontSize: 15, color: "#64748B", mb: 3
          }}>
            Manage customer orders
          </Typography>
 
          {/* SEARCH */}
          <Box sx={{
            bgcolor: "#FFF", border: "1px solid #E2E8F0",
            borderRadius: 3, p: 2, mb: 2.5,
            display: "flex", gap: 1.5,
            boxShadow: "0 2px 8px rgba(15,23,42,.03)"
          }}>
            <TextField
              fullWidth
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by order ID, customer or phone..."
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon icon="mdi:magnify" width="20"
                        color="#64748B" />
                    </InputAdornment>
                  )
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 46, borderRadius: 2, fontSize: 14
                }
              }}
            />
 
            <FormControl sx={{ width: 210, minWidth: 180 }}>
              <Select value={filter}
                onChange={e => setFilter(e.target.value)}
                IconComponent={Arrow}
                sx={{ height: 46, borderRadius: 2, fontSize: 14 }}
              >
                <MenuItem value="All Orders">All Orders</MenuItem>
                {statuses.map(s =>
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                )}
              </Select>
            </FormControl>
 
            <IconButton sx={{
              width: 46, height: 46,
              border: "1px solid #CBD5E1", borderRadius: 2
            }}>
              <Icon icon="mdi:filter-outline" width="20" />
            </IconButton>
          </Box>
 
          {/* ORDER CARDS */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {!filtered.length && (
              <Box sx={{
                bgcolor: "#FFF", border: "1px solid #E2E8F0",
                borderRadius: 3, py: 6, textAlign: "center"
              }}>
                <Typography color="#64748B">
                  No orders found
                </Typography>
              </Box>
            )}
 
            {filtered.map(o => (
              <Box key={o.id} sx={{
                bgcolor: "#FFF",
                border: "1px solid #E2E8F0",
                borderRadius: 3,
                p: 2.5,
                boxShadow: "0 2px 8px rgba(15,23,42,.03)",
                transition: "0.2s",
                "&:hover": {
                  borderColor: "#DDD6FE",
                  boxShadow: "0 6px 18px rgba(15,23,42,.07)"
                }
              }}>
 
                {/* CARD HEADER */}
                <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 2
                }}>
                  <Box sx={{
                    display: "flex", gap: 1.5, minWidth: 0
                  }}>
                    <Box sx={{
                      width: 50, height: 50, flexShrink: 0,
                      borderRadius: 2, bgcolor: "#F5EDFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Icon
                        icon="mdi:package-variant-closed"
                        width="25" color="#7C3AED"
                      />
                    </Box>
 
                    <Box sx={{ minWidth: 0 }}>
                      <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: .8,
                        flexWrap: "wrap",
                        mb: .5
                      }}>
                        <Typography sx={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: "#0F172A"
                        }}>
                          {o.id}
                        </Typography>
                        <Tag value={o.status} />
                        <Tag value={o.payment} />
                      </Box>
 
                      <Typography sx={{
                        fontSize: 13, color: "#64748B"
                      }}>
                        Customer Order
                      </Typography>
                    </Box>
                  </Box>
 
                  <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                    <Typography sx={{
                      fontSize: 19,
                      fontWeight: 600,
                      color: "#0F172A"
                    }}>
                      ₹{o.amount.toLocaleString("en-IN")}
                    </Typography>
 
                    <Typography sx={{
                      fontSize: 12.5,
                      color: "#64748B",
                      mt: .3
                    }}>
                      {o.date}
                    </Typography>
                  </Box>
                </Box>
 
                {/* CUSTOMER / PHONE / PRODUCT */}
                <Box sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 1.5,
                  mt: 2.5
                }}>
                  <Info
                    title="CUSTOMER"
                    icon="mdi:account-outline"
                    value={o.customer}
                  />
 
                  <Info
                    title="PHONE"
                    icon="mdi:phone-outline"
                    value={o.phone}
                  />
 
                  <Box sx={{
                    bgcolor: "#F8FAFC",
                    borderRadius: 2,
                    p: 1.5,
                    gridColumn: "1 / -1"
                  }}>
                    <Typography sx={{
                      fontSize: 10.5,
                      color: "#94A3B8",
                      fontWeight: 600,
                      mb: .5
                    }}>
                      PRODUCT
                    </Typography>
 
                    <Box sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: .7
                    }}>
                      <Icon
                        icon="mdi:shopping-outline"
                        width="17"
                        color="#64748B"
                      />
                      <Typography sx={{
                        fontSize: 13.5,
                        color: "#334155"
                      }}>
                        {o.product}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
 
                <Divider sx={{ my: 2 }} />
 
                {/* ACTIONS */}
                <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2
                }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      startIcon={
                        <Icon icon="mdi:eye-outline" width="18" />
                      }
                      onClick={() => setSelected(o)}
                      sx={{
                        height: 38, px: 2,
                        borderRadius: 2,
                        textTransform: "none",
                        color: "#7C3AED",
                        borderColor: "#C4B5FD",
                        fontSize: 13.5,
                        "&:hover": {
                          bgcolor: "#FAF5FF",
                          borderColor: "#7C3AED"
                        }
                      }}
                    >
                      View
                    </Button>
 
                    <IconButton
                      onClick={() => printOrder(o)}
                      sx={{
                        width: 38, height: 38,
                        border: "1px solid #CBD5E1",
                        borderRadius: 2
                      }}
                    >
                      <Icon
                        icon="mdi:printer-outline"
                        width="18"
                      />
                    </IconButton>
                  </Box>
 
                  <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                  }}>
                    <Typography sx={{
                      fontSize: 12.5,
                      color: "#64748B"
                    }}>
                      Status
                    </Typography>
 
                    <Select
                      value={o.status}
                      onChange={e =>
                        updateStatus(o.id, e.target.value)
                      }
                      IconComponent={Arrow}
                      sx={{
                        width: 180,
                        height: 38,
                        bgcolor: "#F8FAFC",
                        borderRadius: 2,
                        fontSize: 13,
                        "& fieldset": {
                          borderColor: "#E2E8F0"
                        }
                      }}
                    >
                      {statuses.map(s =>
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      )}
                    </Select>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
 
      {/* DETAILS DIALOG */}
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        fullWidth
        maxWidth="md"
      >
        {selected && (
          <DialogContent sx={{ p: 3 }}>
            <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <Typography sx={{
                fontSize: 22, fontWeight: 600
              }}>
                Order Details - {selected.id}
              </Typography>
 
              <IconButton onClick={() => setSelected(null)}>
                <Icon icon="mdi:close" width="22" />
              </IconButton>
            </Box>
 
            <Box sx={{ display: "flex", gap: 1, my: 3 }}>
              <Tag value={selected.status} />
              <Tag value={selected.payment} />
            </Box>
 
            <Typography sx={{
              fontSize: 17, fontWeight: 600, mb: 1
            }}>
              Customer Details
            </Typography>
 
            <Box sx={{
              bgcolor: "#F8FAFC",
              borderRadius: 2,
              p: 2.5,
              mb: 3
            }}>
              <Detail label="Name" value={selected.customer} />
              <Detail label="Email" value={selected.email} />
              <Detail label="Phone" value={selected.phone} />
              <Detail label="Address" value={selected.address} />
            </Box>
 
            <Typography sx={{
              fontSize: 17, fontWeight: 600, mb: 1
            }}>
              Order Items
            </Typography>
 
            <Box sx={{
              bgcolor: "#F8FAFC",
              borderRadius: 2,
              p: 2.5,
              mb: 3
            }}>
              {selected.product}
            </Box>
 
            <Typography sx={{
              fontSize: 17, fontWeight: 600, mb: 1
            }}>
              Order Summary
            </Typography>
 
            <Box sx={{
              bgcolor: "#F8FAFC",
              borderRadius: 2,
              p: 2.5,
              mb: 3
            }}>
              <Detail label="Order Date" value={selected.date} />
              <Divider sx={{ my: 1 }} />
              <Box sx={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <b>Total Amount</b>
                <b>
                  ₹{selected.amount.toLocaleString("en-IN")}
                </b>
              </Box>
            </Box>
 
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={
                  <Icon icon="mdi:printer-outline" width="20" />
                }
                onClick={() => printOrder(selected)}
              >
                Print Invoice
              </Button>
 
              <Button
                fullWidth
                variant="contained"
                onClick={() => setSelected(null)}
                sx={{
                  bgcolor: "#7C3AED",
                  "&:hover": { bgcolor: "#6D28D9" }
                }}
              >
                Close
              </Button>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};
 
const Info = ({ title, icon, value }) => (
  <Box sx={{
    bgcolor: "#F8FAFC",
    borderRadius: 2,
    p: 1.5
  }}>
    <Typography sx={{
      fontSize: 10.5,
      color: "#94A3B8",
      fontWeight: 600,
      mb: .5
    }}>
      {title}
    </Typography>
 
    <Box sx={{
      display: "flex",
      alignItems: "center",
      gap: .7
    }}>
      <Icon icon={icon} width="17" color="#64748B" />
      <Typography sx={{
        fontSize: 13.5,
        color: "#334155"
      }}>
        {value}
      </Typography>
    </Box>
  </Box>
);
 
const Detail = ({ label, value }) => (
  <Box sx={{
    display: "flex",
    justifyContent: "space-between",
    gap: 3,
    py: .7
  }}>
    <Typography color="#64748B">{label}</Typography>
    <Typography sx={{ textAlign: "right" }}>{value}</Typography>
  </Box>
);
 
export default Orders;