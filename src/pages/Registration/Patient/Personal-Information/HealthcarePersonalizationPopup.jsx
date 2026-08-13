import React from "react";
import {
  Dialog,
  DialogContent,
  Checkbox,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";

const HealthcarePersonalizationPopup = ({
  open,
  onClose,
  onContinue,
  onSkip,
  dontShowAgain,
  setDontShowAgain,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth={false}
      slotProps={{
        paper: {
          sx: {
            width: "464px",
            height: "536px",
            maxWidth: "calc(100% - 32px)",
            maxHeight: "calc(100vh - 32px)",
            margin: "16px",
            borderRadius: "8px",
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
          },
        },

        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        },
      }}
    >
      <DialogContent className=" p-6! flex  flex-col  h-full overflow-hidden!">
        <Box className="flex flex-col flex-1 gap-3">
          {/* TITLE */}
          <Typography
            className="
              text-[18px]!
              leading-[28px]!
              font-bold!
              text-[#0B1117]!
            "
          >
            Help us personalize your healthcare experience
          </Typography>

          {/* OPTIONAL MESSAGE */}
          <Typography
            className="
              text-[14px]!
              leading-[24px]!
              font-bold!
              text-[#248B8F]!
            "
          >
            Providing your medical information is completely optional.
          </Typography>

          {/* DESCRIPTION 1 */}
          <Typography
            className="
              text-[14px]!
              font-normal!
             leading-[24px]!
              text-[#374151]!
            "
          >
            If you know your medical history, allergies, medications, or
            insurance details, adding them now helps doctors provide more
            accurate care and speeds up future appointments.
          </Typography>

          {/* DESCRIPTION 2 */}
          <Typography
            className="
              text-[14px]!
              font-normal!
             leading-[24px]!
              text-[#374151]!
            "
          >
            If you're unsure about any information, don't have supporting
            documents, or don't currently have insurance, you can safely skip
            this step and add these details later from your profile.
          </Typography>

          {/* =====================================================
              INFORMATION BOX
          ===================================================== */}

          <Box
            className=" w-full
              rounded-[10px]  bg-[#F5FCFC]
              px-4  py-3
              flex  flex-col gap-2
            "
          >
            {/* ITEM 1 */}
            <Box className="flex items-start gap-3">
              <Icon
                icon="tabler:clipboard-check"
                width="20"
                height="20"
                className="text-[#248B8F] shrink-0 mt-[2px]"
              />

              <Typography
                className="
                  text-[12px]!
                  leading-[20px]!
                  text-[#0B1117]!
                "
              >
                Add only information you're confident is accurate.
              </Typography>
            </Box>

            {/* ITEM 2 */}
            <Box className="flex items-start gap-3">
              <Icon
                icon="tabler:cloud-upload"
                width="20"
                height="20"
                className="text-[#248B8F] shrink-0 mt-[2px]"
              />

              <Typography
                className="
                  text-[12px]!
                  leading-[20px]!
                  text-[#0B1117]!
                "
              >
                Upload documents only if they're current and clearly readable.
              </Typography>
            </Box>

            {/* ITEM 3 */}
            <Box className="flex items-start gap-3">
              <Icon
                icon="tabler:edit"
                width="20"
                height="20"
                className="text-[#248B8F] shrink-0 mt-[2px]"
              />

              <Typography
                className="
                  text-[12px]!
                  leading-[20px]!
                  text-[#0B1117]!
                "
              >
                You can update or remove this information anytime.
              </Typography>
            </Box>

            {/* ITEM 4 */}
            <Box className="flex items-start gap-3">
              <Icon
                icon="tabler:shield-check"
                width="20"
                height="20"
                className="text-[#248B8F] shrink-0 mt-[2px]"
              />

              <Typography
                className="
                  text-[12px]!
                  leading-[20px]!
                  text-[#0B1117]!
                "
              >
                Your health information is securely encrypted and shared only
                with your permission.
              </Typography>
            </Box>
          </Box>

          {/* =====================================================
              DON'T SHOW AGAIN
          ===================================================== */}

          <Box className="flex items-center gap-2 mt-1">
            <Checkbox
              checked={dontShowAgain}
              onChange={(event) => setDontShowAgain(event.target.checked)}
              sx={{
                padding: 0,
                color: "#6B7280",

                "&.Mui-checked": {
                  color: "#229497",
                },

                "& .MuiSvgIcon-root": {
                  fontSize: 20,
                },
              }}
            />

            <Typography
              className="
                text-[12px]!
                leading-[20px]!
                text-[#0B1117]!
              "
            >
              Don't show this message again
            </Typography>
          </Box>
        </Box>

        {/* =====================================================
            ACTION BUTTONS
        ===================================================== */}

        <Box className=" flex  items-center  justify-between  gap-4  mt-3">
          {/* SKIP */}
          <Button
            variant="outlined"
            onClick={onSkip}
            className="
              h-[48px]!
              min-w-[128px]!
              rounded-[8px]!
              border-[#248B8F]!
              text-[#248B8F]!
              text-[14px]!
              font-normal!
              normal-case!
              hover:bg-[#F1FAFA]!
            "
          >
            Skip for now
          </Button>

          {/* CONTINUE */}
          <Button
            variant="contained"
            onClick={onContinue}
            className="
              h-[48px]!
              min-w-[128px]!
              rounded-[8px]!
              bg-[#248B8F]!
              text-white!
              text-[14px]!
              font-medium!
              normal-case!
              shadow-[0_4px_8px_rgba(34,148,151,0.25)]
              hover:bg-[#1B8184]!
            "
          >
            Continue
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default HealthcarePersonalizationPopup;
