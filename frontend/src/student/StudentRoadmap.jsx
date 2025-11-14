import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, ExternalLink, GraduationCap, Briefcase, BookOpen, TrendingUp, Users, BarChart3, PieChart } from "lucide-react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const roadmapData = {
  "10th": [
    {
      id: "science",
      title: "Science",
      icon: <BookOpen className="w-6 h-6" />,
      color: "blue",
      description: "Physics, Chemistry, Mathematics/Biology",
      hasSubStreams: true,
      subStreams: {
        "mathematics": {
          title: "Science with Mathematics (PCM)",
          description: "Physics, Chemistry, Mathematics",
          degrees: ["B.Tech", "B.E", "B.Arch", "B.Sc Physics", "B.Sc Chemistry", "B.Sc Mathematics", "BCA", "B.Sc IT"],
          exams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE", "SRMJEEE", "WBJEE", "MHT CET", "KCET"],
          careers: ["Software Engineer", "Mechanical Engineer", "Civil Engineer", "Data Scientist", "Architect", "Research Scientist", "IT Consultant"],
          opportunities: "IT Sector, Manufacturing, Construction, Research & Development, Consulting, Startups, Government PSUs",
          specializations: ["Computer Science", "Mechanical", "Civil", "Electrical", "Electronics", "Chemical", "Aerospace"],
          topColleges: ["IITs", "NITs", "IIITs", "BITS Pilani", "VIT", "SRM Institute", "DTU", "NSIT"],
          salaryRange: "₹6-30 LPA",
          duration: "4 Years"
        },
        "biology": {
          title: "Science with Biology (PCB)",
          description: "Physics, Chemistry, Biology",
          degrees: ["MBBS", "BDS", "BAMS", "BHMS", "B.Pharm", "B.Sc Nursing", "BPT", "B.Sc Biotechnology", "B.Sc Botany", "B.Sc Zoology"],
          exams: ["NEET UG", "AIIMS", "JIPMER", "CMC Vellore", "Manipal University", "BHU PMT", "AFMC"],
          careers: ["Doctor", "Dentist", "Pharmacist", "Nurse", "Physiotherapist", "Biotechnologist", "Medical Lab Technician"],
          opportunities: "Healthcare, Pharmaceutical Industry, Research, Medical Tourism, Clinical Research, Government Health Services",
          specializations: ["General Medicine", "Surgery", "Pediatrics", "Gynecology", "Orthopedics", "Cardiology", "Neurology"],
          topColleges: ["AIIMS", "PGIMER", "CMC Vellore", "JIPMER", "KMC Manipal", "AFMC Pune", "MAMC Delhi"],
          salaryRange: "₹8-50 LPA",
          duration: "4.5-5.5 Years"
        }
      }
    },
    {
      id: "commerce",
      title: "Commerce",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "green",
      description: "Accountancy, Business Studies, Economics",
      hasSubStreams: true,
      subStreams: {
        "withMaths": {
          title: "Commerce with Mathematics",
          description: "Accountancy, Business Studies, Economics, Mathematics",
          degrees: ["B.Com (Hons)", "BBA", "B.Eco (Hons)", "CA Foundation", "CS Foundation", "B.Com Applied Economics", "BMS", "BBA LLB"],
          exams: ["CUET UG", "IPMAT", "BBA Entrance", "CA Foundation", "CS Foundation", "CMA Foundation", "NPAT", "SET"],
          careers: ["Chartered Accountant", "Investment Banker", "Data Analyst", "Financial Advisor", "Business Analyst", "Risk Manager"],
          opportunities: "Banking, Finance, Fintech, Consulting, Corporate Sector, Investment Banking, Financial Planning",
          specializations: ["Finance", "Marketing", "HR", "International Business", "Supply Chain", "Digital Marketing"],
          topColleges: ["SRCC", "LSR", "Hindu College", "IIM Indore (IPM)", "NMIMS", "Symbiosis", "Christ University"],
          salaryRange: "₹4-25 LPA",
          duration: "3 Years"
        },
        "withoutMaths": {
          title: "Commerce without Mathematics",
          description: "Accountancy, Business Studies, Economics",
          degrees: ["B.Com", "BBA", "Company Secretary", "Cost Management", "B.Com Corporate", "BBA Retail", "B.Com Taxation"],
          exams: ["CUET UG", "B.Com Admission", "CS Foundation", "CMA Foundation", "IPM", "DU JAT"],
          careers: ["Accountant", "Business Manager", "Company Secretary", "Tax Consultant", "Retail Manager", "Operations Manager"],
          opportunities: "Corporate Sector, Government Jobs, Tax Consulting, Retail Management, Entrepreneurship, Startups",
          specializations: ["Accounting", "Taxation", "Corporate Law", "Retail Management", "Entrepreneurship"],
          topColleges: ["Shri Ram College", "Lady Shri Ram", "Hans Raj College", "Miranda House", "IIM Rohtak"],
          salaryRange: "₹3-15 LPA",
          duration: "3 Years"
        }
      }
    },
    {
      id: "arts",
      title: "Arts/Humanities",
      icon: <Users className="w-6 h-6" />,
      color: "purple",
      description: "History, Political Science, Geography, Psychology",
      hasSubStreams: true,
      subStreams: {
        "law": {
          title: "Law and Legal Studies",
          description: "Legal Studies, Political Science, Economics",
          degrees: ["BA LLB", "BBA LLB", "LLB (3-year)", "LLM", "B.A Political Science", "B.A Sociology"],
          exams: ["CLAT", "LSAT", "AILET", "CUET UG", "DU LLB", "MH CET Law", "AP LAWCET"],
          careers: ["Lawyer", "Judge", "Legal Advisor", "Corporate Counsel", "Public Prosecutor", "Legal Journalist"],
          opportunities: "Corporate Law, Litigation, Judiciary, Legal Consulting, Government Services, International Law",
          specializations: ["Corporate Law", "Criminal Law", "Civil Law", "International Law", "Intellectual Property"],
          topColleges: ["NLSIU Bangalore", "NALSAR Hyderabad", "WBNUJS Kolkata", "NUALS Kochi", "GNLU Gandhinagar"],
          salaryRange: "₹5-40 LPA",
          duration: "5 Years"
        },
        "others": {
          title: "Liberal Arts & Humanities",
          description: "History, Political Science, Geography, Psychology, Sociology",
          degrees: ["BA", "BFA", "BJMC", "BSW", "B.Design", "B.Sc Psychology", "B.A Economics", "B.A English"],
          exams: ["CUET UG", "NID/NIFT", "IIMC Entrance", "JMI Entrance", "DUET", "BHU UET"],
          careers: ["Journalist", "Designer", "Social Worker", "Teacher", "Civil Servant", "Psychologist", "Content Writer"],
          opportunities: "Media, Design, Civil Services, Education, Social Sector, Creative Industries, Digital Marketing",
          specializations: ["Journalism", "Fine Arts", "Social Work", "Psychology", "Economics", "English Literature"],
          topColleges: ["St. Stephen's", "Miranda House", "JNU", "DU Colleges", "IIMC", "NID", "NIFT"],
          salaryRange: "₹3-20 LPA",
          duration: "3 Years"
        }
      }
    }
  ],
  "12th": [
    {
      id: "engineering",
      title: "Engineering",
      icon: <BookOpen className="w-6 h-6" />,
      color: "blue",
      description: "B.Tech/BE in various specializations",
      hasSubStreams: true,
      subStreams: {
        "cse": {
          title: "Computer Science & Engineering",
          description: "Software Development, AI, Machine Learning, Data Science",
          degrees: ["B.Tech CSE", "B.Tech AI & ML", "B.Tech Data Science", "BCA", "B.Sc IT", "B.Sc Computer Science"],
          exams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE", "SRMJEEE", "WBJEE", "MHT CET"],
          careers: ["Software Engineer", "Data Scientist", "AI Engineer", "Full Stack Developer", "DevOps Engineer", "Cloud Architect"],
          opportunities: "Tech Giants, Startups, MNCs, Research Labs, Freelancing, Remote Work, Product Companies",
          specializations: ["Artificial Intelligence", "Machine Learning", "Cybersecurity", "Cloud Computing", "Blockchain", "IoT"],
          topColleges: ["IITs", "NITs", "IIITs", "BITS Pilani", "VIT", "SRM Institute", "DTU", "NSIT"],
          salaryRange: "₹8-50 LPA",
          duration: "4 Years"
        },
        "mechanical": {
          title: "Mechanical Engineering",
          description: "Design, Manufacturing, Automotive, Aerospace",
          degrees: ["B.Tech Mechanical", "B.E Mechanical", "B.Tech Mechatronics", "B.Tech Automotive"],
          exams: ["JEE Main", "JEE Advanced", "VITEEE", "SRMJEEE", "WBJEE", "MHT CET"],
          careers: ["Mechanical Engineer", "Design Engineer", "Automotive Engineer", "Manufacturing Engineer", "R&D Engineer"],
          opportunities: "Automotive Industry, Manufacturing, Aerospace, Energy Sector, Consulting, Government PSUs",
          specializations: ["Automotive", "Aerospace", "Thermal Engineering", "Robotics", "CAD/CAM", "Manufacturing"],
          topColleges: ["IITs", "NITs", "BITS Pilani", "VIT", "SRM Institute", "DTU", "MIT Manipal"],
          salaryRange: "₹6-25 LPA",
          duration: "4 Years"
        },
        "civil": {
          title: "Civil Engineering",
          description: "Construction, Infrastructure, Urban Planning",
          degrees: ["B.Tech Civil", "B.E Civil", "B.Tech Construction", "B.Arch"],
          exams: ["JEE Main", "JEE Advanced", "VITEEE", "SRMJEEE", "WBJEE", "MHT CET", "NATA"],
          careers: ["Civil Engineer", "Structural Engineer", "Urban Planner", "Construction Manager", "Site Engineer"],
          opportunities: "Construction Companies, Real Estate, Government Projects, Infrastructure Development, Consulting",
          specializations: ["Structural Engineering", "Transportation", "Urban Planning", "Environmental", "Construction Management"],
          topColleges: ["IITs", "NITs", "BITS Pilani", "VIT", "SRM Institute", "DTU", "SPA Delhi"],
          salaryRange: "₹5-20 LPA",
          duration: "4 Years"
        },
        "electronics": {
          title: "Electronics & Communication",
          description: "Circuits, Communication, VLSI, Embedded Systems",
          degrees: ["B.Tech ECE", "B.E ECE", "B.Tech EEE", "B.Tech VLSI"],
          exams: ["JEE Main", "JEE Advanced", "VITEEE", "SRMJEEE", "WBJEE", "MHT CET"],
          careers: ["Electronics Engineer", "VLSI Designer", "Communication Engineer", "Embedded Systems Engineer", "RF Engineer"],
          opportunities: "Semiconductor Industry, Telecom, Electronics Manufacturing, R&D, Defense, IoT Companies",
          specializations: ["VLSI Design", "Embedded Systems", "Communication Systems", "Signal Processing", "RF Engineering"],
          topColleges: ["IITs", "NITs", "IIITs", "BITS Pilani", "VIT", "SRM Institute", "DTU"],
          salaryRange: "₹7-30 LPA",
          duration: "4 Years"
        }
      }
    },
    {
      id: "medical",
      title: "Medical",
      icon: <BookOpen className="w-6 h-6" />,
      color: "red",
      description: "MBBS, BDS, BAMS, BHMS, B.Pharm",
      hasSubStreams: true,
      subStreams: {
        "mbbs": {
          title: "MBBS & Allied Medical",
          description: "Allopathic Medicine, Surgery, Specializations",
          degrees: ["MBBS", "BDS", "BAMS", "BHMS", "BUMS"],
          exams: ["NEET UG", "AIIMS", "JIPMER", "CMC Vellore", "Manipal University", "BHU PMT"],
          careers: ["Doctor", "Surgeon", "Dentist", "Physician", "Specialist", "Medical Officer"],
          opportunities: "Hospitals, Private Practice, Research, Medical Colleges, Government Health Services, Armed Forces",
          specializations: ["General Medicine", "Surgery", "Pediatrics", "Gynecology", "Orthopedics", "Cardiology"],
          topColleges: ["AIIMS", "PGIMER", "CMC Vellore", "JIPMER", "KMC Manipal", "AFMC Pune", "MAMC Delhi"],
          salaryRange: "₹10-80 LPA",
          duration: "5.5 Years"
        },
        "pharmacy": {
          title: "Pharmacy & Pharmaceutical Sciences",
          description: "Drug Development, Clinical Research, Healthcare",
          degrees: ["B.Pharm", "Pharm.D", "B.Sc Nursing", "BPT", "B.Sc Biotechnology"],
          exams: ["NEET UG", "GPAT", "MJPRU", "BHU PET", "Manipal University"],
          careers: ["Pharmacist", "Medical Representative", "Clinical Researcher", "Quality Control", "Regulatory Affairs"],
          opportunities: "Pharma Companies, Hospitals, Research Labs, Clinical Research Organizations, Government Sector",
          specializations: ["Clinical Pharmacy", "Pharmaceutical Chemistry", "Pharmacology", "Quality Assurance", "Regulatory Affairs"],
          topColleges: ["BHU", "Jamia Hamdard", "Manipal College", "BITS Pilani", "JSS College", "NIPER"],
          salaryRange: "₹4-25 LPA",
          duration: "4 Years"
        },
        "allied": {
          title: "Allied Health Sciences",
          description: "Therapy, Diagnostics, Rehabilitation",
          degrees: ["BPT", "BOT", "B.Sc Nutrition", "BMLT", "B.Sc Radiology", "B.Optom"],
          exams: ["NEET UG", "AIIMS", "JIPMER", "Manipal University", "BHU PET"],
          careers: ["Physiotherapist", "Nutritionist", "Lab Technician", "Radiologist", "Optometrist", "Occupational Therapist"],
          opportunities: "Hospitals, Rehabilitation Centers, Diagnostic Labs, Fitness Industry, Sports Medicine, Private Practice",
          specializations: ["Sports Physiotherapy", "Clinical Nutrition", "Medical Imaging", "Rehabilitation", "Public Health"],
          topColleges: ["AIIMS", "PGIMER", "CMC Vellore", "KMC Manipal", "Manipal University", "Sri Ramachandra"],
          salaryRange: "₹3-15 LPA",
          duration: "3-4 Years"
        }
      }
    },
    {
      id: "management",
      title: "Management",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "green",
      description: "BBA, B.Com, Integrated MBA",
      hasSubStreams: true,
      subStreams: {
        "bba": {
          title: "Business Administration",
          description: "Business Management, Marketing, Finance, HR",
          degrees: ["BBA", "BBA LLB", "Integrated MBA", "BBA Foreign Trade", "BBA Aviation"],
          exams: ["IPMAT", "CUET", "SET", "NPAT", "DU JAT", "Christ University Entrance"],
          careers: ["Business Analyst", "Marketing Manager", "HR Manager", "Consultant", "Project Manager"],
          opportunities: "Corporate Sector, Startups, Banking, Consulting, E-commerce, Family Business",
          specializations: ["Marketing", "Finance", "HR", "International Business", "Supply Chain", "Digital Marketing"],
          topColleges: ["IIM Indore (IPM)", "NMIMS", "Symbiosis", "Christ University", "Shaheed Sukhdev College", "SRCC"],
          salaryRange: "₹4-20 LPA",
          duration: "3-5 Years"
        },
        "commerce": {
          title: "Commerce & Finance",
          description: "Accounting, Finance, Economics, Taxation",
          degrees: ["B.Com Hons", "B.Com Professional", "B.Com Applied Economics", "B.Financial Analysis"],
          exams: ["CUET UG", "DU JAT", "IPMAT", "BHU UET", "JNU Entrance"],
          careers: ["Chartered Accountant", "Financial Analyst", "Investment Banker", "Tax Consultant", "Risk Manager"],
          opportunities: "Banking, Finance, Fintech, Consulting, Corporate Sector, Investment Banking, Financial Planning",
          specializations: ["Accounting", "Taxation", "Financial Analysis", "Corporate Finance", "Investment Banking"],
          topColleges: ["SRCC", "LSR", "Hindu College", "Shri Ram College", "Miranda House", "IIM Rohtak"],
          salaryRange: "₹5-30 LPA",
          duration: "3 Years"
        },
        "professional": {
          title: "Professional Courses",
          description: "CA, CS, CMA, Actuarial Science",
          degrees: ["CA Foundation", "CS Foundation", "CMA Foundation", "Actuarial Science", "B.Com Professional"],
          exams: ["CA Foundation", "CS Foundation", "CMA Foundation", "ACET", "CUET UG"],
          careers: ["Chartered Accountant", "Company Secretary", "Cost Accountant", "Actuary", "Financial Consultant"],
          opportunities: "Corporate Sector, Consulting Firms, Banking, Insurance, Government Jobs, Private Practice",
          specializations: ["Audit & Assurance", "Corporate Law", "Cost Management", "Risk Management", "Tax Advisory"],
          topColleges: ["ICAI", "ICSI", "ICMAI", "Institute of Actuaries", "Delhi University", "Mumbai University"],
          salaryRange: "₹6-40 LPA",
          duration: "3-5 Years"
        }
      }
    },
    {
      id: "design",
      title: "Design & Arts",
      icon: <Users className="w-6 h-6" />,
      color: "purple",
      description: "B.Des, BFA, B.Arch, Fashion Design",
      hasSubStreams: true,
      subStreams: {
        "fashion": {
          title: "Fashion & Textile Design",
          description: "Fashion Designing, Textile Technology, Apparel Industry",
          degrees: ["B.Des Fashion", "BFTech", "B.Sc Fashion Design", "B.Des Textile"],
          exams: ["NIFT", "Pearl Academy", "UID", "MIT World Peace University", "AIEED"],
          careers: ["Fashion Designer", "Textile Designer", "Fashion Stylist", "Merchandiser", "Fashion Illustrator"],
          opportunities: "Fashion Houses, Retail Brands, E-commerce, Media, Entertainment, Entrepreneurship",
          specializations: ["Fashion Design", "Textile Design", "Fashion Communication", "Fashion Management", "Accessory Design"],
          topColleges: ["NIFT", "Pearl Academy", "UID", "MIT World Peace", "Srishti Institute", "IIAD"],
          salaryRange: "₹3-15 LPA",
          duration: "4 Years"
        },
        "interior": {
          title: "Interior & Architecture",
          description: "Interior Design, Architecture, Urban Planning",
          degrees: ["B.Arch", "B.Des Interior", "B.Plan", "B.Sc Interior Design"],
          exams: ["NATA", "JEE Main (Paper 2)", "NID", "CEPT", "Manipal University"],
          careers: ["Architect", "Interior Designer", "Urban Planner", "Landscape Architect", "3D Visualizer"],
          opportunities: "Architecture Firms, Real Estate, Construction, Government Projects, Freelancing, Consulting",
          specializations: ["Interior Design", "Architecture", "Urban Planning", "Landscape Architecture", "Sustainable Design"],
          topColleges: ["SPA Delhi", "IIT Roorkee", "NIT Trichy", "CEPT University", "Manipal University", "Jadavpur University"],
          salaryRange: "₹4-25 LPA",
          duration: "4-5 Years"
        },
        "digital": {
          title: "Digital & Communication Design",
          description: "UI/UX, Graphic Design, Animation, Visual Effects",
          degrees: ["B.Des Communication", "B.Des Graphic", "B.Sc Animation", "BFA"],
          exams: ["NID", "MIT World Peace", "UID", "Srishti Institute", "Pearl Academy"],
          careers: ["UI/UX Designer", "Graphic Designer", "Animator", "VFX Artist", "Motion Graphics Designer"],
          opportunities: "Tech Industry, Media, Advertising, Entertainment, Gaming, E-learning, Freelancing",
          specializations: ["UI/UX Design", "Graphic Design", "Animation", "VFX", "Motion Graphics", "Game Design"],
          topColleges: ["NID", "MIT World Peace", "UID", "Srishti Institute", "Pearl Academy", "IIAD"],
          salaryRange: "₹3-20 LPA",
          duration: "4 Years"
        }
      }
    }
  ],
  "UG": [
    {
      id: "tech",
      title: "Technology & IT",
      icon: <BookOpen className="w-6 h-6" />,
      color: "blue",
      description: "Software development, data science, cloud computing",
      hasSubStreams: true,
      subStreams: {
        "development": {
          title: "Software Development",
          description: "Full Stack, Mobile, Web Development",
          degrees: ["M.Tech CSE", "MCA", "M.Sc Computer Science", "MS Software Engineering", "Post Graduate Diploma in IT"],
          exams: ["GATE", "CUET PG", "University Entrance", "NIMCET", "IIT JAM"],
          careers: ["Software Engineer", "Full Stack Developer", "Mobile App Developer", "DevOps Engineer", "Technical Lead"],
          opportunities: "Product Companies, Startups, Consulting, Freelancing, Remote Work, MNCs",
          specializations: ["Frontend Development", "Backend Development", "Mobile Development", "Cloud Architecture", "DevOps"],
          topColleges: ["IITs", "IIITs", "NITs", "BITS Pilani", "VIT", "SRM Institute", "DTU", "NSIT"],
          salaryRange: "₹8-50 LPA",
          duration: "2 Years"
        },
        "data": {
          title: "Data Science & AI",
          description: "Machine Learning, Data Analytics, Artificial Intelligence",
          degrees: ["M.Tech AI & ML", "M.Sc Data Science", "MS Business Analytics", "MCA AI", "Post Graduate Diploma in Data Science"],
          exams: ["GATE", "CUET PG", "CAT", "University Entrance", "IIT JAM"],
          careers: ["Data Scientist", "ML Engineer", "Data Analyst", "AI Researcher", "Business Intelligence Analyst"],
          opportunities: "Tech Companies, Research Labs, Consulting, Finance, Healthcare, E-commerce",
          specializations: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Data Engineering"],
          topColleges: ["IITs", "IIITs", "IISc", "NITs", "IIMs", "ISI", "BITS Pilani"],
          salaryRange: "₹10-60 LPA",
          duration: "2 Years"
        },
        "cloud": {
          title: "Cloud Computing & DevOps",
          description: "Cloud Architecture, DevOps, Infrastructure",
          degrees: ["M.Tech Cloud Computing", "M.Sc IT", "MS Cloud Architecture", "Post Graduate Diploma in Cloud Computing"],
          exams: ["GATE", "CUET PG", "University Entrance", "IIT JAM"],
          careers: ["Cloud Engineer", "Cloud Architect", "DevOps Engineer", "Infrastructure Engineer", "SRE"],
          opportunities: "Cloud Providers, Tech Companies, Startups, Consulting, Financial Services",
          specializations: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Terraform", "DevOps"],
          topColleges: ["IITs", "IIITs", "NITs", "VIT", "SRM Institute", "Manipal University"],
          salaryRange: "₹12-70 LPA",
          duration: "2 Years"
        }
      }
    },
    {
      id: "management",
      title: "Management & Business",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "green",
      description: "MBA, business administration, and leadership programs",
      hasSubStreams: true,
      subStreams: {
        "mba": {
          title: "MBA Programs",
          description: "Business Administration, Leadership, Strategy",
          degrees: ["MBA", "PGDM", "Executive MBA", "Online MBA", "MBA International Business"],
          exams: ["CAT", "XAT", "GMAT", "SNAP", "MAT", "CMAT", "NMAT"],
          careers: ["Product Manager", "Business Consultant", "Investment Banker", "Marketing Head", "CEO"],
          opportunities: "MNCs, Consulting Firms, Investment Banking, Startups, Family Business, Government",
          specializations: ["Finance", "Marketing", "HR", "Operations", "Strategy", "International Business"],
          topColleges: ["IIMs", "XLRI", "FMS", "SP Jain", "MDI", "NMIMS", "ISB", "IIFT"],
          salaryRange: "₹15-80 LPA",
          duration: "2 Years"
        },
        "specialized": {
          title: "Specialized Management",
          description: "Domain-specific management programs",
          degrees: ["MHA", "MHM", "MBA Rural", "MBA Agri", "MBA Energy", "MBA Digital Marketing"],
          exams: ["CAT", "XAT", "GMAT", "Institute-specific exams", "CUET PG"],
          careers: ["Hospital Administrator", "Hotel Manager", "Rural Manager", "Energy Consultant", "Digital Marketing Manager"],
          opportunities: "Healthcare, Hospitality, Rural Development, Agriculture, Energy Sector, Digital Marketing",
          specializations: ["Healthcare Management", "Hospitality", "Rural Management", "Agriculture", "Energy", "Digital Marketing"],
          topColleges: ["TISS", "IHMs", "IRMA", "IIM Ahmedabad", "XLRI", "MDI", "Amity University"],
          salaryRange: "₹8-40 LPA",
          duration: "2 Years"
        }
      }
    },
    {
      id: "government",
      title: "Government Services",
      icon: <Users className="w-6 h-6" />,
      color: "orange",
      description: "Civil services and public sector jobs",
      hasSubStreams: true,
      subStreams: {
        "civil": {
          title: "Civil Services",
          description: "IAS, IPS, IFS and other administrative services",
          degrees: ["No specific degree required", "Graduation in any discipline"],
          exams: ["UPSC CSE", "State PSC", "IES", "Forest Services", "CAPF"],
          careers: ["Civil Servant", "District Collector", "Police Commissioner", "Diplomat", "Income Tax Officer"],
          opportunities: "Central Government, State Government, Administrative Services, Policy Making",
          specializations: ["Administration", "Police Services", "Foreign Services", "Revenue Services", "Engineering Services"],
          topColleges: ["No specific college - requires exam preparation", "Vajiram & Ravi", "Drishti IAS", "Vision IAS", "Chanakya IAS"],
          salaryRange: "₹8-25 LPA",
          duration: "Career Long"
        },
        "banking": {
          title: "Banking & Finance",
          description: "Public sector banks, RBI, financial institutions",
          degrees: ["Graduation in any discipline", "B.Com", "BBA", "BA Economics"],
          exams: ["IBPS PO", "IBPS Clerk", "SBI PO", "RBI Grade B", "SEBI Grade A", "NABARD"],
          careers: ["Bank Officer", "Branch Manager", "RBI Officer", "Financial Analyst", "Relationship Manager"],
          opportunities: "Public Sector Banks, RBI, NABARD, SIDBI, Financial Institutions, Insurance Companies",
          specializations: ["Banking Operations", "Risk Management", "Treasury", "Credit Analysis", "Compliance"],
          topColleges: ["No specific college - requires exam preparation", "Oliveboard", "Testbook", "Adda247", "Gradeup"],
          salaryRange: "₹6-20 LPA",
          duration: "Career Long"
        },
        "psu": {
          title: "PSU Jobs",
          description: "Public Sector Undertakings and government companies",
          degrees: ["B.Tech", "BE", "M.Tech", "MBA", "CA", "CS"],
          exams: ["GATE", "PSU-specific exams", "UGC NET", "SSC", "PSU Direct Recruitment"],
          careers: ["PSU Manager", "Engineer", "Executive", "Officer", "Technical Lead", "Management Trainee"],
          opportunities: ["ONGC", "IOCL", "BHEL", "NTPC", "SAIL", "GAIL", "Coal India", "HPCL", "BPCL"],
          specializations: ["Engineering", "Management", "Finance", "HR", "Technical Operations", "Marketing"],
          topColleges: ["Engineering Colleges", "Management Institutes", "Government Training Centers", "IITs", "NITs"],
          salaryRange: "₹8-30 LPA",
          duration: "Career Long"
        }
      }
    },
    {
      id: "research",
      title: "Research & Higher Studies",
      icon: <BookOpen className="w-6 h-6" />,
      color: "purple",
      description: "Advanced academic and research paths",
      hasSubStreams: true,
      subStreams: {
        "masters": {
          title: "Master's Programs",
          description: "M.Tech, MS, M.Sc, specialized master's degrees",
          degrees: ["M.Tech", "MS", "M.Sc", "MCA", "M.Com", "MA", "M.Phil"],
          exams: ["GATE", "GRE", "TOEFL", "IELTS", "CUET PG", "University-specific exams", "IIT JAM"],
          careers: ["Research Engineer", "Senior Developer", "Academic Researcher", "Specialist", "Project Manager"],
          opportunities: "Universities, Research Labs, Corporate R&D, International Opportunities, Government Research",
          specializations: ["Computer Science", "Electronics", "Mechanical", "Physics", "Chemistry", "Mathematics", "Biotechnology"],
          topColleges: ["IITs", "IISc", "NITs", "IISERs", "Foreign Universities", "Central Universities", "JNU", "DU"],
          salaryRange: "₹6-25 LPA",
          duration: "2 Years"
        },
        "phd": {
          title: "Doctoral Programs",
          description: "PhD and post-doctoral research opportunities",
          degrees: ["PhD", "Post Doc", "Research Fellowship", "D.Sc"],
          exams: ["UGC NET", "CSIR NET", "GATE", "GRE", "University interviews", "DBT JRF", "ICMR JRF"],
          careers: ["Research Scientist", "Professor", "R&D Head", "Academic Researcher", "Scientist", "Post Doctoral Fellow"],
          opportunities: "Universities, Research Labs, Corporate R&D, International Research, Government Labs, ISRO, DRDO",
          specializations: ["Pure Sciences", "Engineering", "Social Sciences", "Medicine", "Interdisciplinary Research", "Applied Sciences"],
          topColleges: ["IISc", "IITs", "TIFR", "JNU", "Foreign Universities", "ISRO", "DRDO", "IISERs"],
          salaryRange: "₹8-50 LPA",
          duration: "4-6 Years"
        },
        "international": {
          title: "International Studies",
          description: "Study abroad and international research opportunities",
          degrees: ["MS (Abroad)", "PhD (Abroad)", "Post Doc (Abroad)", "Research Fellowship", "Dual Degree Programs"],
          exams: ["GRE", "TOEFL", "IELTS", "GMAT", "University-specific requirements", "SAT Subject Tests"],
          careers: ["International Researcher", "Global Consultant", "Multinational Executive", "Academic", "Research Scientist"],
          opportunities: "International Universities, Global Companies, Research Institutions, UN Organizations, World Bank, IMF",
          specializations: ["Engineering", "Sciences", "Management", "Social Sciences", "Arts", "Medicine", "Law"],
          topColleges: ["MIT", "Stanford", "Harvard", "Oxford", "Cambridge", "ETH Zurich", "NUS", "Caltech", "Princeton"],
          salaryRange: "₹20-1 Crore",
          duration: "2-6 Years"
        }
      }
    }
  ]
};

const StudentRoadmap = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentLevel, setCurrentLevel] = useState("10th");
  const [userClass, setUserClass] = useState("10th");
  const [selectedStream, setSelectedStream] = useState(null);
  const [selectedSubStream, setSelectedSubStream] = useState(null);
  const [navigationLevel, setNavigationLevel] = useState('main'); // main, stream, substream

  useEffect(() => {
    // Extract user class from login form or context
    // For now, default to 10th
    const storedClass = localStorage.getItem('userClass') || "10th";
    setUserClass(storedClass);
    setCurrentLevel(storedClass);
  }, []);

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const selectStream = (streamId) => {
    setSelectedStream(streamId);
    setNavigationLevel('stream');
  };

  const selectSubStream = (subStreamId) => {
    setSelectedSubStream(subStreamId);
    setNavigationLevel('substream');
  };

  const goBack = () => {
    if (navigationLevel === 'substream') {
      setNavigationLevel('stream');
      setSelectedSubStream(null);
    } else if (navigationLevel === 'stream') {
      setNavigationLevel('main');
      setSelectedStream(null);
    }
  };

  const currentLevelData = roadmapData[currentLevel] || [];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-gradient-to-r from-blue-500 to-blue-600",
        hover: "hover:from-blue-600 hover:to-blue-700",
        light: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        chart: "rgba(59, 130, 246, 0.8)"
      },
      green: {
        bg: "bg-gradient-to-r from-green-500 to-green-600",
        hover: "hover:from-green-600 hover:to-green-700",
        light: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        chart: "rgba(34, 197, 94, 0.8)"
      },
      purple: {
        bg: "bg-gradient-to-r from-purple-500 to-purple-600",
        hover: "hover:from-purple-600 hover:to-purple-700",
        light: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200",
        chart: "rgba(168, 85, 247, 0.8)"
      },
      red: {
        bg: "bg-gradient-to-r from-red-500 to-red-600",
        hover: "hover:from-red-600 hover:to-red-700",
        light: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        chart: "rgba(239, 68, 68, 0.8)"
      },
      orange: {
        bg: "bg-gradient-to-r from-orange-500 to-orange-600",
        hover: "hover:from-orange-600 hover:to-orange-700",
        light: "bg-orange-50",
        text: "text-orange-700",
        border: "border-orange-200",
        chart: "rgba(251, 146, 60, 0.8)"
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  const getChartData = () => {
    const data = roadmapData[currentLevel];
    if (!data) return null;

    const labels = data.map(item => item.title);
    const colors = data.map(item => getColorClasses(item.color).chart);
    
    // Mock data for demonstration
    const values = currentLevel === "10th" ? [45, 30, 25] : 
                   currentLevel === "12th" ? [35, 25, 20, 20] : 
                   [30, 25, 25, 20];

    return {
      labels,
      datasets: [
        {
          label: 'Student Preference (%)',
          data: values,
          backgroundColor: colors,
          borderColor: colors.map(color => color.replace('0.8', '1')),
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    };
  };

  const getPieChartData = () => {
    const data = roadmapData[currentLevel];
    if (!data) return null;

    const labels = data.map(item => item.title);
    const colors = data.map(item => getColorClasses(item.color).chart);
    const values = currentLevel === "10th" ? [45, 30, 25] : 
                   currentLevel === "12th" ? [35, 25, 20, 20] : 
                   [30, 25, 25, 20];

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          borderColor: '#ffffff',
          borderWidth: 2,
        },
      ],
    };
  };

  const getLevelTitle = () => {
    switch(currentLevel) {
      case "10th": return "Stream Selection Guide";
      case "12th": return "Career Path Explorer";
      case "UG": return "Professional Growth Roadmap";
      default: return "Academic Roadmap";
    }
  };

  const MainStreamCard = ({ stream, index }) => {
    const colors = getColorClasses(stream.color);

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
        className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-600 backdrop-blur-lg cursor-pointer hover:border-blue-400/50 transition-all duration-300"
        onClick={() => selectStream(stream.id)}
      >
        <div className="relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-32 h-32 ${colors.chart} rounded-full -mr-16 -mt-16 opacity-20 blur-xl`}></div>
          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`p-4 rounded-2xl ${colors.light} ${colors.text} shadow-lg border-2 ${colors.border}`}
                >
                  {stream.icon}
                </motion.div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {stream.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-400 mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {stream.description}
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-cyan-400"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${colors.text} ${colors.light} border ${colors.border}`}>
                Click to Explore →
              </span>
              <div className="flex gap-2">
                {stream.hasSubStreams && (
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-medium border border-cyan-500/30">
                    Multiple Options
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const SubStreamCard = ({ subStreamId, subStreamData, index }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ x: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
        className="bg-linear-to-br from-slate-700 to-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-600 cursor-pointer hover:border-blue-400/50 transition-all duration-300"
        onClick={() => selectSubStream(subStreamId)}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h4 className="text-lg md:text-xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {subStreamData.title}
              </h4>
              <p className="text-sm text-gray-400 mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {subStreamData.description}
              </p>
            </div>
            <ChevronRight className="w-6 h-6 text-cyan-400 flex-shrink-0 ml-4" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <div className="text-xl md:text-2xl font-bold text-cyan-400">{subStreamData.degrees.length}</div>
              <div className="text-xs text-gray-400">Degree Options</div>
            </div>
            <div className="text-center p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <div className="text-xl md:text-2xl font-bold text-purple-400">{subStreamData.careers.length}</div>
              <div className="text-xs text-gray-400">Career Paths</div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const DetailedRoadmapView = () => {
    const streamData = roadmapData[currentLevel].find(s => s.id === selectedStream);
    const subStreamData = streamData?.subStreams[selectedSubStream];
    const colors = getColorClasses(streamData?.color || "blue");

    if (!subStreamData) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <motion.button
          onClick={goBack}
          whileHover={{ x: -5 }}
          className="flex items-center gap-3 text-blue-400 hover:text-blue-300 font-semibold text-lg bg-slate-700/60 px-4 py-2 rounded-lg border border-slate-600 hover:border-blue-400/50 transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Back to {streamData.title} Options
        </motion.button>

        <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {subStreamData.title}
          </h2>
          <p className="text-lg opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {subStreamData.description}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold">{subStreamData.degrees.length}+</div>
              <div className="text-sm opacity-90">Degree Programs</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold">{subStreamData.exams.length}+</div>
              <div className="text-sm opacity-90">Entrance Exams</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold">{subStreamData.careers.length}+</div>
              <div className="text-sm opacity-90">Career Options</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold">{subStreamData.duration}</div>
              <div className="text-sm opacity-90">Duration</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-700/60 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-slate-600">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <GraduationCap className="w-6 h-6 text-cyan-400" />
              Available Degrees
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {subStreamData.degrees.map((degree, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3 text-center hover:bg-cyan-500/20 transition-colors"
                >
                  <span className="text-sm font-semibold text-cyan-300">{degree}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-slate-700/60 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-slate-600">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <BookOpen className="w-6 h-6 text-purple-400" />
              Entrance Exams
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {subStreamData.exams.map((exam, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-3 text-center hover:bg-purple-500/20 transition-colors"
                >
                  <span className="text-sm font-semibold text-purple-300">{exam}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-700/60 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-slate-600">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <Briefcase className="w-6 h-6 text-pink-400" />
            Career Opportunities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subStreamData.careers.map((career, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-xl p-4 text-center hover:from-pink-500/20 hover:to-purple-500/20 transition-all duration-300"
              >
                <span className="text-sm font-semibold text-pink-300">{career}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-700/60 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-slate-600">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <TrendingUp className="w-6 h-6 text-orange-400" />
              Specializations
            </h3>
            <div className="space-y-2">
              {subStreamData.specializations.map((spec, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg hover:bg-orange-500/20 transition-colors"
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm font-medium text-orange-300">{spec}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-slate-700/60 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-slate-600">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <Users className="w-6 h-6 text-indigo-400" />
              Top Colleges
            </h3>
            <div className="space-y-2">
              {subStreamData.topColleges.map((college, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/20 transition-colors"
                >
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  <span className="text-sm font-medium text-indigo-300">{college}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-600/20 to-slate-700/20 backdrop-blur-lg rounded-2xl p-6 text-white border border-slate-500/30">
          <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            💰 Salary Range & Duration
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
              <div className="text-lg opacity-90 mb-2">Expected Salary Range</div>
              <div className="text-2xl md:text-3xl font-bold text-green-300">{subStreamData.salaryRange}</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
              <div className="text-lg opacity-90 mb-2">Course Duration</div>
              <div className="text-2xl md:text-3xl font-bold text-teal-300">{subStreamData.duration}</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-600/20 via-slate-700/20 to-slate-600/20 backdrop-blur-lg rounded-2xl p-6 text-white border border-slate-500/30">
          <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            🚀 Key Opportunities & Growth
          </h3>
          <p className="text-lg leading-relaxed opacity-95" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {subStreamData.opportunities}
          </p>
        </div>
      </motion.div>
    );
  };



  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { family: 'Inter, sans-serif', size: 14 },
        bodyFont: { family: 'Inter, sans-serif', size: 12 },
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: { family: 'Inter, sans-serif' },
          color: '#6B7280'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: { family: 'Inter, sans-serif', size: 12 },
          color: '#6B7280'
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { family: 'Inter, sans-serif', size: 12 },
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { family: 'Inter, sans-serif', size: 14 },
        bodyFont: { family: 'Inter, sans-serif', size: 12 },
        cornerRadius: 8,
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800">
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            🎓 {getLevelTitle()}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Your comprehensive academic journey starts here. Explore detailed roadmaps, career opportunities, and make informed decisions for your future.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12"
        >
          {["10th", "12th", "UG"].map((lvl, index) => (
            <motion.button
              key={lvl}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => {
                setCurrentLevel(lvl);
                setNavigationLevel('main');
                setSelectedStream(null);
                setSelectedSubStream(null);
              }}
              className={`px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 transform ${
                currentLevel === lvl
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl scale-105 border-2 border-cyan-400/30"
                  : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 border-2 border-gray-600 hover:border-cyan-500/50 hover:shadow-lg backdrop-blur-sm"
              }`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {lvl === "UG" ? "🎓 After Graduation" : `📚 Class ${lvl}`}
            </motion.button>
          ))}
        </motion.div>

        {navigationLevel === 'main' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">📖</span>
                    Choose Your Academic Path
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentLevelData.map((stream, index) => (
                      <MainStreamCard key={stream.id} stream={stream} index={index} />
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-slate-700/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-slate-600"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                    Student Preferences
                  </h3>
                  <div className="h-64">
                    {getChartData() && <Bar data={getChartData()} options={chartOptions} />}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-slate-700/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-slate-600"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <PieChart className="w-6 h-6 text-purple-400" />
                    Distribution Analysis
                  </h3>
                  <div className="h-64">
                    {getPieChartData() && <Pie data={getPieChartData()} options={pieChartOptions} />}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="bg-gradient-to-r from-slate-600/20 to-slate-700/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-slate-500/30"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                      <span className="text-gray-300">Total Options</span>
                      <span className="text-white font-bold">{currentLevelData.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                      <span className="text-gray-300">Career Paths</span>
                      <span className="text-white font-bold">50+</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                      <span className="text-gray-300">Success Rate</span>
                      <span className="text-white font-bold">95%</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {navigationLevel === 'stream' && selectedStream && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <span className="text-3xl md:text-4xl">🔍</span>
                Choose Your Specialization
              </h2>
              <motion.button
                onClick={goBack}
                whileHover={{ x: -3 }}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium bg-slate-700/60 px-4 py-2 rounded-lg border border-slate-600 hover:border-blue-400/50 transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back
              </motion.button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(roadmapData[currentLevel].find(s => s.id === selectedStream).subStreams).map(([subStreamId, subStreamData], index) => (
                <SubStreamCard key={subStreamId} subStreamId={subStreamId} subStreamData={subStreamData} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {navigationLevel === 'substream' && selectedSubStream && (
          <DetailedRoadmapView />
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-slate-600/20 via-slate-700/20 to-slate-600/20 backdrop-blur-lg rounded-3xl shadow-xl p-6 md:p-8 border border-slate-500/20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            🎯 Expert Guidance & Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <motion.div 
              whileHover={{ scale: 1.03, y: -3 }}
              className="bg-slate-600/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-slate-500/20 hover:bg-slate-600/15 transition-all"
            >
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">🔍</div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Research Thoroughly
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                Explore all available options, understand requirements, and make informed decisions based on your interests and strengths.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.03, y: -3 }}
              className="bg-slate-600/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-slate-500/20 hover:bg-slate-600/15 transition-all"
            >
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">❤️</div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Follow Your Passion
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                Choose a path that aligns with your natural interests and strengths for long-term success and satisfaction.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.03, y: -3 }}
              className="bg-slate-600/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-slate-500/20 hover:bg-slate-600/15 transition-all"
            >
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">🚀</div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Future Growth
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                Consider fields with strong career prospects, continuous learning opportunities, and industry growth potential.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );


};

export default StudentRoadmap;