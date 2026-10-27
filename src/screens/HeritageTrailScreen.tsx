import React, { useState } from 'react';
import { Landmark, UserStats } from '../types';
import { soundscape } from '../utils/audio';

interface HeritageTrailScreenProps {
  userStats: UserStats;
  onUpdateStats: (updater: (prev: UserStats) => UserStats) => void;
}

const LANDMARKS: Landmark[] = [
  {
    id: 'falaj',
    title: 'Traditional Falaj Irrigation System',
    category: 'ancient',
    location: 'Al Ain Oasis',
    badge: 'Ancient Wisdom',
    bountyXp: 150,
    subtitle: 'Hydro-Equilibrium',
    subValue: '3,000+ Yrs Active',
    description:
      'Pioneering gravity-fed subterranean aqueducts engineered to transport mountain spring waters to arid desert farming patches without a watt of artificial power.',
    meta1Label: 'Pumping Energy',
    meta1Value: '0.00 kWh (100% Gravity)',
    meta2Label: 'Stewardship Core',
    meta2Value: 'Shared Oasis Rights',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA_npKglL1tJHQH2lx-xuUZ8sVif7eP37dqpNl2iL2uamIXpGXDKXPJHRilnBkPW7_R9ZN9sCVem7yMVnJ-rkRHpPB_the0nIQb9rYTMkMQFMRdROWRQ7G5Ip9OPOP55i4Gl4rimUdSg02JU17MPLH5M2otVMI6CXqYmdNIOu910K8cjfp_bGkdZ9KO0__nNMbw9BsFLYUiLYo_i99rIAf5MKUmqRVtuPrcg9OcO_GM0_FxSWjO_z1y',
    imageAlt: 'Ancient stone and clay Falaj water channel in Al Ain Oasis',
    tag: 'falaj',
    unescoTag: 'UNESCO Intangible Heritage',
    engineeringBreakdown:
      'The mother well (Umm al-Falaj) is dug at the mountain base until hitting the water table. Tunnels sloped at precise 1:1000 gradients convey liquid beneath miles of desert crust. Shafts dug every 20-30 meters provide ventilation and debris clearing without disturbing continuous hydrostatic flow.',
    modernRelevance:
      'Contemporary UAE agritech mirrors Falaj stewardship: gravity-assisted drip grids, subterranean soil sensors, and closed-loop hydroponic reservoirs in desert greenhouses optimize every droplet—reimagining ancient gravity distribution for modern water security.',
    quizQuestion:
      'How does the traditional Falaj system distribute water across desert terrain without mechanical pumps?',
    quizOptions: [
      {
        key: 'A',
        text: 'Harnessing natural gravity and underground slope channels (Aflaj)',
        isCorrect: true,
      },
      {
        key: 'B',
        text: 'Windmill-driven suction pipes with animal traction',
        isCorrect: false,
      },
      {
        key: 'C',
        text: 'Solar electric groundwater extraction wells',
        isCorrect: false,
      },
    ],
    explanation:
      'Falaj systems have preserved oasis agriculture for over 3,000 years through sheer hydrological geometry.',
  },
  {
    id: 'barjeel',
    title: 'Wind Towers (Barjeel)',
    category: 'ancient',
    location: 'Bastakiya, Dubai',
    badge: 'Ancient Wisdom',
    bountyXp: 150,
    subtitle: 'Passive Aerodynamics',
    subValue: 'ΔT -10°C Convective',
    description:
      'Historic chimney-like non-mechanical cooling apparatus capturing prevailing sea breezes and funneling channeled cool air downward to natural living chambers.',
    meta1Label: 'Thermal Mitigation',
    meta1Value: 'Zero-Emissions Draft',
    meta2Label: 'Material Index',
    meta2Value: 'Coral Stone & Gypsum',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ9eyuMNXu1UQa3_AFGkYI4ifIzlsbwgfO58z6kHSmIpK-8EcXcdfsN74gtDOMhHFY7YLkdRbCqVqxOf70QcFw6oFEROnSZlWQ8MoNhXJdLOkS0bxFB0hrkdWe90owWrLXQCVrQ0lFPjTztqZYViFFgV7RQAroSXPO6RlSdi8XXcfcMBuMVBrtHp9R5a_XSQo2WSoe3TCyvaGkMdVj3PVlXAE6x8I_B90x6gWD0apXBh5VSEF5DMJY',
    imageAlt: 'Traditional wind tower Barjeel architectural structure in Al Fahidi',
    tag: 'barjeel',
    unescoTag: 'Emirati Architectural Heritage',
    engineeringBreakdown:
      'Four directional wind vanes channel overhead air downwards. As air passes through shaded vertical shafts, it cools rapidly and displaces warm ambient room air through convective air currents.',
    modernRelevance:
      'Directly adopted in zero-carbon developments like Masdar City to cool open-air public plazas without any external electrical energy input.',
    quizQuestion:
      'What physical phenomenon makes Barjeel wind towers naturally cool living chambers in summer?',
    quizOptions: [
      {
        key: 'A',
        text: 'Differential pressure convective draft and evaporative thermal currents',
        isCorrect: true,
      },
      {
        key: 'B',
        text: 'Mechanical air compressors embedded in coral stones',
        isCorrect: false,
      },
      {
        key: 'C',
        text: 'Underground geothermal chemical refrigerators',
        isCorrect: false,
      },
    ],
    explanation:
      'The convective draft leverages natural pressure differentials between rooftop wind currents and shaded room chambers.',
  },
  {
    id: 'mbr-solar',
    title: 'MBR Solar Park',
    category: 'cleantech',
    location: 'Seih Al-Dahal',
    badge: 'Modern Engineering',
    bountyXp: 150,
    subtitle: '5,000 MW Capacity',
    subValue: "World's Largest CSP",
    description:
      "World's largest single-site solar park pairing photovoltaic arrays with towering thermal molten salt storage to deliver 24-hour continuous clean baseline electricity.",
    meta1Label: 'Annual Offset',
    meta1Value: '6.5M Tons CO2e',
    meta2Label: 'Tower Elevation',
    meta2Value: '262.4m Solar Receiver',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA_exVe7_UNs6GDB2g4xi2mSp28jaforJby4kU5cGNjYh9--te72gpaCIasIVTsVB-tLsxYur_ItC1izXp8ZNoqyf2rmXedWhlDfbywzjrh6eK1Xw2BOPPTJWXkL01WP_5oNgxjiztAyyQnN7RMsseD197HqFxrqpSmd3bxdKBz8ld-2Eme2ygkvM1MUuvA2iKcRzfeDuJcdKJXHE9BFBOC14tlJeGC43aSyRbCgSDKRn_34ywrgQn4',
    imageAlt: 'Vast expanse of photovoltaic solar panels and molten salt tower',
    tag: 'cleantech',
    unescoTag: 'Clean Energy Megaproject',
    engineeringBreakdown:
      'Combines dual-axis tracking photovoltaic panels with high-temperature molten salt receiver towers that store solar energy chemically for up to 15 hours of night generation.',
    modernRelevance:
      'Serves as the cornerstone of the Dubai Clean Energy Strategy 2050 to provide 100% clean power share across the city.',
    quizQuestion:
      'How does the Concentrated Solar Power (CSP) tower at MBR Solar Park generate electricity after sunset?',
    quizOptions: [
      {
        key: 'A',
        text: 'Thermal molten salt heat storage driving steam turbines through the night',
        isCorrect: true,
      },
      {
        key: 'B',
        text: 'Diesel combustion backup generator banks',
        isCorrect: false,
      },
      {
        key: 'C',
        text: 'High-voltage lead acid chemical batteries',
        isCorrect: false,
      },
    ],
    explanation:
      'Molten salts retain high heat (up to 565°C) for over 15 hours, providing continuous thermal power during darkness.',
  },
  {
    id: 'jubail',
    title: 'Jubail Mangrove Sanctuary',
    category: 'coastal',
    location: 'Jubail Island',
    badge: 'Coastal & Marine',
    bountyXp: 150,
    subtitle: 'Blue Carbon Sink',
    subValue: '1,000,000+ Saplings',
    description:
      'A vital coastal blue carbon sanctuary safeguarding marine biodiversity, acting as natural storm breakwaters, and sequestering carbon at 4x the rate of rainforests.',
    meta1Label: 'Carbon Sequestration',
    meta1Value: '12.3 kg/m² Soil Storage',
    meta2Label: 'Fauna Species',
    meta2Value: '60+ Avian & Marine',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDU3VqzfPO0mxyTHGDmR6gbDUtbGpjxUZsPNXlPDgEOQQ7N0idqDW2IqYH-g7cmDZ2N4JSn1LiPIBi0xIiWWBcbIVPGA9X-lZsl381NTkfHYitTpA76Lx51abE3qhlA-sb8-mwCuRzcMGEVbxA4TInBh4t25jvszKjeVqbIgpH2FwS8wfkXf_IDilJCezA7x90H8hFAKLCz7KMAczi8ztktJUnLAsg7RJ39q-kMXnwFMDfmgpjSK6Od',
    imageAlt: 'Wooden boardwalk weaving through emerald green mangrove forest in Jubail Island',
    tag: 'mangrove',
    unescoTag: 'RAMSAR Wetland Candidate',
    engineeringBreakdown:
      'Mangroves filter hypersaline Arabian Gulf water through specialized root salt glands, while their dense root networks prevent coastline erosion and create sediment traps that lock carbon in anaerobic soil for centuries.',
    modernRelevance:
      'Acts as a premier natural shield against climate-driven coastal rise and supports UAE national marine carbon credit accounting.',
    quizQuestion:
      'Why are coastal mangrove habitats designated as "Blue Carbon" powerhouses?',
    quizOptions: [
      {
        key: 'A',
        text: 'Their anaerobic sediments sequester carbon up to 4x faster and longer than terrestrial forests',
        isCorrect: true,
      },
      {
        key: 'B',
        text: 'They absorb blue wavelengths from ocean water',
        isCorrect: false,
      },
      {
        key: 'C',
        text: 'They release oxygen into underground limestone caverns',
        isCorrect: false,
      },
    ],
    explanation:
      'Mangrove mud lacks oxygen, preventing microbial decomposition and storing carbon intact for millennia.',
  },
  {
    id: 'masdar',
    title: 'Masdar City Eco-Architecture',
    category: 'cleantech',
    location: 'Abu Dhabi',
    badge: 'Modern Engineering',
    bountyXp: 150,
    subtitle: 'Urban Micro-Climate',
    subValue: 'Passive Shading Master',
    description:
      'Urban laboratory synthesizing contemporary solar engineering with ancestral Arabic vernacular: narrow street corridors, modern mashrabiya, and evaporative cooling.',
    meta1Label: 'Ambient Cooling',
    meta1Value: '-7°C Street Level',
    meta2Label: 'Clean Power Share',
    meta2Value: '100% On-Site Solar',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAv4IfQ_vLsm3R8PvIAaM7keAU3Kzx5prQXddzTCFxO3s31YKpUIHjZvXVWaihuS7YykbsHHy55RYGlqJ2ken21lN_0wcYI1TOmdRREaIqZ5cw31AWgCCYnx17xyF6gT3GllqEmgRuWgju5bnU8eLlHFG8j8u4-B8k1DOY8RC4lqgLZf-PiZNyFEyHXg0NI25aK3pBhaLHb5RIyZYTmoJPOzbEmQNLGFCF68NPC8aTsaQh_JbRrhvkD',
    imageAlt: 'Modern sustainable architecture of Masdar City Abu Dhabi',
    tag: 'cleantech',
    unescoTag: 'Pioneering Eco-Urban Matrix',
    engineeringBreakdown:
      'Buildings are oriented Northeast-to-Southwest to channel desert evening breezes while self-shading adjacent facades. Modern mashrabiya screens reduce solar gain by 50% without obstructing airflow or natural daylight.',
    modernRelevance:
      'Proves that dense, walk-friendly urban quarters can reduce air conditioning energy loads by up to 54% through smart passive geometry alone.',
    quizQuestion:
      'How does the orientation of Masdar City streets reduce reliance on air conditioning?',
    quizOptions: [
      {
        key: 'A',
        text: 'Narrow diagonal street corridors channel cooling sea breezes and maximize building self-shading',
        isCorrect: true,
      },
      {
        key: 'B',
        text: 'Streets are refrigerated by underground liquid nitrogen pipes',
        isCorrect: false,
      },
      {
        key: 'C',
        text: 'High-power exhaust fans are installed along curbstones',
        isCorrect: false,
      },
    ],
    explanation:
      'Strict pedestrian-width corridors create natural convective wind tunnels and permanent shade.',
  },
  {
    id: 'hajar',
    title: 'Al Hajar Mountain Terraces',
    category: 'ancient',
    location: 'Fujairah Ridge',
    badge: 'Ancient Wisdom',
    bountyXp: 150,
    subtitle: 'Topographic Catchment',
    subValue: 'Zero Runoff Loss',
    description:
      'Indigenous stepped terrace masonry that arrests sudden wadi downpours, filters topsoil, and creates sheltered sub-climates suited for citrus and medicinal mountain flora.',
    meta1Label: 'Soil Preservation',
    meta1Value: '98% Erosion Arrest',
    meta2Label: 'Water Retention',
    meta2Value: 'Slow Aquifer Seep',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA3M6zWzgZ3R1mjlGd8BY2SIxBckx5UHi5_BAAvwXx0AnNDsZfGrT9_ueRPkyiZivN5ztL9F0qM75SX7ItLZjs-xdlOv1tPy8dMnZRQ_r_GVijsQad3W9zupwGplsErz6mnSamNxxFq5LAMC0xEnSEQRPm0l6I3HeTd1YZOalcie72b0XW7oDZJeDIkbMYnMJuDvSQqvxAOgnfftMCtA0z2o6MR3BmHVOiVGwNLIU3A5TsofEo10SU-',
    imageAlt: 'Stepped stone agricultural terraces in Al Hajar Mountains',
    tag: 'terraces',
    unescoTag: 'Mountain Biome Heritage',
    engineeringBreakdown:
      'Dry-stacked stone walls slow fast-moving wadi torrents, capturing sediment and water behind stone barriers. This replenishes groundwater tables while establishing fertile micro-plots in vertical rock terrain.',
    modernRelevance:
      'Provides a zero-cost blueprint for flood mitigation and watershed retention in mountainous arid zones subject to climate flash floods.',
    quizQuestion:
      'What is the primary ecological benefit of dry-stacked mountain agricultural terraces?',
    quizOptions: [
      {
        key: 'A',
        text: 'Arresting flash flood runoff, preventing topsoil erosion, and recharging local aquifers',
        isCorrect: true,
      },
      {
        key: 'B',
        text: 'Reflecting solar radiation into the upper atmosphere',
        isCorrect: false,
      },
      {
        key: 'C',
        text: 'Accelerating rainwater drainage directly into the sea',
        isCorrect: false,
      },
    ],
    explanation:
      'Terraces prevent soil loss during torrential rains and retain water for gradual aquifer absorption.',
  },
];

export const HeritageTrailScreen: React.FC<HeritageTrailScreenProps> = ({
  onUpdateStats,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'ancient' | 'cleantech' | 'coastal'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Modal inspection
  const [activeLandmark, setActiveLandmark] = useState<Landmark | null>(null);
  const [selectedQuizChoice, setSelectedQuizChoice] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [exploredIds, setExploredIds] = useState<string[]>(['falaj']);

  const filteredLandmarks = LANDMARKS.filter((l) => {
    const matchesCategory = selectedFilter === 'all' || l.category === selectedFilter;
    const matchesSearch =
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenModal = (landmark: Landmark) => {
    soundscape.playChime('click');
    setActiveLandmark(landmark);
    setSelectedQuizChoice(null);
    setQuizCompleted(false);
  };

  const handleQuizSelect = (key: string) => {
    if (quizCompleted) return;
    setSelectedQuizChoice(key);

    const isCorrect = activeLandmark?.quizOptions.find((o) => o.key === key)?.isCorrect;
    if (isCorrect) {
      soundscape.playChime('success');
      setQuizCompleted(true);
    } else {
      soundscape.playChime('error');
    }
  };

  const handleClaimXp = () => {
    soundscape.playChime('combo');
    if (activeLandmark && !exploredIds.includes(activeLandmark.id)) {
      setExploredIds([...exploredIds, activeLandmark.id]);
      onUpdateStats((prev) => ({
        ...prev,
        xp: prev.xp + activeLandmark.bountyXp,
      }));
    }
    setActiveLandmark(null);
  };

  const progressPercent = Math.round((exploredIds.length / LANDMARKS.length) * 100);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 py-6 flex flex-col gap-8">
        {/* Top Explorer Controls & Hero Filter Bar */}
        <section className="flex flex-col gap-4">
          {/* Breadcrumb / Live HUD Status */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#232a37]">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
                <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#4edea3] font-bold">
                  Bioregion Node // UAE & Gulf Basin
                </span>
              </div>
              <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf] uppercase">
                Cartography v2.8 • 6 Field Stations Active
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#141c28] px-4 py-1.5 rounded-full shadow-sm border border-white/5">
              <span className="material-symbols-outlined text-[#ffb95f] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                military_tech
              </span>
              <span className="font-['Space_Grotesk',monospace] text-xs text-[#dbe3f4]">
                Available Trail Bounty: <span className="text-[#ffb95f] font-bold">+900 XP</span>
              </span>
            </div>
          </div>

          {/* Main Headline Cluster */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-1">
              <h1 className="font-['Outfit',sans-serif] text-3xl md:text-4xl text-[#dbe3f4] font-bold tracking-tight">
                Emirates Heritage & Eco-Innovation Trail
              </h1>
              <p className="text-sm md:text-base text-[#bbcabf] leading-relaxed">
                Explore centuries of indigenous desert wisdom and modern clean energy engineering. Test your knowledge to earn Ranger XP!
              </p>
            </div>

            {/* Mode Toggle View */}
            <div className="flex items-center p-1 rounded-full bg-[#141c28] self-start md:self-auto shadow-sm border border-white/5">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-['Space_Grotesk',monospace] text-xs uppercase font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#10b981] text-[#00422b] shadow-md'
                    : 'text-[#bbcabf] hover:text-[#dbe3f4]'
                }`}
              >
                <span className="material-symbols-outlined text-base">grid_view</span>
                Grid View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-['Space_Grotesk',monospace] text-xs uppercase font-bold transition-all cursor-pointer ${
                  viewMode === 'map'
                    ? 'bg-[#10b981] text-[#00422b] shadow-md'
                    : 'text-[#bbcabf] hover:text-[#dbe3f4]'
                }`}
              >
                <span className="material-symbols-outlined text-base">explore</span>
                Biosphere Map
              </button>
            </div>
          </div>

          {/* Filter Controls & Search */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-1">
            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'All Innovations (6)' },
                { id: 'ancient', label: 'Ancient Wisdom (Falaj & Barjeel)' },
                { id: 'cleantech', label: 'Modern Clean Tech (Solar & Nuclear)' },
                { id: 'coastal', label: 'Coastal & Marine (Mangroves)' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => {
                    soundscape.playChime('click');
                    setSelectedFilter(btn.id as any);
                  }}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-['Space_Grotesk',monospace] text-xs uppercase transition-all cursor-pointer ${
                    selectedFilter === btn.id
                      ? 'bg-[#4edea3] text-[#003824] font-bold shadow-md'
                      : 'bg-[#232a37] text-[#bbcabf] hover:text-[#dbe3f4] hover:bg-[#2d3542]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[280px] lg:w-80">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#bbcabf] text-lg">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search landmarks or techniques..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-[#141c28] text-[#dbe3f4] placeholder:text-[#86948a] text-xs focus:outline-none focus:bg-[#232a37] transition-all border border-white/5"
              />
            </div>
          </div>
        </section>

        {/* Map View Container */}
        {viewMode === 'map' && (
          <section className="flex flex-col gap-4 bg-[#141c28] rounded-2xl p-4 overflow-hidden relative shadow-lg border border-white/5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3]">satellite_alt</span>
                <span className="font-['Space_Grotesk',monospace] text-xs uppercase text-[#dbe3f4] font-bold">
                  Topographical Geospatial Telemetry
                </span>
              </div>
              <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#45dfa4] uppercase bg-[#232a37] px-3 py-1 rounded-full">
                Interactive Coordinates Sync
              </span>
            </div>

            <div
              className="w-full h-80 rounded-xl bg-cover bg-center relative overflow-hidden flex flex-col justify-between p-4"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXEc06cqcpCEHePOGrzEse7n2LpRHqsYfJIxnFk2LwBz298iczNTP7iAkMpNO-Hk7I8E7jUo7NG0vEDpnFTQtGi5OoeKeTNyzB5WpRdMm8f16HKdN3bJl06szJILy-D9p5X8wTBxECEz90MZ_aW8oktKv01_-p6FNSomdSVVzt9oW1K5_fvUUaUh0FC8F9Wdqg7t_iP0Io621BhajkXxw4WV_eKJ8N1UYYPdpGpUmJlx6nJRv4Craw')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1420] via-transparent to-transparent pointer-events-none"></div>

              {/* Pins on Map */}
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-2">
                {LANDMARKS.map((lm) => (
                  <button
                    key={lm.id}
                    onClick={() => handleOpenModal(lm)}
                    className="p-2 rounded-lg bg-[#070e1a]/80 backdrop-blur-md border border-[#4edea3]/40 flex items-center gap-2 hover:bg-[#232a37] transition-all cursor-pointer text-left"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse flex-shrink-0"></span>
                    <div className="truncate">
                      <div className="text-xs font-bold text-[#dbe3f4] truncate">{lm.title}</div>
                      <div className="font-['Space_Grotesk',monospace] text-[9px] text-[#45dfa4]">
                        {lm.location}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-[#18202c]/90 backdrop-blur-md p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                  <span className="w-2 h-2 rounded-full bg-[#ffb95f]"></span>
                  6 Pins Mapped Across Abu Dhabi, Dubai, Al Ain & Fujairah
                </div>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className="font-['Space_Grotesk',monospace] text-xs uppercase text-[#4edea3] hover:underline cursor-pointer"
                >
                  Return to Detailed Cards →
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Interactive Landmark Exploration Grid */}
        {viewMode === 'grid' && (
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLandmarks.map((landmark) => {
              const isExplored = exploredIds.includes(landmark.id);
              return (
                <article
                  key={landmark.id}
                  className="group flex flex-col rounded-2xl bg-[#141c28] overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-md border border-white/5"
                >
                  {/* Visual Header */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={landmark.image}
                      alt={landmark.imageAlt}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141c28] via-transparent to-transparent"></div>

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-[#070e1a]/80 backdrop-blur-md font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#ffb95f] font-bold">
                        {landmark.badge}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#070e1a]/80 backdrop-blur-md font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                        {landmark.location}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full bg-[#10b981] text-[#00422b] font-['Space_Grotesk',monospace] text-xs font-bold shadow-md">
                      <span className="material-symbols-outlined text-xs">workspace_premium</span>
                      {isExplored ? 'Explored' : `+${landmark.bountyXp} XP Available`}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                      <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#4edea3] uppercase font-bold tracking-widest flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping"></span>
                        {landmark.subtitle}
                      </span>
                      <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf]">
                        {landmark.subValue}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                    <div className="space-y-1">
                      <h2 className="font-['Outfit',sans-serif] text-lg font-bold text-[#dbe3f4] group-hover:text-[#4edea3] transition-colors">
                        {landmark.title}
                      </h2>
                      <p className="text-xs text-[#bbcabf] line-clamp-2 leading-relaxed">
                        {landmark.description}
                      </p>
                    </div>

                    {/* Micro Metas */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2 rounded-lg bg-[#18202c]">
                        <span className="font-['Space_Grotesk',monospace] text-[9px] text-[#86948a] uppercase block">
                          {landmark.meta1Label}
                        </span>
                        <span className="font-['Space_Grotesk',monospace] text-xs text-[#4edea3] font-bold">
                          {landmark.meta1Value}
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#18202c]">
                        <span className="font-['Space_Grotesk',monospace] text-[9px] text-[#86948a] uppercase block">
                          {landmark.meta2Label}
                        </span>
                        <span className="font-['Space_Grotesk',monospace] text-xs text-[#dbe3f4] font-bold">
                          {landmark.meta2Value}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <button
                      type="button"
                      onClick={() => handleOpenModal(landmark)}
                      className="w-full py-2.5 px-4 rounded-full bg-[#232a37] hover:bg-[#4edea3] text-[#dbe3f4] hover:text-[#003824] font-['Space_Grotesk',monospace] text-xs uppercase font-bold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                    >
                      <span>Inspect Landmark</span>
                      <span className="material-symbols-outlined text-base">visibility</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* Bottom Trail Telemetry & Ranger Status Ribbon */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#141c28] shadow-sm border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#10b981]/20 flex items-center justify-center text-[#4edea3] flex-shrink-0">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                nature_people
              </span>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-['Space_Grotesk',monospace] text-xs uppercase text-[#dbe3f4] font-bold">
                  Steward Trail Completion Status
                </span>
                <span className="px-2 py-0.5 rounded bg-[#232a37] text-[#4edea3] font-['Space_Grotesk',monospace] text-[10px] font-bold">
                  {exploredIds.length}/{LANDMARKS.length} Explored
                </span>
              </div>
              <p className="text-xs text-[#bbcabf]">
                Review historical context and pass each micro-quiz to unlock the accredited "Desert Polymath" badge.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex flex-col items-end">
              <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                Progress to Next Tier
              </span>
              <span className="font-['Outfit',sans-serif] text-xl font-bold text-[#4edea3]">
                {progressPercent}%
              </span>
            </div>
            <div className="w-36 h-2 rounded-full bg-[#232a37] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#4edea3] to-[#45dfa4] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(78,222,163,0.5)]"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </section>
      </div>

      {/* FIELD STATION DOSSIER MODAL */}
      {activeLandmark && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070e1a]/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#141c28] border border-[#2d3542] rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto">
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 py-3.5 bg-[#232a37] flex-shrink-0 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#4edea3] font-bold tracking-wider">
                  Field Station Dossier • {activeLandmark.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveLandmark(null)}
                className="w-8 h-8 rounded-full bg-[#18202c] flex items-center justify-center text-[#bbcabf] hover:text-[#dbe3f4] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 space-y-6">
              {/* Header Overview */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-md flex-shrink-0 h-56 bg-[#18202c]">
                  <img
                    className="w-full h-full object-cover"
                    src={activeLandmark.image}
                    alt={activeLandmark.imageAlt}
                  />
                </div>
                <div className="flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#18202c] font-['Space_Grotesk',monospace] text-[10px] text-[#ffb95f] font-bold uppercase">
                        {activeLandmark.unescoTag}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#18202c] font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf] uppercase">
                        {activeLandmark.location}
                      </span>
                    </div>
                    <h3 className="font-['Outfit',sans-serif] text-2xl text-[#dbe3f4] font-bold">
                      {activeLandmark.title}
                    </h3>
                    <p className="text-xs text-[#bbcabf] leading-relaxed">
                      {activeLandmark.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <div className="flex flex-col">
                      <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#86948a]">
                        Network / Origin
                      </span>
                      <span className="font-['Space_Grotesk',monospace] text-xs text-[#dbe3f4] font-bold">
                        {activeLandmark.subValue}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#86948a]">
                        Mechanism
                      </span>
                      <span className="font-['Space_Grotesk',monospace] text-xs text-[#4edea3] font-bold">
                        {activeLandmark.meta1Value}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#86948a]">
                        Principle
                      </span>
                      <span className="font-['Space_Grotesk',monospace] text-xs text-[#45dfa4] font-bold">
                        {activeLandmark.meta2Value}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engineering Breakdown & Relevance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#18202c] flex flex-col gap-1.5 border border-white/5">
                  <div className="flex items-center gap-2 text-[#4edea3] font-['Space_Grotesk',monospace] text-xs uppercase font-bold">
                    <span className="material-symbols-outlined text-base">architecture</span>
                    Engineering Breakdown
                  </div>
                  <p className="text-xs text-[#bbcabf] leading-relaxed">
                    {activeLandmark.engineeringBreakdown}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#18202c] flex flex-col gap-1.5 border border-white/5">
                  <div className="flex items-center gap-2 text-[#45dfa4] font-['Space_Grotesk',monospace] text-xs uppercase font-bold">
                    <span className="material-symbols-outlined text-base">eco</span>
                    Modern Closed-Loop Relevance
                  </div>
                  <p className="text-xs text-[#bbcabf] leading-relaxed">
                    {activeLandmark.modernRelevance}
                  </p>
                </div>
              </div>

              {/* Ranger Field Verification Quiz */}
              <div className="p-5 rounded-xl bg-[#232a37] flex flex-col gap-3 shadow-md border border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffb95f]">quiz</span>
                    <span className="font-['Space_Grotesk',monospace] text-xs uppercase text-[#dbe3f4] font-bold">
                      Ranger Field Verification Quiz
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded bg-[#2d3542] text-[#ffb95f] font-['Space_Grotesk',monospace] text-xs font-bold">
                    +{activeLandmark.bountyXp} XP Bounty
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#45dfa4] font-bold">
                    Knowledge Checkpoint
                  </span>
                  <h4 className="font-['Outfit',sans-serif] text-base font-bold text-[#dbe3f4]">
                    {activeLandmark.quizQuestion}
                  </h4>
                </div>

                {/* Options */}
                <div className="flex flex-col gap-2">
                  {activeLandmark.quizOptions.map((opt) => {
                    const isSelected = selectedQuizChoice === opt.key;
                    let optionStyle = 'bg-[#18202c] hover:bg-[#2d3542] text-[#dbe3f4]';
                    if (isSelected) {
                      if (opt.isCorrect) {
                        optionStyle = 'bg-[#10b981] text-[#00422b] font-bold';
                      } else {
                        optionStyle = 'bg-[#93000a] text-[#ffdad6]';
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleQuizSelect(opt.key)}
                        className={`text-left p-3 rounded-xl flex items-center justify-between gap-3 transition-all cursor-pointer ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#232a37] flex items-center justify-center font-['Space_Grotesk',monospace] text-xs text-[#dbe3f4] flex-shrink-0">
                            {opt.key}
                          </span>
                          <span className="text-xs leading-relaxed">{opt.text}</span>
                        </div>
                        {isSelected && (
                          <span className="material-symbols-outlined text-base">
                            {opt.isCorrect ? 'check_circle' : 'cancel'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Message */}
                {quizCompleted && (
                  <div className="p-3.5 rounded-xl bg-[#00422b] text-[#dbe3f4] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border border-[#4edea3]/30 animate-in fade-in duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#4edea3] flex items-center justify-center text-[#003824] flex-shrink-0">
                        <span className="material-symbols-outlined text-lg font-bold">check</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-['Space_Grotesk',monospace] text-xs uppercase text-[#4edea3] font-bold block">
                          Correct! +{activeLandmark.bountyXp} XP Awarded
                        </span>
                        <p className="text-xs text-[#dbe3f4]">{activeLandmark.explanation}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-[#232a37] px-3 py-1 rounded font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#45dfa4] font-bold">
                      <span className="material-symbols-outlined text-sm">bolt</span>
                      Ranger Lvl 14 Boosted
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 bg-[#18202c] flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0 border-t border-white/5">
              <div className="flex items-center gap-2 text-[#bbcabf] font-['Space_Grotesk',monospace] text-[10px] uppercase">
                <span className="material-symbols-outlined text-sm">verified</span>
                Documented by Emirates Cultural & Environmental Authority
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveLandmark(null)}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-full bg-[#232a37] text-[#dbe3f4] hover:bg-[#2d3542] font-['Space_Grotesk',monospace] text-xs uppercase font-bold transition-colors cursor-pointer"
                >
                  Close View
                </button>
                <button
                  type="button"
                  onClick={handleClaimXp}
                  className="flex-1 sm:flex-initial px-6 py-2 rounded-full bg-[#4edea3] text-[#003824] font-['Space_Grotesk',monospace] text-xs uppercase font-bold hover:bg-[#6ffbbe] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">military_tech</span>
                  Claim XP & Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
