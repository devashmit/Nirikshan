import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Shield, FileText, Map, PieChart, AlertCircle, ArrowRight, UserCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { authAPI } from '../api';

export default function LandingPage({ setUser, currentRole }) {
  const navigate = useNavigate();
  const [loadingRole, setLoadingRole] = useState(null);

  const handleRoleSelect = async (role) => {
    setLoadingRole(role);
    try {
      if (role === 'citizen') {
        // Automatically start an anonymous guest session or sign in
        const session = await authAPI.anonymousSession();
        localStorage.setItem('nirikshan_token', session.token);
        localStorage.setItem('nirikshan_user', JSON.stringify(session.user));
        setUser(session.user);
        navigate('/promises');
      } else {
        // Sign in as admin (use demo credential mechanism)
        const email = 'demo_admin@nirikshan.gov.np';
        const name = 'ADMIN User';
        const password = 'password123';

        let response;
        try {
          response = await authAPI.register({ name, email, password, role: 'admin' });
        } catch (err) {
          response = await authAPI.login({ email, password });
        }

        localStorage.setItem('nirikshan_token', response.token);
        localStorage.setItem('nirikshan_user', JSON.stringify(response.user));
        setUser(response.user);
        navigate('/promises');
      }
    } catch (err) {
      console.error(err);
      alert(`${role.toUpperCase()} entry session failed.`);
    } finally {
      setLoadingRole(null);
    }
  };

  return (
    <div className="min-h-screen bg-himalayan-mist flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-pagoda-wood to-slate-basalt text-himalayan-mist py-24 px-4 sm:px-6 lg:px-8 border-b-4 border-temple-brass">
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3e3527_1px,transparent_1px),linear-gradient(to_bottom,#3e3527_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase border border-temple-brass/50 bg-temple-brass/10 text-temple-brass rounded-full mb-6 animate-pulse">
            <CheckCircle2 className="w-3.5 h-3.5" /> Civic Tech & Governance Project
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-extrabold tracking-tight text-himalayan-mist mb-6 leading-none">
            Democratizing Civic <span className="text-temple-brass">Accountability</span> in Nepal
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-himalayan-mist/80 font-serif leading-relaxed mb-10">
            Nirikshan (निरीक्षण) is an institutional government watchdog platform designed to track public promises, 
            analyse municipal budgets, and report local grievances directly.
          </p>
        </div>
      </section>

      {/* Role Selection Portal Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 w-full mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Citizen Card */}
          <div className="bg-white border-b-4 border-rhododendron-green rounded-xl shadow-xl p-8 hover:translate-y-[-4px] transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-rhododendron-green/10 text-rhododendron-green rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-pagoda-wood mb-3">Citizen Watchdog Portal</h3>
              <p className="text-slate-basalt/80 text-sm leading-relaxed mb-6">
                Access verified promises feed, search by local constituency, inspect representative attendance records, 
                and submit anonymous municipal grievances on a live heatmap.
              </p>
            </div>
            <button
              onClick={() => handleRoleSelect('citizen')}
              disabled={loadingRole !== null}
              className="w-full bg-rhododendron-green text-white font-semibold py-3 px-6 rounded-lg hover:bg-rhododendron-green/90 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loadingRole === 'citizen' ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  Enter as Citizen
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Admin Card */}
          <div className="bg-white border-b-4 border-temple-brass rounded-xl shadow-xl p-8 hover:translate-y-[-4px] transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-temple-brass/10 text-temple-brass rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-pagoda-wood mb-3">Governance & Moderation Panel</h3>
              <p className="text-slate-basalt/80 text-sm leading-relaxed mb-6">
                Authorize administrative updates, manage official representative profiles, verify and publish political 
                promises, and process incoming citizen reports.
              </p>
            </div>
            <button
              onClick={() => handleRoleSelect('admin')}
              disabled={loadingRole !== null}
              className="w-full bg-temple-brass text-white font-semibold py-3 px-6 rounded-lg hover:bg-temple-brass/90 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loadingRole === 'admin' ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  Enter as Admin / Moderator
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-pagoda-wood mb-3">Core Watchdog Features</h2>
          <p className="text-slate-basalt/70 max-w-xl mx-auto text-sm">
            Nirikshan integrates structured accountability modules to ensure transparent and reliable civic tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-weather-stone/30 border border-dust-beige/50 p-6 rounded-lg">
            <div className="w-10 h-10 bg-temple-brass/15 text-temple-brass rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-pagoda-wood mb-2">Promise Tracker</h4>
            <p className="text-xs text-slate-basalt/80 leading-relaxed">
              Maintains an audit trail of political promises, complete with timelines, status badges, and citizen commentaries.
            </p>
          </div>

          <div className="bg-weather-stone/30 border border-dust-beige/50 p-6 rounded-lg">
            <div className="w-10 h-10 bg-temple-brass/15 text-temple-brass rounded-lg flex items-center justify-center mb-4">
              <Map className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-pagoda-wood mb-2">Interactive Election Map</h4>
            <p className="text-xs text-slate-basalt/80 leading-relaxed">
              Integrates real 2026 Nepal general election boundaries and data from the Election Commission to showcase regional winners.
            </p>
          </div>

          <div className="bg-weather-stone/30 border border-dust-beige/50 p-6 rounded-lg">
            <div className="w-10 h-10 bg-temple-brass/15 text-temple-brass rounded-lg flex items-center justify-center mb-4">
              <PieChart className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-pagoda-wood mb-2">Budget Visualizer</h4>
            <p className="text-xs text-slate-basalt/80 leading-relaxed">
              Interactive progress tracking modules comparing municipal budget allocation with actual on-site physical completions.
            </p>
          </div>

          <div className="bg-weather-stone/30 border border-dust-beige/50 p-6 rounded-lg">
            <div className="w-10 h-10 bg-temple-brass/15 text-temple-brass rounded-lg flex items-center justify-center mb-4">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-pagoda-wood mb-2">Grievance Heatmap</h4>
            <p className="text-xs text-slate-basalt/80 leading-relaxed">
              Enables citizens to drop localized pins and coordinate complaints about water, road damage, or public services.
            </p>
          </div>

          <div className="bg-weather-stone/30 border border-dust-beige/50 p-6 rounded-lg">
            <div className="w-10 h-10 bg-temple-brass/15 text-temple-brass rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-pagoda-wood mb-2">RTI Request Builder</h4>
            <p className="text-xs text-slate-basalt/80 leading-relaxed">
              Auto-generates official Right to Information requests using standardized legal layouts in Nepali.
            </p>
          </div>

          <div className="bg-weather-stone/30 border border-dust-beige/50 p-6 rounded-lg">
            <div className="w-10 h-10 bg-temple-brass/15 text-temple-brass rounded-lg flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-pagoda-wood mb-2">Representative Profiles</h4>
            <p className="text-xs text-slate-basalt/80 leading-relaxed">
              Features statistical cards detailing parliamentary attendance, bills sponsored, and citizen performance ratings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
