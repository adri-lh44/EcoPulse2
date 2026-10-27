import { useState, useEffect } from 'react';
import { ActiveTab, UserStats } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DashboardScreen } from './screens/DashboardScreen';
import { EcoTrackerScreen } from './screens/EcoTrackerScreen';
import { RecycleRushScreen } from './screens/RecycleRushScreen';
import { HeritageTrailScreen } from './screens/HeritageTrailScreen';
import { FocusProductivityScreen } from './screens/FocusProductivityScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    const hash = window.location.hash.replace('#', '') as ActiveTab;
    if (['dashboard', 'eco-tracker', 'recycle-rush', 'heritage-trail', 'focus-timer'].includes(hash)) {
      return hash;
    }
    return 'dashboard';
  });

  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('ecopulse_user_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // use default
      }
    }
    return {
      xp: 2840,
      level: 14,
      streak: 12,
      treesPlanted: 18,
      carbonOffsetKg: 428.5,
      rank: 42,
    };
  });

  // Keep local storage in sync
  useEffect(() => {
    localStorage.setItem('ecopulse_user_stats', JSON.stringify(userStats));
  }, [userStats]);

  // Sync hash with activeTab
  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ActiveTab;
      if (['dashboard', 'eco-tracker', 'recycle-rush', 'heritage-trail', 'focus-timer'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0c1420] text-[#dbe3f4]">
      {/* Universal Fixed Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        userStats={userStats}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 flex-1 flex flex-col">
        {activeTab === 'dashboard' && (
          <DashboardScreen
            userStats={userStats}
            onUpdateStats={setUserStats}
            onNavigate={handleSelectTab}
          />
        )}
        {activeTab === 'eco-tracker' && (
          <EcoTrackerScreen
            userStats={userStats}
            onUpdateStats={setUserStats}
          />
        )}
        {activeTab === 'recycle-rush' && (
          <RecycleRushScreen
            userStats={userStats}
            onUpdateStats={setUserStats}
          />
        )}
        {activeTab === 'heritage-trail' && (
          <HeritageTrailScreen
            userStats={userStats}
            onUpdateStats={setUserStats}
          />
        )}
        {activeTab === 'focus-timer' && (
          <FocusProductivityScreen
            userStats={userStats}
            onUpdateStats={setUserStats}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={(tab) => handleSelectTab(tab as ActiveTab)} />
    </div>
  );
}
