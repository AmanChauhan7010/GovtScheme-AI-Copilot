import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Bot } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        "flex w-full px-4 py-6 text-sm sm:text-base md:px-8 border-b border-slate-100",
        isUser ? "bg-slate-50" : "bg-white shadow-sm"
      )}
    >
      <div className="mx-auto flex w-full max-w-4xl items-start gap-4">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm",
            isUser
              ? "bg-slate-200 border-slate-300 text-slate-700"
              : "bg-orange-100 border-orange-200 text-orange-600"
          )}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>
        <div className="flex-1 space-y-2 overflow-hidden px-1">
          {isUser ? (
            <div className="prose prose-slate max-w-none text-slate-800">
              {content}
            </div>
          ) : (
            <div className="prose prose-slate max-w-none text-slate-900">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  ul: ({ node, ...props }) => (
                    <ul className="my-2 ml-4 list-disc space-y-1" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="my-2 ml-4 list-decimal space-y-1" {...props} />
                  ),
                  li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-4 leading-relaxed last:mb-0" {...props} />,
                  h3: ({ node, ...props }) => (
                    <h3 className="mb-2 mt-6 text-lg font-semibold text-blue-900" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-semibold text-slate-900" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a className="text-blue-600 font-medium hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
