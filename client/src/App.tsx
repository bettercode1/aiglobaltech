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
import { LocationProvider } from "@/hooks/use-location";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/courses" component={Courses} />
      <Route path="/courses/python" component={PythonCourse} />
      <Route path="/courses/sql" component={SqlCourse} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <Router />
        <Toaster />
      </LocationProvider>
    </QueryClientProvider>
  );
}

export default App;
