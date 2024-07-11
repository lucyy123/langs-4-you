import { Box, CircularProgress, Container } from "@mui/material";

const Loader = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <CircularProgress size={"7rem"} variant="indeterminate" />
      </Box>
    </Container>
  );
};

export default Loader;
