import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  message?: string;
}

export default function LoadingComponent({ message = "Loading..." }: Props) {
  return (
    // Backdrop prevents the user clicking on something
    // while loading to affect something.
    <Backdrop open={true} invisible={true}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={100} color="primary" />
        <Typography
          variant="h4"
          sx={{ justifyContent: "center", position: "fixed", top: "60%" }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}
