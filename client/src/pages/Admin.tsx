import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import {
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser 
} from "firebase/auth";
import {
  collection, 
  query, 
  orderBy, 
  getDocs, 
  doc, 
  updateDoc,
  where,
  Timestamp 
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search, Eye, Edit, LogOut, LogIn, Shield } from "lucide-react";

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  education: string;
  course: string;
  mode: string;
  experience: string;
  country: string;
  state?: string;
  city?: string;
  referral?: string;
  createdAt: Timestamp;
  status: string;
  notes?: string;
}

export default function Admin() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: ""
  });
  
  // Applications state
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [applicationNotesOpen, setApplicationNotesOpen] = useState(false);
  const [applicationNotes, setApplicationNotes] = useState("");
  const [applicationStatus, setApplicationStatus] = useState<string>("pending");
  const [isUpdating, setIsUpdating] = useState(false);

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthenticated(!!user);
      if (user) {
        fetchApplications();
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchApplications = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const applicationsRef = collection(db, "receivedApplications");
      const q = query(applicationsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const apps: Application[] = [];
      querySnapshot.forEach((doc) => {
        apps.push({ id: doc.id, ...doc.data() } as Application);
      });
      
      setApplications(apps);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast({
        title: "Error",
        description: "Failed to fetch applications",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!loginCredentials.email || !loginCredentials.password) {
      toast({
        title: "Missing Credentials",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, loginCredentials.email, loginCredentials.password);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });
      setLoginCredentials({ email: "", password: "" });
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setApplications([]);
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateApplication = async () => {
    if (!selectedApplication) return;

    setIsUpdating(true);
    try {
      const applicationRef = doc(db, "receivedApplications", selectedApplication.id);
      await updateDoc(applicationRef, {
        status: applicationStatus,
        notes: applicationNotes,
        updatedAt: Timestamp.now()
      });

      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === selectedApplication.id 
          ? { ...app, status: applicationStatus, notes: applicationNotes }
          : app
      ));

      toast({
        title: "Application Updated",
        description: "The application has been updated successfully.",
      });
      setApplicationNotesOpen(false);
      setSelectedApplication(null);
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const openApplicationNotes = (application: Application) => {
    setSelectedApplication(application);
    setApplicationNotes(application.notes || "");
    setApplicationStatus(application.status);
    setApplicationNotesOpen(true);
  };
  
  const filteredApplications = applications.filter((app) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      app.firstName?.toLowerCase().includes(searchTermLower) ||
      app.lastName?.toLowerCase().includes(searchTermLower) ||
      app.email?.toLowerCase().includes(searchTermLower) ||
      app.phone?.includes(searchTerm) ||
      app.mode?.toLowerCase().includes(searchTermLower) ||
      app.status?.toLowerCase().includes(searchTermLower) ||
      app.course?.toLowerCase().includes(searchTermLower)
    );
  });
  
  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "contacted": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <Shield className="h-6 w-6 text-purple-600" />
              </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <p className="text-gray-600">Enter your credentials to access the admin panel</p>
            </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
                  <Input
                type="email"
                placeholder="admin@example.com"
                value={loginCredentials.email}
                onChange={(e) => setLoginCredentials(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
                  <Input
                    type="password"
                placeholder="Enter your password"
                    value={loginCredentials.password}
                    onChange={(e) => setLoginCredentials(prev => ({ ...prev, password: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
                <Button 
              onClick={handleLogin} 
              disabled={isLoggingIn}
                  className="w-full" 
                >
                  {isLoggingIn ? (
                    <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                  <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </>
                  )}
                </Button>
            </CardContent>
          </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
      {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
              <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage course applications</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.email}
              </span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
          </div>
        </div>
      </div>

        {/* Search and Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
                </div>
            <div className="flex gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{applications.length}</div>
                <div className="text-gray-600">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                    {applications.filter(app => app.status === 'pending').length}
                </div>
                <div className="text-gray-600">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                    {applications.filter(app => app.status === 'approved').length}
                </div>
                <div className="text-gray-600">Approved</div>
              </div>
                </div>
              </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Applications</h2>
                </div>
          
          {isLoading ? (
            <div className="p-8 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400" />
              <p className="mt-2 text-gray-600">Loading applications...</p>
              </div>
            ) : filteredApplications.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">No applications found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mode
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                    </tr>
                  </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                          <div className="text-sm font-medium text-gray-900">
                              {application.firstName} {application.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{application.email}</div>
                          <div className="text-sm text-gray-500">{application.phone}</div>
                          </div>
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.course}</div>
                        <div className="text-sm text-gray-500">{application.education}</div>
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline" className="capitalize">
                          {application.mode}
                        </Badge>
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(application.createdAt)}
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button
                          onClick={() => openApplicationNotes(application)}
                            variant="outline"
                            size="sm"
                          >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </div>

      {/* Application Notes Dialog */}
      <Dialog open={applicationNotesOpen} onOpenChange={setApplicationNotesOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Update Application</DialogTitle>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Applicant</label>
                  <p className="text-sm text-gray-600">
                    {selectedApplication.firstName} {selectedApplication.lastName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Course</label>
                  <p className="text-sm text-gray-600">{selectedApplication.course}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-gray-600">{selectedApplication.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p className="text-sm text-gray-600">{selectedApplication.phone}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={applicationStatus} onValueChange={setApplicationStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  value={applicationNotes}
                  onChange={(e) => setApplicationNotes(e.target.value)}
                  placeholder="Add notes about this application..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setApplicationNotesOpen(false)}
            >
              Cancel
            </Button>
            <Button
                  onClick={handleUpdateApplication}
                  disabled={isUpdating}
            >
                  {isUpdating ? (
                <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                </>
              ) : (
                    'Update Application'
              )}
            </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}