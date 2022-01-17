import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { BasketItem } from "../../app/models/basket";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";
import {
  fetchOrdersAsync,
  removeSelectedOrder,
  setSelectedOrder,
} from "./orderSlice";

export default function OrdersPage() {
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const { orders, ordersLoaded, selectedOrder } = useAppSelecter(
    (state) => state.orders
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      dispatch(fetchOrdersAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  if (!ordersLoaded) return <LoadingComponent message="Loading orders..." />;

  if (isViewingDetails) {
    return (
      <>
        <Box display="flex" justifyContent="space-between">
          <Typography sx={{ p:2 }} gutterBottom variant="h5">Order # {selectedOrder!.id}</Typography>
          <Button
            onClick={() => {
              dispatch(removeSelectedOrder());
              setIsViewingDetails(false);
            }}
            sx={{ m: 2 }}
            variant="contained"
            size="large"
          >
            Back to orders
          </Button>
        </Box>

        <BasketTable
          items={selectedOrder!.orderItems as BasketItem[]}
          isBasket={false}
        />
        <Grid container>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <BasketSummary subtotal={selectedOrder!.subtotal} />
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <TableContainer component={Paper} style={{ maxHeight: "90%" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Order State</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <TableRow
              key={order.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="right">{currencyFormat(order.total)}</TableCell>
              <TableCell align="right">
                {order.orderDate.split("T")[0]}
              </TableCell>
              <TableCell align="right">{order.orderStatus}</TableCell>
              <TableCell align="right">
                <Button
                  onClick={() => {
                    dispatch(setSelectedOrder(order));
                    setIsViewingDetails(true);
                  }}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
