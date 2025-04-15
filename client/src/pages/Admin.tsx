import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Search, Download } from "lucide-react";
import { Link } from "wouter";

export default function Admin() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ['/api/applications'],
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: true
  });
  
  const filteredApplications = applications?.data?.filter((app: any) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      app.firstName?.toLowerCase().includes(searchTermLower) ||
      app.lastName?.toLowerCase().includes(searchTermLower) ||
      app.email?.toLowerCase().includes(searchTermLower) ||
      app.phone?.includes(searchTerm) ||
      app.mode?.toLowerCase().includes(searchTermLower)
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
    if (!applications?.data) return;
    
    const headers = ["First Name", "Last Name", "Email", "Phone", "Education", "Mode", "Experience", "Motivation", "Referral", "Date"];
    const rows = applications.data.map((app: any) => [
      app.firstName,
      app.lastName,
      app.email,
      app.phone,
      app.education,
      app.mode,
      app.experience,
      app.motivation,
      app.referral || "",
      formatDate(app.createdAt)
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
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Applications ({applications?.data?.length || 0})</h2>
            
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
                disabled={!applications?.data || applications.data.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading applications...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-800 p-4 rounded-md">
              <p>Error loading applications. Please try again later.</p>
            </div>
          ) : applications?.data?.length === 0 ? (
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
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplications?.map((application: any) => (
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
                          <div className="flex">
                            <span className="text-xs font-medium bg-purple-100 text-purple-800 rounded-full px-2.5 py-0.5 mr-2">
                              {application.mode.charAt(0).toUpperCase() + application.mode.slice(1)}
                            </span>
                            <span className="text-xs font-medium bg-blue-100 text-blue-800 rounded-full px-2.5 py-0.5">
                              {getExperienceLabel(application.experience)}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">Education: {getEducationLabel(application.education)}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 border-b">
                        {formatDate(application.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {applications?.data && applications.data.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Application Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-purple-800 mb-2">Mode Preference</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Online</span>
                    <span className="text-sm font-medium">{applications.data.filter((a: any) => a.mode === 'online').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Offline</span>
                    <span className="text-sm font-medium">{applications.data.filter((a: any) => a.mode === 'offline').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Hybrid</span>
                    <span className="text-sm font-medium">{applications.data.filter((a: any) => a.mode === 'hybrid').length}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Experience Level</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">No Experience</span>
                    <span className="text-sm font-medium">{applications.data.filter((a: any) => a.experience === 'none').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Beginner</span>
                    <span className="text-sm font-medium">{applications.data.filter((a: any) => a.experience === 'beginner').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Intermediate</span>
                    <span className="text-sm font-medium">{applications.data.filter((a: any) => a.experience === 'intermediate').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Advanced</span>
                    <span className="text-sm font-medium">{applications.data.filter((a: any) => a.experience === 'advanced').length}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-green-800 mb-2">Referral Sources</h4>
                <div className="space-y-2">
                  {Object.entries(
                    applications.data.reduce((acc: {[key: string]: number}, app: any) => {
                      const source = app.referral || 'Not specified';
                      acc[source] = (acc[source] || 0) + 1;
                      return acc;
                    }, {})
                  ).map(([source, count]: [string, any]) => (
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
            </div>
          </div>
        )}
      </main>
    </div>
  );
}