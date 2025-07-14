import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
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
      await saveApplicationToFirestore(data);
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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            {/* <p className="max-w-3xl mx-auto text-amber-600 font-medium mt-3 border border-amber-300 bg-amber-50 rounded-lg px-4 py-2 inline-block">
              <strong>Please Note:</strong> Most of the program batches will be conducted online.
            </p> */}
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="md:flex">
              <div className="hidden md:block md:w-1/3 bg-gradient-to-br from-purple-600 to-indigo-700 p-8 text-white">
                <h3 className="font-bold text-xl mb-6">Program Benefits</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="p-1 bg-white/20 rounded-full mr-3 mt-0.5">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span>Comprehensive AI & GenAI training</span>
                  </li>
                  {/* <li className="flex items-start">
                    <div className="p-1 bg-white/20 rounded-full mr-3 mt-0.5">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span>2-month paid internship opportunity</span>
                  </li> */}
                  <li className="flex items-start">
                    <div className="p-1 bg-white/20 rounded-full mr-3 mt-0.5">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span>Certificate of completion</span>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 bg-white/20 rounded-full mr-3 mt-0.5">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span>Portfolio of projects</span>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 bg-white/20 rounded-full mr-3 mt-0.5">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span>Networking opportunities</span>
                  </li>
                </ul>

                <div className="mt-12 bg-white/10 rounded-xl p-4">
                  <p className="font-medium mb-2">Application Timeline</p>
                  <p className="text-sm opacity-90">Our team will review your application and contact you within 2-3 business days.</p>
                </div>
              </div>
              
              <div className="md:w-2/3 p-8">
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
                    
                    <FormField
                      control={form.control}
                      name="education"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-gray-700">
                            <BookOpen className="mr-2 h-4 w-4 text-purple-500" />
                            Highest Education*
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-lg">
                                <SelectValue placeholder="Select your highest education" />
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

                    <div className="grid grid-cols-1 gap-6">
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
                    </div>
                    
                    {form.watch('country') === 'US' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center text-gray-700">
                                <MapPin className="mr-2 h-4 w-4 text-blue-500" />
                                State
                              </FormLabel>
                              <Select onValueChange={field.onChange} value={field.value || ""}>
                                <FormControl>
                                  <SelectTrigger className="rounded-lg">
                                    <SelectValue placeholder="Select your state" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="AL">Alabama</SelectItem>
                                  <SelectItem value="AK">Alaska</SelectItem>
                                  <SelectItem value="AZ">Arizona</SelectItem>
                                  <SelectItem value="AR">Arkansas</SelectItem>
                                  <SelectItem value="CA">California</SelectItem>
                                  <SelectItem value="CO">Colorado</SelectItem>
                                  <SelectItem value="CT">Connecticut</SelectItem>
                                  <SelectItem value="DE">Delaware</SelectItem>
                                  <SelectItem value="FL">Florida</SelectItem>
                                  <SelectItem value="GA">Georgia</SelectItem>
                                  <SelectItem value="HI">Hawaii</SelectItem>
                                  <SelectItem value="ID">Idaho</SelectItem>
                                  <SelectItem value="IL">Illinois</SelectItem>
                                  <SelectItem value="IN">Indiana</SelectItem>
                                  <SelectItem value="IA">Iowa</SelectItem>
                                  <SelectItem value="KS">Kansas</SelectItem>
                                  <SelectItem value="KY">Kentucky</SelectItem>
                                  <SelectItem value="LA">Louisiana</SelectItem>
                                  <SelectItem value="ME">Maine</SelectItem>
                                  <SelectItem value="MD">Maryland</SelectItem>
                                  <SelectItem value="MA">Massachusetts</SelectItem>
                                  <SelectItem value="MI">Michigan</SelectItem>
                                  <SelectItem value="MN">Minnesota</SelectItem>
                                  <SelectItem value="MS">Mississippi</SelectItem>
                                  <SelectItem value="MO">Missouri</SelectItem>
                                  <SelectItem value="MT">Montana</SelectItem>
                                  <SelectItem value="NE">Nebraska</SelectItem>
                                  <SelectItem value="NV">Nevada</SelectItem>
                                  <SelectItem value="NH">New Hampshire</SelectItem>
                                  <SelectItem value="NJ">New Jersey</SelectItem>
                                  <SelectItem value="NM">New Mexico</SelectItem>
                                  <SelectItem value="NY">New York</SelectItem>
                                  <SelectItem value="NC">North Carolina</SelectItem>
                                  <SelectItem value="ND">North Dakota</SelectItem>
                                  <SelectItem value="OH">Ohio</SelectItem>
                                  <SelectItem value="OK">Oklahoma</SelectItem>
                                  <SelectItem value="OR">Oregon</SelectItem>
                                  <SelectItem value="PA">Pennsylvania</SelectItem>
                                  <SelectItem value="RI">Rhode Island</SelectItem>
                                  <SelectItem value="SC">South Carolina</SelectItem>
                                  <SelectItem value="SD">South Dakota</SelectItem>
                                  <SelectItem value="TN">Tennessee</SelectItem>
                                  <SelectItem value="TX">Texas</SelectItem>
                                  <SelectItem value="UT">Utah</SelectItem>
                                  <SelectItem value="VT">Vermont</SelectItem>
                                  <SelectItem value="VA">Virginia</SelectItem>
                                  <SelectItem value="WA">Washington</SelectItem>
                                  <SelectItem value="WV">West Virginia</SelectItem>
                                  <SelectItem value="WI">Wisconsin</SelectItem>
                                  <SelectItem value="WY">Wyoming</SelectItem>
                                  <SelectItem value="DC">Washington DC</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center text-gray-700">
                                <MapPin className="mr-2 h-4 w-4 text-blue-500" />
                                City
                              </FormLabel>
                              <Select onValueChange={field.onChange} value={field.value || ""}>
                                <FormControl>
                                  <SelectTrigger className="rounded-lg">
                                    <SelectValue placeholder="Select your city" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="New York">New York</SelectItem>
                                  <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                                  <SelectItem value="Chicago">Chicago</SelectItem>
                                  <SelectItem value="Houston">Houston</SelectItem>
                                  <SelectItem value="Phoenix">Phoenix</SelectItem>
                                  <SelectItem value="Philadelphia">Philadelphia</SelectItem>
                                  <SelectItem value="San Antonio">San Antonio</SelectItem>
                                  <SelectItem value="San Diego">San Diego</SelectItem>
                                  <SelectItem value="Dallas">Dallas</SelectItem>
                                  <SelectItem value="San Jose">San Jose</SelectItem>
                                  <SelectItem value="Austin">Austin</SelectItem>
                                  <SelectItem value="Jacksonville">Jacksonville</SelectItem>
                                  <SelectItem value="Fort Worth">Fort Worth</SelectItem>
                                  <SelectItem value="Columbus">Columbus</SelectItem>
                                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                                  <SelectItem value="Charlotte">Charlotte</SelectItem>
                                  <SelectItem value="Indianapolis">Indianapolis</SelectItem>
                                  <SelectItem value="Seattle">Seattle</SelectItem>
                                  <SelectItem value="Denver">Denver</SelectItem>
                                  <SelectItem value="Washington DC">Washington DC</SelectItem>
                                  <SelectItem value="Boston">Boston</SelectItem>
                                  <SelectItem value="Las Vegas">Las Vegas</SelectItem>
                                  <SelectItem value="Portland">Portland</SelectItem>
                                  <SelectItem value="Miami">Miami</SelectItem>
                                  <SelectItem value="Atlanta">Atlanta</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {form.watch('country') === 'CA' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center text-gray-700">
                                <MapPin className="mr-2 h-4 w-4 text-blue-500" />
                                Province
                              </FormLabel>
                              <Select onValueChange={field.onChange} value={field.value || ""}>
                                <FormControl>
                                  <SelectTrigger className="rounded-lg">
                                    <SelectValue placeholder="Select your province" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="AB">Alberta</SelectItem>
                                  <SelectItem value="BC">British Columbia</SelectItem>
                                  <SelectItem value="MB">Manitoba</SelectItem>
                                  <SelectItem value="NB">New Brunswick</SelectItem>
                                  <SelectItem value="NL">Newfoundland and Labrador</SelectItem>
                                  <SelectItem value="NS">Nova Scotia</SelectItem>
                                  <SelectItem value="ON">Ontario</SelectItem>
                                  <SelectItem value="PE">Prince Edward Island</SelectItem>
                                  <SelectItem value="QC">Quebec</SelectItem>
                                  <SelectItem value="SK">Saskatchewan</SelectItem>
                                  <SelectItem value="NT">Northwest Territories</SelectItem>
                                  <SelectItem value="NU">Nunavut</SelectItem>
                                  <SelectItem value="YT">Yukon</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center text-gray-700">
                                <MapPin className="mr-2 h-4 w-4 text-blue-500" />
                                City
                              </FormLabel>
                              <Select onValueChange={field.onChange} value={field.value || ""}>
                                <FormControl>
                                  <SelectTrigger className="rounded-lg">
                                    <SelectValue placeholder="Select your city" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Calgary">Calgary</SelectItem>
                                  <SelectItem value="Edmonton">Edmonton</SelectItem>
                                  <SelectItem value="Montreal">Montreal</SelectItem>
                                  <SelectItem value="Ottawa">Ottawa</SelectItem>
                                  <SelectItem value="Quebec City">Quebec City</SelectItem>
                                  <SelectItem value="Toronto">Toronto</SelectItem>
                                  <SelectItem value="Vancouver">Vancouver</SelectItem>
                                  <SelectItem value="Victoria">Victoria</SelectItem>
                                  <SelectItem value="Winnipeg">Winnipeg</SelectItem>
                                  <SelectItem value="Halifax">Halifax</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {form.watch('country') === 'IN' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center text-gray-700">
                                <MapPin className="mr-2 h-4 w-4 text-blue-500" />
                                State
                              </FormLabel>
                              <Select onValueChange={field.onChange} value={field.value || ""}>
                                <FormControl>
                                  <SelectTrigger className="rounded-lg">
                                    <SelectValue placeholder="Select your state" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
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
                                  <SelectItem value="Delhi">Delhi</SelectItem>
                                  <SelectItem value="Chandigarh">Chandigarh</SelectItem>
                                  <SelectItem value="Puducherry">Puducherry</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center text-gray-700">
                                <MapPin className="mr-2 h-4 w-4 text-blue-500" />
                                City
                              </FormLabel>
                              <Select onValueChange={field.onChange} value={field.value || ""}>
                                <FormControl>
                                  <SelectTrigger className="rounded-lg">
                                    <SelectValue placeholder="Select your city" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                                  <SelectItem value="Delhi">Delhi</SelectItem>
                                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                                  <SelectItem value="Chennai">Chennai</SelectItem>
                                  <SelectItem value="Kolkata">Kolkata</SelectItem>
                                  <SelectItem value="Pune">Pune</SelectItem>
                                  <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
                                  <SelectItem value="Jaipur">Jaipur</SelectItem>
                                  <SelectItem value="Lucknow">Lucknow</SelectItem>
                                  <SelectItem value="Kochi">Kochi</SelectItem>
                                  <SelectItem value="Chandigarh">Chandigarh</SelectItem>
                                  <SelectItem value="Coimbatore">Coimbatore</SelectItem>
                                  <SelectItem value="Indore">Indore</SelectItem>
                                  <SelectItem value="Bhopal">Bhopal</SelectItem>
                                  <SelectItem value="Nagpur">Nagpur</SelectItem>
                                  <SelectItem value="Bhubaneswar">Bhubaneswar</SelectItem>
                                  <SelectItem value="Guwahati">Guwahati</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
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
                          <p className="text-xs text-amber-600 italic mb-2">Disclaimer: Most of the batches will be online</p>
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
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Prior Programming Experience*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-lg">
                                <SelectValue placeholder="Select your experience level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">No experience</SelectItem>
                              <SelectItem value="beginner">Beginner (basic understanding)</SelectItem>
                              <SelectItem value="intermediate">Intermediate (some projects)</SelectItem>
                              <SelectItem value="advanced">Advanced (professional experience)</SelectItem>
                            </SelectContent>
                          </Select>
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
