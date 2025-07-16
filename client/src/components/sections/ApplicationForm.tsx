import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { saveApplicationToFirestore } from "@/lib/firestoreHelpers";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, User, Mail, Phone, BookOpen, Send, Sparkles, MapPin, Globe } from "lucide-react";
import { courses } from "@/lib/courses";
import { getCourseBrochureLink, allCoursesBrochureLink } from "@/lib/courseBrochures";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  education: z.string().min(1, "Please select your highest education"),
  course: z.string().min(1, "Please select which course you're applying for"),
  mode: z.enum(["online", "offline", "hybrid"], {
    required_error: "Please select your preferred mode",
  }),
  experience: z.string().min(1, "Please select your experience level"),
  country: z.enum(["US", "CA", "IN"], {
    required_error: "Please select your country",
  }),
  state: z.string().min(1, "Please enter your state/province").optional(),
  city: z.string().min(1, "Please enter your city").optional(),
  referral: z.string().optional(),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
});

type FormValues = z.infer<typeof formSchema>;

const indianStatesWithCities: Record<string, string[]> = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Other"],
  "Delhi": ["New Delhi", "Other"],
  "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli", "Other"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Other"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut", "Other"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Other"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Other"],
  "Telangana": ["Hyderabad", "Warangal", "Other"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Udaipur", "Other"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior", "Jabalpur", "Other"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Other"],
  "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Other"],
  "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Guntur", "Other"],
  "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Other"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Other"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Other"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Other"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Other"],
  "Assam": ["Guwahati", "Other"],
  "Chandigarh": ["Chandigarh"],
  "Goa": ["Panaji", "Other"],
  "Other": ["Other"]
};

export default function ApplicationForm() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [location] = useLocation();
  const [showThankYou, setShowThankYou] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      education: "",
      course: "", // Default to empty string
      country: "IN", // Default to India
      state: "",
      city: "",
      experience: "",
      referral: "",
      terms: false,
    },
  });

  // Watch form values for conditional rendering
  const selectedCountry = form.watch("country");
  const selectedState = form.watch("state");
  
  // Extract course parameter from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const courseParam = params.get('course');
    
    if (courseParam) {
      console.log("Found course parameter:", courseParam);
      if (courseParam === 'python') {
        form.setValue('course', 'python');
      } else if (courseParam === 'sql') {
        form.setValue('course', 'sql');
      } else if (courseParam === 'ai-genai') {
        form.setValue('course', 'ai-genai');
      }
    }
  }, [form]);

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      // Add timestamp and status to the application data
      const applicationData = {
        ...data,
        createdAt: new Date(),
        status: "pending"
      };
      
      await saveApplicationToFirestore(applicationData);
      setSelectedCourse(data.course);
      setShowThankYou(true);
      toast({
        title: "Application Submitted",
        description: "We've received your application and will contact you soon!",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="apply" className="py-24 bg-gradient-to-br from-violet-50 to-indigo-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg2MCkiIG9wYWNpdHk9IjAuMDQiPjxyZWN0IHg9IjE4IiB5PSIxOCIgd2lkdGg9IjQiIGhlaWdodD0iNCIgZmlsbD0iIzgxNmNmZiIgLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiIC8+PC9zdmc+')]"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-300 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-purple-300 rounded-full blur-2xl opacity-20"></div>
      </div>
      
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 relative">
            <div className="inline-flex items-center justify-center p-1 rounded-full bg-white shadow-md mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full px-4 py-1.5 font-medium text-sm flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                APPLICATION
              </div>
            </div>
            <h2 className="font-sans font-bold text-4xl md:text-5xl mt-2 mb-4">
              Apply for <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Any Program</span>
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              Fill out the form below to start your application process for any of our courses or programs.
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 p-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Why Apply?</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Expert-led training programs</span>
                  </li>
                  <li className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Flexible learning modes</span>
                  </li>
                  <li className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Industry-relevant curriculum</span>
                  </li>
                  <li className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Career support and guidance</span>
                  </li>
                </ul>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4">
                  <p className="font-medium mb-2">Application Timeline</p>
                  <p className="text-sm opacity-90">Our team will review your application and contact you within 2-3 business days.</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-2/3 p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-gray-700">
                              <User className="mr-2 h-4 w-4 text-purple-500" />
                              First Name*
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your first name" className="rounded-lg" {...field} />
                            </FormControl>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-gray-700">
                              <User className="mr-2 h-4 w-4 text-purple-500" />
                              Last Name*
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your last name" className="rounded-lg" {...field} />
                            </FormControl>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-gray-700">
                              <Mail className="mr-2 h-4 w-4 text-purple-500" />
                              Email Address*
                            </FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" className="rounded-lg" {...field} />
                            </FormControl>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-gray-700">
                              <Phone className="mr-2 h-4 w-4 text-purple-500" />
                              Phone Number*
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" className="rounded-lg" {...field} />
                            </FormControl>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="education"
                      render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-700">Highest Education*</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-lg">
                                  <SelectValue placeholder="Select your education level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="high-school">High School</SelectItem>
                              <SelectItem value="diploma">Diploma</SelectItem>
                              <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                              <SelectItem value="masters">Master's Degree</SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />
                      
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Experience Level*</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="rounded-lg">
                                  <SelectValue placeholder="Select your experience level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="none">No Experience</SelectItem>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-gray-700">
                            <BookOpen className="mr-2 h-4 w-4 text-red-500" />
                            Program / Course*
                          </FormLabel>
                          <Select
                            value={form.watch("course")}
                            onValueChange={val => form.setValue("course", val)}
                          >
                            <FormControl>
                              <SelectTrigger className="rounded-lg">
                                <SelectValue placeholder="Select Course" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {courses.map((c) => (
                                <SelectItem key={c.name} value={c.name}>
                                  {c.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-gray-700">
                              <Globe className="mr-2 h-4 w-4 text-blue-500" />
                              Country*
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="rounded-lg">
                                  <SelectValue placeholder="Select your country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="US">United States</SelectItem>
                                <SelectItem value="CA">Canada</SelectItem>
                                <SelectItem value="IN">India</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                    
                      {selectedCountry === "IN" && (
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center text-gray-700">
                                State*
                              </FormLabel>
                              <Select onValueChange={field.onChange} value={field.value || ""}>
                                <FormControl>
                                  <SelectTrigger className="rounded-lg">
                                    <SelectValue placeholder="Select your state" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Object.keys(indianStatesWithCities).map((state) => (
                                    <SelectItem key={state} value={state}>{state}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                      )}
                      {selectedCountry !== "IN" && (
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center text-gray-700">
                                State/Province*
                              </FormLabel>
                              <Select onValueChange={field.onChange} value={field.value || ""}>
                                <FormControl>
                                  <SelectTrigger className="rounded-lg">
                                    <SelectValue placeholder="Select your state/province" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {form.watch("country") === "US" && (
                                    <>
                                      <SelectItem value="Alabama">Alabama</SelectItem>
                                      <SelectItem value="Alaska">Alaska</SelectItem>
                                      <SelectItem value="Arizona">Arizona</SelectItem>
                                      <SelectItem value="Arkansas">Arkansas</SelectItem>
                                      <SelectItem value="California">California</SelectItem>
                                      <SelectItem value="Colorado">Colorado</SelectItem>
                                      <SelectItem value="Connecticut">Connecticut</SelectItem>
                                      <SelectItem value="Delaware">Delaware</SelectItem>
                                      <SelectItem value="Florida">Florida</SelectItem>
                                      <SelectItem value="Georgia">Georgia</SelectItem>
                                      <SelectItem value="Hawaii">Hawaii</SelectItem>
                                      <SelectItem value="Idaho">Idaho</SelectItem>
                                      <SelectItem value="Illinois">Illinois</SelectItem>
                                      <SelectItem value="Indiana">Indiana</SelectItem>
                                      <SelectItem value="Iowa">Iowa</SelectItem>
                                      <SelectItem value="Kansas">Kansas</SelectItem>
                                      <SelectItem value="Kentucky">Kentucky</SelectItem>
                                      <SelectItem value="Louisiana">Louisiana</SelectItem>
                                      <SelectItem value="Maine">Maine</SelectItem>
                                      <SelectItem value="Maryland">Maryland</SelectItem>
                                      <SelectItem value="Massachusetts">Massachusetts</SelectItem>
                                      <SelectItem value="Michigan">Michigan</SelectItem>
                                      <SelectItem value="Minnesota">Minnesota</SelectItem>
                                      <SelectItem value="Mississippi">Mississippi</SelectItem>
                                      <SelectItem value="Missouri">Missouri</SelectItem>
                                      <SelectItem value="Montana">Montana</SelectItem>
                                      <SelectItem value="Nebraska">Nebraska</SelectItem>
                                      <SelectItem value="Nevada">Nevada</SelectItem>
                                      <SelectItem value="New Hampshire">New Hampshire</SelectItem>
                                      <SelectItem value="New Jersey">New Jersey</SelectItem>
                                      <SelectItem value="New Mexico">New Mexico</SelectItem>
                                      <SelectItem value="New York">New York</SelectItem>
                                      <SelectItem value="North Carolina">North Carolina</SelectItem>
                                      <SelectItem value="North Dakota">North Dakota</SelectItem>
                                      <SelectItem value="Ohio">Ohio</SelectItem>
                                      <SelectItem value="Oklahoma">Oklahoma</SelectItem>
                                      <SelectItem value="Oregon">Oregon</SelectItem>
                                      <SelectItem value="Pennsylvania">Pennsylvania</SelectItem>
                                      <SelectItem value="Rhode Island">Rhode Island</SelectItem>
                                      <SelectItem value="South Carolina">South Carolina</SelectItem>
                                      <SelectItem value="South Dakota">South Dakota</SelectItem>
                                      <SelectItem value="Tennessee">Tennessee</SelectItem>
                                      <SelectItem value="Texas">Texas</SelectItem>
                                      <SelectItem value="Utah">Utah</SelectItem>
                                      <SelectItem value="Vermont">Vermont</SelectItem>
                                      <SelectItem value="Virginia">Virginia</SelectItem>
                                      <SelectItem value="Washington">Washington</SelectItem>
                                      <SelectItem value="West Virginia">West Virginia</SelectItem>
                                      <SelectItem value="Wisconsin">Wisconsin</SelectItem>
                                      <SelectItem value="Wyoming">Wyoming</SelectItem>
                                      <SelectItem value="Other">Other</SelectItem>
                                    </>
                                  )}
                                  {form.watch("country") === "CA" && (
                                    <>
                                      <SelectItem value="Alberta">Alberta</SelectItem>
                                      <SelectItem value="British Columbia">British Columbia</SelectItem>
                                      <SelectItem value="Manitoba">Manitoba</SelectItem>
                                      <SelectItem value="New Brunswick">New Brunswick</SelectItem>
                                      <SelectItem value="Newfoundland and Labrador">Newfoundland and Labrador</SelectItem>
                                      <SelectItem value="Northwest Territories">Northwest Territories</SelectItem>
                                      <SelectItem value="Nova Scotia">Nova Scotia</SelectItem>
                                      <SelectItem value="Nunavut">Nunavut</SelectItem>
                                      <SelectItem value="Ontario">Ontario</SelectItem>
                                      <SelectItem value="Prince Edward Island">Prince Edward Island</SelectItem>
                                      <SelectItem value="Quebec">Quebec</SelectItem>
                                      <SelectItem value="Saskatchewan">Saskatchewan</SelectItem>
                                      <SelectItem value="Yukon">Yukon</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                    </>
                                  )}
                                  {form.watch("country") === "IN" && (
                                    <>
                                  <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                                  <SelectItem value="Arunachal Pradesh">Arunachal Pradesh</SelectItem>
                                  <SelectItem value="Assam">Assam</SelectItem>
                                  <SelectItem value="Bihar">Bihar</SelectItem>
                                  <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                                  <SelectItem value="Goa">Goa</SelectItem>
                                  <SelectItem value="Gujarat">Gujarat</SelectItem>
                                  <SelectItem value="Haryana">Haryana</SelectItem>
                                  <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                                  <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                                  <SelectItem value="Karnataka">Karnataka</SelectItem>
                                  <SelectItem value="Kerala">Kerala</SelectItem>
                                  <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                                  <SelectItem value="Manipur">Manipur</SelectItem>
                                  <SelectItem value="Meghalaya">Meghalaya</SelectItem>
                                  <SelectItem value="Mizoram">Mizoram</SelectItem>
                                  <SelectItem value="Nagaland">Nagaland</SelectItem>
                                  <SelectItem value="Odisha">Odisha</SelectItem>
                                  <SelectItem value="Punjab">Punjab</SelectItem>
                                  <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                                  <SelectItem value="Sikkim">Sikkim</SelectItem>
                                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                                  <SelectItem value="Telangana">Telangana</SelectItem>
                                  <SelectItem value="Tripura">Tripura</SelectItem>
                                  <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                                  <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                                  <SelectItem value="West Bengal">West Bengal</SelectItem>
                                      <SelectItem value="Other">Other</SelectItem>
                                    </>
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    
                    {selectedCountry === "IN" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center text-gray-700">
                                  City*
                              </FormLabel>
                              <Select onValueChange={field.onChange} value={field.value || ""}>
                                <FormControl>
                                  <SelectTrigger className="rounded-lg">
                                    <SelectValue placeholder="Select your city" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {(indianStatesWithCities[selectedState] || ["Other"]).map((city) => (
                                      <SelectItem key={city} value={city}>{city}</SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    {selectedCountry !== "IN" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center text-gray-700">
                                City*
                              </FormLabel>
                              <Input placeholder="Enter your city" className="rounded-lg" {...field} />
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    <FormField
                      control={form.control}
                      name="mode"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-gray-700">Program Mode Preference*</FormLabel>
                          <p className="text-xs text-amber-600 italic mb-2">Disclaimer: Most of the batches will be offline</p>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-wrap gap-6"
                            >
                              <div className="flex items-center space-x-2 border border-gray-200 rounded-lg p-3 hover:border-purple-300 transition-colors">
                                <RadioGroupItem value="online" id="online" />
                                <label htmlFor="online" className="cursor-pointer font-medium">Online</label>
                              </div>
                              <div className="flex items-center space-x-2 border border-gray-200 rounded-lg p-3 hover:border-purple-300 transition-colors">
                                <RadioGroupItem value="offline" id="offline" />
                                <label htmlFor="offline" className="cursor-pointer font-medium">Offline</label>
                              </div>
                              <div className="flex items-center space-x-2 border border-gray-200 rounded-lg p-3 hover:border-purple-300 transition-colors">
                                <RadioGroupItem value="hybrid" id="hybrid" />
                                <label htmlFor="hybrid" className="cursor-pointer font-medium">Hybrid</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="referral"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">How did you hear about us?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-lg">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="social-media">Social Media</SelectItem>
                              <SelectItem value="search-engine">Search Engine</SelectItem>
                              <SelectItem value="friend">Friend or Colleague</SelectItem>
                              <SelectItem value="event">Event or Workshop</SelectItem>
                              <SelectItem value="advertisement">Advertisement</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-indigo-50 p-4 rounded-lg">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-1"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-gray-700">
                              I agree to the  
                              <a href="/Terms" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline font-medium">Terms and Conditions </a>
                               and  
                              <a href="/Privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline font-medium"> Privacy Policy</a>.
                            </FormLabel>
                            <FormMessage className="text-sm" />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-medium py-4 px-8 rounded-xl inline-flex items-center justify-center transition-all duration-300 disabled:opacity-70 shadow-md hover:shadow-lg"
                      >
                        {submitting ? (
                          <div className="flex items-center">
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Submitting...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            SUBMIT APPLICATION
                          </div>
                        )}
                      </button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <DialogTitle className="text-2xl font-bold mb-2 text-[#1db954]">Thank you for applying!</DialogTitle>
          <DialogDescription className="mb-6 text-gray-700">Your application has been received. You can now download the course brochures below.</DialogDescription>
          <div className="flex flex-col gap-4">
            <a
              href={getCourseBrochureLink(selectedCourse)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#1db954] hover:bg-[#17a74a] text-white py-3 px-6 rounded-lg shadow font-semibold text-base transition-all duration-300 border-2 border-transparent hover:border-[#1db954] focus:outline-none focus:ring-2 focus:ring-[#1db954]"
            >
              Download {selectedCourse.charAt(0).toUpperCase() + selectedCourse.slice(1)} Brochure
            </a>
            <a
              href={allCoursesBrochureLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-[#1db954] to-[#17a74a] hover:from-[#17a74a] hover:to-[#1db954] text-white py-3 px-6 rounded-lg shadow font-semibold text-base transition-all duration-300 border-2 border-transparent hover:border-[#1db954] focus:outline-none focus:ring-2 focus:ring-[#1db954]"
            >
              Download All Courses Brochure
            </a>
          </div>
          <DialogClose asChild>
            <button className="mt-6 text-[#1db954] font-semibold underline">Close</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </section>
  );
}
