import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AllTodo, Todo, AddAll,Delete } from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { getApi } from "./components/features/apiSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApiProvider api={getApi}>
      <Todo />
      <AllTodo />
      <AddAll />
      <Delete/>
    </ApiProvider>
  </React.StrictMode>
);

reportWebVitals();
