import { Button, Grid, Typography } from "@mui/material";
import BasketSummary from "./BasketSummary";
import { useNavigate } from "react-router-dom";
import { useAppSelecter } from "../../app/store/configureStore";
import BasketTable from "./BasketTable";

export default function BasketPage() {
  const { basket } = useAppSelecter((state) => state.basket);
  const navigate = useNavigate();

  if (!basket) {
    return <Typography variant="h3">Your basket is empty</Typography>;
  }

  return (
    <>
      <BasketTable items={basket.items} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button onClick={() => navigate("/checkout")} variant="contained" size="large" fullWidth>
              Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
