
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { Gamepad2 } from "lucide-react";

type PuzzleSelectorProps = {
  puzzles: ImagePlaceholder[];
  selectedPuzzleId: string;
  onPuzzleChange: (id: string) => void;
};

const PuzzleSelector = ({ puzzles, selectedPuzzleId, onPuzzleChange }: PuzzleSelectorProps) => {
  return (
    <Card className="mb-4 shadow-lg">
      <CardContent className="p-2 flex items-center gap-2">
        <Gamepad2 className="w-5 h-5 text-primary ml-2" />
        <Select onValueChange={onPuzzleChange} defaultValue={selectedPuzzleId}>
          <SelectTrigger className="w-full border-0 focus:ring-0">
            <SelectValue placeholder="Select a puzzle" />
          </SelectTrigger>
          <SelectContent>
            {puzzles.map((puzzle) => (
              <SelectItem key={puzzle.id} value={puzzle.id}>
                {puzzle.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default PuzzleSelector;
