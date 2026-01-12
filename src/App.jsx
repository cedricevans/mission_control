import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/context/ThemeContext';
import PremiumSidebar from '@/components/PremiumSidebar';
import PremiumHeader from '@/components/PremiumHeader';
import ScrollToTop from '@/components/ScrollToTop';

// Pages
import Dashboard from '@/pages/Dashboard';
import StudentManagement from '@/pages/StudentManagement';
import SchoolManagement from '@/pages/SchoolManagement';
import ProgramManagement from '@/pages/ProgramManagement';
import SourceManagement from '@/pages/SourceManagement';
import CampaignManagement from '@/pages/CampaignManagement';
import FinancialReport from '@/pages/FinancialReport';
import StudentsReport from '@/pages/StudentsReport';
import SchoolsReport from '@/pages/SchoolsReport';
import PublishersReport from '@/pages/PublishersReport';
import ContentProvidersReport from '@/pages/ContentProvidersReport';
import SchoolInvoice from '@/pages/SchoolInvoice';
import PublisherInvoice from '@/pages/PublisherInvoice';
import ProviderInvoice from '@/pages/ProviderInvoice';
import UserManagement from '@/pages/UserManagement';
import AlertsNotifications from '@/pages/AlertsNotifications';
import UserSettings from '@/pages/UserSettings';
import PlaceholderPage from '@/pages/PlaceholderPage';

// New Report Pages
import LeadAnalyticsReport from '@/pages/LeadAnalyticsReport';
import ConversionFunnelReport from '@/pages/ConversionFunnelReport';
import CampaignPerformanceReport from '@/pages/CampaignPerformanceReport';
import GeographicDistributionReport from '@/pages/GeographicDistributionReport';

// New Source Management Pages
import ContentCategoriesPage from '@/pages/ContentCategoriesPage';
import PublisherRatingsPage from '@/pages/PublisherRatingsPage';
import ProviderPerformancePage from '@/pages/ProviderPerformancePage';

// New Billing Pages
import PaymentHistoryPage from '@/pages/PaymentHistoryPage';
import InvoicingSettingsPage from '@/pages/InvoicingSettingsPage';
import TaxReportsPage from '@/pages/TaxReportsPage';
import RefundsPage from '@/pages/RefundsPage';

// New Settings Pages
import APIKeysPage from '@/pages/APIKeysPage';
import IntegrationsPage from '@/pages/IntegrationsPage';
import EmailTemplatesPage from '@/pages/EmailTemplatesPage';
import SystemLogsPage from '@/pages/SystemLogsPage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    return saved === null ? true : JSON.parse(saved);
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => {
      const newState = !prev;
      localStorage.setItem('sidebar_collapsed', JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <ThemeProvider>
      <Helmet>
        <title>HBCU Connect - Mission Control</title>
        <meta name="description" content="HBCU Student Lead Management System" />
      </Helmet>
      
      <BrowserRouter>
        <div className="flex h-screen bg-[var(--primary-bg)] overflow-hidden text-[var(--text-primary)] font-sans selection:bg-[var(--accent-gold)] selection:text-black">
          <PremiumSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          
          <div className="flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300">
            <PremiumHeader onMenuClick={toggleSidebar} />
            
            <main className="flex-1 overflow-y-auto relative z-10 custom-scrollbar p-6">
              <div className="w-full max-w-7xl mx-auto space-y-6 pb-20">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  
                  {/* Management */}
                  <Route path="/student-management" element={<StudentManagement />} />
                  <Route path="/school-management" element={<SchoolManagement />} />
                  <Route path="/program-management" element={<ProgramManagement />} />
                  
                  {/* Sources (Tabbed) */}
                  <Route path="/source-management/*" element={<SourceManagement />} />
                  <Route path="/campaign-management" element={<CampaignManagement />} />
                  
                  {/* Reports */}
                  <Route path="/reports/financial" element={<FinancialReport />} />
                  <Route path="/reports/students" element={<StudentsReport />} />
                  <Route path="/reports/schools" element={<SchoolsReport />} />
                  <Route path="/reports/publishers" element={<PublishersReport />} />
                  <Route path="/reports/content" element={<ContentProvidersReport />} />
                  <Route path="/reports/lead-analytics" element={<LeadAnalyticsReport />} />
                  <Route path="/reports/conversion-funnel" element={<ConversionFunnelReport />} />
                  <Route path="/reports/campaign-performance" element={<CampaignPerformanceReport />} />
                  <Route path="/reports/geographic-distribution" element={<GeographicDistributionReport />} />
                  
                  {/* Expanded Source Management */}
                  <Route path="/source-management/content-categories" element={<ContentCategoriesPage />} />
                  <Route path="/source-management/publisher-ratings" element={<PublisherRatingsPage />} />
                  <Route path="/source-management/provider-performance" element={<ProviderPerformancePage />} />

                  {/* Billing */}
                  <Route path="/billing/school-invoice" element={<SchoolInvoice />} />
                  <Route path="/billing/publisher-invoice" element={<PublisherInvoice />} />
                  <Route path="/billing/provider-invoice" element={<ProviderInvoice />} />
                  <Route path="/billing/payment-history" element={<PaymentHistoryPage />} />
                  <Route path="/billing/invoicing-settings" element={<InvoicingSettingsPage />} />
                  <Route path="/billing/tax-reports" element={<TaxReportsPage />} />
                  <Route path="/billing/refunds" element={<RefundsPage />} />
                  
                  {/* System & Settings */}
                  <Route path="/user-management" element={<UserManagement />} />
                  <Route path="/settings/alerts" element={<AlertsNotifications />} />
                  <Route path="/settings/users" element={<UserSettings />} />
                  <Route path="/settings/api-keys" element={<APIKeysPage />} />
                  <Route path="/settings/integrations" element={<IntegrationsPage />} />
                  <Route path="/settings/email-templates" element={<EmailTemplatesPage />} />
                  <Route path="/settings/system-logs" element={<SystemLogsPage />} />
                  
                  {/* Fallback */}
                  <Route path="*" element={<PlaceholderPage />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
        
        {/* Global Components */}
        <ScrollToTop />
      </BrowserRouter>
      
      <Toaster />
    </ThemeProvider>
  );
}

export default App;