import { ArrowRight, Award, BookOpen, Info, ChevronDown, ChevronUp, Download } from "lucide-react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { courses, Course } from "@/lib/courses";
import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Brain, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

function getCourseIcon(courseName: string) {
  if (courseName.toLowerCase().includes("python")) return <BookOpen className="inline-block mr-2 h-7 w-7 text-white" />;
  if (courseName.toLowerCase().includes("ai ml")) return <Brain className="inline-block mr-2 h-7 w-7 text-white" />;
  if (courseName.toLowerCase().includes("gen ai")) return <Sparkles className="inline-block mr-2 h-7 w-7 text-white" />;
  return <BookOpen className="inline-block mr-2 h-7 w-7 text-white" />;
}

function CourseCard({ course }: { course: Course }) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);
  const previewCount = 3;
  const hasMore = course.syllabus && course.syllabus.length > previewCount;
  const syllabusToShow = course.syllabus ? [...course.syllabus.slice(0, previewCount)] : [];
  while (syllabusToShow.length < previewCount) syllabusToShow.push("");
  const [, navigate] = useLocation();

  // Remove the Download Brochure button and related logic from CourseCard

  return (
    <div className="relative bg-[#202837] rounded-2xl shadow-xl overflow-hidden border-l-[6px] border-[#1db954] transition-all duration-300 hover:shadow-[#1db954]/30 hover:shadow-2xl hover:-translate-y-2 group flex flex-col min-w-[360px] max-w-[420px]">
      <div className="p-8 flex flex-col h-full">
        <div className="flex items-center mb-6">
          <span className="inline-flex items-center justify-center bg-[#1db954] text-white rounded-full p-2 mr-4 shadow-md">
            <BookOpen className="w-7 h-7" />
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-sans font-extrabold text-2xl md:text-3xl text-white tracking-tight drop-shadow mb-1 truncate">{course.name}</h3>
            <div className="text-xs text-gray-200 font-medium truncate">Expert-led, hands-on learning</div>
          </div>
          {course.internship && course.internship !== 'No' && (
            <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border border-[#1db954] text-[#1db954] bg-[#1db954] bg-opacity-10 shadow-sm">
              <Award className="w-4 h-4 mr-1 text-[#1db954]" /> Internship: {course.internship}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center text-lg mb-2 font-bold">
          <span className="text-gray-100">Duration: <span className="text-white">{course.duration}</span></span>
          <span className="flex flex-col items-end">
            {course.cutFees ? (
              <span className="text-red-500 line-through text-base">{course.cutFees}</span>
            ) : (
              <span className="text-red-500 line-through text-base">
                {course.name === 'Full Stack/Combo Course' || course.name === 'C, C++, Python, Java, HTML, CSS, JavaScript' ? '₹ 1,20,000' : `₹${(parseInt(course.fees.replace(/[^\d]/g, '')) + 15000).toLocaleString()}`}
              </span>
            )}
            <span className="text-gray-100 text-lg font-bold">{course.fees}</span>
          </span>
        </div>
        <div className="border-b border-[#1db954] border-opacity-30 my-4"></div>
        {course.syllabus && course.syllabus.length > 0 ? (
          <div className="mb-6">
            <ul className="list-disc pl-6 text-gray-100 text-base animate-fadeIn space-y-1 min-h-[96px]">
              {syllabusToShow.map((item, idx) => (
                <li key={idx} className={item ? undefined : "opacity-0 select-none pointer-events-none"}>{item || "-"}</li>
              ))}
            </ul>
            {hasMore && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <button
                    className="mt-4 flex items-center gap-1 text-[#1db954] underline font-semibold text-base hover:text-white transition-colors focus:outline-none"
                  >
                    See Full Syllabus
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-lg w-[95vw] sm:w-full bg-[#181f2a] rounded-2xl shadow-2xl border-0 p-0 overflow-hidden">
                  <div className="bg-[#1db954] px-8 py-5 flex items-center justify-between rounded-t-2xl">
                    <div className="flex items-center gap-3">
                      {getCourseIcon(course.name)}
                      <DialogTitle className="text-3xl font-extrabold text-white tracking-tight">{course.name}</DialogTitle>
                    </div>
                    <DialogClose asChild>
                      <button className="text-white hover:text-gray-200 text-3xl font-bold focus:outline-none">&times;</button>
                    </DialogClose>
                  </div>
                  <div className="px-8 pt-4 pb-8">
                    <div className="flex justify-between items-center text-gray-200 text-base mb-6">
                      <span>Duration: <span className="font-semibold">{course.duration}</span></span>
                      <div className="flex flex-col items-end">
                        <span className="text-red-500 line-through text-sm">₹{(parseInt(course.fees.replace(/[^\d]/g, '')) + 15000).toLocaleString()}</span>
                        <span className="text-white font-semibold">{course.fees}</span>
                      </div>
                    </div>
                    <div className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                      <ul className="list-disc pl-6 text-white text-lg space-y-3">
                        {course.syllabus.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    {/* Removed extra divider here */}
                    <div className="mt-8 flex justify-center">
                      <button 
                        onClick={() => {
                          navigate('/?scrollTo=apply');
                        }}
                        className="inline-flex items-center justify-center bg-[#1db954] hover:bg-[#17a74a] text-white py-3 px-8 rounded-xl shadow-lg font-bold text-lg transition-all duration-200 border-2 border-[#1db954] focus:outline-none focus:ring-2 focus:ring-[#1db954] group hover:-translate-y-1"
                      >
                        Apply Now
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        ) : (
          <div className="mb-6 flex items-center text-[#1db954] text-sm gap-2 opacity-80">
            <Info className="w-4 h-4" />
            {course.name === "C, C++, Python, Java, HTML, CSS, JavaScript"
              ? "Includes all listed courses"
              : "No syllabus available"}
          </div>
        )}
        {/* Move internship note to just above Apply Now button */}
        <div className="mt-auto">
          {course.internship && course.internship !== 'No' && (
            <div className="mb-4 text-xs text-red-400 font-medium">
              <span className="text-red-500 font-bold">*</span> Internship placement is subject to selection process and performance evaluation
            </div>
          )}
          <button 
            onClick={() => {
              navigate('/?scrollTo=apply');
            }}
            className="w-full inline-flex items-center justify-center bg-[#1db954] hover:bg-[#17a74a] text-white py-3 px-8 rounded-xl shadow-lg font-bold text-lg transition-all duration-200 border-2 border-[#1db954] focus:outline-none focus:ring-2 focus:ring-[#1db954] group hover:-translate-y-1"
          >
            Apply Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Categorize courses
const categories = [
  {
    name: "AI & ML",
    courses: courses.filter(c => ["AI ML", "Gen AI"].includes(c.name)),
  },
  {
    name: "Programming",
    courses: courses.filter(c => ["C", "C++", "Python", "Java", "JavaScript", "Cyprus"].includes(c.name)),
  },
  {
    name: "Web Development",
    courses: courses.filter(c => ["HTML, CSS", "JavaScript"].includes(c.name)),
  },
  {
    name: "Mobile App Development",
    courses: courses.filter(c => ["Flutter"].includes(c.name)),
  },
  {
    name: "Data & Database",
    courses: courses.filter(c => ["Power BI", "ETL Library", "MySQL"].includes(c.name)),
  },
  {
    name: "Excel",
    courses: courses.filter(c => ["Adv. Excel", "Master Excel (incl. VBA)"].includes(c.name)),
  },
  {
    name: "Full Stack/Combo",
    courses: courses.filter(c => ["C, C++, Python, Java, HTML, CSS, JavaScript"].includes(c.name)),
  },
  {
    name: "School Courses",
    courses: courses.filter(c => ["School Python", "School Java", "School AI & Web"].includes(c.name)),
  },
];

export default function Courses() {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return ( 
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-[#10141a] to-gray-950 font-sans text-gray-900">
      <Header isFaqPage={true} />
      <main className="flex-grow">
        <section className="pt-32 pb-12 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-1 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <div className="bg-white/20 text-white rounded-full px-4 py-1.5 font-medium text-sm">
                  AI GLOBAL TECH
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Discover Our Tech <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Courses</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
                Master in-demand skills with our expertly crafted courses
              </p>
            </div>
          </div>
        </section>
        <section className="py-20 relative overflow-hidden">
          {/* Subtle dot grid background pattern */}
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2" fill="%231db954" fill-opacity="0.3"/></svg>')`,
                backgroundRepeat: 'repeat'
              }}
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {categories.map(cat => cat.courses.length > 0 && (
              <div key={cat.name} className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-gray-200">{cat.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cat.courses.map((course) => (
                    <CourseCard key={course.name} course={course} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}