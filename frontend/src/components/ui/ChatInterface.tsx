'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Trash2, Building2 } from 'lucide-react';
import { MessageBubble } from './MessageBubble';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I am the GovtScheme AI Copilot. Ask me any questions about Indian Government schemes, eligibility, or benefits." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Use a fixed session ID for simplicity in this demo, but in production this should be a UUID in localStorage.
  const sessionId = 'session-1234'; 
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleClear = async () => {
    try {
      await fetch(`${API_URL}/api/clear_memory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId })
      });
      setMessages([{ role: 'assistant', content: "Memory cleared. How can I help you today?" }]);
    } catch (e) {
      console.error('Failed to clear memory', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      // Create an empty assistant message to stream into
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: sessionId, query: userMsg }),
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMsg = { ...newMessages[newMessages.length - 1] };
            lastMsg.content += chunk;
            newMessages[newMessages.length - 1] = lastMsg;
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMsg = newMessages[newMessages.length - 1];
        lastMsg.content += '\n\n*Error: Could not reach the AI backend.*';
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
            <Building2 size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-blue-900">GovtScheme AI Copilot</h1>
            <p className="text-xs font-semibold text-green-700 tracking-wide uppercase">Official Portal Assistant</p>
          </div>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900"
          title="Clear Conversation History"
        >
          <Trash2 size={16} />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col pb-8">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} role={msg.role} content={msg.content} />
          ))}
          {isLoading && messages[messages.length - 1].role === 'user' && (
            <div className="flex w-full px-4 py-6 md:px-8 bg-white border-b border-slate-100">
              <div className="mx-auto flex w-full max-w-4xl items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-orange-200 bg-orange-50 text-orange-600 shadow-sm">
                  <Loader2 size={18} className="animate-spin" />
                </div>
                <div className="text-sm font-medium text-slate-500">Retrieving official information...</div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 p-4">
        <div className="mx-auto max-w-4xl">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-end gap-2 rounded-2xl border border-slate-300 bg-slate-50 p-2 shadow-inner transition-all focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask about PM Kisan, student scholarships, state schemes..."
              className="max-h-48 min-h-[52px] w-full resize-none bg-transparent px-4 py-3 text-base text-slate-900 outline-none placeholder:text-slate-500"
              rows={1}
            />
            <div className="flex h-[52px] items-center px-2">
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md transition-colors hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
          </form>
          <div className="mt-3 text-center text-xs text-slate-500">
            Government Scheme AI Assistant. Please verify details on official websites.
          </div>
        </div>
      </div>
    </div>
  );
};
