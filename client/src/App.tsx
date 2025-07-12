import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import PythonCourse from "@/pages/PythonCourse";
import SqlCourse from "@/pages/SqlCourse";
import Courses from "@/pages/Courses";
import FaqPage from "@/pages/Faq";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Refund from "@/pages/Refund";
import { LocationProvider } from "@/hooks/use-location";
import LocationSwitcher from "@/components/sections/LocationSwitcher";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/courses" component={Courses} />
      <Route path="/courses/python" component={PythonCourse} />
      <Route path="/courses/sql" component={SqlCourse} />
      <Route path="/faq" component={FaqPage} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/refund" component={Refund} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <Router />
        {/* <LocationSwitcher /> */}
        <Toaster />
      </LocationProvider>
    </QueryClientProvider>
  );
}

export default App;
