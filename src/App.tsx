import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Layout from "./components/layout";
import Validation from "@/pages/validation";
import Confirmation from "@/pages/confirmation";
import Success from "@/pages/success";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Direct root to validation page */}
      <Route path="/" component={Validation} />
      <Route path="/validation" component={Validation} />
      <Route path="/confirmation" component={Confirmation} />
      <Route path="/success" component={Success} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
