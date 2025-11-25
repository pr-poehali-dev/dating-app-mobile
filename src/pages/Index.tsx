import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

type User = {
  id: number;
  name: string;
  age: number;
  bio: string;
  location: string;
  interests: string[];
  photos: string[];
};

type Match = {
  id: number;
  userId: number;
  name: string;
  avatar: string;
};

type Message = {
  id: number;
  userId: number;
  text: string;
  timestamp: string;
  isMine: boolean;
};

type Chat = {
  userId: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
};

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Анна',
    age: 25,
    bio: 'Люблю путешествия, йогу и хорошее кофе ☕',
    location: 'Москва',
    interests: ['Путешествия', 'Йога', 'Фотография'],
    photos: ['/placeholder.svg']
  },
  {
    id: 2,
    name: 'Максим',
    age: 28,
    bio: 'Разработчик и любитель активного отдыха 🏔️',
    location: 'Санкт-Петербург',
    interests: ['IT', 'Походы', 'Музыка'],
    photos: ['/placeholder.svg']
  },
  {
    id: 3,
    name: 'Елена',
    age: 24,
    bio: 'Художница и мечтательница ✨',
    location: 'Москва',
    interests: ['Искусство', 'Кино', 'Книги'],
    photos: ['/placeholder.svg']
  }
];

const mockMatches: Match[] = [
  { id: 1, userId: 1, name: 'Анна', avatar: '/placeholder.svg' },
  { id: 2, userId: 2, name: 'Максим', avatar: '/placeholder.svg' }
];

const mockChats: Chat[] = [
  {
    userId: 1,
    name: 'Анна',
    avatar: '/placeholder.svg',
    lastMessage: 'Привет! Как дела?',
    timestamp: '10:30',
    unread: 2
  },
  {
    userId: 2,
    name: 'Максим',
    avatar: '/placeholder.svg',
    lastMessage: 'Хочешь сходить в кино?',
    timestamp: 'Вчера',
    unread: 0
  }
];

const mockMessages: Message[] = [
  { id: 1, userId: 1, text: 'Привет! 👋', timestamp: '10:25', isMine: false },
  { id: 2, userId: 1, text: 'Как дела?', timestamp: '10:30', isMine: false },
  { id: 3, userId: 1, text: 'Привет! Отлично, спасибо 😊', timestamp: '10:32', isMine: true }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<'discover' | 'matches' | 'chat' | 'profile'>('discover');
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [likedUsers, setLikedUsers] = useState<number[]>([]);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');

  const currentUser = mockUsers[currentUserIndex];

  const handleLike = () => {
    setLikedUsers([...likedUsers, currentUser.id]);
    nextUser();
  };

  const handleDislike = () => {
    nextUser();
  };

  const nextUser = () => {
    if (currentUserIndex < mockUsers.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      setCurrentUserIndex(0);
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText('');
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 pb-20">
      {activeTab === 'discover' && currentUser && (
        <div className="max-w-md mx-auto p-4 animate-fade-in">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Знакомства</h1>
            <Button variant="ghost" size="icon">
              <Icon name="Settings" size={24} />
            </Button>
          </div>

          <Card className="overflow-hidden shadow-lg animate-scale-in">
            <div className="relative aspect-[3/4] bg-gradient-to-b from-gray-200 to-gray-300">
              <img 
                src={currentUser.photos[0]} 
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <h2 className="text-3xl font-bold mb-1">
                  {currentUser.name}, {currentUser.age}
                </h2>
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="MapPin" size={16} />
                  <span className="text-sm">{currentUser.location}</span>
                </div>
                <p className="text-sm mb-3 opacity-90">{currentUser.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {currentUser.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="bg-white/20 text-white border-0">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-center gap-6 mt-8">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full w-16 h-16 border-2 hover:scale-110 transition-transform"
              onClick={handleDislike}
            >
              <Icon name="X" size={28} className="text-gray-500" />
            </Button>
            <Button
              size="lg"
              className="rounded-full w-20 h-20 bg-primary hover:bg-primary/90 hover:scale-110 transition-transform shadow-lg"
              onClick={handleLike}
            >
              <Icon name="Heart" size={32} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full w-16 h-16 border-2 hover:scale-110 transition-transform"
            >
              <Icon name="Star" size={28} className="text-blue-500" />
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'matches' && (
        <div className="max-w-md mx-auto p-4 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6">Совпадения</h1>
          <div className="grid grid-cols-2 gap-4">
            {mockMatches.map((match) => (
              <Card key={match.id} className="overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200">
                  <img 
                    src={match.avatar} 
                    alt={match.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold">{match.name}</h3>
                </div>
              </Card>
            ))}
          </div>
          {mockMatches.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <Icon name="Heart" size={48} className="mx-auto mb-4 opacity-30" />
              <p>Пока нет совпадений</p>
              <p className="text-sm mt-2">Продолжайте смотреть анкеты!</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="max-w-md mx-auto animate-fade-in">
          {selectedChat === null ? (
            <div className="p-4">
              <h1 className="text-3xl font-bold mb-6">Чаты</h1>
              <div className="space-y-2">
                {mockChats.map((chat) => (
                  <Card 
                    key={chat.userId}
                    className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => setSelectedChat(chat.userId)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-14 h-14">
                        <AvatarImage src={chat.avatar} />
                        <AvatarFallback>{chat.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{chat.name}</h3>
                          <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && (
                        <Badge className="bg-primary">{chat.unread}</Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-screen flex flex-col">
              <div className="bg-card border-b p-4 flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedChat(null)}
                >
                  <Icon name="ArrowLeft" size={24} />
                </Button>
                <Avatar>
                  <AvatarImage src={mockChats.find(c => c.userId === selectedChat)?.avatar} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <h2 className="font-semibold">{mockChats.find(c => c.userId === selectedChat)?.name}</h2>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          message.isMine 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-card border'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t bg-card">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Сообщение..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="max-w-md mx-auto p-4 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6">Профиль</h1>
          <Card className="overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200">
              <img 
                src="/placeholder.svg" 
                alt="Мой профиль"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">Ваше имя, 25</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="MapPin" size={16} />
                    <span className="text-sm">Москва</span>
                  </div>
                </div>
                <Button variant="outline" size="icon">
                  <Icon name="Edit" size={20} />
                </Button>
              </div>

              <p className="text-muted-foreground mb-4">
                Расскажите о себе...
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Icon name="Briefcase" size={18} className="text-muted-foreground" />
                  <span>Профессия</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Icon name="GraduationCap" size={18} className="text-muted-foreground" />
                  <span>Образование</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Icon name="Home" size={18} className="text-muted-foreground" />
                  <span>Живу в Москве</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-3">Интересы</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Путешествия</Badge>
                  <Badge variant="secondary">Спорт</Badge>
                  <Badge variant="secondary">Кино</Badge>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-6 space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3">
              <Icon name="Settings" size={20} />
              Настройки
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Icon name="Bell" size={20} />
              Уведомления
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Icon name="HelpCircle" size={20} />
              Помощь
            </Button>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t">
        <div className="max-w-md mx-auto flex justify-around py-3">
          <Button
            variant="ghost"
            size="icon"
            className={`flex flex-col gap-1 h-auto py-2 ${activeTab === 'discover' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('discover')}
          >
            <Icon name="Flame" size={24} />
            <span className="text-xs">Главная</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`flex flex-col gap-1 h-auto py-2 ${activeTab === 'matches' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('matches')}
          >
            <Icon name="Heart" size={24} />
            <span className="text-xs">Лайки</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`flex flex-col gap-1 h-auto py-2 ${activeTab === 'chat' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('chat')}
          >
            <Icon name="MessageCircle" size={24} />
            <span className="text-xs">Чаты</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`flex flex-col gap-1 h-auto py-2 ${activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('profile')}
          >
            <Icon name="User" size={24} />
            <span className="text-xs">Профиль</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Index;