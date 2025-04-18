import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

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
import { Loader2, User, Mail, Phone, BookOpen, Send, Sparkles } from "lucide-react";

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
  motivation: z.string().min(20, "Please provide at least 20 characters about your motivation"),
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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      education: "",
      course: "",
      experience: "",
      motivation: "",
      referral: "",
      terms: false,
    },
  });
  
  // Extract course parameter from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const courseParam = params.get('course');
    
    if (courseParam) {
      if (courseParam === 'python') {
        form.setValue('course', 'python');
      } else if (courseParam === 'sql') {
        form.setValue('course', 'sql');
      } else if (courseParam === 'ai-genai') {
        form.setValue('course', 'ai-genai');
      }
    }
  }, [location, form]);

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const { terms, ...applicationData } = data;
      return apiRequest("POST", "/api/applications", applicationData);
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "We've received your application and will contact you soon!",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      await mutation.mutateAsync(data);
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
            <p className="max-w-3xl mx-auto text-amber-600 font-medium mt-3 border border-amber-300 bg-amber-50 rounded-lg px-4 py-2 inline-block">
              <strong>Please Note:</strong> Most of the program batches will be conducted online.
            </p>
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
                  <li className="flex items-start">
                    <div className="p-1 bg-white/20 rounded-full mr-3 mt-0.5">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span>2-month paid internship opportunity</span>
                  </li>
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-lg">
                                <SelectValue placeholder="Select the program you're applying for" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ai-genai">AI & GenAI Workshop + Internship</SelectItem>
                              <SelectItem value="python">Python Programming Masterclass</SelectItem>
                              <SelectItem value="sql">SQL Masterclass</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />
                    
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
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Why do you want to join this program?*</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your motivation to join this program and what you hope to achieve..."
                              rows={4}
                              className="rounded-lg resize-none"
                              {...field}
                            />
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
                              I agree to the <a href="#" className="text-purple-600 hover:underline font-medium">Terms and Conditions</a> and <a href="#" className="text-purple-600 hover:underline font-medium">Privacy Policy</a>.
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
    </section>
  );
}
