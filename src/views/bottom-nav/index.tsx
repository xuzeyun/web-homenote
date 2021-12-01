import * as React from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";

import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: "20px",
        background: "#fff",
      }}
    >
      <BottomNavigation
        // showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="族谱" icon={<FamilyRestroomIcon />} />
        <BottomNavigationAction label="成员册" icon={<ManageAccountsIcon />} />
        <BottomNavigationAction
          label="账房"
          icon={<AccountBalanceWalletIcon />}
        />
        <BottomNavigationAction label="府事记" icon={<NoteAltIcon />} />
        <BottomNavigationAction
          label="家规家训"
          icon={<AssignmentLateIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
