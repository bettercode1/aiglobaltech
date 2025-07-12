import { ArrowRight, Award, BookOpen, Brain, Sparkles, Download } from "lucide-react";
import { courses } from "@/lib/courses";
import { useLocation } from "wouter";
import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

function getCourseIcon(courseName: string) {
  if (courseName.toLowerCase().includes("python")) return <BookOpen className="inline-block mr-2 h-7 w-7 text-white" />;
  if (courseName.toLowerCase().includes("ai ml")) return <Brain className="inline-block mr-2 h-7 w-7 text-white" />;
  if (courseName.toLowerCase().includes("gen ai")) return <Sparkles className="inline-block mr-2 h-7 w-7 text-white" />;
  return <BookOpen className="inline-block mr-2 h-7 w-7 text-white" />;
}

function CourseCard({ course }: { course: typeof courses[0] }) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);
  const previewCount = 3;
  const hasMore = course.syllabus && course.syllabus.length > previewCount;
  const syllabusToShow = course.syllabus ? course.syllabus.slice(0, previewCount) : [];

  const handleBrochureDownload = async () => {
    setDownloading(true);
    try {
      // You can add authentication/authorization here
      const response = await fetch('/api/download-brochure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseName: course.name }),
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${course.name.replace(/\s+/g, '-')}-brochure.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Download failed. Please try again.');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="relative bg-[#202837] rounded-2xl shadow-xl overflow-hidden border-l-[6px] border-[#1db954] transition-all duration-300 hover:shadow-[#1db954]/30 hover:shadow-2xl hover:-translate-y-2 group flex flex-col min-w-[360px] max-w-[420px]">
      <div className="p-8 flex flex-col h-full">
        <div className="flex items-center mb-6">
          <span className="inline-flex items-center justify-center bg-[#1db954] text-white rounded-full p-2 mr-4 shadow-md">
            <BookOpen className="w-7 h-7" />
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-sans font-extrabold text-2xl md:text-3xl text-white tracking-tight drop-shadow mb-1">{course.name}</h3>
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
            <span className="text-red-500 line-through text-base">
              {course.name === 'Full Stack/Combo Course' ? '₹ 1,20,000' : `₹${(parseInt(course.fees.replace(/[^\d]/g, '')) + 15000).toLocaleString()}`}
            </span>
            <span className="text-gray-100 text-lg font-bold">{course.fees}</span>
          </span>
        </div>
        <div className="border-b border-[#1db954] border-opacity-30 my-4"></div>
        {course.syllabus && (
          <div className="mb-6">
            <ul className="list-disc pl-6 text-gray-100 text-base animate-fadeIn space-y-1">
              {syllabusToShow.map((item, idx) => (
                <li key={idx}>{item}</li>
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
                  </div>
                </DialogContent>
              </Dialog>
            )}
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
              if (window.location.pathname === "/") {
                const el = document.getElementById("apply");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              } else {
                window.location.href = "/#apply";
              }
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

export default function OtherCourses() {
  // Best 3 courses: AI ML, Gen AI, Full Stack/Combo Course
  const bestCourses = courses.filter(c => ["AI ML", "Gen AI", "Full Stack/Combo Course"].includes(c.name));

  const [, navigate] = useLocation();

  return (
    <section id="other-courses" className="py-20 bg-gradient-to-br from-black via-[#10141a] to-gray-950 min-h-[100vh] relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-900/30 via-transparent to-transparent"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <span className="text-cyan-400 font-bold tracking-widest uppercase">Our Courses</span>
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl mt-2 mb-4 tracking-tight text-white">Explore Our Other Courses</h2>
          <p className="max-w-3xl mx-auto text-cyan-200 mb-3 text-lg">
            Advance your career with our industry-focused programs. Apply now for the course that fits your goals!
          </p>
        </div>

        {/* Best Courses */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-10">
          {bestCourses.map((course) => (
            <CourseCard key={course.name} course={course} />
          ))}
        </div>

        <div className="text-center mt-14">
          <button
            className="inline-flex items-center justify-center bg-[#1db954] hover:bg-[#17a74a] text-white py-3 px-8 rounded-xl shadow-lg font-bold text-lg transition-all duration-200 border-2 border-transparent hover:border-[#1db954] focus:outline-none focus:ring-2 focus:ring-[#1db954]"
            onClick={() => {
              navigate('/courses');
              // Scroll to top after navigation
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            }}
          >
            See All Courses <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}