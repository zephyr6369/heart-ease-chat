import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Heart, Smile, Meh, Frown, Angry, Sun, Cloud, CloudRain, Snowflake } from "lucide-react";

interface MoodData {
  emotion: string;
  intensity: number;
  timestamp: Date;
}

const moodEmojis = [
  { name: "Happy", icon: Smile, color: "text-green-500", description: "Feeling great!" },
  { name: "Content", icon: Sun, color: "text-yellow-500", description: "Peaceful and calm" },
  { name: "Neutral", icon: Meh, color: "text-gray-500", description: "Just okay" },
  { name: "Sad", icon: CloudRain, color: "text-blue-500", description: "Feeling down" },
  { name: "Anxious", icon: Cloud, color: "text-purple-500", description: "Worried or stressed" },
  { name: "Angry", icon: Angry, color: "text-red-500", description: "Frustrated or upset" }
];

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [intensity, setIntensity] = useState([5]);
  const [recentMoods, setRecentMoods] = useState<MoodData[]>([]);

  const handleMoodSubmit = () => {
    if (!selectedMood) return;
    
    const newMood: MoodData = {
      emotion: selectedMood,
      intensity: intensity[0],
      timestamp: new Date()
    };
    
    setRecentMoods(prev => [newMood, ...prev].slice(0, 5));
    setSelectedMood("");
    setIntensity([5]);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-gradient-to-br from-card via-card to-secondary/20">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-lg font-semibold">
          <Heart className="h-5 w-5 text-primary" />
          How are you feeling?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mood Selection */}
        <div className="grid grid-cols-3 gap-2">
          {moodEmojis.map((mood) => (
            <Button
              key={mood.name}
              variant={selectedMood === mood.name ? "default" : "outline"}
              className={`h-16 flex flex-col gap-1 transition-all duration-200 ${
                selectedMood === mood.name 
                  ? "shadow-md scale-105" 
                  : "hover:shadow-sm hover:scale-102"
              }`}
              onClick={() => setSelectedMood(mood.name)}
            >
              <mood.icon className={`h-6 w-6 ${selectedMood === mood.name ? "text-primary-foreground" : mood.color}`} />
              <span className="text-xs">{mood.name}</span>
            </Button>
          ))}
        </div>

        {/* Intensity Slider */}
        {selectedMood && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">
              Intensity: {intensity[0]}/10
            </label>
            <Slider
              value={intensity}
              onValueChange={setIntensity}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Mild</span>
              <span>Intense</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {selectedMood && (
          <Button 
            onClick={handleMoodSubmit}
            className="w-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            Log My Mood
          </Button>
        )}

        {/* Recent Moods */}
        {recentMoods.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Recent moods:</h4>
            <div className="space-y-2">
              {recentMoods.map((mood, index) => (
                <div key={index} className="flex items-center justify-between text-sm bg-muted/50 rounded-lg p-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {mood.emotion}
                    </Badge>
                    <span className="text-muted-foreground">
                      {mood.intensity}/10
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {mood.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}