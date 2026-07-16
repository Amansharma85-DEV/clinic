import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  LayoutDashboard,
  Settings,
  Image as ImageIcon,
  HeartHandshake,
  Users,
  MessageSquare,
  LogOut,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  Save,
  RotateCcw,
  CheckCircle,
  Eye,
  FileDown,
  FileUp,
  Sliders
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onClose }) => {
  const cms = useCMS();
  const { state } = cms;

  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'hero' | 'services' | 'doctors' | 'results' | 'reviews' | 'settings'>('overview');
  
  // Local edit states
  const [successMsg, setSuccessMsg] = useState('');
  
  const showToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image file must be under 2MB to ensure smooth local-storage performance.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-45 bg-neutral-100 dark:bg-neutral-950 flex flex-col md:flex-row text-neutral-800 dark:text-neutral-250 select-none overflow-hidden">
      
      {/* Toast Alert */}
      {successMsg && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-500/20 text-sm font-semibold animate-bounce-slow">
          <CheckCircle className="w-5 h-5 text-white" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-neutral-900 text-neutral-400 flex flex-col shrink-0">
        {/* Sidebar Brand */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex flex-col text-left">
            <span className="text-white font-bold text-base tracking-wider">{state.clinicInfo.logoText} CMS</span>
            <span className="text-4xs uppercase tracking-widest font-semibold text-neutral-500">Clinical Dashboard</span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-neutral-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="p-4 flex-grow space-y-1 overflow-y-auto">
          {[
            { id: 'overview', label: 'Overview & Leads', icon: LayoutDashboard },
            { id: 'profile', label: 'Clinic Info & Style', icon: Settings },
            { id: 'hero', label: 'Hero & Welcome', icon: Sliders },
            { id: 'services', label: 'Clinic Services', icon: HeartHandshake },
            { id: 'doctors', label: 'Medical Specialists', icon: Users },
            { id: 'results', label: 'Before & Afters', icon: ImageIcon },
            { id: 'reviews', label: 'Testimonials & FAQ', icon: MessageSquare },
            { id: 'settings', label: 'SEO & Database', icon: RotateCcw }
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--color-accent)] text-white shadow-md'
                    : 'hover:bg-neutral-800 hover:text-neutral-250 text-neutral-400'
                }`}
              >
                <TabIcon className="w-4.5 h-4.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-800 flex flex-col gap-2">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-750 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border border-neutral-700/30"
          >
            <Eye className="w-4 h-4 text-[var(--color-accent)]" />
            <span>View Live Site</span>
          </button>
          
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 hover:bg-rose-950/20 hover:text-rose-400 text-neutral-500 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="flex-grow flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="bg-white dark:bg-neutral-900 border-b border-neutral-250/30 dark:border-neutral-800 px-8 py-5 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white capitalize flex items-center gap-2">
            <span>CMS Panel:</span>
            <span className="text-neutral-500 font-semibold">{activeTab.replace('-', ' ')}</span>
          </h2>
          <span className="text-3xs text-neutral-400 font-medium">Logged in as Administrator</span>
        </header>

        {/* Tab Router Panels */}
        <main className="flex-grow p-8 overflow-y-auto text-left">
          
          {/* TAB 1: OVERVIEW & LEADS */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Bar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Patient Leads", value: state.leads.length, color: "text-amber-500" },
                  { label: "Active Services", value: state.services.length, color: "text-emerald-500" },
                  { label: "Specialists", value: state.doctors.length, color: "text-blue-500" },
                  { label: "Testimonials", value: state.testimonials.length, color: "text-purple-500" }
                ].map(stat => (
                  <div key={stat.label} className="p-6 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/40 dark:border-neutral-800 shadow-sm">
                    <p className="text-3xs text-neutral-400 uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                    <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Leads Table */}
              <div className="bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-200/40 dark:border-neutral-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                  <h3 className="font-bold text-neutral-900 dark:text-white">Active Patient Booking Leads</h3>
                  <span className="text-3xs bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full font-semibold uppercase">Real-Time Lead Intake</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-neutral-50 dark:bg-neutral-800/45 text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 uppercase tracking-wider font-bold">
                        <th className="p-4 pl-6">Patient</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Requested Therapy</th>
                        <th className="p-4">Preferred Date</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 pr-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-850">
                      {state.leads.length > 0 ? (
                        state.leads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-850/20 text-neutral-700 dark:text-neutral-300">
                            <td className="p-4 pl-6 font-bold text-neutral-850 dark:text-neutral-105">{lead.name}</td>
                            <td className="p-4 space-y-0.5">
                              <p>{lead.phone}</p>
                              {lead.email && <p className="text-4xs text-neutral-400">{lead.email}</p>}
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded font-semibold text-neutral-600 dark:text-neutral-350">{lead.treatment}</span>
                              {lead.message && (
                                <p className="text-3xs text-neutral-400 mt-1 italic max-w-xs truncate" title={lead.message}>"{lead.message}"</p>
                              )}
                            </td>
                            <td className="p-4 font-medium">{lead.preferredDate}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-3xs font-bold uppercase tracking-wider ${
                                lead.status === 'Pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-350' :
                                lead.status === 'Contacted' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-350' :
                                'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-350'
                              }`}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="p-4 pr-6 text-right space-x-1.5 whitespace-nowrap">
                              <button
                                onClick={() => {
                                  cms.updateLeadStatus(lead.id, 'Contacted');
                                  showToast("Lead status marked as Contacted.");
                                }}
                                className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-350 rounded-lg font-bold text-[10px] cursor-pointer"
                              >
                                Contacted
                              </button>
                              <button
                                onClick={() => {
                                  cms.updateLeadStatus(lead.id, 'Cancelled');
                                  showToast("Lead status marked as Cancelled.");
                                }}
                                className="px-2 py-1 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-350 rounded-lg font-bold text-[10px] cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm("Delete lead database entry?")) {
                                    cms.deleteLead(lead.id);
                                    showToast("Lead record deleted.");
                                  }
                                }}
                                className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-rose-600 rounded-lg cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-neutral-450 italic">No bookings recorded. Form submissions will register here in real-time.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE & STYLE */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form details (Left) */}
              <div className="lg:col-span-8 bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-200/40 dark:border-neutral-800 p-8 shadow-sm space-y-6">
                <h3 className="font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">Clinic Directory Data</h3>
                
                {/* Branding text */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase">Clinic Name</label>
                    <input
                      type="text"
                      value={state.clinicInfo.name}
                      onChange={(e) => cms.updateClinicInfo({ name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase">Logo Navbar Text</label>
                    <input
                      type="text"
                      value={state.clinicInfo.logoText}
                      onChange={(e) => cms.updateClinicInfo({ logoText: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                    />
                  </div>
                </div>

                {/* Hotlines */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase">Display Phone Number</label>
                    <input
                      type="text"
                      value={state.clinicInfo.phone}
                      onChange={(e) => cms.updateClinicInfo({ phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase">Display Email</label>
                    <input
                      type="email"
                      value={state.clinicInfo.email}
                      onChange={(e) => cms.updateClinicInfo({ email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                    />
                  </div>
                </div>

                {/* WhatsApp & Call targets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase">WhatsApp Number (with country code, no symbols)</label>
                    <input
                      type="text"
                      value={state.clinicInfo.whatsappNumber}
                      onChange={(e) => cms.updateClinicInfo({ whatsappNumber: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase">Call Phone Target (link syntax)</label>
                    <input
                      type="text"
                      value={state.clinicInfo.callNumber}
                      onChange={(e) => cms.updateClinicInfo({ callNumber: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                    />
                  </div>
                </div>

                {/* Address & Hours */}
                <div className="space-y-1">
                  <label className="text-3xs font-bold text-neutral-400 uppercase">Physical Address</label>
                  <input
                    type="text"
                    value={state.clinicInfo.address}
                    onChange={(e) => cms.updateClinicInfo({ address: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-3xs font-bold text-neutral-400 uppercase">Working Hours Display (line breaks allowed)</label>
                  <textarea
                    value={state.clinicInfo.workingHours}
                    rows={2}
                    onChange={(e) => cms.updateClinicInfo({ workingHours: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white resize-none"
                  />
                </div>

                {/* Social links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase">Instagram URL</label>
                    <input
                      type="text"
                      value={state.clinicInfo.instagramUrl}
                      onChange={(e) => cms.updateClinicInfo({ instagramUrl: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase">Facebook URL</label>
                    <input
                      type="text"
                      value={state.clinicInfo.facebookUrl}
                      onChange={(e) => cms.updateClinicInfo({ facebookUrl: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-3xs font-bold text-neutral-400 uppercase">Google Maps Iframe Src Link</label>
                  <input
                    type="text"
                    value={state.clinicInfo.googleMapsLink}
                    onChange={(e) => cms.updateClinicInfo({ googleMapsLink: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showToast("Clinic configuration saved.")}
                    className="px-6 py-2.5 bg-[var(--color-accent)] text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>

              {/* Theme Settings (Right) */}
              <div className="lg:col-span-4 bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-200/40 dark:border-neutral-800 p-8 shadow-sm space-y-6">
                <h3 className="font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">Theme & Aesthetics</h3>
                
                {/* Primary font */}
                <div className="space-y-1">
                  <label className="text-3xs font-bold text-neutral-400 uppercase">Typography Font Family</label>
                  <select
                    value={state.theme.primaryFont}
                    onChange={(e) => cms.updateTheme({ primaryFont: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-neutral-800 dark:text-white appearance-none"
                  >
                    <option value="Inter">Inter (Sans-serif)</option>
                    <option value="system-ui">System Default (Vibrant)</option>
                    <option value="serif">Luxurious Serif</option>
                  </select>
                </div>

                {/* Color hex values */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase block">Luxury Accent Color (Gold)</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={state.theme.accentColor}
                        onChange={(e) => cms.updateTheme({ accentColor: e.target.value })}
                        className="w-10 h-10 border border-neutral-200 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={state.theme.accentColor}
                        onChange={(e) => cms.updateTheme({ accentColor: e.target.value })}
                        className="flex-grow px-3 py-2 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase block">Primary Layout Color (Soft Blue)</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={state.theme.primaryColor}
                        onChange={(e) => cms.updateTheme({ primaryColor: e.target.value })}
                        className="w-10 h-10 border border-neutral-200 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={state.theme.primaryColor}
                        onChange={(e) => cms.updateTheme({ primaryColor: e.target.value })}
                        className="flex-grow px-3 py-2 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase block">Light Accent Background (Light Green)</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={state.theme.greenColor}
                        onChange={(e) => cms.updateTheme({ greenColor: e.target.value })}
                        className="w-10 h-10 border border-neutral-200 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={state.theme.greenColor}
                        onChange={(e) => cms.updateTheme({ greenColor: e.target.value })}
                        className="flex-grow px-3 py-2 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white uppercase"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      cms.updateTheme({
                        primaryColor: '#f0f7ff',
                        accentColor: '#c5a880',
                        greenColor: '#f2faf3'
                      });
                      showToast("Theme palettes restored to clinical defaults.");
                    }}
                    className="w-full text-center py-2.5 border border-dashed border-neutral-250 hover:border-neutral-400 dark:border-neutral-750 text-neutral-500 hover:text-neutral-700 text-xs font-semibold rounded-xl cursor-pointer transition-colors"
                  >
                    Reset Palette to Defaults
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HERO & WELCOME */}
          {activeTab === 'hero' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Hero Section Edit (Left) */}
              <div className="lg:col-span-7 bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-200/40 dark:border-neutral-800 p-8 shadow-sm space-y-6">
                <h3 className="font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">Hero Section Controls</h3>
                
                <div className="space-y-1">
                  <label className="text-3xs font-bold text-neutral-400 uppercase">Main Title Headline (Use linebreaks for styling)</label>
                  <textarea
                    value={state.hero.title}
                    rows={2}
                    onChange={(e) => cms.updateHero({ title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white resize-none font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-3xs font-bold text-neutral-400 uppercase">Subtitle Description</label>
                  <textarea
                    value={state.hero.subtitle}
                    rows={3}
                    onChange={(e) => cms.updateHero({ subtitle: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white resize-none"
                  />
                </div>

                {/* Hero Image */}
                <div className="space-y-2">
                  <label className="text-3xs font-bold text-neutral-400 uppercase block">Hero Action Image</label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border shrink-0">
                      <img src={state.hero.imageUrl} alt="Hero" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow w-full space-y-2">
                      <input
                        type="text"
                        value={state.hero.imageUrl}
                        onChange={(e) => cms.updateHero({ imageUrl: e.target.value })}
                        placeholder="Image URL"
                        className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                      />
                      <div className="flex items-center gap-2">
                        <label className="px-4 py-2 bg-neutral-900 dark:bg-neutral-800 text-white rounded-xl text-2xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-neutral-850 transition-colors flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageFileChange(e, (base64) => cms.updateHero({ imageUrl: base64 }))}
                            className="hidden"
                          />
                        </label>
                        <span className="text-[10px] text-neutral-400">JPG, PNG under 2MB.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase">Rating Badge Text</label>
                    <input
                      type="text"
                      value={state.hero.rating}
                      onChange={(e) => cms.updateHero({ rating: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase">Patient Volume Badge</label>
                    <input
                      type="text"
                      value={state.hero.ratingCount}
                      onChange={(e) => cms.updateHero({ ratingCount: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase">Clinical Experience Label</label>
                    <input
                      type="text"
                      value={state.hero.experience}
                      onChange={(e) => cms.updateHero({ experience: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase">Safety Rating Label</label>
                    <input
                      type="text"
                      value={state.hero.safety}
                      onChange={(e) => cms.updateHero({ safety: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showToast("Hero banner controls updated.")}
                    className="px-6 py-2.5 bg-[var(--color-accent)] text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Welcome Section Edit (Right) */}
              <div className="lg:col-span-5 bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-200/40 dark:border-neutral-800 p-8 shadow-sm space-y-6">
                <h3 className="font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">Welcome Section Info</h3>
                
                <div className="space-y-1">
                  <label className="text-3xs font-bold text-neutral-400 uppercase">Section Header</label>
                  <input
                    type="text"
                    value={state.about.heading}
                    onChange={(e) => cms.updateAbout({ heading: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-3xs font-bold text-neutral-400 uppercase">Welcome Bio Content (Rich Text-ready)</label>
                  <textarea
                    value={state.about.content}
                    rows={5}
                    onChange={(e) => cms.updateAbout({ content: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white leading-relaxed resize-none"
                  />
                </div>

                {/* About image */}
                <div className="space-y-2">
                  <label className="text-3xs font-bold text-neutral-400 uppercase block">Doctor/Welcome Image</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border shrink-0">
                      <img src={state.about.imageUrl} alt="About" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow space-y-1.5">
                      <input
                        type="text"
                        value={state.about.imageUrl}
                        onChange={(e) => cms.updateAbout({ imageUrl: e.target.value })}
                        placeholder="Image URL"
                        className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-[10px] dark:text-white"
                      />
                      <label className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-4xs font-bold uppercase tracking-wider cursor-pointer text-neutral-600 dark:text-neutral-350">
                        <Upload className="w-3 h-3" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, (base64) => cms.updateAbout({ imageUrl: base64 }))}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showToast("Welcome profile details updated.")}
                    className="px-6 py-2.5 bg-[var(--color-accent)] text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CLINIC SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-8">
              {/* Add New Service Panel */}
              <div className="bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-200/40 dark:border-neutral-800 p-8 shadow-sm">
                <h3 className="font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3 mb-6">Create New Treatment Entry</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const fd = new FormData(form);
                    const title = fd.get('title') as string;
                    const category = fd.get('category') as string;
                    const description = fd.get('description') as string;
                    const imageUrl = fd.get('imageUrl') as string;
                    
                    if (!title || !description || !imageUrl) {
                      alert("Please provide title, description, and image.");
                      return;
                    }
                    
                    cms.addService({ title, category, description, imageUrl });
                    form.reset();
                    showToast("Service treatment added to clinic listing.");
                  }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end text-xs"
                >
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-405 uppercase">Service Title</label>
                    <input type="text" name="title" required placeholder="e.g. Chemical Peel" className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-405 uppercase">Service Category</label>
                    <input type="text" name="category" placeholder="Skin, Hair, Laser, Facial, etc." className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-405 uppercase">Stock Image URL</label>
                    <input type="text" name="imageUrl" required placeholder="Paste unsplash or web URL" className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white" />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-3xs font-bold text-neutral-405 uppercase">Short Description Description</label>
                    <input type="text" name="description" required placeholder="Describe clinical benefits..." className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white" />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-neutral-900 hover:bg-neutral-850 text-white rounded-xl text-2xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Treatment</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Services List Table */}
              <div className="bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-200/40 dark:border-neutral-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-100 dark:border-neutral-800">
                  <h3 className="font-bold text-neutral-900 dark:text-white">Active Service Entries ({state.services.length})</h3>
                </div>

                <div className="divide-y divide-neutral-100 dark:divide-neutral-800 max-h-[500px] overflow-y-auto">
                  {state.services.map((srv, idx) => (
                    <div key={srv.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between text-xs hover:bg-neutral-50/50 dark:hover:bg-neutral-850/10">
                      
                      {/* Image & Title */}
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-14 h-11 bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                          <img src={srv.imageUrl} alt={srv.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white">{srv.title}</h4>
                          <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-500 px-2 py-0.5 rounded font-semibold uppercase">{srv.category || 'Treatment'}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-3xs text-neutral-450 dark:text-neutral-400 flex-grow max-w-md text-left line-clamp-2">
                        {srv.description}
                      </p>

                      {/* List Reordering & Deletion Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        {/* Reorder actions */}
                        <button
                          onClick={() => {
                            if (idx === 0) return;
                            const copy = [...state.services];
                            const temp = copy[idx];
                            copy[idx] = copy[idx - 1];
                            copy[idx - 1] = temp;
                            cms.reorderServices(copy);
                          }}
                          disabled={idx === 0}
                          className="p-2 border border-neutral-200 dark:border-neutral-700 text-neutral-450 hover:text-neutral-850 rounded-xl cursor-pointer disabled:opacity-30"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (idx === state.services.length - 1) return;
                            const copy = [...state.services];
                            const temp = copy[idx];
                            copy[idx] = copy[idx + 1];
                            copy[idx + 1] = temp;
                            cms.reorderServices(copy);
                          }}
                          disabled={idx === state.services.length - 1}
                          className="p-2 border border-neutral-200 dark:border-neutral-700 text-neutral-450 hover:text-neutral-850 rounded-xl cursor-pointer disabled:opacity-30"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete treatment "${srv.title}" from clinic listing?`)) {
                              cms.deleteService(srv.id);
                              showToast(`Service "${srv.title}" deleted.`);
                            }
                          }}
                          className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MEDICAL SPECIALISTS */}
          {activeTab === 'doctors' && (
            <div className="space-y-8">
              {/* Add New Doctor Card */}
              <div className="bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-200/40 dark:border-neutral-800 p-8 shadow-sm">
                <h3 className="font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3 mb-6">Register Doctor Specialist</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const fd = new FormData(form);
                    const name = fd.get('name') as string;
                    const qualification = fd.get('qualification') as string;
                    const specialization = fd.get('specialization') as string;
                    const experience = fd.get('experience') as string;
                    const languages = fd.get('languages') as string;
                    const imageUrl = fd.get('imageUrl') as string;

                    if (!name || !qualification || !imageUrl) {
                      alert("Please provide clinician name, degree qualification, and photo.");
                      return;
                    }

                    cms.addDoctor({ name, qualification, specialization, experience, languages, imageUrl });
                    form.reset();
                    showToast(`Specialist ${name} registered.`);
                  }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end text-xs"
                >
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-405 uppercase">Doctor Full Name</label>
                    <input type="text" name="name" required placeholder="e.g. Dr. Jane Smith" className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-405 uppercase">Degrees / Qualifications</label>
                    <input type="text" name="qualification" required placeholder="e.g. MD - Dermatology, MBBS" className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-405 uppercase">Clinical Specialization</label>
                    <input type="text" name="specialization" placeholder="e.g. Botox & Aesthetic Fillers" className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-405 uppercase">Experience (Years)</label>
                    <input type="text" name="experience" placeholder="e.g. 10+ Years" className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-405 uppercase">Languages Spoken</label>
                    <input type="text" name="languages" placeholder="e.g. English, Spanish" className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-405 uppercase">Portrait Stock Photo URL</label>
                    <input type="text" name="imageUrl" required placeholder="Paste unsplash portrait URL" className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white" />
                  </div>
                  <div className="sm:col-span-3 pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-850 text-white rounded-xl text-2xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Register Practitioner Card
                    </button>
                  </div>
                </form>
              </div>

              {/* Active Specialists Listing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {state.doctors.map((doc) => (
                  <div key={doc.id} className="p-6 bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-200/40 dark:border-neutral-800 shadow-sm flex items-start gap-4">
                    <div className="w-16 h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-100">
                      <img src={doc.imageUrl} alt={doc.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow text-left space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm text-neutral-900 dark:text-white">{doc.name}</h4>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete specialist "${doc.name}"?`)) {
                              cms.deleteDoctor(doc.id);
                              showToast(`Practitioner ${doc.name} removed.`);
                            }
                          }}
                          className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-neutral-400 hover:text-rose-500 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] font-semibold text-[var(--color-accent)]">{doc.qualification}</p>
                      <p className="text-3xs text-neutral-450 dark:text-neutral-400 leading-relaxed pt-1">
                        Speciality: {doc.specialization} <br />
                        Exp: {doc.experience} | Language: {doc.languages}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: BEFORE & AFTERS */}
          {activeTab === 'results' && (
            <div className="space-y-8">
              {/* Add before/after sliders */}
              <div className="bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-200/40 dark:border-neutral-800 p-8 shadow-sm">
                <h3 className="font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3 mb-6">Upload Before/After Results</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const fd = new FormData(form);
                    const category = fd.get('category') as string;
                    const beforeImage = fd.get('beforeImage') as string;
                    const afterImage = fd.get('afterImage') as string;

                    if (!category || !beforeImage || !afterImage) {
                      alert("Please provide category and both image URLs.");
                      return;
                    }

                    cms.addBeforeAfter({ category, beforeImage, afterImage });
                    form.reset();
                    showToast("Before/After results added to gallery.");
                  }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end text-xs"
                >
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-405 uppercase">Treatment Category</label>
                    <input type="text" name="category" required placeholder="Acne, Laser, Hair, Facial, etc." className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-405 uppercase">Before Image URL</label>
                    <input type="text" name="beforeImage" required placeholder="Stock Before Image Link" className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-405 uppercase">After Image URL</label>
                    <input type="text" name="afterImage" required placeholder="Stock After Image Link" className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white" />
                  </div>
                  <div className="sm:col-span-3 pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-850 text-white rounded-xl text-2xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Save Comparison Pair
                    </button>
                  </div>
                </form>
              </div>

              {/* Gallery List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.beforeAfter.map((item) => (
                  <div key={item.id} className="p-4 bg-white dark:bg-neutral-900 rounded-[28px] border border-neutral-200/40 dark:border-neutral-800 shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full text-neutral-600 dark:text-neutral-350">{item.category}</span>
                      <button
                        onClick={() => {
                          if (window.confirm("Remove before/after pair?")) {
                            cms.deleteBeforeAfter(item.id);
                            showToast("Comparison pair deleted.");
                          }
                        }}
                        className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 relative">
                      <div className="rounded-xl overflow-hidden aspect-square border bg-neutral-50">
                        <img src={item.beforeImage} alt="Before" className="w-full h-full object-cover" />
                        <span className="absolute bottom-4 left-4 bg-black/60 text-white text-4xs uppercase px-2 py-0.5 rounded font-bold">Before</span>
                      </div>
                      <div className="rounded-xl overflow-hidden aspect-square border bg-neutral-50">
                        <img src={item.afterImage} alt="After" className="w-full h-full object-cover" />
                        <span className="absolute bottom-4 right-4 bg-[var(--color-accent)] text-white text-4xs uppercase px-2 py-0.5 rounded font-bold">After</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: TESTIMONIALS & FAQ */}
          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start text-xs">
              
              {/* Testimonials Panel */}
              <div className="bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-200/40 dark:border-neutral-800 p-8 shadow-sm space-y-6">
                <h3 className="font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">Patient Reviews Database</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const fd = new FormData(form);
                    const name = fd.get('name') as string;
                    const review = fd.get('review') as string;
                    const location = fd.get('location') as string;
                    const rating = parseInt(fd.get('rating') as string) || 5;
                    const imageUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"; // standard portrait default

                    if (!name || !review) {
                      alert("Please provide client name and review text.");
                      return;
                    }

                    cms.addTestimonial({ name, review, location, rating, imageUrl });
                    form.reset();
                    showToast("Testimonial review logged.");
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-3xs font-bold text-neutral-400 uppercase">Patient Name</label>
                      <input type="text" name="name" required placeholder="Sophia Loren" className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-3xs font-bold text-neutral-400 uppercase">Location / Area</label>
                      <input type="text" name="location" placeholder="Beverly Hills" className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-3xs font-bold text-neutral-400 uppercase">Rating Score (1-5)</label>
                      <select name="rating" className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-neutral-805 dark:text-white appearance-none">
                        <option value="5">★★★★★ (5 Stars)</option>
                        <option value="4">★★★★☆ (4 Stars)</option>
                        <option value="3">★★★☆☆ (3 Stars)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase">Review Description</label>
                    <textarea name="review" required rows={3} placeholder="The acne treatment cleared my skin..." className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white resize-none" />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-neutral-900 hover:bg-neutral-850 text-white rounded-xl text-2xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Add Testimonial review
                  </button>
                </form>

                {/* Review lists */}
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800 max-h-[250px] overflow-y-auto">
                  {state.testimonials.map((t) => (
                    <div key={t.id} className="py-3 flex justify-between items-start gap-4">
                      <div className="text-left">
                        <p className="font-bold text-neutral-900 dark:text-white">{t.name} <span className="text-4xs text-neutral-400 font-medium">({t.location})</span></p>
                        <p className="text-[10px] text-amber-500">{'★'.repeat(t.rating)}</p>
                        <p className="text-4xs text-neutral-400 line-clamp-2 mt-1">"{t.review}"</p>
                      </div>
                      <button
                        onClick={() => {
                          cms.deleteTestimonial(t.id);
                          showToast("Review removed.");
                        }}
                        className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-neutral-400 hover:text-rose-500 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Panel */}
              <div className="bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-200/40 dark:border-neutral-800 p-8 shadow-sm space-y-6">
                <h3 className="font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">Clinical FAQs Accordion</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const fd = new FormData(form);
                    const question = fd.get('question') as string;
                    const answer = fd.get('answer') as string;

                    if (!question || !answer) {
                      alert("Please provide both question and answer.");
                      return;
                    }

                    cms.addFAQ({ question, answer });
                    form.reset();
                    showToast("FAQ entry logged.");
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase">Question Title</label>
                    <input type="text" name="question" required placeholder="e.g. Do treatments hurt?" className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-3xs font-bold text-neutral-400 uppercase">Answer Body</label>
                    <textarea name="answer" required rows={3} placeholder="Most procedures utilize topical cooling gels..." className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white resize-none" />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-neutral-900 hover:bg-neutral-850 text-white rounded-xl text-2xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Add FAQ accordion item
                  </button>
                </form>

                {/* FAQ list */}
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800 max-h-[250px] overflow-y-auto">
                  {state.faqs.map((f) => (
                    <div key={f.id} className="py-3 flex justify-between items-start gap-4">
                      <div className="text-left max-w-xs">
                        <p className="font-bold text-neutral-900 dark:text-white truncate" title={f.question}>{f.question}</p>
                        <p className="text-4xs text-neutral-400 line-clamp-2 mt-1">{f.answer}</p>
                      </div>
                      <button
                        onClick={() => {
                          cms.deleteFAQ(f.id);
                          showToast("FAQ item removed.");
                        }}
                        className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-neutral-400 hover:text-rose-500 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: SEO & DATABASE CONFIG */}
          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-xs">
              
              {/* SEO Tags Panel */}
              <div className="lg:col-span-7 bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-200/40 dark:border-neutral-800 p-8 shadow-sm space-y-6">
                <h3 className="font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">Google SEO Optimization</h3>
                
                <div className="space-y-1">
                  <label className="text-3xs font-bold text-neutral-400 uppercase">Website Title Tag</label>
                  <input
                    type="text"
                    value={state.seo.metaTitle}
                    onChange={(e) => cms.updateSEO({ metaTitle: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-3xs font-bold text-neutral-400 uppercase">Meta Description (160 characters limit)</label>
                  <textarea
                    value={state.seo.metaDescription}
                    rows={3}
                    onChange={(e) => cms.updateSEO({ metaDescription: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white leading-relaxed resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-3xs font-bold text-neutral-400 uppercase">Keywords (Comma separated list)</label>
                  <input
                    type="text"
                    value={state.seo.metaKeywords}
                    onChange={(e) => cms.updateSEO({ metaKeywords: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-3xs font-bold text-neutral-400 uppercase">Google Analytics Tracking ID (G-XXXXX)</label>
                  <input
                    type="text"
                    value={state.seo.googleAnalyticsId}
                    onChange={(e) => cms.updateSEO({ googleAnalyticsId: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-xs dark:text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showToast("SEO settings optimized.")}
                    className="px-6 py-2.5 bg-[var(--color-accent)] text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-md"
                  >
                    Save Optimization settings
                  </button>
                </div>
              </div>

              {/* Import/Export Backup Panel */}
              <div className="lg:col-span-5 bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-200/40 dark:border-neutral-800 p-8 shadow-sm space-y-6">
                <h3 className="font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">Database Backup & Recovery</h3>
                
                <p className="text-3xs text-neutral-450 dark:text-neutral-500 leading-relaxed">
                  Export the entire database content, custom images, styles, testimonials, and booking leads. Download it as a single JSON file. Restoring will replace the current workspace state.
                </p>

                {/* Export Action */}
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(cms.exportState());
                      const dlAnchorElem = document.createElement('a');
                      dlAnchorElem.setAttribute("href",     dataStr);
                      dlAnchorElem.setAttribute("download", `aura_clinic_backup_${Date.now()}.json`);
                      dlAnchorElem.click();
                      showToast("Backup JSON file exported.");
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-neutral-905 hover:bg-neutral-850 text-white py-3.5 rounded-2xl text-2xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <FileDown className="w-4 h-4 text-[var(--color-accent)]" />
                    <span>Export State Backup</span>
                  </button>
                </div>

                <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

                {/* Import Action */}
                <div className="space-y-3">
                  <label className="text-3xs font-bold text-neutral-450 uppercase block">Import / Restore Backup JSON</label>
                  <label className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-neutral-250 hover:border-neutral-400 dark:border-neutral-700/50 py-3.5 rounded-2xl text-2xs font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-750 transition-all cursor-pointer">
                    <FileUp className="w-4 h-4" />
                    <span>Upload JSON Backup file</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const success = cms.importState(event.target?.result as string);
                            if (success) {
                              showToast("Database restored successfully.");
                            } else {
                              alert("Invalid backup JSON file content. Could not restore state.");
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

                {/* Reset Action */}
                <div className="space-y-2">
                  <button
                    onClick={cms.resetToDefault}
                    className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-450 border border-rose-200/50 dark:border-rose-900/30 py-3.5 rounded-2xl text-2xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Restore Clinical Factory Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
