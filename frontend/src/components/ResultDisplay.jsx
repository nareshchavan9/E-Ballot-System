import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResultDisplay = ({ 
  results, 
  isLoading, 
  onRetry 
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2">Loading results...</span>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Failed to load results. Please try again later.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={onRetry}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Election Results</h2>
      <p className="text-gray-700 mb-2">
        Total votes cast: {results.totalVotes}
      </p>
      {results.winners && results.winners.length > 0 && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
          <span className="font-semibold text-green-700">Winner{results.isTie ? 's' : ''}: </span>
          {results.winners.map((winner, idx) => {
            const winnerResult = results.results.find(r => r.candidate.id === winner.id);
            return (
              <span key={winner.id} className="font-bold inline-flex items-center mr-2">
                <Trophy className="h-5 w-5 text-yellow-500 mr-1" />
                <span className="text-green-700 mr-1">Winner</span>
                {winner.name}
                {winnerResult ? ` (${winnerResult.votes} vote${winnerResult.votes !== 1 ? 's' : ''})` : ''}
                {idx < results.winners.length - 1 ? ',' : ''}
              </span>
            );
          })}
        </div>
      )}
      <div className="space-y-6">
        {results.results.map((result, index) => (
          <div key={result.candidate.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {index === 0 && (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                )}
                <span className="font-medium">{result.candidate.name}</span>
                <span className="ml-2 text-sm text-gray-500">
                  {result.candidate.party}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {result.votes} votes
              </span>
            </div>
            <Progress 
              value={(result.votes / results.totalVotes) * 100} 
              className="h-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultDisplay;