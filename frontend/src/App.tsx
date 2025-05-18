import { RouterProvider } from "react-router"
import { router } from "./routes/App.routes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
