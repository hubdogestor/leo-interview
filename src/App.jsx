import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Search, Timer, Globe, User, Briefcase, Target, MessageCircle, FileText, ChevronRight, Play, Pause, RotateCcw, Star, Clock, Building, Calendar, Award, TrendingUp } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Separator } from './components/ui/separator';
import { ScrollArea } from './components/ui/scroll-area';

// Import data
import { experiencesData } from './data/experiences';
import { competenciesData } from './data/competencies';
import { profilesData } from './data/profiles';
import icebreakerData from './data/icebreaker';
import speechFullCVData from './data/speechFullCV';
import { t, tArray } from './lib/i18n';
import { tr } from './locales/strings';

function App() {
  const [activeSection, setActiveSection] = useState('experiences');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [language, setLanguage] = useState('pt');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // Layout v2.0 style (sidebar not collapsible) – removed collapsible state

  // Timer functionality - optimized to avoid recreating interval on every second
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(seconds => seconds + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerRunning]);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const resetTimer = useCallback(() => {
    setTimerSeconds(0);
    setIsTimerRunning(false);
  }, []);

  // Get current data based on active section
  const getCurrentData = () => {
    switch (activeSection) {
      case 'experiences':
        return experiencesData;
      case 'competencies':
        return competenciesData;
      case 'profiles':
        return profilesData;
      case 'icebreaker':
        return icebreakerData;
      case 'speechcv':
        return speechFullCVData;
      default:
        return experiencesData;
    }
  };

  // Filter data based on search terms (global and section-specific)
  const getFilteredData = () => {
    const data = getCurrentData();
    const values = Object.values(data);
    
    // Apply global search first (across all sections)
    let filteredValues = values;
    if (globalSearchTerm) {
      const globalSearchLower = globalSearchTerm.toLowerCase();
      filteredValues = values.filter(item => {
        // Considerar campos bilíngues comuns (title, subtitle, summary, description)
        const candidates = [
          typeof item.title === 'string' ? item.title : (item.title?.pt || '') + ' ' + (item.title?.en || ''),
          typeof item.subtitle === 'string' ? item.subtitle : (item.subtitle?.pt || '') + ' ' + (item.subtitle?.en || ''),
          typeof item.summary === 'string' ? item.summary : (item.summary?.pt || '') + ' ' + (item.summary?.en || ''),
          typeof item.description === 'string' ? item.description : (item.description?.pt || '') + ' ' + (item.description?.en || ''),
          typeof item.question === 'string' ? item.question : (item.question?.pt || '') + ' ' + (item.question?.en || ''),
          typeof item.category === 'string' ? item.category : (item.category?.pt || '') + ' ' + (item.category?.en || ''),
        ];
        if (candidates.some(c => c.toLowerCase().includes(globalSearchLower))) return true;
        // Tags podem ser string[] ou bilíngues {pt:[],en:[]}
        if (item.tags) {
          if (Array.isArray(item.tags) && item.tags.some(tag => tag.toLowerCase().includes(globalSearchLower))) return true;
          if (!Array.isArray(item.tags) && (item.tags.pt || item.tags.en)) {
            const allTags = [...(item.tags.pt || []), ...(item.tags.en || [])];
              if (allTags.some(tag => tag.toLowerCase().includes(globalSearchLower))) return true;
          }
        }
        return false;
      });
    }
    
    // Apply section-specific search
    if (!searchTerm) return filteredValues;
    const searchLower = searchTerm.toLowerCase();
    return filteredValues.filter(item => {
      // Considerar campos bilíngues comuns (title, subtitle, summary, description)
      const candidates = [
        typeof item.title === 'string' ? item.title : (item.title?.pt || '') + ' ' + (item.title?.en || ''),
        typeof item.subtitle === 'string' ? item.subtitle : (item.subtitle?.pt || '') + ' ' + (item.subtitle?.en || ''),
        typeof item.summary === 'string' ? item.summary : (item.summary?.pt || '') + ' ' + (item.summary?.en || ''),
        typeof item.description === 'string' ? item.description : (item.description?.pt || '') + ' ' + (item.description?.en || ''),
        typeof item.question === 'string' ? item.question : (item.question?.pt || '') + ' ' + (item.question?.en || ''),
        typeof item.category === 'string' ? item.category : (item.category?.pt || '') + ' ' + (item.category?.en || ''),
      ];
      if (candidates.some(c => c.toLowerCase().includes(searchLower))) return true;
      // Tags podem ser string[] ou bilíngues {pt:[],en:[]}
      if (item.tags) {
        if (Array.isArray(item.tags) && item.tags.some(tag => tag.toLowerCase().includes(searchLower))) return true;
        if (!Array.isArray(item.tags) && (item.tags.pt || item.tags.en)) {
          const allTags = [...(item.tags.pt || []), ...(item.tags.en || [])];
            if (allTags.some(tag => tag.toLowerCase().includes(searchLower))) return true;
        }
      }
      return false;
    });
  };

  // Render sidebar menu
  const renderSidebar = () => {
    const menuItems = [
      { id: 'experiences', icon: Briefcase, label: tr('menu_experiences', language), count: Object.keys(experiencesData).length },
      { id: 'competencies', icon: Target, label: tr('menu_competencies', language), count: Object.keys(competenciesData).length },
      { id: 'profiles', icon: User, label: tr('menu_profiles', language), count: Object.keys(profilesData).length },
      { id: 'icebreaker', icon: MessageCircle, label: tr('menu_icebreaker', language), count: Object.keys(icebreakerData).length },
      { id: 'speechcv', icon: FileText, label: tr('menu_speechcv', language), count: Object.keys(speechFullCVData).length }
    ];

    return (
      <div className="w-80 bg-gradient-to-b from-slate-50 to-white border-r border-slate-200 flex flex-col h-screen">
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              L
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Leo Interview Prep</h1>
              <p className="text-sm text-slate-600">Preparação Universal para Entrevistas</p>
            </div>
          </div>

          {/* Timer */}
          <div className={`bg-white rounded-lg border border-slate-200 p-4 ${isTimerRunning ? 'timer-pulse running' : ''}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">{tr('timer', language)}</span>
              <div className="flex items-center gap-1">
                <Clock className={`w-4 h-4 ${isTimerRunning ? 'text-blue-500' : 'text-slate-500'}`} />
                <span className={`text-lg font-mono font-bold ${isTimerRunning ? 'text-blue-600' : 'text-slate-900'}`}>{formatTime(timerSeconds)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={isTimerRunning ? "destructive" : "default"}
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="flex-1 btn-ripple micro-bounce"
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="outline" onClick={resetTimer} className="btn-ripple micro-bounce">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder={tr('search_placeholder', language)}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              aria-label="Campo de busca para filtrar conteúdo"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSelectedItem(null);
                    setSelectedCase(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left sidebar-item btn-ripple micro-bounce ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg active'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'}`} />
                  <span className="font-medium flex-1">{item.label}</span>
                  <Badge variant={isActive ? "secondary" : "outline"} className={`${isActive ? 'bg-white/20 text-white border-white/30' : ''}`}>
                    {item.count}
                  </Badge>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Language Toggle */}
        <div className="mt-auto p-6 border-t border-slate-200">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
            className="w-full flex items-center gap-2 btn-ripple micro-bounce hover-scale"
          >
            <Globe className="w-4 h-4" />
            {language === 'pt' ? 'PT' : 'EN'}
          </Button>
        </div>
      </div>
    );
  };

  // Render main content based on active section
  const renderMainContent = () => {
    if (selectedCase) {
      return renderCaseDetail();
    }
    
    if (selectedItem) {
      return renderItemDetail();
    }

    return renderItemsList();
  };

  // Render items list
  const renderItemsList = () => {
    const filteredData = getFilteredData();
    
    return (
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {getSectionTitle()}
              </h2>
              <p className="text-slate-600">
                {getSectionDescription()}
              </p>
            </div>

            <div className="grid gap-6">
              {filteredData.map((item, index) => (
                <Card 
                  key={item.id} 
                  className="group cursor-pointer card-hover hover-lift animate-fade-in-up border-slate-200 hover:border-blue-300"
                  onClick={() => setSelectedItem(item)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        {renderItemIcon(item)}
                        <div>
                          <CardTitle className="text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                            {item.name || (typeof item.title === 'string' ? item.title : t(item.title, language)) || (typeof item.question === 'string' ? item.question : t(item.question, language))}
                          </CardTitle>
                          <CardDescription className="text-slate-600 mt-1">
                            {renderItemSubtitle(item)}
                          </CardDescription>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-slate-700 mb-4 line-clamp-3">
                      {(() => {
                        // Safely compute a preview text supporting bilingual structures
                        const direct = typeof item.description === 'string' ? item.description : t(item.description, language);
                        if (direct) return direct;
                        const content = t(item.content, language);
                        if (content) return content.substring(0, 200) + (content.length > 200 ? '...' : '');
                        if (item.versions && item.versions[0]) {
                          const v = t(item.versions[0].content, language);
                          if (v) return v.substring(0, 200) + (v.length > 200 ? '...' : '');
                        }
                        return '';
                      })()}
                    </p>
                    
                    {renderItemMetrics(item)}
                    
                    {item.tags && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {(Array.isArray(item.tags) ? item.tags : (item.tags[language] || []))
                          .slice(0,4)
                          .map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        {(() => { const len = Array.isArray(item.tags) ? item.tags.length : (item.tags[language]||[]).length; return len>4; })() && (
                          <Badge variant="outline" className="text-xs">
                            +{(Array.isArray(item.tags)? item.tags.length : (item.tags[language]||[]).length) - 4} {language==='pt'?'mais':'more'}
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  };

  // Helper functions for rendering
  const getSectionTitle = () => {
    const titles = {
      experiences: tr('experiences_title', language),
      competencies: tr('competencies_title', language),
      profiles: tr('profiles_title', language),
      icebreaker: tr('icebreaker_title', language),
      speechcv: tr('speechcv_title', language)
    };
    return titles[activeSection] || 'Seção';
  };

  const getSectionDescription = () => {
    const descriptions = {
      experiences: tr('experiences_desc', language),
      competencies: tr('competencies_desc', language),
      profiles: tr('profiles_desc', language),
      icebreaker: tr('icebreaker_desc', language),
      speechcv: tr('speechcv_desc', language)
    };
    return descriptions[activeSection] || 'Descrição';
  };

  const renderItemIcon = (item) => {
    const iconClass = "w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg";
    
    if (activeSection === 'experiences') {
      return <div className={`${iconClass} bg-gradient-to-br from-blue-600 to-blue-700`}>🏢</div>;
    } else if (activeSection === 'competencies') {
      return <div className={`${iconClass} bg-gradient-to-br from-purple-600 to-purple-700`}>🎯</div>;
    } else if (activeSection === 'profiles') {
      return <div className={`${iconClass} bg-gradient-to-br from-green-600 to-green-700`}>👤</div>;
    } else if (activeSection === 'icebreaker') {
      return <div className={`${iconClass} bg-gradient-to-br from-orange-600 to-orange-700`}>💬</div>;
    } else if (activeSection === 'speechcv') {
      return <div className={`${iconClass} bg-gradient-to-br from-red-600 to-red-700`}>📄</div>;
    }
    return <div className={`${iconClass} bg-gradient-to-br from-gray-600 to-gray-700`}>📋</div>;
  };

  const renderItemSubtitle = (item) => {
    if (activeSection === 'experiences') {
      return `${t(item.subtitle, language)} • ${item.period}`;
    } else if (activeSection === 'competencies') {
      return t(item.subtitle, language);
    } else if (activeSection === 'profiles') {
      return t(item.subtitle, language);
    } else if (activeSection === 'icebreaker') {
  return `${t(item.category, language)}`;
    } else if (activeSection === 'speechcv') {
      return `${t(item.subtitle, language)} • ${t(item.duration, language)}`;
    }
    return '';
  };

  const renderItemMetrics = (item) => {
    if (activeSection === 'experiences' && item.keyAchievements) {
      const arr = tArray(item.keyAchievements, language);
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {arr.slice(0, 2).map((achievement, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span>{achievement}</span>
            </div>
          ))}
        </div>
      );
    } else if (activeSection === 'competencies' && item.skills) {
      const skills = tArray(item.skills, language);
      const tools = tArray(item.tools, language);
      return (
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4" />
            <span>{skills.length} {language==='pt'?'habilidades':'skills'}</span>
          </div>
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              <span>{tools.length} {language==='pt'?'ferramentas':'tools'}</span>
            </div>
        </div>
      );
    } else if (activeSection === 'profiles' && item.achievements) {
      const ach = tArray(item.achievements, language);
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ach.slice(0,2).map((a,i)=>(
            <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
              <Star className="w-4 h-4 text-amber-500" />
              <span>{a}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Render item detail (when an item is selected)
  const renderItemDetail = () => {
    if (activeSection === 'experiences') {
      return renderExperienceDetail();
    } else if (activeSection === 'competencies') {
      return renderCompetencyDetail();
    } else if (activeSection === 'profiles') {
      return renderProfileDetail();
    } else if (activeSection === 'icebreaker') {
      return renderIcebreakerDetail();
    } else if (activeSection === 'speechcv') {
      return renderSpeechCVDetail();
    }
    return null;
  };

  // Render experience detail
  const renderExperienceDetail = () => {
    return (
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedItem(null)}
                className="mb-4 text-slate-600 hover:text-slate-900 btn-ripple micro-bounce animate-fade-in-left"
              >
                {tr('back', language)}
              </Button>
              
              <div className="flex items-center gap-4 mb-6">
                {renderItemIcon(selectedItem)}
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">{t(selectedItem.title, language) || selectedItem.name}</h1>
                  <p className="text-lg text-slate-600">{t(selectedItem.subtitle, language)}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedItem.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {t(selectedItem.location, language) || 'Porto Alegre, Brasil'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Achievements */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  {tr('main_achievements', language)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {tArray(selectedItem.keyAchievements, language)?.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <span className="text-slate-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* STAR Cases */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  {tr('star_cases', language)}
                </CardTitle>
                <CardDescription>
                  {tr('star_cases_desc', language)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {selectedItem.cases?.map((case_item) => (
                    <Card 
                      key={case_item.id}
                      className="cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300"
                      onClick={() => setSelectedCase(case_item)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-slate-900 hover:text-blue-600 transition-colors">
                              {t(case_item.title, language)}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {t(case_item.situation, language).substring(0, 150)}...
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              Score: {case_item.score}
                            </Badge>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                      </CardHeader>
                      
                      {case_item.tags && (
                        <CardContent className="pt-0">
                          <div className="flex flex-wrap gap-2">
                            {(Array.isArray(case_item.tags) ? case_item.tags : (case_item.tags[language] || []))
                              .map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    );
  };

  // Render case detail (STAR format)
  const renderCaseDetail = () => {
    return (
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedCase(null)}
                className="mb-4 text-slate-600 hover:text-slate-900"
              >
                ← Voltar
              </Button>
              
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{t(selectedCase.title, language)}</h1>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      Score: {selectedCase.score}
                    </Badge>
                    {(Array.isArray(selectedCase.tags) ? selectedCase.tags : (selectedCase.tags?.[language] || []))?.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* STAR Content */}
            <div className="space-y-6">
              {/* Situação */}
              <Card className="border-l-4 border-l-blue-600">
                <CardHeader>
                  <CardTitle className="text-blue-600">{tr('situation', language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{t(selectedCase.situation, language)}</p>
                </CardContent>
              </Card>

              {/* Tarefa */}
              <Card className="border-l-4 border-l-green-600">
                <CardHeader>
                  <CardTitle className="text-green-600">{tr('task', language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{t(selectedCase.task, language)}</p>
                </CardContent>
              </Card>

              {/* Ação */}
              <Card className="border-l-4 border-l-orange-600">
                <CardHeader>
                  <CardTitle className="text-orange-600">{tr('action', language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{t(selectedCase.action, language)}</p>
                </CardContent>
              </Card>

              {/* Resultado */}
              <Card className="border-l-4 border-l-purple-600">
                <CardHeader>
                  <CardTitle className="text-purple-600">{tr('result', language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{t(selectedCase.result, language)}</p>
                </CardContent>
              </Card>

              {/* Aprendizado */}
              <Card className="border-l-4 border-l-red-600">
                <CardHeader>
                  <CardTitle className="text-red-600">{tr('learning', language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{t(selectedCase.learning, language) || t(selectedCase.learned, language)}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  };

  // Render competency detail
  const renderCompetencyDetail = () => {
    return (
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-8">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedItem(null)}
              className="mb-4 text-slate-600 hover:text-slate-900"
            >
              ← Voltar
            </Button>
            
            <div className="flex items-center gap-4 mb-8">
              {renderItemIcon(selectedItem)}
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{t(selectedItem.title, language) || selectedItem.name}</h1>
                <p className="text-lg text-slate-600">{t(selectedItem.description, language)}</p>
              </div>
            </div>

            <div className="grid gap-6">
              {/* Habilidades */}
              <Card>
                <CardHeader>
                  <CardTitle>{tr('skills', language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {tArray(selectedItem.skills, language)?.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="justify-center py-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Ferramentas */}
              <Card>
                <CardHeader>
                  <CardTitle>{tr('tools', language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {tArray(selectedItem.tools, language)?.map((tool, index) => (
                      <Badge key={index} variant="outline" className="justify-center py-2">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certificações */}
              <Card>
                <CardHeader>
                  <CardTitle>{tr('certifications', language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {tArray(selectedItem.certifications, language)?.map((cert, index) => (
                      <Badge key={index} className="justify-center py-3 bg-blue-100 text-blue-800 border-blue-300">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  };

  // Render profile detail
  const renderProfileDetail = () => {
    return (
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-8">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedItem(null)}
              className="mb-4 text-slate-600 hover:text-slate-900"
            >
              ← Voltar
            </Button>
            
            <div className="flex items-center gap-4 mb-8">
              {renderItemIcon(selectedItem)}
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{t(selectedItem.title, language) || selectedItem.name}</h1>
                <p className="text-lg text-slate-600">{t(selectedItem.subtitle, language)}</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Elevator Pitch */}
              <Card>
                <CardHeader>
                  <CardTitle>{tr('elevator_pitch', language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{t(selectedItem.elevatorPitch, language)}</p>
                </CardContent>
              </Card>

              {/* Principais Forças */}
              <Card>
                <CardHeader>
                  <CardTitle>{tr('strengths', language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(selectedItem.keyStrengths ? (selectedItem.keyStrengths[language]||[]) : selectedItem.strengths || []).map((strength, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-slate-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Principais Conquistas */}
              <Card>
                <CardHeader>
                  <CardTitle>{tr('main_achievements', language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {tArray(selectedItem.achievements, language)?.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                        <span className="text-slate-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tecnologias */}
              <Card>
                <CardHeader>
                  <CardTitle>{tr('technologies', language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {(selectedItem.technologies ? (selectedItem.technologies[language]||[]) : []).map((tech, index) => (
                      <Badge key={index} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  };

  // Render icebreaker detail
  const renderIcebreakerDetail = () => {
    return (
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-8">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedItem(null)}
              className="mb-4 text-slate-600 hover:text-slate-900"
            >
              ← Voltar
            </Button>
            
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{t(selectedItem.question, language)}</h1>
              <Badge variant="secondary">{t(selectedItem.category, language)}</Badge>
            </div>

            <div className="space-y-6">
              {selectedItem.versions?.map((version) => (
                <Card key={version.id} className="border-l-4 border-l-blue-600">
                  <CardHeader>
                    <CardTitle className="text-blue-600">{t(version.title, language)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-slate max-w-none">
                      {t(version.content, language).split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-slate-700 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    
                    {version.tags && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200">
                        {(Array.isArray(version.tags) ? version.tags : (version.tags[language] || []))
                          .map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  };

  // Render speech CV detail
  const renderSpeechCVDetail = () => {
    const topRef = useRef(null);
    const content = t(selectedItem.content, language);
    const paragraphs = content.split('\n\n');
    const headingIndexes = paragraphs
      .map((p,i)=> (p.startsWith('**') && p.endsWith('**')) ? i : -1)
      .filter(i=>i!==-1);
    const headings = headingIndexes.map(i => paragraphs[i].replace(/\*\*/g,'').trim());
    const [activeHeading, setActiveHeading] = useState(0);

    useEffect(()=>{
      const obs = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if (e.isIntersecting){
            const idx = parseInt(e.target.getAttribute('data-h-idx')||'0',10);
            setActiveHeading(idx);
          }
        });
      }, {rootMargin:'-40% 0px -50% 0px', threshold:[0,1]});
      headingIndexes.forEach((_,i)=>{
        const el = document.getElementById(`speech-h-${i}`);
        if (el) obs.observe(el);
      });
      return ()=> obs.disconnect();
    }, [content, language]);
    const scrollToHeading = (idx) => {
      const el = document.getElementById(`speech-h-${idx}`);
      if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    };
    const scrollToTop = () => {
      if (topRef.current) topRef.current.scrollIntoView({behavior:'smooth'});
    };
    return (
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-8" ref={topRef}>
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedItem(null)}
                className="text-slate-600 hover:text-slate-900"
              >
                ← {tr('back', language)}
              </Button>
              <Button variant="outline" size="sm" onClick={scrollToTop} className="hover:scale-[1.02] transition">↑ {tr('back_to_top', language)}</Button>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-8">
                  {renderItemIcon(selectedItem)}
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">{t(selectedItem.title, language)}</h1>
                    <p className="text-lg text-slate-600">{t(selectedItem.subtitle, language)}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <Badge variant="secondary">{t(selectedItem.duration, language)}</Badge>
                      {(Array.isArray(selectedItem.tags) ? selectedItem.tags : (selectedItem.tags?.[language] || []))?.map((tag, index) => (
                        <Badge key={index} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{tr('key_points', language)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        {tArray(selectedItem.keyPoints, language).map((point, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                            <span className="text-slate-700">{point}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>{tr('full_speech', language)}</CardTitle>
                      <CardDescription>{tr('structured_cv_for', language)} {t(selectedItem.title, language)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-slate max-w-none">
                        {paragraphs.map((paragraph, index) => {
                          const isHeading = paragraph.startsWith('**') && paragraph.endsWith('**');
                          if (isHeading) {
                            const clean = paragraph.replace(/\*\*/g,'').trim();
                            const headingPos = headings.indexOf(clean);
                            return (
                              <h3 id={`speech-h-${headingPos}`} key={index} className="text-xl font-bold text-slate-900 mt-10 mb-4 scroll-mt-24">
                                {clean}
                              </h3>
                            );
                          }
                          return (
                            <p key={index} className="text-slate-700 leading-relaxed mb-4">
                              {paragraph.trim()}
                            </p>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              {/* Outline */}
              <div className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-4 h-max border border-slate-200 rounded-lg bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold text-slate-500 mb-2 tracking-wide">{tr('sections_label', language)}</p>
                <ul className="space-y-2 text-sm">
                  {headings.map((h,i)=>(
                    <li key={i}>
                      <button onClick={()=>scrollToHeading(i)} className={`text-left w-full transition-colors ${activeHeading===i?'text-blue-600 font-medium':'hover:text-blue-600 text-slate-600'}`}>
                        <span className="inline-block truncate max-w-[11rem]">{h}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {renderSidebar()}
      <div className="flex-1 flex flex-col">
        {/* Header fixo com busca global */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                L
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Leo Interview Prep</h1>
                <p className="text-xs text-slate-600">Preparação Universal para Entrevistas</p>
              </div>
            </div>
            
            {/* Busca global */}
            <div className="flex-1 max-w-md ml-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder={tr('global_search_placeholder', language)}
                  value={globalSearchTerm}
                  onChange={(e) => setGlobalSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-sm"
                  aria-label="Busca global em todo o conteúdo"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Timer */}
            <div className={`flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5 ${isTimerRunning ? 'timer-pulse running' : ''}`}>
              <Timer className="w-4 h-4" />
              <span className="font-mono text-sm">{formatTime(timerSeconds)}</span>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => setIsTimerRunning(true)} className="h-6 w-6 p-0">
                  <Play className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setIsTimerRunning(false)} className="h-6 w-6 p-0">
                  <Pause className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="ghost" onClick={resetTimer} className="h-6 w-6 p-0">
                  <RotateCcw className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              {language === 'pt' ? 'PT' : 'EN'}
            </Button>
          </div>
        </header>
        
        {/* Barra de seção com busca específica */}
        <div className="h-12 bg-slate-50 border-b border-slate-200 flex items-center px-6">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-sm font-medium text-slate-700">{tr('menu_'+activeSection, language)}</h2>
            
            {/* Busca específica da seção */}
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-3 h-3" />
                <Input
                  placeholder={`${tr('search_in', language)} ${tr('menu_'+activeSection, language).toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-sm h-8"
                  aria-label={`Busca específica em ${tr('menu_'+activeSection, language)}`}
                />
              </div>
            </div>
          </div>
          
          <div className="text-xs text-slate-400">
            {globalSearchTerm && (
              <span>{tr('filtered_by_global', language)}: "{globalSearchTerm}"</span>
            )}
          </div>
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
