import React from "react";
import { Container, Typography } from "@mui/material";
import CandidateFinder from "./Components/CandidateFinder";

export default function App() {
  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold" }}
      >
        Candidate Finder
      </Typography>
      <CandidateFinder />
    </Container>
  );
}
