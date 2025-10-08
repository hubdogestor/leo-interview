import { useState, useEffect } from 'react';
import { Search, Timer, User, Briefcase, Target, Lightbulb, Settings, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';

import { experiences, experiencesList } from './data/experiences.js';
import { competencies, competenciesList } from './data/competencies.js';
import { profiles, profilesList } from './data/profiles.js';
import personalData from './data/personalData.js';
import { questionsToExperiencesMapping, findCasesByQuestion } from './data/questionsToExperiencesMapping.js';
import { interviewContexts, recommendProfile, getContextualQuestions } from './data/interviewContexts.js';

import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('experiences');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('pt');
  const [selectedProfile, setSelectedProfile] = useState('product_manager');
  const [interviewContext, setInterviewContext] = useState({
    companyType: '',
    industry: '',
    positionLevel: '',
    interviewType: 'behavioral'
  });
  
  // Timer states
  const [timerMinutes, setTimerMinutes] = useState(2);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('answer'); // 'answer' or 'question'

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setTimeLeft(timerMinutes * 60);
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(timerMinutes * 60);
  };

  const handleItemSelect = (item, type) => {
    setSelectedItem({ ...item, type });
    setSelectedCase(null);
  };

  const handleCaseSelect = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const getFilteredItems = () => {
    let items = [];
    
    switch (activeTab) {
      case 'experiences':
        items = experiencesList;
        break;
      case 'competencies':
        items = competenciesList;
        break;
      case 'profiles':
        items = profilesList;
        break;
      default:
        items = [];
    }

    if (searchTerm) {
      items = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.keyAchievements && item.keyAchievements.some(achievement =>
          achievement.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
        (item.skills && item.skills.some(skill =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }

    return items;
  };

  const renderItemCard = (item) => {
    const isSelected = selectedItem?.id === item.id;
    
    return (
      <Card 
        key={item.id}
        className={`cursor-pointer transition-all hover:shadow-md ${
          isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
        }`}
        onClick={() => handleItemSelect(item, activeTab)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center text-white text-lg`}>
              {item.icon}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription>{item.subtitle}</CardDescription>
              {item.period && (
                <Badge variant="outline" className="mt-1">
                  {item.period}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3">{item.summary || item.description}</p>
          {item.keyAchievements && (
            <div className="space-y-1">
              {item.keyAchievements.slice(0, 3).map((achievement, index) => (
                <div key={index} className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                  {achievement}
                </div>
              ))}
            </div>
          )}
          {item.skills && (
            <div className="flex flex-wrap gap-1 mt-2">
              {item.skills.slice(0, 4).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderDetailPanel = () => {
    if (!selectedItem) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <Briefcase className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Selecione um item para ver os detalhes</p>
          </div>
        </div>
      );
    }

    if (selectedItem.type === 'experiences' && selectedCase) {
      return (
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCase(null)}
            >
              ← Voltar
            </Button>
            <Badge className="bg-green-100 text-green-800">
              Score: {selectedCase.score}
            </Badge>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-2">{selectedCase.title}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCase.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-blue-600 mb-2">Situação</h3>
              <p className="text-gray-700">{selectedCase.situation}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-green-600 mb-2">Tarefa</h3>
              <p className="text-gray-700">{selectedCase.task}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-orange-600 mb-2">Ação</h3>
              <p className="text-gray-700">{selectedCase.action}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-purple-600 mb-2">Resultado</h3>
              <p className="text-gray-700">{selectedCase.result}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-red-600 mb-2">Aprendizado</h3>
              <p className="text-gray-700">{selectedCase.learning}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 rounded-lg ${selectedItem.color} flex items-center justify-center text-white text-xl`}>
            {selectedItem.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{selectedItem.title}</h2>
            <p className="text-gray-600">{selectedItem.subtitle}</p>
            {selectedItem.period && (
              <Badge variant="outline" className="mt-1">
                {selectedItem.period} • {selectedItem.location}
              </Badge>
            )}
          </div>
        </div>

        {selectedItem.type === 'experiences' && (
          <div>
            <h3 className="font-semibold text-lg mb-3">Principais Conquistas</h3>
            <div className="space-y-2 mb-6">
              {selectedItem.keyAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm">{achievement}</span>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-lg mb-3">Casos STAR</h3>
            <div className="grid gap-3">
              {selectedItem.cases.map((caseItem, index) => (
                <Card 
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleCaseSelect(caseItem)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{caseItem.title}</CardTitle>
                      <Badge className="bg-green-100 text-green-800">
                        {caseItem.score}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">
                      {caseItem.situation.substring(0, 150)}...
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {caseItem.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedItem.type === 'competencies' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                {selectedItem.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Ferramentas</h3>
              <div className="flex flex-wrap gap-2">
                {selectedItem.tools.map((tool, index) => (
                  <Badge key={index} variant="outline">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Certificações</h3>
              <div className="flex flex-wrap gap-2">
                {selectedItem.certifications.map((cert, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedItem.type === 'profiles' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Elevator Pitch</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                {selectedItem.elevatorPitch[language]}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Principais Forças</h3>
              <div className="grid grid-cols-2 gap-2">
                {selectedItem.keyStrengths.map((strength, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-sm">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Principais Conquistas</h3>
              <div className="space-y-2">
                {selectedItem.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Tecnologias</h3>
              <div className="flex flex-wrap gap-2">
                {selectedItem.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              L
            </div>
            <div>
              <h1 className="text-xl font-bold">Leo Interview Prep</h1>
              <p className="text-sm text-gray-600">Preparação Universal para Entrevistas</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Timer */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
              <Timer className="w-4 h-4" />
              <span className="font-mono text-sm">{formatTime(timeLeft)}</span>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={startTimer}>
                  <Play className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="ghost" onClick={pauseTimer}>
                  <Pause className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="ghost" onClick={resetTimer}>
                  <RotateCcw className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt">PT</SelectItem>
                <SelectItem value="en">EN</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 m-4 mb-2">
              <TabsTrigger value="experiences" className="text-xs">
                <Briefcase className="w-3 h-3 mr-1" />
                Experiências
              </TabsTrigger>
              <TabsTrigger value="competencies" className="text-xs">
                <Target className="w-3 h-3 mr-1" />
                Competências
              </TabsTrigger>
              <TabsTrigger value="profiles" className="text-xs">
                <User className="w-3 h-3 mr-1" />
                Perfis
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="experiences" className="p-4 pt-0 space-y-3">
                {getFilteredItems().map(renderItemCard)}
              </TabsContent>
              
              <TabsContent value="competencies" className="p-4 pt-0 space-y-3">
                {getFilteredItems().map(renderItemCard)}
              </TabsContent>
              
              <TabsContent value="profiles" className="p-4 pt-0 space-y-3">
                {getFilteredItems().map(renderItemCard)}
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {renderDetailPanel()}
        </div>
      </div>
    </div>
  );
}

export default App;
