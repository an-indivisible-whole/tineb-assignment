import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

export default function CandidateFilter({
  states,
  constituencies,
  selectedState,
  selectedConstituency,
  onStateChange,
  onConstituencyChange,
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="state-label">Select State</InputLabel>
        <Select
          labelId="state-label"
          value={selectedState}
          label="Select State"
          onChange={(e) => onStateChange(e.target.value)}
        >
          {states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" disabled={!selectedState}>
        <InputLabel id="constituency-label">Select Constituency</InputLabel>
        <Select
          labelId="constituency-label"
          value={selectedConstituency}
          label="Select Constituency"
          onChange={(e) => onConstituencyChange(e.target.value)}
        >
          {constituencies.map((constituency) => (
            <MenuItem key={constituency} value={constituency}>
              {constituency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
