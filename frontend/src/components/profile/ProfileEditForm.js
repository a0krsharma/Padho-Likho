import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Chip,
  MenuItem,
  InputLabel,
  Select,
  FormControl
} from '@mui/material';

/**
 * ProfileEditForm component
 * Allows editing of user profile details
 */
const roleOptions = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'parent', label: 'Parent' }
];

const ProfileEditForm = ({ user, onSave, onCancel, loading }) => {
  const [form, setForm] = useState({ ...user });
  const [subjectInput, setSubjectInput] = useState('');

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle subjects (for student/teacher)
  const handleAddSubject = () => {
    if (subjectInput && !form.subjects?.includes(subjectInput)) {
      setForm((prev) => ({ ...prev, subjects: [...(prev.subjects || []), subjectInput] }));
      setSubjectInput('');
    }
  };
  const handleRemoveSubject = (subject) => {
    setForm((prev) => ({ ...prev, subjects: prev.subjects.filter((s) => s !== subject) }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure top-level fields for student/teacher
    let fixedForm = { ...form };
    if (form.role === 'student') {
      fixedForm.class = form.class || (form.studentDetails && form.studentDetails.class) || '';
      fixedForm.subjects = Array.isArray(form.subjects) ? form.subjects : (form.studentDetails && form.studentDetails.subjects) || [];
    }
    if (form.role === 'teacher') {
      fixedForm.qualifications = form.qualifications || (form.teacherDetails && form.teacherDetails.qualifications) || '';
      fixedForm.experience = form.experience || (form.teacherDetails && form.teacherDetails.experience) || '';
      fixedForm.subjects = Array.isArray(form.subjects) ? form.subjects : (form.teacherDetails && form.teacherDetails.subjects) || [];
    }
    onSave(fixedForm);
  };


  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Edit Profile</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            name="firstName"
            label="First Name"
            value={form.firstName || ''}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="lastName"
            label="Last Name"
            value={form.lastName || ''}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="email"
            label="Email"
            value={form.email || ''}
            onChange={handleChange}
            fullWidth
            required
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="phone"
            label="Phone"
            value={form.phone || ''}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="address"
            label="Address"
            value={form.address || ''}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="city"
            label="City"
            value={form.city || ''}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="state"
            label="State"
            value={form.state || ''}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="zipCode"
            label="Zip Code"
            value={form.zipCode || ''}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="country"
            label="Country"
            value={form.country || ''}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        {/* Role-specific fields */}
        {form.role === 'student' && (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                name="class"
                label="Class"
                value={form.class || ''}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  label="Add Subject"
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  size="small"
                />
                <Button onClick={handleAddSubject} variant="outlined" size="small">Add</Button>
              </Box>
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {(form.subjects || []).map((subject, idx) => (
                  <Chip key={idx} label={subject} onDelete={() => handleRemoveSubject(subject)} />
                ))}
              </Box>
            </Grid>
          </>
        )}
        {form.role === 'teacher' && (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                name="qualifications"
                label="Qualifications"
                value={form.qualifications || ''}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="experience"
                label="Experience (years)"
                type="number"
                value={form.experience || ''}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  label="Add Subject"
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  size="small"
                />
                <Button onClick={handleAddSubject} variant="outlined" size="small">Add</Button>
              </Box>
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {(form.subjects || []).map((subject, idx) => (
                  <Chip key={idx} label={subject} onDelete={() => handleRemoveSubject(subject)} />
                ))}
              </Box>
            </Grid>
          </>
        )}
        {/* No extra fields for parent for now */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileEditForm;
