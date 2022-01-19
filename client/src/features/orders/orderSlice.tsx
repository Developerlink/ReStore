import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Order, ShippingAddress } from "../../app/models/order";
import { RootState } from "../../app/store/configureStore";

interface OrderState {
  ordersLoaded: boolean;
  status: string;
  orders: Order[];
  selectedOrder: Order | null;
}

const ordersAdapter = createEntityAdapter<Order>();

export const fetchOrdersAsync = createAsyncThunk<
  Order[],
  void,
  { state: RootState }
>("orders/fetchOrdersAsync", async (_, thunkAPI) => {
  try {
    return await agent.Orders.list();
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchOrderAsync = createAsyncThunk<Order, number>(
  "orders/fetchOrderAsync",
  async (orderId, thunkAPI) => {
    try {
      return await agent.Orders.fetch(orderId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const createOrderAsync = createAsyncThunk<number,
  { saveAddress: boolean; shippingAddress: ShippingAddress }
>(
  "orders/createOrderAsync",
  async ({ saveAddress, shippingAddress }, thunkAPI) => {
    try {
      const result = await agent.Orders.create({
        saveAddress,
        shippingAddress,
      });
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState: ordersAdapter.getInitialState<OrderState>({
    ordersLoaded: false,
    status: "idle",
    orders: [],
    selectedOrder: null,
  }),
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    removeSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrdersAsync.pending, (state) => {
      state.status = "pendingFetchOrders";
    });
    builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.status = "idle";
      state.ordersLoaded = true;
    });
    builder.addCase(fetchOrdersAsync.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(fetchOrderAsync.pending, (state) => {
      state.status = "pendingFetchOrder";
    });
    builder.addCase(fetchOrderAsync.fulfilled, (state) => {
      state.status = "idle";
    });
    builder.addCase(fetchOrderAsync.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(createOrderAsync.pending, (state) => {
      state.status = "pendingCreateOrder";
    });
    builder.addCase(createOrderAsync.fulfilled, (state, action) => {
      //   state.brands = action.payload.brands;
      //   state.types = action.payload.types;
      //   state.filtersLoaded = true;
      state.status = "idle";
    });
    builder.addCase(createOrderAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const orderSelectors = ordersAdapter.getSelectors(
  (state: RootState) => state.orders
);

export const { setSelectedOrder, removeSelectedOrder } = orderSlice.actions;
