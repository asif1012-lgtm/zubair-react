import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import Layout from "./components/layout";
import Home from "./pages/home";
import Validation from "./pages/validation";
import Success from "./pages/success";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/validation" component={Validation} />
          <Route path="/success" component={Success} />
          <Route path="/:rest*" component={NotFound} />
        </Switch>
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}