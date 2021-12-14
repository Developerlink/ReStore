import { Button, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography gutterBottom align="center" variant="h4">
        Oops - we could not find what you are looking for
      </Typography>
      <Button fullWidth>
        <Link style={{ color: "inherit" }} to="/catalog">
          Go back to shop
        </Link>
      </Button>
    </Container>
  );
}
