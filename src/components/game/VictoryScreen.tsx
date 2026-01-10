import Image from "next/image";
import { PartyPopper, Trophy } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type VictoryScreenProps = {
  isOpen: boolean;
  onPlayAgain: () => void;
  moves: number;
  time: string;
  bestMoves: number | null;
  bestTime: string | null;
  imageSrc: string;
};

const VictoryScreen = ({
  isOpen,
  onPlayAgain,
  moves,
  time,
  bestMoves,
  bestTime,
  imageSrc
}: VictoryScreenProps) => {
  const isNewBestTime = bestTime === time && time !== '00:00';
  const isNewBestMoves = bestMoves === moves && moves !== 0;

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="font-body">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-center text-3xl font-headline font-bold text-primary gap-2">
            <PartyPopper className="w-8 h-8" />
            Victory!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center pt-2">
            Congratulations, you solved the puzzle!
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex justify-center items-center gap-4 my-4">
          <Image
            src={imageSrc}
            alt="Solved Puzzle"
            width={120}
            height={120}
            className="rounded-lg border-4 border-accent"
          />
          <div className="space-y-2 text-lg">
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Moves:</strong> {moves}</p>
          </div>
        </div>

        {(isNewBestTime || isNewBestMoves) && (
            <div className="text-center text-accent-foreground font-semibold bg-accent/50 p-2 rounded-md">
                <Trophy className="inline-block mr-2 w-5 h-5"/>
                {isNewBestTime && isNewBestMoves ? "New Best Time & Moves!" : isNewBestTime ? "New Best Time!" : "New Best Moves!"}
            </div>
        )}

        <AlertDialogFooter className="mt-4">
          <Button onClick={onPlayAgain} className="w-full" size="lg">
            Play Again
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VictoryScreen;
