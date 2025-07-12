import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  ArrowLeft, Search, Download, Edit, Plus, X, Save, CheckCircle, 
  XCircle, FileText, Settings, MessagesSquare, Layers, ChevronRight,
  BookOpen, Users, RefreshCw, LogIn, User, Lock, Loader2
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Application, User as AdminUser } from "@shared/schema";

// Type for API response
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export default function Admin() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: ""
  });
  const [isInitializing, setIsInitializing] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState<{username: string, password: string} | null>(null);
  
  // Applications state
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [applicationNotesOpen, setApplicationNotesOpen] = useState(false);
  const [applicationNotes, setApplicationNotes] = useState("");
  const [applicationStatus, setApplicationStatus] = useState<string>("pending");
  
  // Fetch applications
  const { 
    data: applicationsResponse, 
    isLoading: isLoadingApplications, 
    error: applicationsError,
    refetch: refetchApplications
  } = useQuery<ApiResponse<Application[]>>({
    queryKey: ['/api/applications'],
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: true,
    enabled: isAuthenticated, // Only run query when authenticated
    retry: 2,
    retryDelay: 1000
  });
  
  // Update application status mutation
  const updateApplicationMutation = useMutation({
    mutationFn: async ({ id, status, notes }: { id: number, status: string, notes: string }) => {
      const response = await apiRequest("PATCH", `/api/applications/${id}`, { status, notes });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/applications'] });
      toast({
        title: "Application Updated",
        description: "The application has been updated successfully.",
      });
      setApplicationNotesOpen(false);
      setSelectedApplication(null);
    },
    onError: (error: Error) => {
      console.error("Application update error:", error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update application. Please try again.",
        variant: "destructive",
      });
    }
  });

  const applications = applicationsResponse?.data || [];
  
  const filteredApplications = applications.filter((app) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      app.firstName?.toLowerCase().includes(searchTermLower) ||
      app.lastName?.toLowerCase().includes(searchTermLower) ||
      app.email?.toLowerCase().includes(searchTermLower) ||
      app.phone?.includes(searchTerm) ||
      app.mode?.toLowerCase().includes(searchTermLower) ||
      app.status?.toLowerCase().includes(searchTermLower) ||
      app.course?.toLowerCase().includes(searchTermLower) ||
      getCourseLabel(app.course || "")?.toLowerCase().includes(searchTermLower)
    );
  });
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  
  // Function to export data as CSV
  const exportToCSV = () => {
    if (!applications) return;
    
    const headers = ["First Name", "Last Name", "Email", "Phone", "Education", "Course", "Mode", "Experience", "Motivation", "Referral", "Status", "Date", "Notes"];
    const rows = applications.map((app) => [
      app.firstName,
      app.lastName,
      app.email,
      app.phone,
      app.education,
      getCourseLabel(app.course || "ai-genai"),
      app.mode,
      app.experience,
      app.motivation,
      app.referral || "",
      app.status || "pending",
      formatDate(app.createdAt),
      app.notes || ""
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `applications_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Helper function to get education level label
  const getEducationLabel = (value: string) => {
    const educationMap: {[key: string]: string} = {
      "high-school": "High School",
      "diploma": "Diploma",
      "bachelors": "Bachelor's Degree",
      "masters": "Master's Degree",
      "phd": "PhD",
      "other": "Other"
    };
    return educationMap[value] || value;
  };
  
  // Helper function to get experience level label
  const getExperienceLabel = (value: string) => {
    const experienceMap: {[key: string]: string} = {
      "none": "No Experience",
      "beginner": "Beginner",
      "intermediate": "Intermediate",
      "advanced": "Advanced"
    };
    return experienceMap[value] || value;
  };
  
  // Helper function to get course label
  const getCourseLabel = (value: string) => {
    const courseMap: {[key: string]: string} = {
      "ai-genai": "AI & GenAI",
      "python": "Python Programming",
      "sql": "SQL Database",
      "web-dev": "Web Development",
      "data-science": "Data Science"
    };
    return courseMap[value] || value;
  };
  
  // Helper function to get status color
  const getStatusColor = (status: string) => {
    const statusColors: {[key: string]: string} = {
      "pending": "bg-yellow-100 text-yellow-800",
      "approved": "bg-green-100 text-green-800",
      "rejected": "bg-red-100 text-red-800",
      "contacted": "bg-blue-100 text-blue-800",
      "enrolled": "bg-purple-100 text-purple-800"
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };
  
  const openApplicationNotes = (application: Application) => {
    setSelectedApplication(application);
    setApplicationNotes(application.notes || "");
    setApplicationStatus(application.status || "pending");
    setApplicationNotesOpen(true);
  };
  
  const saveApplicationNotes = () => {
    if (!selectedApplication) return;
    
    updateApplicationMutation.mutate({
      id: selectedApplication.id,
      status: applicationStatus,
      notes: applicationNotes
    });
  };

  // Authentication check on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/user');
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    apiRequest("POST", "/api/login", loginCredentials)
      .then(async (response) => {
        if (response.ok) {
          setIsAuthenticated(true);
          toast({
            title: "Login Successful",
            description: "Welcome to the admin panel!",
          });
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast({
          title: "Login Failed",
          description: error.message || "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoggingIn(false);
      });
  };

  const handleInitAdmin = () => {
    if (!adminCredentials?.username || !adminCredentials?.password) {
      toast({
        title: "Missing Credentials",
        description: "Please enter both username and password.",
        variant: "destructive",
      });
      return;
    }

    setIsInitializing(true);
    
    apiRequest("POST", "/api/init-admin", adminCredentials)
      .then(async (response) => {
        if (response.ok) {
          toast({
            title: "Admin Created",
            description: "Admin account has been created successfully. You can now login.",
          });
          setAdminCredentials(null);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create admin");
        }
      })
      .catch((error) => {
        console.error("Init admin error:", error);
        toast({
          title: "Creation Failed",
          description: error.message || "Failed to create admin account. Please try again.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsInitializing(false);
      });
  };

  const handleLogout = () => {
    apiRequest("POST", "/api/logout", {})
      .then(() => {
        setIsAuthenticated(false);
        queryClient.invalidateQueries({ queryKey: ['/api/applications'] });
        toast({
          title: "Logged Out",
          description: "You have been logged out successfully.",
        });
      })
      .catch((error) => {
        console.error("Logout error:", error);
        // Still set as logged out even if logout request fails
        setIsAuthenticated(false);
      });
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
              <CardDescription>
                Enter your credentials to access the admin panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    value={loginCredentials.username}
                    onChange={(e) => setLoginCredentials(prev => ({ ...prev, username: e.target.value }))}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={loginCredentials.password}
                    onChange={(e) => setLoginCredentials(prev => ({ ...prev, password: e.target.value }))}
                    required
                    className="w-full"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </>
                  )}
                </Button>
              </form>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setAdminCredentials({ username: "", password: "" })}
                >
                  <User className="w-4 h-4 mr-2" />
                  Create Admin Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Admin Creation Dialog */}
          {adminCredentials && (
            <Dialog open={!!adminCredentials} onOpenChange={() => setAdminCredentials(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Admin Account</DialogTitle>
                  <DialogDescription>
                    Create the first admin account for the system.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="admin-username" className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <Input
                      id="admin-username"
                      type="text"
                      value={adminCredentials.username}
                      onChange={(e) => setAdminCredentials(prev => prev ? { ...prev, username: e.target.value } : null)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={adminCredentials.password}
                      onChange={(e) => setAdminCredentials(prev => prev ? { ...prev, password: e.target.value } : null)}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setAdminCredentials(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleInitAdmin}
                    disabled={isInitializing}
                  >
                    {isInitializing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Admin"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Site
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Manage course applications</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchApplications()}
                disabled={isLoadingApplications}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingApplications ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportToCSV}
                disabled={applications.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <FileText className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {applications.filter(app => app.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {applications.filter(app => app.status === 'approved').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {applications.filter(app => app.status === 'rejected').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search applications by name, email, phone, course, or status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Course Applications</CardTitle>
            <CardDescription>
              Manage and review course applications from potential students
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingApplications ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-500">Loading applications...</span>
              </div>
            ) : applicationsError ? (
              <div className="text-center py-12">
                <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-red-600">Failed to load applications. Please try again.</p>
                <Button
                  variant="outline"
                  onClick={() => refetchApplications()}
                  className="mt-4"
                >
                  Retry
                </Button>
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchTerm ? "No applications match your search criteria." : "No applications found."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Course</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Mode</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((application) => (
                      <tr key={application.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {application.firstName} {application.lastName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {getEducationLabel(application.education)} • {getExperienceLabel(application.experience)}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-sm text-gray-900">{application.email}</p>
                            <p className="text-sm text-gray-500">{application.phone}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {getCourseLabel(application.course || "ai-genai")}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-900 capitalize">{application.mode}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status || "pending")}`}>
                            {application.status || "pending"}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-500">
                            {formatDate(application.createdAt)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openApplicationNotes(application)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Manage
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Application Notes Dialog */}
      <Dialog open={applicationNotesOpen} onOpenChange={setApplicationNotesOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Application</DialogTitle>
            <DialogDescription>
              Update the status and add notes for this application.
            </DialogDescription>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="space-y-6">
              {/* Application Details */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Name</p>
                  <p className="text-sm text-gray-900">
                    {selectedApplication.firstName} {selectedApplication.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-sm text-gray-900">{selectedApplication.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Phone</p>
                  <p className="text-sm text-gray-900">{selectedApplication.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Course</p>
                  <p className="text-sm text-gray-900">
                    {getCourseLabel(selectedApplication.course || "ai-genai")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Mode</p>
                  <p className="text-sm text-gray-900 capitalize">{selectedApplication.mode}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Education</p>
                  <p className="text-sm text-gray-900">
                    {getEducationLabel(selectedApplication.education)}
                  </p>
                </div>
              </div>

              {/* Motivation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motivation
                </label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded border">
                  {selectedApplication.motivation}
                </p>
              </div>

              {/* Status Update */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <Select value={applicationStatus} onValueChange={setApplicationStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="enrolled">Enrolled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <Textarea
                  id="notes"
                  value={applicationNotes}
                  onChange={(e) => setApplicationNotes(e.target.value)}
                  placeholder="Add notes about this application..."
                  rows={4}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setApplicationNotesOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={saveApplicationNotes}
              disabled={updateApplicationMutation.isPending}
            >
              {updateApplicationMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}