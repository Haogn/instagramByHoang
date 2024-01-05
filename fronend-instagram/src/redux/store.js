import { configureStore } from "@reduxjs/toolkit";
import sileActiveSidebar from "./sileActiveSidebar";

const store = configureStore({
  reducer: {
    active: sileActiveSidebar,
  },
});

export default store;
