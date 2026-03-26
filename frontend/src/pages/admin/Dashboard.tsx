import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { Container, StatCard, ActionBox } from "./styles/dashboard-styles";
import { getAdminStats } from "../../api/admin-api";
import type { IAdminStats } from "../../types/admin-stats";

const Dashboard = () => {
  const [stats, setStats] = useState<IAdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getAdminStats();
        console.log("data", data);
        setStats(data);
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!stats) {
    return (
      <Container>
        <Typography>No stats available</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <StatCard>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{stats.totalUsers}</Typography>
          </StatCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <StatCard>
            <Typography variant="h6">Total Products</Typography>
            <Typography variant="h4">{stats.totalProducts}</Typography>
          </StatCard>
        </Grid>
      </Grid>

      <ActionBox>
        <Button variant="contained" component={RouterLink} to="/admin/products">
          Manage Products
        </Button>
      </ActionBox>
    </Container>
  );
};

export default Dashboard;
