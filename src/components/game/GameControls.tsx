
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Lightbulb, Shuffle, Volume2, VolumeX } from "lucide-react";

type GameControlsProps = {
  onReset: () => void;
  showHint: boolean;
  onHintToggle: (checked: boolean) => void;
  isSoundOn: boolean;
  onSoundToggle: (checked: boolean) => void;
};

const GameControls = ({ onReset, showHint, onHintToggle, isSoundOn, onSoundToggle }: GameControlsProps) => {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-4 flex flex-wrap items-center justify-center gap-4">
        <Button onClick={onReset} variant="secondary" size="lg">
          <Shuffle className="mr-2 h-5 w-5" />
          Shuffle
        </Button>
        <div className="flex items-center space-x-2">
          <Lightbulb className={`h-5 w-5 ${showHint ? 'text-primary' : 'text-muted-foreground'}`} />
          <Switch id="hint-toggle" checked={showHint} onCheckedChange={onHintToggle} />
          <Label htmlFor="hint-toggle" className="text-sm">Hint</Label>
        </div>
        <div className="flex items-center space-x-2">
          {isSoundOn ? <Volume2 className="h-5 w-5 text-primary"/> : <VolumeX className="h-5 w-5 text-muted-foreground" />}
          <Switch id="sound-toggle" checked={isSoundOn} onCheckedChange={onSoundToggle} />
            <Label htmlFor="sound-toggle" className="text-sm">Sound</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameControls;
