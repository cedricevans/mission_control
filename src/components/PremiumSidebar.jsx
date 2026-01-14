
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, GraduationCap, School, BookOpen, Layers, 
  Target, BarChart3, CreditCard, UserCog, Settings,
  ChevronDown, LogOut, Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

function PremiumSidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState([]);
  const menuScrollRef = useRef(null);

  useEffect(() => {
    const menuEl = menuScrollRef.current;
    if (!menuEl) return;
    const saved = sessionStorage.getItem('sidebar_menu_scroll');
    if (saved) {
      menuEl.scrollTop = Number.parseInt(saved, 10);
    }
  }, []);

  useEffect(() => {
    const menuEl = menuScrollRef.current;
    if (!menuEl) return;

    const handleScroll = () => {
      sessionStorage.setItem('sidebar_menu_scroll', String(menuEl.scrollTop));
    };

    menuEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => menuEl.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const menuEl = menuScrollRef.current;
    if (!menuEl) return;
    const saved = sessionStorage.getItem('sidebar_menu_scroll');
    if (saved) {
      requestAnimationFrame(() => {
        menuEl.scrollTop = Number.parseInt(saved, 10);
      });
    }
  }, [location.pathname, isOpen]);


  const priorityItems = ['Dashboard', 'Student Mgmt.', 'School Mgmt.', 'Program Mgmt.', 'Campaign Mgmt.', 'Reports', 'Billing'];

  const toggleSubmenu = (path) => {
    if (!isOpen) {
       toggleSidebar(); 
       setTimeout(() => setExpandedItems([...expandedItems, path]), 200);
       return;
    }
    if (expandedItems.includes(path)) {
      setExpandedItems(expandedItems.filter(p => p !== path));
    } else {
      setExpandedItems([...expandedItems, path]);
    }
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/student-management', label: 'Student Mgmt.', icon: GraduationCap },
    { path: '/school-management', label: 'School Mgmt.', icon: School },
    { path: '/program-management', label: 'Program Mgmt.', icon: BookOpen },
    { 
      id: 'source',
      label: 'Source Mgmt.', 
      icon: Layers,
      subItems: [
        { path: '/source-management/publishers', label: 'Publishers' },
        { path: '/source-management/providers', label: 'Providers' },
        { path: '/source-management/content', label: 'Content' },
        { path: '/source-management/content-categories', label: 'Categories' },
        { path: '/source-management/publisher-ratings', label: 'Publisher Ratings' },
        { path: '/source-management/provider-performance', label: 'Provider Perf.' }
      ]
    },
    { 
      id: 'campaign',
      label: 'Campaign Mgmt.', 
      icon: Target,
      path: '/campaign-management'
    },
    { 
      id: 'reports',
      label: 'Reports', 
      icon: BarChart3,
      subItems: [
        { path: '/reports/financial', label: 'Financial Report' },
        { path: '/reports/students', label: 'Students Report' },
        { path: '/reports/schools', label: 'Schools Report' },
        { path: '/reports/publishers', label: 'Publishers Report' },
        { path: '/reports/content', label: 'Content Report' },
        { path: '/reports/lead-analytics', label: 'Lead Analytics' },
        { path: '/reports/conversion-funnel', label: 'Conversion Funnel' },
        { path: '/reports/campaign-performance', label: 'Campaign Perf.' },
        { path: '/reports/geographic-distribution', label: 'Geo Distribution' },
      ]
    },
    { 
      id: 'billing',
      label: 'Billing', 
      icon: CreditCard,
      subItems: [
        { path: '/billing/school-invoice', label: 'School Invoice' },
        { path: '/billing/publisher-invoice', label: 'Publisher Invoice' },
        { path: '/billing/provider-invoice', label: 'Provider Invoice' },
        { path: '/billing/payment-history', label: 'Payment History' },
        { path: '/billing/invoicing-settings', label: 'Invoicing Settings' },
        { path: '/billing/tax-reports', label: 'Tax Reports' },
        { path: '/billing/refunds', label: 'Refunds' },
      ]
    },
    { path: '/user-management', label: 'User Management', icon: UserCog },
    { 
      id: 'settings',
      label: 'Settings', 
      icon: Settings,
      subItems: [
         { path: '/settings/alerts', label: 'Alerts/Notifications' },
         { path: '/settings/users', label: 'Users' },
         { path: '/settings/api-keys', label: 'API Keys' },
         { path: '/settings/integrations', label: 'Integrations' },
         { path: '/settings/email-templates', label: 'Email Templates' },
         { path: '/settings/system-logs', label: 'System Logs' },
      ]
    },
  ];

  const MenuItem = ({ item }) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems.includes(item.id || item.path);
    const isActive = location.pathname === item.path || (item.subItems && item.subItems.some(sub => location.pathname.startsWith(sub.path)));
    const Icon = item.icon;
    const isPriority = priorityItems.includes(item.label);
    const isEmphasized = isPriority || item.id === 'source';

    if (hasSubItems) {
      return (
        <div className="mb-1">
          <button
            type="button"
            onClick={() => toggleSubmenu(item.id || item.path)}
            className={cn(
              "w-full flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative border border-transparent overflow-hidden",
              isActive 
                ? "bg-[var(--accent-gold)]/10 text-[var(--accent-gold)]" 
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]",
              isOpen ? "justify-between" : "justify-center",
              isEmphasized && !isActive && "text-[var(--text-primary)]"
            )}
            title={!isOpen ? item.label : undefined}
          >
            {isPriority && isOpen && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r bg-[var(--accent-gold)] opacity-70" />
            )}

            <div className="flex items-center gap-3">
              <div className="shrink-0 relative">
                 <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-[var(--accent-gold)]" : isPriority ? "text-[var(--accent-gold)]/80" : "text-current")} />
              </div>
              {isOpen && (
                <span className={cn("transition-opacity duration-200 whitespace-nowrap", isEmphasized && "font-bold")}>
                  {item.label}
                </span>
              )}
            </div>
            {isOpen && (
               <motion.div
                 animate={{ rotate: isExpanded ? 180 : 0 }}
                 transition={{ duration: 0.2 }}
               >
                 <ChevronDown className={cn("w-4 h-4 opacity-50")} />
               </motion.div>
            )}
          </button>
          
          <AnimatePresence>
            {isExpanded && isOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden pl-4 pr-1 mt-1 space-y-1"
              >
                {item.subItems.map(sub => (
                   <NavLink
                      key={sub.path}
                      to={sub.path}
                      onClick={() => {
                        if (window.innerWidth < 640 && isOpen) toggleSidebar();
                      }}
                      className={({ isActive }) => cn(
                         "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors w-full",
                         isActive
                            ? "bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]"
                      )}
                   >
                      {({ isActive }) => (
                        <>
                          <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", isActive ? "bg-current" : "bg-[var(--text-secondary)] opacity-50")} />
                          <span className="truncate">{sub.label}</span>
                        </>
                      )}
                   </NavLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <NavLink
        to={item.path}
        title={!isOpen ? item.label : undefined}
        onClick={() => {
          if (window.innerWidth < 640 && isOpen) toggleSidebar();
        }}
        className={({ isActive }) => cn(
          "w-full flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative border border-transparent overflow-hidden mb-1",
          isActive 
            ? "bg-[var(--accent-gold)] text-[#000000] shadow-[0_0_20px_var(--accent-gold-glow)]" 
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]",
          isOpen ? "justify-start gap-3" : "justify-center",
          isPriority && !isActive && "text-[var(--text-primary)]"
        )}
      >
        {isPriority && isOpen && !isActive && (
           <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r bg-[var(--accent-gold)] opacity-70" />
        )}

        <div className="shrink-0">
          <Icon className={cn("w-5 h-5", !isActive && isPriority && "text-[var(--accent-gold)]/80")} />
        </div>
        {isOpen && (
          <span className={cn("transition-opacity duration-200 whitespace-nowrap", isPriority && "font-bold")}>
            {item.label}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-x-0 top-16 bottom-0 bg-black/50 z-50 sm:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      <motion.div 
        initial={false}
        animate={{ 
          width: isOpen ? 280 : 72
        }}
        className={cn(
          "relative sm:relative z-[60] bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] flex flex-col shadow-2xl transition-all duration-300",
          !isOpen && "w-[72px]"
        )}
      >
        <div className={cn("h-24 flex items-center border-b border-[var(--border-color)] shrink-0 transition-all duration-300", isOpen ? "px-6" : "justify-center px-0")}>
          <div className="flex items-center gap-3 overflow-hidden">
              <div className="logo-glow w-[60px] h-[60px] rounded-full bg-white/5 flex items-center justify-center shrink-0 shadow-[0_0_15px_var(--accent-gold-glow)] border border-[var(--border-color)] overflow-hidden">
                <img 
                  src="https://horizons-cdn.hostinger.com/6bd44cbb-b6a3-4df8-8386-286a6aab56a2/2980587eb9031dc006aaa83edaa9d513.png" 
                  alt="FocusQuest Logo" 
                  className="w-full h-full object-contain p-1"
                />
              </div>
              {isOpen && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 0.1 }}
                  className="whitespace-nowrap"
                >
                  <h1 className="font-display font-bold text-lg tracking-wide text-[var(--text-primary)]">Mission Control</h1>
                  <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider font-semibold">Power By FocusQuest</p>
                </motion.div>
              )}
          </div>
        </div>

        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-24 w-6 h-6 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors shadow-lg z-50 backdrop-blur-sm"
        >
          <Menu className="w-3 h-3" />
        </button>

        <div ref={menuScrollRef} className="flex-1 py-6 px-3 overflow-y-auto custom-scrollbar space-y-1">
          {menuItems.map((item, idx) => <MenuItem key={idx} item={item} />)}
        </div>

        <div className="p-4 border-t border-[var(--border-color)] shrink-0">
          <button className={cn(
            "flex items-center gap-3 text-[var(--text-muted)] hover:text-[var(--accent-red)] transition-colors px-3 py-3 text-sm w-full rounded-xl hover:bg-[var(--hover-bg)] group border border-transparent overflow-hidden whitespace-nowrap",
            !isOpen && "justify-center"
          )}>
            <LogOut className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
            {isOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default PremiumSidebar;
