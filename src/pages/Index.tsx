import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "@/components/ChatInterface";
import { MoodTracker } from "@/components/MoodTracker";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles, Shield, Users, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-br from-primary to-primary-glow">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                MindEase
              </h1>
              <p className="text-xs text-muted-foreground">Your compassionate AI companion</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{user.email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
            <Badge variant="outline" className="hidden md:flex">
              <Shield className="h-3 w-3 mr-1" />
              Anonymous & Safe
            </Badge>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Chat Interface - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="h-[calc(100vh-12rem)]">
              <ChatInterface />
            </div>
          </div>

          {/* Sidebar with Mood Tracker and Resources */}
          <div className="space-y-6">
            {/* Mood Tracker */}
            <MoodTracker />

            {/* Daily Wellness Check-in Card */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-card via-card to-accent/10">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Daily Wellness
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  Take a moment for yourself today. Remember:
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Heart className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>You are worthy of love and care</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Every small step forward counts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>You're never alone in this journey</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Quick Resources Card */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-card via-card to-primary/5">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="h-5 w-5 text-primary" />
                  Quick Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-2">
                  <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <div className="font-medium text-sm">🌸 Breathing Exercise</div>
                    <div className="text-xs text-muted-foreground">4-7-8 technique for calm</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <div className="font-medium text-sm">📝 Gratitude Journal</div>
                    <div className="text-xs text-muted-foreground">Write three things you're grateful for</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <div className="font-medium text-sm">🚶‍♀️ Mindful Walk</div>
                    <div className="text-xs text-muted-foreground">Step outside and connect with nature</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/30 backdrop-blur-sm mt-8">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-xs text-muted-foreground">
            <p>MindEase provides emotional support but is not a substitute for professional mental health care.</p>
            <p className="mt-1">If you're in crisis, please reach out to a mental health professional or crisis hotline.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
