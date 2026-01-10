
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatTime } from "@/lib/utils";
import { IterationCw, Timer as TimerIcon, Trophy } from "lucide-react";

type StatsProps = {
  moves: number;
  time: number;
  bestMoves: number | null;
  bestTime: number | null;
};

const Stats = ({ moves, time, bestMoves, bestTime }: StatsProps) => {
  return (
    <Card className="mb-4 shadow-lg">
      <CardContent className="p-4 flex flex-wrap items-center justify-around gap-4">
        <div className="flex items-center gap-3">
          <IterationCw className="w-6 h-6 text-primary" />
          <span className="text-xl font-semibold">{moves}</span>
          <span className="text-sm text-muted-foreground">Moves</span>
        </div>
        <Separator orientation="vertical" className="h-8 hidden sm:block" />
        <div className="flex items-center gap-3">
          <TimerIcon className="w-6 h-6 text-primary" />
          <span className="text-xl font-semibold tabular-nums">{formatTime(time)}</span>
          <span className="text-sm text-muted-foreground">Time</span>
        </div>
        <Separator orientation="vertical" className="h-8 hidden sm:block" />
        <div className="flex items-center gap-3 text-accent-foreground">
            <Trophy className="w-6 h-6 text-accent-foreground" />
            <div className="flex flex-col text-sm">
                <span className="font-semibold">{bestTime !== null ? formatTime(bestTime) : "N/A"}</span>
                <span className="font-semibold">{bestMoves !== null ? `${bestMoves} Moves` : ""}</span>
            </div>
              <span className="text-sm text-muted-foreground">Best</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Stats;
