import React, { useState, useEffect, useMemo } from "react";
import { CircularProgress, Alert, Box } from "@mui/material";
import CandidateFilter from "./CandidateFilter";
import CandidateCard from "./CandidateCard";

const API_BASE_URL = "http://localhost:5000/api";

export default function CandidateFinder() {
  const [electionData, setElectionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [selectedState, setSelectedState] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");

  // Fetch data from MongoDB via the GET Endpoint
  useEffect(() => {
    fetch(`${API_BASE_URL}/candidates`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to retrieve server profiles.");
        return res.json();
      })
      .then((data) => {
        setElectionData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("API Read Error:", err);
        setErrorMsg("Could not connect to the backend server.");
        setIsLoading(false);
      });
  }, []);

  // Compute unique sorted states
  const states = useMemo(() => {
    const uniqueStates = [...new Set(electionData.map((item) => item.state))];
    return uniqueStates.filter(Boolean).sort();
  }, [electionData]);

  // Compute constituencies matching selected state
  const constituencies = useMemo(() => {
    if (!selectedState) return [];
    return electionData
      .filter((item) => item.state === selectedState)
      .map((item) => item.constituency)
      .sort();
  }, [selectedState, electionData]);

  // Locate selected candidate target profile
  const candidate = useMemo(() => {
    if (!selectedState || !selectedConstituency) return null;
    return electionData.find(
      (item) =>
        item.state === selectedState &&
        item.constituency === selectedConstituency
    );
  }, [selectedState, selectedConstituency, electionData]);

  // Trigger PUT request to update candidate metrics
  const handleUpdateCandidate = async (id, updatedFields) => {
    try {
      const response = await fetch(`${API_BASE_URL}/updateCandidate/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) throw new Error("Failed to persist modifications.");

      const jsonResponse = await response.json();
      const updatedRecord = jsonResponse.data;

      // Optimistically update local application state array
      setElectionData((prevData) =>
        prevData.map((item) => (item._id === id ? updatedRecord : item))
      );
      return true;
    } catch (err) {
      console.error("API Update Error:", err);
      alert("Error updating data to the cloud service database.");
      return false;
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <CandidateFilter
        states={states}
        constituencies={constituencies}
        selectedState={selectedState}
        selectedConstituency={selectedConstituency}
        onStateChange={(state) => {
          setSelectedState(state);
          setSelectedConstituency("");
        }}
        onConstituencyChange={(constituency) =>
          setSelectedConstituency(constituency)
        }
      />

      <CandidateCard
        candidate={candidate}
        onUpdateCandidate={handleUpdateCandidate}
      />
    </>
  );
}
