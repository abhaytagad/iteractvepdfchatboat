import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SignupContext from "./context/SignupContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
      <SignupContext>
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
      <ToastContainer/>
    </SignupContext>
  </BrowserRouter> 
);
