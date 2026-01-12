
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, GraduationCap, School, Layers, FileBox, 
  ArrowUp, ArrowDown, Bell, Filter, CheckCircle, XCircle, AlertCircle, RotateCcw, Ban,
  CreditCard, TrendingUp, Activity, UserPlus, Clock, Calendar, Download, FileText, FileSpreadsheet,
  BarChart, PieChart, RefreshCw, Trash2, Edit2, Plus
} from 'lucide-react';
import PremiumCard from '@/components/PremiumCard';
import LeadDistributionChart from '@/components/dashboard/LeadDistributionChart';
import TopCampaignsChart from '@/components/dashboard/TopCampaignsChart';
import DateFilterBar from '@/components/dashboard/DateFilterBar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { LineChartAdvanced, BarChartAdvanced, PieChartAdvanced } from '@/components/charts/AdvancedCharts';
import { 
  getDashboardStats, 
  getFunnelData,
  SCHOOL_PARTNERS,
  PUBLISHERS,
  CONTENT_PROVIDERS,
  PROGRAMS
} from '@/lib/storage';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

// --- KPI Components ---
const KPICard1 = ({ title, value, icon: Icon, trend, trendUp = true, showFilter = false }) => (
  <PremiumCard className="flex flex-col justify-between min-h-[140px] hover:translate-y-[-4px] transition-transform duration-300 relative overflow-visible" glow>
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-xl bg-[var(--secondary-bg)] border border-[var(--border-color)] group-hover:border-[var(--accent-gold)]/30 transition-colors shadow-sm">
        <Icon className="w-5 h-5 text-[var(--accent-gold)]" />
      </div>
      {showFilter ? (
          <button className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors">
              <Filter className="w-4 h-4" />
          </button>
      ) : (
        <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${trendUp ? 'text-[var(--accent-green)] bg-[var(--accent-green)]/10' : 'text-[var(--accent-red)] bg-[var(--accent-red)]/10'}`}>
            {trendUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {trend}%
        </div>
      )}
    </div>
    <div>
      <h3 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight font-display">{value}</h3>
      <p className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider mt-1">{title}</p>
    </div>
  </PremiumCard>
);

const KPICard2 = ({ title, value, color, icon: Icon }) => (
    <PremiumCard className="flex flex-col items-center justify-center text-center p-6 hover:scale-105 transition-transform duration-300 border-t-4" style={{ borderTopColor: color }} glow>
        <div className="mb-3 p-3 rounded-full bg-[var(--secondary-bg)] shadow-inner">
             <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <h3 className="text-2xl font-bold text-[var(--text-primary)] font-display">{value}</h3>
        <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mt-1">{title}</p>
    </PremiumCard>
);

// --- Pipeline Component ---
const PipelineStep = ({ label, value, percentage, isLast, color }) => (
  <div className="flex-1 relative group flex flex-col items-center">
    {/* Connector Line */}
    {!isLast && (
      <div className="hidden md:block absolute top-[2.5rem] left-[50%] w-full h-[3px] bg-[var(--secondary-bg)] -z-0">
        <div className="h-full bg-[var(--border-color)] w-full" />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute top-0 left-0 h-full opacity-50"
          style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
        />
      </div>
    )}

    {/* Circle Node */}
    <div className="relative z-10 mb-4 transition-transform duration-300 group-hover:scale-110">
      <div 
        className="w-20 h-20 rounded-full border-4 flex items-center justify-center bg-[var(--card-bg)] shadow-lg"
        style={{ borderColor: color, boxShadow: `0 0 15px ${color}40` }}
      >
        <span className="text-lg font-bold text-[var(--text-primary)]">{percentage}%</span>
      </div>
      {/* Mobile Vertical Line */}
      {!isLast && (
         <div className="md:hidden absolute top-20 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-[var(--border-color)]" />
      )}
    </div>
    
    {/* Text Content */}
    <div className="text-center">
        <h4 className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1">{label}</h4>
        <p className="text-xl font-bold text-[var(--text-primary)]">{value}</p>
    </div>
  </div>
);

const SectionDivider = () => (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent my-12 opacity-50" />
);

// --- New Components for Tabs ---

const OverviewSummaryCard = ({ title, value, trend, trendUp, period, icon: Icon, color = "var(--accent-gold)" }) => (
  <PremiumCard className="flex flex-col gap-4" glow>
    <div className="flex justify-between items-start">
      <div className="p-2 rounded-lg bg-[var(--secondary-bg)]/50">
         <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trendUp ? 'text-[var(--accent-green)] bg-[var(--accent-green)]/10' : 'text-[var(--accent-red)] bg-[var(--accent-red)]/10'}`}>
        {trendUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
        {trend}%
      </div>
    </div>
    <div>
       <h3 className="text-2xl font-bold text-[var(--text-primary)]">{value}</h3>
       <p className="text-xs text-[var(--text-secondary)] mt-1">{title}</p>
       <p className="text-[10px] text-[var(--text-muted)] mt-2">vs {period}</p>
    </div>
  </PremiumCard>
);

const RecentActivityItem = ({ title, time, type }) => (
  <div className="flex gap-4 p-4 border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--secondary-bg)]/20 transition-colors">
     <div className={`mt-1 p-2 rounded-full h-fit shrink-0 ${
        type === 'enrollment' ? 'bg-green-500/10 text-green-500' : 
        type === 'campaign' ? 'bg-blue-500/10 text-blue-500' : 'bg-orange-500/10 text-orange-500'
     }`}>
        {type === 'enrollment' ? <UserPlus className="w-4 h-4"/> : type === 'campaign' ? <Activity className="w-4 h-4"/> : <Bell className="w-4 h-4"/>}
     </div>
     <div className="flex-1">
        <p className="text-sm font-medium text-[var(--text-primary)]">{title}</p>
        <div className="flex items-center gap-2 mt-1">
            <Clock className="w-3 h-3 text-[var(--text-secondary)]" />
            <span className="text-xs text-[var(--text-secondary)]">{time}</span>
        </div>
     </div>
  </div>
);

const GeneratedReportRow = ({ name, type, date, status }) => (
  <div className="flex items-center justify-between p-4 border border-[var(--border-color)] rounded-xl bg-[var(--secondary-bg)]/10 hover:border-[var(--accent-gold)]/30 transition-all">
    <div className="flex items-center gap-4">
        <div className="p-2 bg-[var(--secondary-bg)] rounded-lg text-[var(--accent-blue)]">
            <FileText className="w-5 h-5" />
        </div>
        <div>
            <h4 className="text-sm font-bold text-[var(--text-primary)]">{name}</h4>
            <div className="flex gap-2 text-xs text-[var(--text-secondary)] mt-1">
                <span>{type}</span>
                <span>•</span>
                <span>{date}</span>
            </div>
        </div>
    </div>
    <div className="flex items-center gap-4">
        <span className={`text-xs px-2 py-1 rounded-full ${status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
            {status}
        </span>
        <div className="flex gap-1">
            <Button size="icon" variant="ghost" className="h-8 w-8 text-[var(--text-secondary)] hover:text-[var(--accent-gold)]">
                <FileText className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-[var(--text-secondary)] hover:text-[var(--accent-blue)]">
                <FileSpreadsheet className="w-4 h-4" />
            </Button>
        </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [funnelData, setFunnelData] = useState([]);
  const { toast } = useToast();
  
  // Default filter state
  const [currentFilters, setCurrentFilters] = useState({
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      filterStatus: 'active',
      division: 'all'
  });

  // Analytics specific states
  const [analyticsDateRange, setAnalyticsDateRange] = useState('30days');
  const [analyticsProgram, setAnalyticsProgram] = useState('all');
  const [analyticsSchool, setAnalyticsSchool] = useState('all');

  // Reports specific states
  const [reportType, setReportType] = useState('financial');
  const [scheduleEnabled, setScheduleEnabled] = useState(false);

  const fetchData = (filters) => {
    setStats(getDashboardStats('admin', filters));
    setFunnelData(getFunnelData(filters));
  };
  
  useEffect(() => {
    fetchData(currentFilters);
  }, []);

  const handleFilterSearch = (newFilters) => {
      setCurrentFilters(newFilters);
      fetchData(newFilters);
  };

  const handleGenerateReport = () => {
      toast({
          title: "Report Generation Started",
          description: `Generating ${reportType} report... This may take a moment.`,
          duration: 3000,
      });
  };

  const handleSaveSchedule = () => {
      toast({
          title: "Schedule Saved",
          description: "Your report schedule has been updated successfully.",
          variant: "default",
          duration: 3000,
      });
  };

  if (!stats) return null;

  // Mock Data for new tabs
  const userGrowthData = [
      { label: 'Jan', value: 1200 }, { label: 'Feb', value: 1450 }, { label: 'Mar', value: 1680 },
      { label: 'Apr', value: 1920 }, { label: 'May', value: 2100 }, { label: 'Jun', value: 2340 },
      { label: 'Jul', value: 2580 }, { label: 'Aug', value: 2750 }, { label: 'Sep', value: 2920 },
      { label: 'Oct', value: 3100 }, { label: 'Nov', value: 3280 }, { label: 'Dec', value: 3450 }
  ];

  const programEnrollmentData = [
      { label: 'CS', tooltipValue: 'Computer Science', value: 450, color: '#00D9FF' },
      { label: 'Bus', tooltipValue: 'Business', value: 380, color: '#00FF41' },
      { label: 'Nurs', tooltipValue: 'Nursing', value: 320, color: '#D4AF37' },
      { label: 'Eng', tooltipValue: 'Engineering', value: 290, color: '#EF4444' },
      { label: 'Psych', tooltipValue: 'Psychology', value: 210, color: '#A855F7' },
      { label: 'Edu', tooltipValue: 'Education', value: 197, color: '#EC4899' }
  ];

  const studentStatusData = [
      { label: 'Enrolled', value: 45, color: '#00FF41' },
      { label: 'In Progress', value: 35, color: '#00D9FF' },
      { label: 'Completed', value: 15, color: '#D4AF37' },
      { label: 'Dropped', value: 5, color: '#EF4444' }
  ];

  const analyticsTableData = [
      { program: 'Computer Science', enrolled: 450, inProgress: 320, completed: 85, dropped: 12, rate: '28%' },
      { program: 'Business Admin', enrolled: 380, inProgress: 290, completed: 95, dropped: 18, rate: '24%' },
      { program: 'Nursing', enrolled: 320, inProgress: 210, completed: 110, dropped: 8, rate: '31%' },
      { program: 'Engineering', enrolled: 290, inProgress: 180, completed: 45, dropped: 25, rate: '22%' },
      { program: 'Psychology', enrolled: 210, inProgress: 150, completed: 60, dropped: 10, rate: '26%' }
  ];

  const recentActivities = [
      { title: "Lead John Smith enrolled in Computer Science", time: "2 hours ago", type: "enrollment" },
      { title: "Campaign 'Q1 2026' started", time: "5 hours ago", type: "campaign" },
      { title: "New application from Sarah Jones", time: "6 hours ago", type: "application" },
      { title: "Financial Report Q4 2025 generated", time: "8 hours ago", type: "system" },
      { title: "Partner 'Howard University' updated profile", time: "1 day ago", type: "system" },
      { title: "Lead Michael Brown status changed to 'Interview'", time: "1 day ago", type: "application" },
      { title: "New scholarship opportunity added", time: "1 day ago", type: "campaign" },
      { title: "System maintenance completed", time: "2 days ago", type: "system" },
      { title: "Lead Emily Davis enrolled in Nursing", time: "2 days ago", type: "enrollment" },
      { title: "Email campaign 'Spring Welcome' sent", time: "2 days ago", type: "campaign" }
  ];

  const recentReports = [
      { name: "Q4 2025 Financial Report", type: "Financial", date: "Jan 10, 2026", status: "Completed" },
      { name: "Student Enrollment Analysis", type: "Student", date: "Jan 08, 2026", status: "Completed" },
      { name: "Campaign Performance Review", type: "Campaign", date: "Jan 05, 2026", status: "Completed" },
      { name: "School Partnership Report", type: "School", date: "Jan 01, 2026", status: "Completed" },
      { name: "Monthly Revenue Summary", type: "Financial", date: "Dec 31, 2025", status: "Completed" }
  ];

  return (
    // REMOVED PADDING from main container to ensure full-width filter bar
    <div className="min-h-screen pb-20 space-y-0 bg-[var(--primary-bg)]">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        
        {/* Date Filter Bar - Full Width, Sticky */}
        <DateFilterBar onSearch={handleFilterSearch} initialFilters={currentFilters} />

        {/* Content Wrapper - Padded */}
        <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-8">

            {/* SECTION 1: First KPI Cards Block */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <KPICard1 title="Total Leads" value={stats.totalLeads} icon={Users} trend={12} showFilter />
            <KPICard1 title="Enrolled Students" value={stats.enrolledCount} icon={GraduationCap} trend={8} showFilter />
            <KPICard1 title="Active Schools" value={SCHOOL_PARTNERS.length} icon={School} trend={5} />
            <KPICard1 title="Publishers" value={PUBLISHERS.length} icon={Layers} trend={2} />
            <KPICard1 title="Content Providers" value={CONTENT_PROVIDERS.length} icon={FileBox} trend={4} />
            </motion.div>

            <SectionDivider />

            {/* SECTION 2: Graphs Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <motion.div variants={itemVariants} className="lg:col-span-2 h-full min-h-[400px]">
                <LeadDistributionChart filters={currentFilters} />
            </motion.div>
            <motion.div variants={itemVariants} className="lg:col-span-3 h-full min-h-[400px]">
                <TopCampaignsChart filters={currentFilters} />
            </motion.div>
            </div>

            <SectionDivider />

            {/* SECTION 3: Second KPI Cards Block */}
            <motion.div variants={itemVariants}>
                <h3 className="text-lg font-bold text-[var(--text-primary)] font-display mb-6 px-1">Lead Quality Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <KPICard2 title="Gross Leads" value={stats.totalLeads} icon={Layers} color="#64748b" />
                    <KPICard2 title="Invalid" value={stats.statusCounts['Invalid'] || 0} icon={AlertCircle} color="#ef4444" />
                    <KPICard2 title="Rejected" value={stats.statusCounts['Rejected'] || 0} icon={Ban} color="#f59e0b" />
                    <KPICard2 title="Returned" value={stats.statusCounts['Returned'] || 0} icon={RotateCcw} color="#8b5cf6" />
                    <KPICard2 title="Valid Leads" value={(stats.statusCounts['Valid'] || 0) + (stats.statusCounts['Accepted'] || 0)} icon={CheckCircle} color="#10b981" />
                </div>
            </motion.div>

            <SectionDivider />

            {/* SECTION 4: Students Pipeline Status */}
            <motion.div variants={itemVariants}>
            <PremiumCard className="w-full py-10 px-6 md:px-12" glow>
                <div className="flex items-center justify-between mb-12 border-b border-[var(--border-color)] pb-4">
                    <div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] font-display">Student Pipeline Status</h3>
                        <p className="text-xs text-[var(--text-secondary)] mt-1">Conversion funnel progression</p>
                    </div>
                    <span className="hidden md:inline-flex text-xs text-[var(--accent-blue)] bg-[var(--accent-blue)]/10 px-3 py-1 rounded-full font-bold border border-[var(--accent-blue)]/20">
                        Live Pipeline
                    </span>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-4 relative">
                    {funnelData.length > 0 ? (
                        funnelData.map((stage, idx) => (
                        <PipelineStep 
                            key={idx}
                            {...stage}
                            percentage={funnelData[0].value > 0 ? Math.round((stage.value / funnelData[0].value) * 100) : 0}
                            isLast={idx === funnelData.length - 1}
                        />
                        ))
                    ) : (
                        <div className="w-full text-center text-[var(--text-secondary)] py-8">No pipeline data available.</div>
                    )}
                </div>
            </PremiumCard>
            </motion.div>

            {/* SECTION 5: Tabs Section */}
            <div className="pt-8">
                <Tabs defaultValue="overview" className="w-full space-y-6">
                    <TabsList className="bg-[var(--secondary-bg)] p-1 border border-[var(--border-color)] rounded-xl w-full md:w-auto flex overflow-x-auto">
                        <TabsTrigger value="overview" className="flex-1 md:w-32 rounded-lg data-[state=active]:bg-[var(--card-bg)] data-[state=active]:text-[var(--accent-gold)] data-[state=active]:shadow-sm">Overview</TabsTrigger>
                        <TabsTrigger value="analytics" className="flex-1 md:w-32 rounded-lg data-[state=active]:bg-[var(--card-bg)] data-[state=active]:text-[var(--accent-gold)] data-[state=active]:shadow-sm">Analytics</TabsTrigger>
                        <TabsTrigger value="reports" className="flex-1 md:w-32 rounded-lg data-[state=active]:bg-[var(--card-bg)] data-[state=active]:text-[var(--accent-gold)] data-[state=active]:shadow-sm">Reports</TabsTrigger>
                    </TabsList>

                    {/* --- OVERVIEW TAB --- */}
                    <TabsContent value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Summary Cards Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <OverviewSummaryCard title="Total Revenue" value="$2.4M" trend="12.5" trendUp={true} period="last month" icon={CreditCard} />
                            <OverviewSummaryCard title="Total Students" value="1,847" trend="8.3" trendUp={true} period="last month" icon={GraduationCap} color="var(--accent-blue)" />
                            <OverviewSummaryCard title="Active Campaigns" value="24" trend="5.2" trendUp={true} period="last month" icon={TrendingUp} color="var(--accent-green)" />
                            <OverviewSummaryCard title="Conversion Rate" value="34.2%" trend="2.1" trendUp={true} period="last month" icon={Activity} color="#EF4444" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Quick Stats & Mini Charts */}
                            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <PremiumCard className="p-6" glow>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-[var(--accent-gold)]" />
                                        Revenue Trend (30 Days)
                                    </h3>
                                    <div className="h-[200px]">
                                        <LineChartAdvanced data={userGrowthData.slice(-6)} height={200} color="#D4AF37" />
                                    </div>
                                </PremiumCard>
                                <PremiumCard className="p-6" glow>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-[var(--accent-blue)]" />
                                        Enrollment Trend
                                    </h3>
                                    <div className="h-[200px]">
                                        <BarChartAdvanced data={programEnrollmentData.slice(0, 5)} height={200} showValues={false} />
                                    </div>
                                </PremiumCard>
                                
                                {/* Quick Stats Grid */}
                                <PremiumCard className="col-span-1 md:col-span-2 p-6">
                                    <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="p-4 rounded-xl bg-[var(--secondary-bg)]/30 border border-[var(--border-color)] text-center">
                                            <div className="text-2xl font-bold text-[var(--text-primary)]">3,421</div>
                                            <div className="text-xs text-[var(--text-secondary)] uppercase mt-1">Leads This Month</div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-[var(--secondary-bg)]/30 border border-[var(--border-color)] text-center">
                                            <div className="text-2xl font-bold text-[var(--text-primary)]">156</div>
                                            <div className="text-xs text-[var(--text-secondary)] uppercase mt-1">Enrolled Students</div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-[var(--secondary-bg)]/30 border border-[var(--border-color)] text-center">
                                            <div className="text-2xl font-bold text-[var(--text-primary)]">$1,240</div>
                                            <div className="text-xs text-[var(--text-secondary)] uppercase mt-1">Avg Lead Value</div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-[var(--secondary-bg)]/30 border border-[var(--border-color)] text-center">
                                            <div className="text-2xl font-bold text-[var(--accent-green)]">34.2%</div>
                                            <div className="text-xs text-[var(--text-secondary)] uppercase mt-1">Conversion Rate</div>
                                        </div>
                                    </div>
                                </PremiumCard>
                            </div>

                            {/* Recent Activity Feed */}
                            <PremiumCard className="p-0 overflow-hidden flex flex-col h-full max-h-[600px]">
                                <div className="p-4 border-b border-[var(--border-color)] bg-[var(--secondary-bg)]/50 backdrop-blur-sm sticky top-0 z-10">
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-[var(--accent-gold)]" />
                                        Recent Activity
                                    </h3>
                                </div>
                                <div className="overflow-y-auto custom-scrollbar flex-1">
                                    {recentActivities.map((activity, idx) => (
                                        <RecentActivityItem key={idx} {...activity} />
                                    ))}
                                </div>
                                <div className="p-3 border-t border-[var(--border-color)] text-center">
                                    <Button variant="ghost" size="sm" className="w-full text-[var(--accent-blue)]">View All Activity</Button>
                                </div>
                            </PremiumCard>
                        </div>
                    </TabsContent>

                    {/* --- ANALYTICS TAB --- */}
                    <TabsContent value="analytics" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Content for analytics... same as before but inside new padded container */}
                        {/* Filters */}
                        <PremiumCard className="p-4" glow>
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold">
                                    <Filter className="w-5 h-5 text-[var(--accent-gold)]" />
                                    Analytics Filters
                                </div>
                                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                                    <Select value={analyticsDateRange} onValueChange={setAnalyticsDateRange}>
                                        <SelectTrigger className="w-full md:w-[180px]">
                                            <SelectValue placeholder="Date Range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="7days">Last 7 Days</SelectItem>
                                            <SelectItem value="30days">Last 30 Days</SelectItem>
                                            <SelectItem value="90days">Last 90 Days</SelectItem>
                                            <SelectItem value="custom">Custom Range</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Select value={analyticsProgram} onValueChange={setAnalyticsProgram}>
                                        <SelectTrigger className="w-full md:w-[180px]">
                                            <SelectValue placeholder="Program" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Programs</SelectItem>
                                            {PROGRAMS.map(prog => <SelectItem key={prog} value={prog}>{prog}</SelectItem>)}
                                        </SelectContent>
                                    </Select>

                                    <Select value={analyticsSchool} onValueChange={setAnalyticsSchool}>
                                        <SelectTrigger className="w-full md:w-[180px]">
                                            <SelectValue placeholder="School" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Schools</SelectItem>
                                            {SCHOOL_PARTNERS.map(school => <SelectItem key={school} value={school}>{school}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </PremiumCard>

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <PremiumCard className="lg:col-span-2 p-6">
                                <h3 className="text-lg font-bold mb-6">User Growth (12 Months)</h3>
                                <div className="h-[300px] w-full">
                                    <LineChartAdvanced data={userGrowthData} height={300} color="#00D9FF" />
                                </div>
                            </PremiumCard>
                            <PremiumCard className="p-6 flex flex-col items-center">
                                <h3 className="text-lg font-bold mb-6 w-full text-left">Student Status Distribution</h3>
                                <PieChartAdvanced data={studentStatusData} size={220} />
                            </PremiumCard>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <PremiumCard className="p-6 lg:col-span-1">
                                <h3 className="text-lg font-bold mb-6">Program Enrollment</h3>
                                <div className="h-[250px]">
                                    <BarChartAdvanced data={programEnrollmentData} height={250} />
                                </div>
                            </PremiumCard>
                            
                            <PremiumCard className="lg:col-span-2 p-0 overflow-hidden flex flex-col">
                                <div className="p-6 border-b border-[var(--border-color)]">
                                    <h3 className="text-lg font-bold">Detailed Program Metrics</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-[var(--secondary-bg)]/50 text-[var(--text-secondary)] font-medium">
                                            <tr>
                                                <th className="p-4 cursor-pointer hover:text-[var(--text-primary)]">Program</th>
                                                <th className="p-4 cursor-pointer hover:text-[var(--text-primary)]">Enrolled</th>
                                                <th className="p-4 cursor-pointer hover:text-[var(--text-primary)]">In Progress</th>
                                                <th className="p-4 cursor-pointer hover:text-[var(--text-primary)]">Completed</th>
                                                <th className="p-4 cursor-pointer hover:text-[var(--text-primary)]">Dropped</th>
                                                <th className="p-4 cursor-pointer hover:text-[var(--text-primary)]">Conv. Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[var(--border-color)]">
                                            {analyticsTableData.map((row, idx) => (
                                                <tr key={idx} className="hover:bg-[var(--secondary-bg)]/30 transition-colors">
                                                    <td className="p-4 font-medium text-[var(--text-primary)]">{row.program}</td>
                                                    <td className="p-4 text-[var(--accent-green)]">{row.enrolled}</td>
                                                    <td className="p-4">{row.inProgress}</td>
                                                    <td className="p-4">{row.completed}</td>
                                                    <td className="p-4 text-[var(--accent-red)]">{row.dropped}</td>
                                                    <td className="p-4 font-bold">{row.rate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </PremiumCard>
                        </div>

                        {/* Comparison Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <PremiumCard className="p-6 bg-gradient-to-br from-[var(--secondary-bg)] to-transparent" glow>
                                <h3 className="text-lg font-bold mb-4 text-[var(--text-primary)]">This Month vs Last Month</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[var(--text-secondary)]">Revenue</span>
                                        <span className="font-bold text-[var(--accent-green)] flex items-center gap-1">+8.2% <ArrowUp className="w-4 h-4"/></span>
                                    </div>
                                    <div className="w-full bg-[var(--border-color)] h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-[var(--accent-green)] h-full w-[65%]"></div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-[var(--text-secondary)]">Students</span>
                                        <span className="font-bold text-[var(--accent-green)] flex items-center gap-1">+5.1% <ArrowUp className="w-4 h-4"/></span>
                                    </div>
                                    <div className="w-full bg-[var(--border-color)] h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-[var(--accent-blue)] h-full w-[55%]"></div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center">
                                        <span className="text-[var(--text-secondary)]">Conversion</span>
                                        <span className="font-bold text-[var(--accent-green)] flex items-center gap-1">+1.3% <ArrowUp className="w-4 h-4"/></span>
                                    </div>
                                    <div className="w-full bg-[var(--border-color)] h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-[var(--accent-gold)] h-full w-[45%]"></div>
                                    </div>
                                </div>
                            </PremiumCard>

                            <PremiumCard className="p-6 bg-gradient-to-br from-[var(--secondary-bg)] to-transparent" glow>
                                <h3 className="text-lg font-bold mb-4 text-[var(--text-primary)]">This Quarter vs Last Quarter</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[var(--text-secondary)]">Revenue</span>
                                        <span className="font-bold text-[var(--accent-green)] flex items-center gap-1">+15.4% <ArrowUp className="w-4 h-4"/></span>
                                    </div>
                                    <div className="w-full bg-[var(--border-color)] h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-[var(--accent-green)] h-full w-[75%]"></div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-[var(--text-secondary)]">Students</span>
                                        <span className="font-bold text-[var(--accent-green)] flex items-center gap-1">+12.8% <ArrowUp className="w-4 h-4"/></span>
                                    </div>
                                    <div className="w-full bg-[var(--border-color)] h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-[var(--accent-blue)] h-full w-[68%]"></div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center">
                                        <span className="text-[var(--text-secondary)]">Conversion</span>
                                        <span className="font-bold text-[var(--accent-green)] flex items-center gap-1">+3.2% <ArrowUp className="w-4 h-4"/></span>
                                    </div>
                                    <div className="w-full bg-[var(--border-color)] h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-[var(--accent-gold)] h-full w-[50%]"></div>
                                    </div>
                                </div>
                            </PremiumCard>
                        </div>
                    </TabsContent>

                    {/* --- REPORTS TAB --- */}
                    <TabsContent value="reports" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Reports content... Same logic */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Report Generation Form */}
                            <PremiumCard className="p-6" glow>
                                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-[var(--accent-gold)]" />
                                    Generate New Report
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[var(--text-secondary)]">Report Type</label>
                                        <Select value={reportType} onValueChange={setReportType}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="financial">Financial Report</SelectItem>
                                                <SelectItem value="student">Student Report</SelectItem>
                                                <SelectItem value="school">School Report</SelectItem>
                                                <SelectItem value="campaign">Campaign Report</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[var(--text-secondary)]">Date Range</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input type="date" className="w-full" />
                                            <Input type="date" className="w-full" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[var(--text-secondary)]">Export Format</label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-[var(--accent-blue)]">
                                                <input type="checkbox" className="rounded border-[var(--border-color)] bg-[var(--input-bg)]" defaultChecked /> PDF
                                            </label>
                                            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-[var(--accent-blue)]">
                                                <input type="checkbox" className="rounded border-[var(--border-color)] bg-[var(--input-bg)]" /> Excel
                                            </label>
                                            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-[var(--accent-blue)]">
                                                <input type="checkbox" className="rounded border-[var(--border-color)] bg-[var(--input-bg)]" /> CSV
                                            </label>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button className="w-full gap-2" onClick={handleGenerateReport}>
                                            <Download className="w-4 h-4" /> Generate Report
                                        </Button>
                                    </div>
                                </div>
                            </PremiumCard>

                            {/* Report Scheduling */}
                            <PremiumCard className="p-6" glow>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-[var(--accent-blue)]" />
                                        Schedule Reports
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-[var(--text-secondary)]">{scheduleEnabled ? 'Enabled' : 'Disabled'}</span>
                                        <button 
                                            className={`w-10 h-5 rounded-full relative transition-colors ${scheduleEnabled ? 'bg-[var(--accent-green)]' : 'bg-[var(--border-color)]'}`}
                                            onClick={() => setScheduleEnabled(!scheduleEnabled)}
                                        >
                                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${scheduleEnabled ? 'left-5.5' : 'left-0.5'}`} />
                                        </button>
                                    </div>
                                </div>

                                <div className={`space-y-4 transition-opacity ${scheduleEnabled ? 'opacity-100 pointer-events-auto' : 'opacity-50 pointer-events-none'}`}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[var(--text-secondary)]">Frequency</label>
                                            <Select defaultValue="weekly">
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="weekly">Weekly</SelectItem>
                                                    <SelectItem value="monthly">Monthly</SelectItem>
                                                    <SelectItem value="quarterly">Quarterly</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[var(--text-secondary)]">Day</label>
                                            <Select defaultValue="monday">
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="monday">Monday</SelectItem>
                                                    <SelectItem value="friday">Friday</SelectItem>
                                                    <SelectItem value="1st">1st of Month</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[var(--text-secondary)]">Recipients</label>
                                        <Input placeholder="email@example.com" />
                                        <p className="text-xs text-[var(--text-muted)]">Separate multiple emails with commas</p>
                                    </div>

                                    <div className="pt-4">
                                        <Button variant="outline" className="w-full gap-2 border-[var(--accent-gold)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)] hover:text-black" onClick={handleSaveSchedule}>
                                            <Clock className="w-4 h-4" /> Save Schedule
                                        </Button>
                                    </div>
                                </div>
                            </PremiumCard>
                        </div>

                        {/* Generated Reports List */}
                        <PremiumCard className="p-0 overflow-hidden">
                            <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center">
                                <h3 className="text-lg font-bold">Recently Generated Reports</h3>
                                <Button variant="ghost" size="sm" className="gap-2 text-[var(--text-secondary)]">
                                    <RefreshCw className="w-4 h-4" /> Refresh List
                                </Button>
                            </div>
                            <div className="divide-y divide-[var(--border-color)]">
                                {recentReports.map((report, idx) => (
                                    <GeneratedReportRow key={idx} {...report} />
                                ))}
                            </div>
                            <div className="p-4 bg-[var(--secondary-bg)]/30 text-center">
                                <Button variant="link" className="text-[var(--accent-blue)]">View All Reports History</Button>
                            </div>
                        </PremiumCard>
                        
                        {/* Scheduled Reports List (Mini) */}
                        <PremiumCard className="p-6">
                            <h3 className="text-lg font-bold mb-4">Active Schedules</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-[var(--secondary-bg)]/50 text-[var(--text-secondary)]">
                                        <tr>
                                            <th className="p-3">Report Name</th>
                                            <th className="p-3">Frequency</th>
                                            <th className="p-3">Next Run</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[var(--border-color)]">
                                        <tr>
                                            <td className="p-3 font-medium">Weekly Financial Summary</td>
                                            <td className="p-3">Weekly (Mon)</td>
                                            <td className="p-3">Jan 16, 2026</td>
                                            <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-xs border border-green-500/20">Active</span></td>
                                            <td className="p-3 text-right flex justify-end gap-2">
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-[var(--text-secondary)]"><Edit2 className="w-3 h-3"/></Button>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10"><Trash2 className="w-3 h-3"/></Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-medium">Monthly Enrollment Report</td>
                                            <td className="p-3">Monthly (1st)</td>
                                            <td className="p-3">Feb 01, 2026</td>
                                            <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-xs border border-green-500/20">Active</span></td>
                                            <td className="p-3 text-right flex justify-end gap-2">
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-[var(--text-secondary)]"><Edit2 className="w-3 h-3"/></Button>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10"><Trash2 className="w-3 h-3"/></Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </PremiumCard>
                    </TabsContent>
                </Tabs>
            </div>

        </div>
      </motion.div>
    </div>
  );
}
