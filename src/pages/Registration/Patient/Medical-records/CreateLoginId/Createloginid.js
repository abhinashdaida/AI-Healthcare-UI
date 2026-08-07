import React, { useState } from "react";
import PasswordDialog from "../../../../../shared/components/Registration/PopUp/password";
import { Button } from "@mui/material";
import SuccessModal from "@/shared/components/Registration/layout/SuccessModal";


export default function CreateLoginid() {
  const [open, setOpen] = useState(false);
  const [successOpen,setSuccessOpen]=useState(false);


  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Set Password
      </Button>

      <PasswordDialog
        open={open}
        handleClose={() => setOpen(false)}
        onSuccess={()=>{setOpen(false);
          setSuccessOpen(true);
        }}
      />
      <SuccessModal
  open={successOpen}
  handleClose={() => setSuccessOpen(false)}
/>
    </>
  );
}