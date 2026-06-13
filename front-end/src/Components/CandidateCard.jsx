import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Stack,
} from "@mui/material";

export default function CandidateCard({ candidate, onUpdateCandidate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Reset form values whenever the selected candidate changes
  useEffect(() => {
    if (candidate) {
      setFormData({
        candidateName: candidate.candidateName || "",
        party: candidate.party || "",
        email: candidate.email || "",
        phone: candidate.phone || "",
      });
      setIsEditing(false);
    }
  }, [candidate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Send updated metrics to App.jsx to fire the API call
    const success = await onUpdateCandidate(candidate._id, formData);
    if (success) {
      setIsEditing(false);
    }
  };

  if (!candidate) return null;

  return (
    <Card variant="elevation" elevation={3}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom variant="overline">
          Candidate Profile ({candidate.state} - {candidate.constituency})
        </Typography>

        {isEditing ? (
          /* EDIT MODE PROFILE */
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            <TextField
              label="Candidate Name"
              name="candidateName"
              value={formData.candidateName}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Party"
              name="party"
              value={formData.party}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                size="small"
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsEditing(false)}
                size="small"
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        ) : (
          /* VIEW MODE PROFILE */
          <Box sx={{ mt: 1 }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {candidate.candidateName}
            </Typography>
            <Typography sx={{ mt: 1.5 }} color="text.primary">
              <strong>Party:</strong> {candidate.party}
            </Typography>
            <Typography sx={{ mt: 0.5 }} color="text.secondary">
              <strong>Email:</strong> {candidate.email || "N/A"}
            </Typography>
            <Typography sx={{ mt: 0.5 }} color="text.secondary">
              <strong>Phone:</strong> {candidate.phone || "N/A"}
            </Typography>

            <Button
              variant="contained"
              color="inherit"
              sx={{ mt: 3 }}
              onClick={() => setIsEditing(true)}
              size="small"
            >
              Edit Details
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
