import React from 'react';

interface ResponseDisplayProps {
  response: string;
}

// A simple component to render text with bold formatting and newlines
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  // Replace **text** with <strong>text</strong> for bolding
  const processBold = (line: string) => {
    return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <>
      {text.split('\n').map((line, index) => (
        <p
          key={index}
          className="mb-2"
          dangerouslySetInnerHTML={{ __html: processBold(line) }}
        />
      ))}
    </>
  );
};

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  const KEY_IDEA_MARKER = '**Key Idea:**';
  let mainText = response;
  let keyIdea = '';

  if (response.includes(KEY_IDEA_MARKER)) {
    const parts = response.split(KEY_IDEA_MARKER);
    mainText = parts[0].trim();
    keyIdea = parts[1]?.trim() || '';
  }

  return (
    <div className="prose prose-slate max-w-none">
      <div className="text-slate-800">
        <FormattedText text={mainText} />
      </div>
      {keyIdea && (
        <div className="mt-6 p-4 bg-amber-100 border-l-4 border-amber-500 rounded-r-lg">
          <h3 className="text-lg font-semibold text-amber-900">Key Idea</h3>
          <div className="text-amber-800 mt-1">
            <FormattedText text={keyIdea} />
          </div>
        </div>
      )}
    </div>
  );
};
