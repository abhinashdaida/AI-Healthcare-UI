import {
  Card,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import React from "react";
import { Icon } from "@iconify/react";

const DocumentCard = ({
  files,
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
        }}
      >
        <Icon icon="tabler:file-text" width={24} height={24} />
        <Typography fontWeight={500}>
          Uploaded Documents
        </Typography>

        <Button
          size="small"
          sx={{
            color: "#16B3AC",
            textTransform: "none",
          }}
        >
          Upload
        </Button>
      </Box>

      <Divider />

      <Box className="p-6">
        <div className="grid grid-cols-2 gap-8">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex gap-2"
            >
              <DescriptionOutlinedIcon
                sx={{
                  color: "#16B3AC",
                  fontSize: 18,
                }}
              />

              <div>
                <Typography
                  sx={{
                    fontSize: "13px",
                  }}
                >
                  {file.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "#98A2B3",
                  }}
                >
                  PDF · 125 KB
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Card>
  );
};

export default DocumentCard;