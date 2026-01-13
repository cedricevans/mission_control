import React from 'react';
import { Bell, Search, User, Menu, Sun, Moon, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { useLocation, Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import DateFilterBar from '@/components/dashboard/DateFilterBar';
function PremiumHeader({
  onMenuClick,
  dashboardFilters,
  onDashboardFilterSearch,
  showDashboardFilters
}) {
  const {
    theme,
    toggleTheme
  } = useTheme();
  const location = useLocation();
  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';

    // Capitalize and remove slash
    return path.substring(1).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  return <motion.header initial={{
    y: -50,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} className="border-b border-[var(--border-color)] bg-[var(--primary-bg)]/90 backdrop-blur-md z-50 sticky top-0 transition-colors duration-300">
      <div className="h-16 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-[var(--text-primary)] hover:bg-[var(--hover-bg)]" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </Button>

        {/* Breadcrumb / Context */}
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
          <Link to="/" className="hover:text-[var(--accent-gold)] transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <span>/</span>
          <span className="text-[var(--text-primary)]">{getBreadcrumb()}</span>
        </div>
        <div className="md:hidden ml-4 text-[17.6px] font-bold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent-gold)] to-[var(--text-primary)]">
          Morehouse College
        </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* University Title - Moved from Dashboard body */}
          <h1 className="hidden xl:block text-xl font-bold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent-gold)] to-[var(--text-primary)] mr-2 animate-in fade-in slide-in-from-top-2 duration-700">Morehouse College</h1>

          <div className="hidden md:flex items-center w-64 relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)] group-focus-within:text-[var(--accent-blue)] transition-colors" />
            <input type="text" placeholder="Search..." className="w-full bg-[var(--secondary-bg)] border border-[var(--border-color)] rounded-full py-1.5 pl-9 pr-4 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] transition-all placeholder:text-[var(--text-secondary)]" />
          </div>

          <TooltipProvider>
              <Tooltip>
                  <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={toggleTheme} className={`theme-toggle-glow relative overflow-hidden transition-all duration-300 ${theme === 'dark' ? "text-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/10" : "text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10"}`} aria-label="Toggle Dark Mode">
                        <motion.div key={theme} initial={{
                  rotate: -180,
                  opacity: 0
                }} animate={{
                  rotate: 0,
                  opacity: 1
                }} transition={{
                  duration: 0.3
                }}>
                          {theme === 'dark' ? <Moon className="w-5 h-5 fill-current" /> : <Sun className="w-5 h-5 fill-current" />}
                        </motion.div>
                      </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                      <p>Toggle Dark Mode</p>
                  </TooltipContent>
              </Tooltip>
          </TooltipProvider>

          <button className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors group">
            <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[var(--accent-red)] rounded-full border-2 border-[var(--primary-bg)] animate-pulse shadow-[0_0_8px_var(--accent-red-dim)]" />
          </button>
          
          <div className="flex items-center gap-3 pl-6 border-l border-[var(--border-color)]">
            <div className="text-right hidden lg:block">
              <div className="text-sm font-bold text-[var(--text-primary)]">Cedric Evans</div>
              <div className="text-[10px] text-[var(--accent-gold)] uppercase tracking-wider font-extrabold">Admin</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--accent-gold)] to-[var(--accent-gold)] p-[2px] cursor-pointer hover:shadow-[0_0_15px_var(--accent-gold-dim)] transition-all">
              <div className="w-full h-full rounded-full bg-[var(--primary-bg)] flex items-center justify-center overflow-hidden">
                 <User className="w-5 h-5 text-[var(--text-primary)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDashboardFilters && (
        <div className="px-4 md:px-8 pb-4">
          <DateFilterBar onSearch={onDashboardFilterSearch} initialFilters={dashboardFilters} embedded />
        </div>
      )}
    </motion.header>;
}
export default PremiumHeader;
