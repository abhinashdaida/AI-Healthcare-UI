import React, { useState } from "react";
import Header from "@/shared/components/AdminPanel/Header";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";
import { initialCustomers } from "@/shared/constants/AdminPanel/CustomersData";
import {
  Box, Typography, TextField, InputAdornment, Select, MenuItem,
  FormControl, Button, Chip, IconButton, Divider, Dialog, DialogContent
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const allOrders = initialCustomers.flatMap(c =>
  (c.orders || []).map(o => ({
    ...o,
    customer: c.name,
    phone: c.phone,
    email: c.email,
    address: `${c.address.street}, ${c.address.city}, ${c.address.state} - ${c.address.pincode}`,
    payment: o.payment || "Paid"
  }))
);

const colors = {
  Pending: ["#FFF0D9", "#E85D04"],
  Processing: ["#FFF3BD", "#A16207"],
  Packed: ["#E1ECFF", "#2563EB"],
  Shipped: ["#F1E4FF", "#7C00C9"],
  Delivered: ["#DDF8E9", "#16A34A"],
  Cancelled: ["#FFE0E0", "#DC2626"],
  Paid: ["#DDF8E9", "#16A34A"],
  COD: ["#FFF3BD", "#A16207"]
};

const Tag = ({ v }) => {
  const c = colors[v] || ["#EEF2F7", "#334155"];
  return <Chip label={v} size="small" sx={{
    height: 27, borderRadius: 2, bgcolor: c[0], color: c[1], fontSize: 13
  }} />;
};

const Orders = () => {
  const [data, setData] = useState(allOrders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Orders");
  const [selected, setSelected] = useState(null);

  const update = (id, status) =>
    setData(d => d.map(o => o.id === id ? { ...o, status } : o));

  const printOrder = o => {
    const w = window.open("", "_blank", "width=800,height=900");
    if (!w) return alert("Please allow pop-ups to print the order.");

    w.document.write(`
      <html><head><title>${o.id}</title><style>
      body{font-family:Arial;padding:40px;color:#111827}
      .invoice{max-width:700px;margin:auto}
      h1{font-size:25px}.badge{display:inline-block;padding:6px 12px;
      border-radius:7px;margin-right:8px}.status{background:#fff0d9;color:#e85d04}
      .payment{background:#ddf8e9;color:#16a34a}
      .box{background:#f8f9fa;padding:18px;border-radius:10px;margin-bottom:20px}
      .row{display:flex;justify-content:space-between;gap:20px;padding:8px 0}
      @media print{body{padding:0}}</style></head><body>
      <div class="invoice">
      <h1>Order Details - ${o.id}</h1>
      <span class="badge status">${o.status}</span>
      <span class="badge payment">${o.payment}</span>
      <h2>Customer Details</h2>
      <div class="box">
      <div class="row"><span>Name:</span><span>${o.customer}</span></div>
      <div class="row"><span>Email:</span><span>${o.email}</span></div>
      <div class="row"><span>Phone:</span><span>${o.phone}</span></div>
      <div class="row"><span>Address:</span><span>${o.address}</span></div>
      </div>
      <h2>Order Items</h2><div class="box">${o.product}</div>
      <h2>Order Summary</h2><div class="box">
      <div class="row"><span>Order Date:</span><span>${o.date}</span></div>
      <div class="row"><b>Total Amount:</b>
      <b>₹${o.amount.toLocaleString("en-IN")}</b></div>
      </div></div></body></html>
    `);
    w.document.close();
    w.onload = () => { w.focus(); w.print(); w.close(); };
  };

  const filtered = data.filter(o => {
    const s = search.toLowerCase();
    return (!s || o.id.toLowerCase().includes(s) ||
      o.customer.toLowerCase().includes(s) || o.phone.includes(s)) &&
      (filter === "All Orders" || o.status === filter);
  });

  const statuses = [
    "Pending", "Processing", "Packed", "Shipped", "Delivered", "Cancelled"
  ];

  return <>
    <Header /><Sidebar />

    <Box component="main" sx={{
      ml:"248px", pt:"75px", width:"calc(100% - 248px)",
      minHeight:"100vh", bgcolor:"#F8F9FB", boxSizing:"border-box"
    }}>
      <Box sx={{ px:{xs:2,md:4}, py:4 }}>
        <Typography sx={{fontSize:29,fontWeight:500}}>Orders</Typography>
        <Typography sx={{fontSize:16,color:"#334155",mb:3.5}}>
          Manage customer orders
        </Typography>

        <Box sx={{
          bgcolor:"#fff",border:"1px solid #E2E8F0",
          borderRadius:"15px",p:3
        }}>
          <Box sx={{display:"flex",gap:2,mb:4}}>
            <TextField
              fullWidth value={search}
              onChange={e=>setSearch(e.target.value)}
              placeholder="Search by order ID or customer..."
              InputProps={{
                startAdornment:<InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
              }}
              sx={{"& .MuiOutlinedInput-root":{height:42,borderRadius:2}}}
            />

            <FormControl sx={{width:193,minWidth:193}}>
              <Select value={filter} onChange={e=>setFilter(e.target.value)}
                IconComponent={KeyboardArrowDownIcon}
                sx={{height:42,bgcolor:"#F4F4F6",borderRadius:2,
                  "& fieldset":{border:"none"}}}>
                <MenuItem value="All Orders">All Orders</MenuItem>
                {statuses.map(s=><MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
            {!filtered.length && (
              <Typography sx={{textAlign:"center",py:5,color:"#64748B"}}>
                No orders found
              </Typography>
            )}

            {filtered.map(o => (
              <Box key={o.id} sx={{
                border:"1px solid #E2E8F0",borderRadius:"11px",p:2
              }}>
                <Box sx={{display:"flex",justifyContent:"space-between"}}>
                  <Box>
                    <Box sx={{display:"flex",gap:1,alignItems:"center",mb:1,
                      flexWrap:"wrap"}}>
                      <Typography sx={{fontSize:17}}>{o.id}</Typography>
                      <Tag v={o.status}/><Tag v={o.payment}/>
                    </Box>
                    <Typography>{o.customer}</Typography>
                    <Typography sx={{fontSize:13.5,color:"#475569"}}>
                      {o.phone}
                    </Typography>
                    <Typography sx={{fontSize:14}}>{o.product}</Typography>
                  </Box>

                  <Box sx={{textAlign:"right"}}>
                    <Typography sx={{fontSize:18}}>
                      ₹{o.amount.toLocaleString("en-IN")}
                    </Typography>
                    <Typography sx={{fontSize:13,color:"#64748B"}}>
                      {o.date}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{my:1.4}}/>

                <Box sx={{display:"flex",gap:1}}>
                  <Button fullWidth variant="outlined"
                    startIcon={<VisibilityOutlinedIcon/>}
                    onClick={()=>setSelected(o)}
                    sx={{height:38,borderRadius:2,textTransform:"none",
                      color:"#0F172A"}}>
                    View
                  </Button>

                  <IconButton onClick={()=>printOrder(o)}
                    sx={{width:44,height:38,border:"1px solid #E0E0E0",
                      borderRadius:2}}>
                    <PrintOutlinedIcon/>
                  </IconButton>
                </Box>

                <Divider sx={{my:1.4}}/>

                <Typography sx={{fontSize:13,mb:.7}}>
                  Update Status:
                </Typography>

                <Select fullWidth value={o.status}
                  onChange={e=>update(o.id,e.target.value)}
                  IconComponent={KeyboardArrowDownIcon}
                  sx={{height:40,bgcolor:"#F4F4F6",borderRadius:2,
                    "& fieldset":{border:"none"}}}>
                  {statuses.map(s=><MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>

    <Dialog open={!!selected} onClose={()=>setSelected(null)}
      fullWidth maxWidth="md">
      {selected && <DialogContent sx={{p:3}}>
        <Box sx={{display:"flex",justifyContent:"space-between",
          alignItems:"center"}}>
          <Typography sx={{fontSize:22}}>
            Order Details - {selected.id}
          </Typography>
          <IconButton onClick={()=>setSelected(null)}>×</IconButton>
        </Box>

        <Box sx={{display:"flex",gap:1,my:4}}>
          <Tag v={selected.status}/><Tag v={selected.payment}/>
        </Box>

        <Typography sx={{fontSize:17,mb:1}}>Customer Details</Typography>
        <Box sx={{bgcolor:"#F8F9FA",borderRadius:3,p:2.5,mb:3}}>
          {[
            ["Name:",selected.customer],
            ["Email:",selected.email],
            ["Phone:",selected.phone],
            ["Address:",selected.address]
          ].map(([a,b])=>(
            <Box key={a} sx={{display:"flex",justifyContent:"space-between",
              gap:2,py:.7}}>
              <span>{a}</span><span>{b}</span>
            </Box>
          ))}
        </Box>

        <Typography sx={{fontSize:17,mb:1}}>Order Items</Typography>
        <Box sx={{bgcolor:"#F8F9FA",borderRadius:3,p:2.5,mb:3}}>
          {selected.product}
        </Box>

        <Typography sx={{fontSize:17,mb:1}}>Order Summary</Typography>
        <Box sx={{bgcolor:"#F8F9FA",borderRadius:3,p:2.5,mb:3}}>
          <Box sx={{display:"flex",justifyContent:"space-between"}}>
            <span>Order Date:</span><span>{selected.date}</span>
          </Box>
          <Divider sx={{my:1}}/>
          <Box sx={{display:"flex",justifyContent:"space-between"}}>
            <span>Total Amount:</span>
            <span>₹{selected.amount.toLocaleString("en-IN")}</span>
          </Box>
        </Box>

        <Box sx={{display:"flex",gap:1.5}}>
          <Button fullWidth variant="outlined"
            startIcon={<PrintOutlinedIcon/>}
            onClick={()=>printOrder(selected)}>
            Print Invoice
          </Button>
          <Button fullWidth variant="contained"
            onClick={()=>setSelected(null)}
            sx={{bgcolor:"#8200B8","&:hover":{bgcolor:"#6F009D"}}}>
            Close
          </Button>
        </Box>
      </DialogContent>}
    </Dialog>
  </>;
};

export default Orders;