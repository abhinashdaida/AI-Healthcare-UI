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
            "@media (max-width: 768px)": {
              width: "min(520px, calc(100% - 32px))",
              height: "auto",
              maxHeight: "calc(100vh - 32px)",
            },
            "@media (max-width: 480px)": {
              width: "calc(100% - 24px)",
              height: "auto",
              maxHeight: "calc(100vh - 24px)",
              margin: "12px",
              borderRadius: "10px",
            },
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
      <DialogContent className=" p-6!  flex flex-col h-full overflow-hidden! max-sm:p-4! ">
        {/* _______________________ CONTENT _______________________ */}
        <Box
          className="
            flex flex-col flex-1
            gap-3 min-h-0
            overflow-y-auto
            [scrollbar-width:none]
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
            max-sm:gap-2
          "
        >
          {/* TITLE */}
          <Typography className="  text-[18px]! leading-[28px]! font-bold!  text-[#0B1117]!  max-sm:text-[16px]!  max-sm:leading-[24px]!  ">
            Help us personalize your healthcare experience
          </Typography>
          {/* OPTIONAL MESSAGE */}
          <Typography
            className=" text-[14px]!  leading-[24px]! font-bold!
              text-[#248B8F]!  max-sm:text-[13px]! max-sm:leading-[20px]! "
          >
            Providing your medical information is completely optional.
          </Typography>
          {/* DESCRIPTION 1 */}
          <Typography
            className=" text-[14px]!  font-normal!  leading-[24px]!
              text-[#374151]!  max-sm:text-[12px]! max-sm:leading-[20px]!  "
          >
            If you know your medical history, allergies, medications, or
            insurance details, adding them now helps doctors provide more
            accurate care and speeds up future appointments.
          </Typography>
          {/* DESCRIPTION 2 */}
          <Typography
            className=" text-[14px]!  font-normal! leading-[24px]!
              text-[#374151]!  max-sm:text-[12px]!
              max-sm:leading-[20px]!  "
          >
            If you're unsure about any information, don't have supporting
            documents, or don't currently have insurance, you can safely skip
            this step and add these details later from your profile.
          </Typography>
          {/* _______________________ INFORMATION BOX  _______________________ */}
          <Box
            className="
              w-full  rounded-[10px]
              bg-[#F5FCFC]
              px-4  py-3
              flex flex-col  gap-2
              max-sm:px-3  max-sm:py-2.5  max-sm:gap-1.5
            "
          >
            {/* ITEM 1 */}
            <Box className="flex items-start gap-3 max-sm:gap-2">
              <Icon
                icon="tabler:clipboard-check"
                width="20"
                height="20"
                className="text-[#248B8F] shrink-0 mt-[2px]"
              />

              <Typography
                className="  text-[12px]!
                  leading-[20px]!  text-[#0B1117]!
                  max-sm:text-[11px]!  max-sm:leading-[18px]!
                "
              >
                Add only information you're confident is accurate.
              </Typography>
            </Box>

            {/* ITEM 2 */}
            <Box className="flex items-start gap-3 max-sm:gap-2">
              <Icon
                icon="tabler:cloud-upload"
                width="20"
                height="20"
                className="text-[#248B8F] shrink-0 mt-[2px]"
              />

              <Typography
                className=" text-[12px]!  leading-[20px]!  text-[#0B1117]!  max-sm:text-[11px]!  max-sm:leading-[18px]!
                "
              >
                Upload documents only if they're current and clearly readable.
              </Typography>
            </Box>

            {/* ITEM 3 */}
            <Box className="flex items-start gap-3 max-sm:gap-2">
              <Icon
                icon="tabler:edit"
                width="20"
                height="20"
                className="text-[#248B8F] shrink-0 mt-[2px]"
              />

              <Typography
                className="
                  text-[12px]!
                  leading-[20px]!  text-[#0B1117]!
                  max-sm:text-[11px]!  max-sm:leading-[18px]!
                "
              >
                You can update or remove this information anytime.
              </Typography>
            </Box>

            {/* ITEM 4 */}
            <Box className="flex items-start gap-3 max-sm:gap-2">
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
                  max-sm:text-[11px]!
                  max-sm:leading-[18px]!
                "
              >
                Your health information is securely encrypted and shared only
                with your permission.
              </Typography>
            </Box>
          </Box>
          {/* _______________________ DON'T SHOW AGAIN  _______________________ */}
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
                "@media (max-width: 480px)": {
                  "& .MuiSvgIcon-root": {
                    fontSize: 18,
                  },
                },
              }}
            />

            <Typography
              className="
                text-[12px]!
                leading-[20px]!
                text-[#0B1117]!
                max-sm:text-[11px]!
                max-sm:leading-[18px]!
              "
            >
              Don't show this message again
            </Typography>
          </Box>
        </Box>

        {/* _______________________ ACTION BUTTONS  _______________________ */}
        <Box
          className="
            flex  items-center  justify-between
            gap-4 mt-3 max-sm:gap-2
            max-sm:mt-3
          "
        >
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
              max-sm:h-[44px]!
              max-sm:min-w-0!
              flex-1
              max-sm:text-[13px]!
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
              max-sm:h-[44px]!
              max-sm:min-w-0!
              flex-1
              max-sm:text-[13px]!
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
