import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/context/ThemeContext';
import PremiumSidebar from '@/components/PremiumSidebar';
import PremiumHeader from '@/components/PremiumHeader';
import ScrollToTop from '@/components/ScrollToTop';
import { cn } from '@/lib/utils';

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
  const [dashboardFilters, setDashboardFilters] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    filterStatus: 'active',
    division: 'all'
  });

  useEffect(() => {
    if (window.innerWidth < 640) {
      setIsSidebarOpen(false);
    }
  }, []);

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
        <AppLayout
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          dashboardFilters={dashboardFilters}
          onDashboardFilterSearch={setDashboardFilters}
        />
      </BrowserRouter>
      
      <Toaster />
    </ThemeProvider>
  );
}

const AppLayout = ({ isSidebarOpen, toggleSidebar, dashboardFilters, onDashboardFilterSearch }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/' || location.pathname === '/dashboard';

  return (
    <>
        <div className="flex h-screen bg-[var(--primary-bg)] overflow-hidden text-[var(--text-primary)] font-sans selection:bg-[var(--accent-gold)] selection:text-black">
          <PremiumSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          
        <div className="flex-1 flex flex-col h-full overflow-y-auto relative transition-all duration-300 min-h-0 custom-scrollbar">
          <PremiumHeader
            onMenuClick={toggleSidebar}
            dashboardFilters={dashboardFilters}
            onDashboardFilterSearch={onDashboardFilterSearch}
            showDashboardFilters={isDashboard}
          />
          
          <main
            className={cn(
              "flex-1 relative z-10 min-h-0",
              isDashboard ? "px-6 pb-6 pt-0" : "p-6"
            )}
          >
            <div className="w-full max-w-7xl mx-auto space-y-6 pb-20">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard filters={dashboardFilters} />} />
                
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
    </>
  );
};

export default App;
