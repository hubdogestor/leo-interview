import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

function App() {
  const [activeSection, setActiveSection] = useState('experiences');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('pt');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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

  // Filter data based on search term
  const getFilteredData = () => {
    const data = getCurrentData();
    if (!searchTerm) return Object.values(data);
    
    return Object.values(data).filter(item => {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.name?.toLowerCase().includes(searchLower) ||
        item.title?.toLowerCase().includes(searchLower) ||
        item.question?.toLowerCase().includes(searchLower) ||
        item.sector?.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    });
  };

  // Render sidebar menu
  const renderSidebar = () => {
    const menuItems = [
      { id: 'experiences', icon: Briefcase, label: 'Experiências', count: Object.keys(experiencesData).length },
      { id: 'competencies', icon: Target, label: 'Competências', count: Object.keys(competenciesData).length },
      { id: 'profiles', icon: User, label: 'Perfis', count: Object.keys(profilesData).length },
      { id: 'icebreaker', icon: MessageCircle, label: 'Icebreaker', count: Object.keys(icebreakerData).length },
      { id: 'speechcv', icon: FileText, label: 'Speech Full CV', count: Object.keys(speechFullCVData).length }
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
              <span className="text-sm font-medium text-slate-700">Timer</span>
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
              placeholder="Buscar..."
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
                            {item.name || item.title || item.question}
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
                      {item.description || item.content || (item.versions && item.versions[0]?.content?.substring(0, 200) + '...')}
                    </p>
                    
                    {renderItemMetrics(item)}
                    
                    {item.tags && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.slice(0, 4).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.tags.length - 4} mais
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
      experiences: 'Experiências Profissionais',
      competencies: 'Competências Técnicas',
      profiles: 'Perfis Personalizados',
      icebreaker: 'Perguntas Icebreaker',
      speechcv: 'Speech Full CV'
    };
    return titles[activeSection] || 'Seção';
  };

  const getSectionDescription = () => {
    const descriptions = {
      experiences: 'Explore 15+ anos de experiência em transformação digital e gestão de programas complexos',
      competencies: 'Competências técnicas estruturadas com habilidades, ferramentas e certificações',
      profiles: 'Perfis personalizados para diferentes tipos de vaga e contextos de entrevista',
      icebreaker: 'Respostas estruturadas para perguntas típicas de RH e apresentação pessoal',
      speechcv: 'Apresentações completas do CV adaptadas por tipo de vaga e contexto'
    };
    return descriptions[activeSection] || 'Descrição da seção';
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
      return `${item.sector} • ${item.period}`;
    } else if (activeSection === 'competencies') {
      return item.description;
    } else if (activeSection === 'profiles') {
      return item.description;
    } else if (activeSection === 'icebreaker') {
      return `${item.category} • ${item.versions?.length || 0} versões`;
    } else if (activeSection === 'speechcv') {
      return `${item.subtitle} • ${item.duration}`;
    }
    return '';
  };

  const renderItemMetrics = (item) => {
    if (activeSection === 'experiences' && item.achievements) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {item.achievements.slice(0, 2).map((achievement, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span>{achievement}</span>
            </div>
          ))}
        </div>
      );
    } else if (activeSection === 'competencies' && item.skills) {
      return (
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4" />
            <span>{item.skills.length} habilidades</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4" />
            <span>{item.tools?.length || 0} ferramentas</span>
          </div>
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
                ← Voltar
              </Button>
              
              <div className="flex items-center gap-4 mb-6">
                {renderItemIcon(selectedItem)}
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">{selectedItem.name}</h1>
                  <p className="text-lg text-slate-600">{selectedItem.sector}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedItem.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {selectedItem.location || 'Porto Alegre, Brasil'}
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
                  Principais Conquistas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {selectedItem.achievements?.map((achievement, index) => (
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
                  Casos STAR
                </CardTitle>
                <CardDescription>
                  Casos estruturados com Situação, Tarefa, Ação, Resultado e Aprendizado
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
                              {case_item.title}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {case_item.situation?.substring(0, 150)}...
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
                            {case_item.tags.map((tag, index) => (
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
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{selectedCase.title}</h1>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      Score: {selectedCase.score}
                    </Badge>
                    {selectedCase.tags?.map((tag, index) => (
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
                  <CardTitle className="text-blue-600">Situação</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{selectedCase.situation}</p>
                </CardContent>
              </Card>

              {/* Tarefa */}
              <Card className="border-l-4 border-l-green-600">
                <CardHeader>
                  <CardTitle className="text-green-600">Tarefa</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{selectedCase.task}</p>
                </CardContent>
              </Card>

              {/* Ação */}
              <Card className="border-l-4 border-l-orange-600">
                <CardHeader>
                  <CardTitle className="text-orange-600">Ação</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{selectedCase.action}</p>
                </CardContent>
              </Card>

              {/* Resultado */}
              <Card className="border-l-4 border-l-purple-600">
                <CardHeader>
                  <CardTitle className="text-purple-600">Resultado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{selectedCase.result}</p>
                </CardContent>
              </Card>

              {/* Aprendizado */}
              <Card className="border-l-4 border-l-red-600">
                <CardHeader>
                  <CardTitle className="text-red-600">Aprendizado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{selectedCase.learned}</p>
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
                <h1 className="text-3xl font-bold text-slate-900">{selectedItem.name}</h1>
                <p className="text-lg text-slate-600">{selectedItem.description}</p>
              </div>
            </div>

            <div className="grid gap-6">
              {/* Habilidades */}
              <Card>
                <CardHeader>
                  <CardTitle>Habilidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedItem.skills?.map((skill, index) => (
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
                  <CardTitle>Ferramentas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedItem.tools?.map((tool, index) => (
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
                  <CardTitle>Certificações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {selectedItem.certifications?.map((cert, index) => (
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
                <h1 className="text-3xl font-bold text-slate-900">{selectedItem.name}</h1>
                <p className="text-lg text-slate-600">{selectedItem.description}</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Elevator Pitch */}
              <Card>
                <CardHeader>
                  <CardTitle>Elevator Pitch</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{selectedItem.elevatorPitch}</p>
                </CardContent>
              </Card>

              {/* Principais Forças */}
              <Card>
                <CardHeader>
                  <CardTitle>Principais Forças</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedItem.strengths?.map((strength, index) => (
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
                  <CardTitle>Principais Conquistas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {selectedItem.achievements?.map((achievement, index) => (
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
                  <CardTitle>Tecnologias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.technologies?.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
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
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{selectedItem.question}</h1>
              <Badge variant="secondary">{selectedItem.category}</Badge>
            </div>

            <div className="space-y-6">
              {selectedItem.versions?.map((version) => (
                <Card key={version.id} className="border-l-4 border-l-blue-600">
                  <CardHeader>
                    <CardTitle className="text-blue-600">{version.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-slate max-w-none">
                      {version.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-slate-700 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    
                    {version.tags && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200">
                        {version.tags.map((tag, index) => (
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
                <h1 className="text-3xl font-bold text-slate-900">{selectedItem.title}</h1>
                <p className="text-lg text-slate-600">{selectedItem.subtitle}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="secondary">{selectedItem.duration}</Badge>
                  {selectedItem.tags?.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Key Points */}
              <Card>
                <CardHeader>
                  <CardTitle>Pontos-Chave</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {selectedItem.keyPoints?.map((point, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <span className="text-slate-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Full Speech */}
              <Card>
                <CardHeader>
                  <CardTitle>Speech Completo</CardTitle>
                  <CardDescription>
                    Apresentação estruturada do CV para {selectedItem.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-slate max-w-none">
                    {selectedItem.content.split('\n\n').map((paragraph, index) => {
                      // Check if paragraph is a header (starts with **)
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                          <h3 key={index} className="text-xl font-bold text-slate-900 mt-6 mb-3">
                            {paragraph.replace(/\*\*/g, '')}
                          </h3>
                        );
                      }
                      
                      return (
                        <p key={index} className="text-slate-700 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {renderSidebar()}
      {renderMainContent()}
    </div>
  );
}

export default App;
