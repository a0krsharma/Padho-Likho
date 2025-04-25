import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        // Try backend API first
        const response = await axios.get('/api/users');
        setUsers(response.data.users || []);
      } catch (err) {
        setError('Failed to fetch users from backend. Make sure you are logged in as an admin.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Admin Dashboard
        </Typography>
        <Typography variant="h6" gutterBottom>
          Total Registered Users: {loading ? <CircularProgress size={20} /> : users.length}
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {!loading && users.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Registered At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, idx) => (
                  <TableRow key={user._id || idx}>
                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {!loading && users.length === 0 && !error && (
          <Typography sx={{ mt: 3 }} color="text.secondary">No users found.</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
