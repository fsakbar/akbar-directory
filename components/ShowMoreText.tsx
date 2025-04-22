'use client';

import { useState } from 'react';

export default function ShowMoreText({ text }: { text: string }) {
  const [showFull, setShowFull] = useState(false);

  return (
    <div>
      <p className={showFull ? '' : 'line-clamp-3'}>
        {text}
      </p>
      {text.length > 150 && (
        <button
          onClick={() => setShowFull(!showFull)}
          className="text-sm text-blue-500 mt-2 hover:underline"
        >
          {showFull ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}
