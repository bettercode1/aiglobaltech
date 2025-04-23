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
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Application, Content, User as AdminUser } from "@shared/schema";

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
  const [activeTab, setActiveTab] = useState("applications");
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
  
  // Content management state
  const [contentDialogOpen, setContentDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [contentFormData, setContentFormData] = useState({
    section: "",
    title: "",
    subtitle: "",
    description: "",
    content: "{}"
  });
  
  // Fetch applications
  const { 
    data: applicationsResponse, 
    isLoading: isLoadingApplications, 
    error: applicationsError 
  } = useQuery<ApiResponse<Application[]>>({
    queryKey: ['/api/applications'],
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: true
  });
  
  // Fetch content
  const {
    data: contentResponse,
    isLoading: isLoadingContent,
    error: contentError
  } = useQuery<ApiResponse<Content[]>>({
    queryKey: ['/api/content'],
    staleTime: 30000,
    refetchOnWindowFocus: true
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
  
  // Create content mutation
  const createContentMutation = useMutation({
    mutationFn: async (contentData: typeof contentFormData) => {
      const response = await apiRequest("POST", "/api/content", {
        ...contentData,
        content: typeof contentData.content === 'string' ? JSON.parse(contentData.content) : contentData.content
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      toast({
        title: "Content Created",
        description: "The content section has been created successfully.",
      });
      setContentDialogOpen(false);
      resetContentForm();
    },
    onError: (error: Error) => {
      console.error("Create content error:", error);
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create content. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Update content mutation
  const updateContentMutation = useMutation({
    mutationFn: async ({ section, data }: { section: string, data: typeof contentFormData }) => {
      const response = await apiRequest("PUT", `/api/content/${section}`, {
        ...data,
        content: typeof data.content === 'string' ? JSON.parse(data.content) : data.content
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      toast({
        title: "Content Updated",
        description: "The content section has been updated successfully.",
      });
      setContentDialogOpen(false);
      resetContentForm();
    },
    onError: (error: Error) => {
      console.error("Update content error:", error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update content. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const applications = applicationsResponse?.data || [];
  const content = contentResponse?.data || [];
  
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
  
  // Helper function to get course/program label
  const getCourseLabel = (value: string) => {
    const courseMap: {[key: string]: string} = {
      "ai-genai": "AI & GenAI Workshop",
      "python": "Python Programming",
      "sql": "SQL Masterclass"
    };
    return courseMap[value] || value;
  };
  
  // Helper function to get status color
  const getStatusColor = (status: string) => {
    const statusColors: {[key: string]: string} = {
      "pending": "bg-yellow-100 text-yellow-800",
      "approved": "bg-green-100 text-green-800",
      "rejected": "bg-red-100 text-red-800",
      "waitlisted": "bg-blue-100 text-blue-800",
      "enrolled": "bg-purple-100 text-purple-800"
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };
  
  // Function to open application notes dialog
  const openApplicationNotes = (application: Application) => {
    setSelectedApplication(application);
    setApplicationNotes(application.notes || "");
    setApplicationStatus(application.status || "pending");
    setApplicationNotesOpen(true);
  };
  
  // Function to save application notes and status
  const saveApplicationNotes = () => {
    if (!selectedApplication) return;
    
    updateApplicationMutation.mutate({
      id: selectedApplication.id,
      status: applicationStatus,
      notes: applicationNotes
    });
  };
  
  // Function to open content dialog for creating new content
  const openNewContentDialog = () => {
    resetContentForm();
    setSelectedContent(null);
    setContentDialogOpen(true);
  };
  
  // Function to open content dialog for editing
  const openEditContentDialog = (content: Content) => {
    setSelectedContent(content);
    setContentFormData({
      section: content.section,
      title: content.title || "",
      subtitle: content.subtitle || "",
      description: content.description || "",
      content: content.content ? JSON.stringify(content.content, null, 2) : "{}"
    });
    setContentDialogOpen(true);
  };
  
  // Function to reset content form
  const resetContentForm = () => {
    setContentFormData({
      section: "",
      title: "",
      subtitle: "",
      description: "",
      content: "{}"
    });
  };
  
  // Function to handle content form submission
  const handleContentSubmit = () => {
    try {
      // Validate JSON content if it's a string
      if (typeof contentFormData.content === 'string') {
        JSON.parse(contentFormData.content);
      }
      
      if (selectedContent) {
        // Update existing content
        updateContentMutation.mutate({
          section: selectedContent.section,
          data: contentFormData
        });
      } else {
        // Create new content
        createContentMutation.mutate(contentFormData);
      }
    } catch (e) {
      console.error("JSON validation error:", e);
      toast({
        title: "Invalid JSON",
        description: "The content field must contain valid JSON.",
        variant: "destructive",
      });
    }
  };
  
  // Effect to update URL hash when tab changes
  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: typeof loginCredentials) => {
      const response = await apiRequest("POST", "/api/login", credentials);
      return response.json();
    },
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setIsLoggingIn(false);
      toast({
        title: "Login Successful",
        description: "You are now logged into the admin dashboard.",
      });
    },
    onError: (error: Error) => {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      });
      setIsLoggingIn(false);
    }
  });

  // Initialize admin user mutation
  const initAdminMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/init-admin", {});
      return response.json();
    },
    onSuccess: (data) => {
      setIsInitializing(false);
      
      if (data.credentials) {
        setAdminCredentials({
          username: data.credentials.username,
          password: data.credentials.password
        });
        
        // Auto-fill the login form 
        setLoginCredentials({
          username: data.credentials.username,
          password: data.credentials.password
        });
        
        toast({
          title: "Admin Account Created",
          description: "Default admin account has been created. The login credentials have been filled in for you.",
        });
      } else {
        toast({
          title: "Admin Account Ready",
          description: "Default admin account has been created. You can now log in.",
        });
      }
    },
    onError: (error: Error) => {
      console.error("Init admin error:", error);
      toast({
        title: "Initialization Failed",
        description: "Failed to create default admin account.",
        variant: "destructive",
      });
      setIsInitializing(false);
    }
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/logout", {});
      return response.json();
    },
    onSuccess: () => {
      setIsAuthenticated(false);
      toast({
        title: "Logged Out",
        description: "You have been logged out of the admin dashboard.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/applications'] });
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
    },
    onError: (error: Error) => {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/user');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };
    
    checkAuth();
  }, []);

  // Handle login form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    loginMutation.mutate(loginCredentials);
  };

  // Handle init admin click
  const handleInitAdmin = () => {
    setIsInitializing(true);
    initAdminMutation.mutate();
  };

  // Handle logout click
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Effect to set active tab based on URL hash
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash === "applications" || hash === "content") {
      setActiveTab(hash);
    }
  }, [location]);
  
  const isMutating = updateApplicationMutation.isPending || 
                    createContentMutation.isPending || 
                    updateContentMutation.isPending ||
                    loginMutation.isPending ||
                    logoutMutation.isPending;
  
  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center text-white hover:text-gray-200 transition">
              <ArrowLeft className="mr-2 h-5 w-5" />
              <span>Back to Website</span>
            </Link>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            {isAuthenticated && (
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white/10"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span>Logout</span>
                )}
              </Button>
            )}
            {!isAuthenticated && <div className="w-24"></div>}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Admin Login</CardTitle>
                <CardDescription className="text-center">Sign in to access the admin dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                {adminCredentials && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <h3 className="text-sm font-medium text-green-800 mb-2">Admin Credentials Created</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium text-green-700">Username:</div>
                      <div className="text-green-800">{adminCredentials.username}</div>
                      <div className="font-medium text-green-700">Password:</div>
                      <div className="text-green-800">{adminCredentials.password}</div>
                    </div>
                    <p className="mt-2 text-xs text-green-600">These credentials have been pre-filled for you.</p>
                  </div>
                )}
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="username"
                        type="text" 
                        className="pl-10"
                        placeholder="Enter username" 
                        value={loginCredentials.username}
                        onChange={(e) => setLoginCredentials({...loginCredentials, username: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="password"
                        type="password" 
                        className="pl-10"
                        placeholder="Enter password" 
                        value={loginCredentials.password}
                        onChange={(e) => setLoginCredentials({...loginCredentials, password: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleInitAdmin}
                  disabled={isInitializing}
                >
                  {isInitializing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <User className="mr-2 h-4 w-4" />
                      Create default admin account
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <Tabs 
            defaultValue="applications" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-6"
          >
          <div className="bg-white rounded-lg shadow-sm p-2 mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger 
                value="applications"
                className="flex items-center justify-center gap-2"
              >
                <Users className="h-4 w-4" />
                <span>Applications</span>
              </TabsTrigger>
              <TabsTrigger 
                value="content"
                className="flex items-center justify-center gap-2"
              >
                <Layers className="h-4 w-4" />
                <span>Content Management</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
                  Applications ({applications.length || 0})
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Search applications..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                  
                  <button
                    onClick={exportToCSV}
                    className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                    disabled={!applications || applications.length === 0}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </button>
                </div>
              </div>
              
              {isLoadingApplications ? (
                <div className="text-center py-12">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
                  <p className="mt-4 text-gray-600">Loading applications...</p>
                </div>
              ) : applicationsError ? (
                <div className="bg-red-50 text-red-800 p-4 rounded-md">
                  <p>Error loading applications. Please try again later.</p>
                </div>
              ) : applications.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No applications submitted yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Name</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Contact</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Details</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Status</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Date</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredApplications.map((application) => (
                        <tr key={application.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6 border-b">
                            <div className="font-medium text-gray-900">{application.firstName} {application.lastName}</div>
                          </td>
                          <td className="py-4 px-6 border-b">
                            <div className="text-gray-900">{application.email}</div>
                            <div className="text-gray-500 text-sm">{application.phone}</div>
                          </td>
                          <td className="py-4 px-6 border-b">
                            <div className="space-y-1">
                              <div className="flex flex-wrap gap-1">
                                <span className="text-xs font-medium bg-red-100 text-red-800 rounded-full px-2.5 py-0.5">
                                  {getCourseLabel(application.course || "ai-genai")}
                                </span>
                                <span className="text-xs font-medium bg-purple-100 text-purple-800 rounded-full px-2.5 py-0.5">
                                  {application.mode.charAt(0).toUpperCase() + application.mode.slice(1)}
                                </span>
                                <span className="text-xs font-medium bg-blue-100 text-blue-800 rounded-full px-2.5 py-0.5">
                                  {getExperienceLabel(application.experience)}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">Education: {getEducationLabel(application.education)}</div>
                            </div>
                          </td>
                          <td className="py-4 px-6 border-b">
                            <span className={`text-xs font-medium ${getStatusColor(application.status || "pending")} rounded-full px-2.5 py-0.5`}>
                              {application.status ? application.status.charAt(0).toUpperCase() + application.status.slice(1) : "Pending"}
                            </span>
                            {application.notes && (
                              <div className="mt-1">
                                <span className="text-xs text-gray-500 italic">Has notes</span>
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 border-b">
                            {formatDate(application.createdAt)}
                          </td>
                          <td className="py-4 px-6 border-b">
                            <button
                              onClick={() => openApplicationNotes(application)}
                              className="text-purple-600 hover:text-purple-900 font-medium text-sm flex items-center"
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            {applications && applications.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Application Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-red-800 mb-2">Course Applications</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">AI & GenAI</span>
                        <span className="text-sm font-medium">{applications.filter((a) => a.course === 'ai-genai' || !a.course).length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Python</span>
                        <span className="text-sm font-medium">{applications.filter((a) => a.course === 'python').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">SQL</span>
                        <span className="text-sm font-medium">{applications.filter((a) => a.course === 'sql').length}</span>
                      </div>
                    </div>
                  </div>
                
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-purple-800 mb-2">Mode Preference</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Online</span>
                        <span className="text-sm font-medium">{applications.filter((a) => a.mode === 'online').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Offline</span>
                        <span className="text-sm font-medium">{applications.filter((a) => a.mode === 'offline').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Hybrid</span>
                        <span className="text-sm font-medium">{applications.filter((a) => a.mode === 'hybrid').length}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Experience Level</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">No Experience</span>
                        <span className="text-sm font-medium">{applications.filter((a) => a.experience === 'none').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Beginner</span>
                        <span className="text-sm font-medium">{applications.filter((a) => a.experience === 'beginner').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Intermediate</span>
                        <span className="text-sm font-medium">{applications.filter((a) => a.experience === 'intermediate').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Advanced</span>
                        <span className="text-sm font-medium">{applications.filter((a) => a.experience === 'advanced').length}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-green-800 mb-2">Referral Sources</h4>
                    <div className="space-y-2">
                      {Object.entries(
                        applications.reduce((acc: {[key: string]: number}, app) => {
                          const source = app.referral || 'Not specified';
                          acc[source] = (acc[source] || 0) + 1;
                          return acc;
                        }, {})
                      ).map(([source, count]) => (
                        <div key={source} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            {source === 'social-media' ? 'Social Media' : 
                             source === 'search-engine' ? 'Search Engine' :
                             source === 'friend' ? 'Friend/Colleague' :
                             source === 'event' ? 'Event/Workshop' :
                             source === 'advertisement' ? 'Advertisement' :
                             source === 'other' ? 'Other' : source}
                          </span>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-indigo-800 mb-2">Application Status</h4>
                    <div className="space-y-2">
                      {Object.entries(
                        applications.reduce((acc: {[key: string]: number}, app) => {
                          const status = app.status || 'pending';
                          acc[status] = (acc[status] || 0) + 1;
                          return acc;
                        }, {})
                      ).map(([status, count]) => (
                        <div key={status} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
                  Content Sections
                </h2>
                
                <Button
                  onClick={openNewContentDialog}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Section
                </Button>
              </div>
              
              {isLoadingContent ? (
                <div className="text-center py-12">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
                  <p className="mt-4 text-gray-600">Loading content sections...</p>
                </div>
              ) : contentError ? (
                <div className="bg-red-50 text-red-800 p-4 rounded-md">
                  <p>Error loading content. Please try again later.</p>
                </div>
              ) : content.length === 0 ? (
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Content Sections Created Yet</h3>
                  <p className="text-gray-600 mb-4">
                    Create your first content section to begin managing website content. 
                    Each section can be displayed in different parts of the website.
                  </p>
                  <Button 
                    onClick={openNewContentDialog}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Section
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Section ID</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Title</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Last Updated</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {content.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6 border-b">
                            <div className="font-mono text-sm text-gray-800">{item.section}</div>
                          </td>
                          <td className="py-4 px-6 border-b">
                            <div className="font-medium text-gray-900">{item.title || "—"}</div>
                            {item.subtitle && (
                              <div className="text-gray-500 text-sm mt-1">{item.subtitle}</div>
                            )}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 border-b">
                            {item.updatedAt ? formatDate(String(item.updatedAt)) : "—"}
                          </td>
                          <td className="py-4 px-6 border-b">
                            <button
                              onClick={() => openEditContentDialog(item)}
                              className="text-purple-600 hover:text-purple-900 font-medium text-sm flex items-center"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            {/* Content Management Guide */}
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Content Management Guide
              </h3>
              <div className="text-gray-700 space-y-4">
                <p>
                  The content management system allows you to update different sections of the website without 
                  changing the code. Each section has a unique identifier that the website uses to display content.
                </p>
                
                <div className="bg-white rounded-lg p-4 border border-purple-100">
                  <h4 className="font-medium text-purple-900 mb-2 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    How to use the CMS:
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 ml-4 text-sm">
                    <li>Create a new content section with a unique identifier (e.g., "hero", "about", "pricing")</li>
                    <li>Fill in the title, subtitle, and description fields as needed</li>
                    <li>Enter valid JSON in the content field to define custom fields for the section</li>
                    <li>Save the section and it will be automatically used on the website</li>
                  </ol>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-purple-100">
                  <h4 className="font-medium text-purple-900 mb-2 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    JSON structure example:
                  </h4>
                  <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
{`{
  "heading": "Welcome to AI Learning Hub",
  "subheading": "Master AI skills for the future",
  "features": [
    "5-month comprehensive program",
    "Hands-on learning experience",
    "Expert mentors and industry connections"
  ],
  "buttonText": "Apply Now",
  "imageUrl": "/images/hero-image.jpg"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        )}
      </main>
      
      {/* Application Notes Dialog */}
      <Dialog open={applicationNotesOpen} onOpenChange={setApplicationNotesOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {selectedApplication && (
                <span>
                  Application: {selectedApplication.firstName} {selectedApplication.lastName}
                </span>
              )}
            </DialogTitle>
            <DialogDescription>
              Update status and add notes for this application.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right text-sm font-medium">
                Status
              </label>
              <Select 
                value={applicationStatus} 
                onValueChange={setApplicationStatus}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="waitlisted">Waitlisted</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="notes" className="text-right text-sm font-medium">
                Notes
              </label>
              <Textarea
                id="notes"
                className="col-span-3"
                placeholder="Add notes about this application (only visible to admins)"
                rows={6}
                value={applicationNotes}
                onChange={(e) => setApplicationNotes(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setApplicationNotesOpen(false)}
              disabled={isMutating}
            >
              Cancel
            </Button>
            <Button
              onClick={saveApplicationNotes}
              disabled={isMutating}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isMutating ? (
                <div className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </div>
              ) : (
                <div className="flex items-center">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </div>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Content Management Dialog */}
      <Dialog open={contentDialogOpen} onOpenChange={setContentDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              {selectedContent ? "Edit Content Section" : "Create New Content Section"}
            </DialogTitle>
            <DialogDescription>
              {selectedContent 
                ? "Update this content section with new information." 
                : "Create a new content section that can be used throughout the website."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="section" className="text-right text-sm font-medium">
                Section ID
              </label>
              <Input
                id="section"
                className="col-span-3"
                placeholder="e.g., hero, about, pricing"
                value={contentFormData.section}
                onChange={(e) => setContentFormData({...contentFormData, section: e.target.value})}
                disabled={!!selectedContent}
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                className="col-span-3"
                placeholder="Main title for this section"
                value={contentFormData.title}
                onChange={(e) => setContentFormData({...contentFormData, title: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="subtitle" className="text-right text-sm font-medium">
                Subtitle
              </label>
              <Input
                id="subtitle"
                className="col-span-3"
                placeholder="Subtitle or tagline"
                value={contentFormData.subtitle}
                onChange={(e) => setContentFormData({...contentFormData, subtitle: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="description" className="text-right text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                className="col-span-3"
                placeholder="Longer description for this section"
                rows={3}
                value={contentFormData.description}
                onChange={(e) => setContentFormData({...contentFormData, description: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="content" className="text-right text-sm font-medium">
                Content (JSON)
              </label>
              <Textarea
                id="content"
                className="col-span-3 font-mono text-sm"
                placeholder='{"key": "value"}'
                rows={10}
                value={contentFormData.content}
                onChange={(e) => setContentFormData({...contentFormData, content: e.target.value})}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setContentDialogOpen(false)}
              disabled={isMutating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleContentSubmit}
              disabled={isMutating || !contentFormData.section}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isMutating ? (
                <div className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </div>
              ) : (
                <div className="flex items-center">
                  <Save className="h-4 w-4 mr-2" />
                  {selectedContent ? "Update Section" : "Create Section"}
                </div>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}