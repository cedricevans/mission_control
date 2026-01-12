
const LEADS_STORAGE_KEY = 'hbcu_leads';
const STUDENTS_STORAGE_KEY = 'hbcu_students';

// --- Enums & Constants ---
export const LEAD_SOURCES = ['organic', 'paid', 'referral', 'direct', 'content_provider', 'publisher'];
export const VALIDITY_STATUSES = ['Gross', 'Valid', 'Invalid', 'Denied', 'Rejected', 'Returned', 'Accepted'];
export const CONVERSION_STAGES = ['New Lead', 'Contacted', 'Interview', 'Application', 'Enrolled'];
export const SCHOOL_PARTNERS = ['Howard University', 'Spelman College', 'Morehouse College', 'Hampton University', 'Tuskegee University', 'Florida A&M'];
export const PROGRAMS = ['Computer Science', 'Business Administration', 'Nursing', 'Engineering', 'Psychology', 'Education'];
export const PUBLISHERS = ['CollegeConfidential', 'Niche', 'Scholarships.com', 'Fastweb'];
export const CONTENT_PROVIDERS = ['The Grio', 'Blavity', 'HBCU Buzz', 'Diverse Education'];

export const generateId = (prefix = 'id') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// --- Helper Functions ---
const isDateInRange = (dateStr, range) => {
  if (!range || !range.start || !range.end) return true;
  const d = new Date(dateStr).getTime();
  const start = new Date(range.start).setHours(0, 0, 0, 0);
  const end = new Date(range.end).setHours(23, 59, 59, 999);
  return d >= start && d <= end;
};

export const getDateRangeLeads = (leads, filters) => {
  if (!leads) return [];
  
  return leads.filter(l => {
    // Date Range Filter
    if (filters.dateRange && !isDateInRange(l.createdAt, filters.dateRange)) {
      return false;
    }

    // Status Filter
    if (filters.filterStatus === 'active') {
      if (['Invalid', 'Rejected', 'Denied'].includes(l.validityStatus)) return false;
    } else if (filters.filterStatus === 'inactive') {
      if (!['Invalid', 'Rejected', 'Denied'].includes(l.validityStatus)) return false;
    }
    
    // Advertiser/Content Provider
    if (filters.advertiser && filters.advertiser.length > 0 && filters.advertiser !== 'all') {
      if (!l.contentProvider || !filters.advertiser.includes(l.contentProvider)) return false;
    }

    // Publisher
    if (filters.publisher && filters.publisher.length > 0 && filters.publisher !== 'all') {
      if (!l.publisher || !filters.publisher.includes(l.publisher)) return false;
    }

    // Offer Name (Internal)
    if (filters.offerName && filters.offerName.trim() !== '') {
       const search = filters.offerName.toLowerCase();
       if (!l.program.toLowerCase().includes(search)) return false;
    }

    return true;
  });
};


// --- Data Retrieval ---
export const getLeads = () => {
  try {
    const data = localStorage.getItem(LEADS_STORAGE_KEY);
    return data ? JSON.parse(data) : generateDummyLeads();
  } catch (error) {
    console.error('Error loading leads:', error);
    return generateDummyLeads();
  }
};

export const getEnrolledStudents = () => {
   try {
    const leads = getLeads();
    return leads.filter(l => l.conversionStage === 'Enrolled').map(l => ({
       id: `student_${l.id}`,
       leadId: l.id,
       name: l.name,
       email: l.email,
       schoolPartner: l.schoolPartner,
       program: l.program,
       enrollmentDate: l.enrollmentDate || l.updatedAt,
       enrollmentMilestones: l.enrollmentMilestones || [],
       costPerAcceptedStudent: l.costPerAcceptedStudent || 0,
       status: 'Active' // Default status for enrolled
    }));
  } catch (error) {
    console.error('Error loading students:', error);
    return [];
  }
}

// --- Data Persistence ---
export const saveLead = (lead) => {
  try {
    const leads = getLeads();
    leads.push(lead);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    return true;
  } catch (error) {
    console.error('Error saving lead:', error);
    return false;
  }
};

export const updateLead = (leadId, updatedData) => {
  try {
    const leads = getLeads();
    const index = leads.findIndex(l => l.id === leadId);
    if (index !== -1) {
      leads[index] = { ...leads[index], ...updatedData, updatedAt: new Date().toISOString() };
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating lead:', error);
    return false;
  }
};

export const addActivity = (leadId, type, description) => {
  try {
    const leads = getLeads();
    const index = leads.findIndex(l => l.id === leadId);
    if (index !== -1) {
      const newActivity = {
        type,
        description,
        timestamp: new Date().toISOString()
      };
      const currentActivities = leads[index].activities || [];
      leads[index] = { 
        ...leads[index], 
        activities: [newActivity, ...currentActivities],
        updatedAt: new Date().toISOString() 
      };
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
      return newActivity;
    }
    return null;
  } catch (error) {
    console.error('Error adding activity:', error);
    return null;
  }
};

export const addNote = (leadId, text) => {
  try {
    const leads = getLeads();
    const index = leads.findIndex(l => l.id === leadId);
    if (index !== -1) {
      const newNote = {
        text,
        timestamp: new Date().toISOString()
      };
      const currentNotes = leads[index].notes || [];
      leads[index] = { 
        ...leads[index], 
        notes: [newNote, ...currentNotes],
        updatedAt: new Date().toISOString() 
      };
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
      return newNote;
    }
    return null;
  } catch (error) {
    console.error('Error adding note:', error);
    return null;
  }
};

export const deleteLead = (leadId) => {
  try {
    const leads = getLeads();
    const filtered = leads.filter(l => l.id !== leadId);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting lead:', error);
    return false;
  }
};

// --- Filtering & Queries ---
export const getFilteredLeads = (filters) => {
  let leads = getLeads();
  if (filters && typeof filters === 'object') {
     return getDateRangeLeads(leads, filters);
  }
  return leads;
};

// --- New Task Functions ---

export const getLeadDistribution = (filters = {}) => {
  const allLeads = getLeads();
  const leads = getDateRangeLeads(allLeads, filters);
  
  const dist = {
    'Gross': leads.length,
    'Valid': 0,
    'Invalid': 0,
    'Rejected': 0,
    'Returned': 0,
    'Accepted': 0
  };

  leads.forEach(l => {
    if (l.validityStatus === 'Valid') dist['Valid']++;
    else if (l.validityStatus === 'Invalid') dist['Invalid']++;
    else if (l.validityStatus === 'Rejected') dist['Rejected']++;
    else if (l.validityStatus === 'Returned') dist['Returned']++;
    else if (l.validityStatus === 'Accepted') dist['Accepted']++;
  });

  return Object.keys(dist).map(status => ({
    status,
    count: dist[status]
  }));
};

export const getTopCampaigns = (filters = {}) => {
  const allLeads = getLeads();
  const leads = getDateRangeLeads(allLeads, filters);
  const campaigns = {};

  leads.forEach(l => {
    const key = l.program;
    if (!campaigns[key]) {
      campaigns[key] = { campaign: key, revenue: 0, students: 0 };
    }
    if (l.conversionStage === 'Enrolled') {
      campaigns[key].students++;
      campaigns[key].revenue += 2500;
    }
  });

  return Object.values(campaigns).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
};

export const getLeadStatusBreakdown = (filters = {}) => {
  const dist = getLeadDistribution(filters);
  return dist.map(item => ({
    ...item,
    trend: Math.floor(Math.random() * 20) - 5 
  }));
};

// --- Analytics & Stats ---
export const getDashboardStats = (role = 'admin', filters = {}) => {
  const allLeads = getLeads();
  const leads = getDateRangeLeads(allLeads, filters);
  const totalLeads = leads.length;
  
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.validityStatus] = (acc[lead.validityStatus] || 0) + 1;
    return acc;
  }, {});

  const enrolledCount = leads.filter(l => l.conversionStage === 'Enrolled').length;
  const conversionRate = totalLeads > 0 ? (enrolledCount / totalLeads) * 100 : 0;
  
  const totalRevenue = enrolledCount * 2500; 
  const totalCost = leads.reduce((acc, l) => acc + (l.costPerLead || 0), 0);
  const profit = totalRevenue - totalCost;
  const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
  
  const costPerLead = totalLeads > 0 ? totalCost / totalLeads : 0;
  const costPerAcceptedStudent = enrolledCount > 0 ? totalCost / enrolledCount : 0;
  
  const validLeads = leads.filter(l => l.validityStatus === 'Valid' || l.validityStatus === 'Accepted');
  const avgQualityScore = validLeads.length > 0 ? 
     validLeads.reduce((acc, l) => acc + (l.qualityScore || 0), 0) / validLeads.length : 0;

  return {
    totalLeads,
    statusCounts,
    enrolledCount,
    conversionRate,
    totalRevenue,
    totalCost,
    profit,
    margin,
    costPerLead,
    costPerAcceptedStudent,
    avgQualityScore
  };
};

export const getFunnelData = (filters = {}) => {
   const allLeads = getLeads();
   const leads = getDateRangeLeads(allLeads, filters);
   const baseCount = leads.length;
   
   return [
     { label: 'New Lead', value: baseCount, color: '#00D9FF' },
     { label: 'Contacted', value: Math.floor(baseCount * 0.75), color: '#00C2E6' },
     { label: 'Interview', value: Math.floor(baseCount * 0.50), color: '#00AACC' },
     { label: 'Application', value: Math.floor(baseCount * 0.35), color: '#0093B3' },
     { label: 'Enrolled', value: Math.floor(baseCount * 0.15), color: '#00FF41' }
   ];
};

export const getConversionFunnelData = () => {
   return getFunnelData();
};

export const getSourcePerformanceData = () => {
   const leads = getLeads();
   const sources = {};
   leads.forEach(l => {
      if(!sources[l.leadSource]) sources[l.leadSource] = { leads: 0, enrolled: 0 };
      sources[l.leadSource].leads++;
      if(l.conversionStage === 'Enrolled') sources[l.leadSource].enrolled++;
   });
   
   return Object.keys(sources).map(key => ({
      source: key,
      leads: sources[key].leads,
      converted: sources[key].enrolled,
      rate: sources[key].leads > 0 ? ((sources[key].enrolled / sources[key].leads) * 100).toFixed(1) : 0,
      revenue: sources[key].enrolled * 2500 
   })).sort((a,b) => b.leads - a.leads);
};

export const getSchoolPerformanceData = () => {
  const leads = getLeads();
  const schoolStats = {};

  leads.forEach(l => {
    if (!schoolStats[l.schoolPartner]) {
      schoolStats[l.schoolPartner] = { 
        name: l.schoolPartner, 
        leads: 0, 
        accepted: 0, 
        revenue: 0 
      };
    }
    schoolStats[l.schoolPartner].leads++;
    if (l.conversionStage === 'Enrolled') {
      schoolStats[l.schoolPartner].accepted++;
      schoolStats[l.schoolPartner].revenue += (l.costPerAcceptedStudent * 1.5); 
    }
  });

  return Object.values(schoolStats)
    .map(stat => ({
      ...stat,
      conversionRate: stat.leads > 0 ? (stat.accepted / stat.leads) * 100 : 0
    }))
    .sort((a, b) => b.leads - a.leads)
    .slice(0, 5);
};

export const getCampaignROIData = () => {
  return [
    { id: 1, name: 'HBCU Fall Recruitment', spent: 12000, revenue: 45000, roi: 275, status: 'Active' },
    { id: 2, name: 'STEM Scholarship Push', spent: 8500, revenue: 32000, roi: 276, status: 'Active' },
    { id: 3, name: 'Transfer Student Outreach', spent: 5000, revenue: 12000, roi: 140, status: 'Completed' },
    { id: 4, name: 'Alumni Referral Program', spent: 2000, revenue: 15000, roi: 650, status: 'Active' },
    { id: 5, name: 'Social Media Awareness', spent: 15000, revenue: 28000, roi: 86, status: 'Active' }
  ];
};

export const getAgentPerformanceData = () => {
  return [
    { id: 1, name: 'Sarah Jenkins', leadsGenerated: 145, converted: 32, conversionRate: 22, revenue: 80000 },
    { id: 2, name: 'Michael Ross', leadsGenerated: 132, converted: 28, conversionRate: 21, revenue: 70000 },
    { id: 3, name: 'David Clark', leadsGenerated: 190, converted: 25, conversionRate: 13, revenue: 62500 },
    { id: 4, name: 'Jennifer Wu', leadsGenerated: 95, converted: 22, conversionRate: 23, revenue: 55000 },
    { id: 5, name: 'James Wilson', leadsGenerated: 110, converted: 18, conversionRate: 16, revenue: 45000 }
  ];
};

export const getLeadQualityTrendData = () => {
  return [
    { month: 'Aug', quality: 65, leads: 120, conversion: 12 },
    { month: 'Sep', quality: 68, leads: 145, conversion: 14 },
    { month: 'Oct', quality: 72, leads: 160, conversion: 15 },
    { month: 'Nov', quality: 70, leads: 135, conversion: 13 },
    { month: 'Dec', quality: 75, leads: 110, conversion: 16 },
    { month: 'Jan', quality: 78, leads: 150, conversion: 18 }
  ];
};

// --- New Feature Demo Data ---

export const getPaymentHistory = () => {
    return [
        { id: 'TXN-001', date: '2024-01-05', amount: 5000, status: 'Completed', method: 'Credit Card' },
        { id: 'TXN-002', date: '2024-01-12', amount: 2500, status: 'Completed', method: 'Bank Transfer' },
        { id: 'TXN-003', date: '2024-01-18', amount: 7500, status: 'Pending', method: 'ACH' },
        { id: 'TXN-004', date: '2024-01-25', amount: 3200, status: 'Failed', method: 'Credit Card' },
        { id: 'TXN-005', date: '2024-02-01', amount: 6000, status: 'Completed', method: 'Bank Transfer' },
    ];
};

export const getInvoicingSettings = () => {
    return {
        companyName: 'HBCU Connect',
        address: '123 University Drive, Atlanta, GA 30314',
        taxId: 'US-987654321',
        billingContact: 'billing@hbcuconnect.com',
        frequency: 'Monthly',
        paymentTerms: 'Net 30'
    };
};

export const getTaxReports = () => {
    return [
        { id: 'TAX-2023-Q4', period: 'Q4 2023', year: 2023, totalTax: 12500, status: 'Filed', dateFiled: '2024-01-15' },
        { id: 'TAX-2023-Q3', period: 'Q3 2023', year: 2023, totalTax: 11200, status: 'Filed', dateFiled: '2023-10-15' },
        { id: 'TAX-2023-Q2', period: 'Q2 2023', year: 2023, totalTax: 9800, status: 'Filed', dateFiled: '2023-07-15' },
        { id: 'TAX-2023-Q1', period: 'Q1 2023', year: 2023, totalTax: 10500, status: 'Filed', dateFiled: '2023-04-15' },
    ];
};

export const getRefunds = () => {
    return [
        { id: 'REF-001', txnId: 'TXN-004', amount: 3200, reason: 'Duplicate Charge', status: 'Approved', requestDate: '2024-01-26' },
        { id: 'REF-002', txnId: 'TXN-006', amount: 500, reason: 'Service Error', status: 'Pending', requestDate: '2024-02-02' },
    ];
};

export const getApiKeys = () => {
    return [
        { id: 'key_1', name: 'Production API', prefix: 'pk_live', created: '2023-06-15', lastUsed: '2024-02-05', status: 'Active' },
        { id: 'key_2', name: 'Staging API', prefix: 'pk_test', created: '2023-08-20', lastUsed: '2024-02-01', status: 'Active' },
        { id: 'key_3', name: 'Mobile App', prefix: 'mk_live', created: '2023-11-10', lastUsed: '2024-02-04', status: 'Active' },
    ];
};

export const getIntegrations = () => {
    return [
        { id: 'int_1', name: 'Salesforce', category: 'CRM', status: 'Connected', lastSync: '10 mins ago' },
        { id: 'int_2', name: 'HubSpot', category: 'CRM', status: 'Disconnected', lastSync: 'Never' },
        { id: 'int_3', name: 'Slack', category: 'Communication', status: 'Connected', lastSync: 'Just now' },
        { id: 'int_4', name: 'Google Analytics', category: 'Analytics', status: 'Connected', lastSync: '1 hour ago' },
    ];
};

export const getSystemLogs = () => {
    return [
        { id: 'log_1', timestamp: '2024-02-05 10:30:15', action: 'User Login', user: 'admin@hbcu.edu', status: 'Success', level: 'Info' },
        { id: 'log_2', timestamp: '2024-02-05 11:45:22', action: 'API Request', user: 'System', status: 'Success', level: 'Info' },
        { id: 'log_3', timestamp: '2024-02-05 14:12:05', action: 'Failed Login', user: 'unknown', status: 'Failed', level: 'Warning' },
        { id: 'log_4', timestamp: '2024-02-06 09:15:30', action: 'Data Export', user: 'manager@hbcu.edu', status: 'Success', level: 'Info' },
        { id: 'log_5', timestamp: '2024-02-06 10:00:00', action: 'Database Error', user: 'System', status: 'Error', level: 'Error' },
    ];
};

export const getContentCategories = () => {
    return [
        { id: 1, name: 'Scholarships', engagement: 85, leads: 450 },
        { id: 2, name: 'Campus Life', engagement: 72, leads: 320 },
        { id: 3, name: 'Admissions', engagement: 91, leads: 580 },
        { id: 4, name: 'Alumni Stories', engagement: 65, leads: 210 },
    ];
};

export const getPublisherRatings = () => {
    return [
        { id: 1, name: 'CollegeConfidential', rating: 4.8, qualityScore: 92, status: 'Excellent' },
        { id: 2, name: 'Niche', rating: 4.5, qualityScore: 88, status: 'Good' },
        { id: 3, name: 'Scholarships.com', rating: 4.2, qualityScore: 81, status: 'Average' },
        { id: 4, name: 'Fastweb', rating: 3.9, qualityScore: 75, status: 'Fair' },
    ];
};

export const getGeoDistribution = () => {
    return [
        { region: 'South East', leads: 450, percentage: 35 },
        { region: 'Mid-Atlantic', leads: 320, percentage: 25 },
        { region: 'Midwest', leads: 210, percentage: 16 },
        { region: 'West Coast', leads: 150, percentage: 12 },
        { region: 'North East', leads: 155, percentage: 12 },
    ];
};

// --- Mock Data Generation ---
const generateDummyLeads = () => {
   const leads = [];
   const count = 150;
   
   for(let i=0; i<count; i++) {
      const source = LEAD_SOURCES[Math.floor(Math.random() * LEAD_SOURCES.length)];
      const school = SCHOOL_PARTNERS[Math.floor(Math.random() * SCHOOL_PARTNERS.length)];
      const program = PROGRAMS[Math.floor(Math.random() * PROGRAMS.length)];
      const validity = VALIDITY_STATUSES[Math.floor(Math.random() * VALIDITY_STATUSES.length)];
      
      let stage = 'New Lead';
      if(validity === 'Valid' || validity === 'Accepted') {
         stage = CONVERSION_STAGES[Math.floor(Math.random() * CONVERSION_STAGES.length)];
      } else {
         stage = 'New Lead';
      }

      const daysAgo = Math.floor(Math.random() * 60);
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - daysAgo);

      leads.push({
         id: generateId('lead'),
         name: `Student Candidate ${i+1}`,
         email: `student${i+1}@example.com`,
         phone: `+1 (555) 000-${1000+i}`,
         schoolPartner: school,
         program: program,
         leadSource: source,
         contentProvider: source === 'content_provider' ? CONTENT_PROVIDERS[Math.floor(Math.random() * CONTENT_PROVIDERS.length)] : null,
         publisher: source === 'publisher' ? PUBLISHERS[Math.floor(Math.random() * PUBLISHERS.length)] : null,
         validityStatus: validity,
         conversionStage: stage,
         enrollmentDate: stage === 'Enrolled' ? new Date(createdAt.getTime() + Math.random() * 1000000000).toISOString() : null,
         costPerLead: Math.floor(Math.random() * 50) + 10,
         costPerAcceptedStudent: stage === 'Enrolled' ? Math.floor(Math.random() * 500) + 200 : 0,
         qualityScore: Math.floor(Math.random() * 100),
         createdAt: createdAt.toISOString(),
         updatedAt: new Date().toISOString(),
         notes: [],
         activities: [],
         enrollmentMilestones: stage === 'Enrolled' ? [
            { milestone: 'Application Submitted', date: new Date().toISOString() },
            { milestone: 'Deposit Paid', date: new Date().toISOString() }
         ] : []
      });
   }
   return leads;
};
