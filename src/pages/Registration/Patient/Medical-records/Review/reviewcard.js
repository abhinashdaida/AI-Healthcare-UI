import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react";
const ReviewCard = ({
  title,
  data,
  actionText = "Edit",
  titleIcon,
  actionIcon,
}) => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        boxShadow: "none",
        height: "205px",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {titleIcon && (
            <Icon
              icon={titleIcon}
              width={20}
              height={20}
            />
          )}

        <Typography fontWeight={500}>
          {title}
        </Typography>
        </Box>
        <Button
          size="small"
          startIcon={
            actionIcon ? (
              <Icon icon={actionIcon} />
            ) : null
          }
          sx={{
            color: "#16B3AC",
            textTransform: "none",
          }}
        >
          {actionText}
        </Button>
      </Box>

      <Divider />

      <CardContent>
        <div className="grid grid-cols-2 gap-y-8 gap-x-10">
          {data.map((item) => (
            <div key={item.label}>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#98A2B3",
                }}
              >
                {item.label}
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {item.value}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;