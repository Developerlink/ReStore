import { Box, Button, Grid, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link, useNavigate } from "react-router-dom";
import styles from "./BasketPage.module.css";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export default function BasketPage() {
  const { basket, status } = useAppSelecter((state) => state.basket);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!basket) {
    return <Typography variant="h3">Your basket is empty</Typography>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link
                    className={styles.link}
                    to={`/catalog/${item.productId}`}
                  >
                    <Box display="flex" alignItems="center">
                      <img
                        src={item.pictureUrl}
                        alt={item.name}
                        style={{ height: 50, marginRight: 20 }}
                      />
                      <span>{item.name}</span>
                    </Box>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  $ {(item.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={status === "pendingRemoveItem" + item.productId + 'rem'}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({ productId: item.productId, quantity: 1, name: 'rem' })
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={status === "pendingAddItem" + item.productId}
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({
                          productId: item.productId,
                        })
                      )
                    }
                    color="secondary"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  $ {((item.price * item.quantity) / 100).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={status === "pendingRemoveItem" + item.productId + 'del'}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: 'del'
                        })
                      )
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
