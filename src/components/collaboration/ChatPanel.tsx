'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Send, Paperclip, Image } from 'lucide-react';

export function ChatPanel() {
  const { messages, addMessage, currentUser } = useStore();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage({
      garmentId: 'g1',
      authorId: currentUser.id,
      content: input.trim(),
      messageType: 'text',
    });
    setInput('');
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getUserName = (authorId: string) => {
    if (authorId === 'u1') return 'Maya Chen';
    if (authorId === 'u2') return 'Factory Team';
    return 'Team Member';
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-2xl m-3 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-800">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Workspace Chat</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.authorId === currentUser.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    {getUserName(msg.authorId)}
                  </span>
                  <span className="text-[10px] text-gray-600">{formatTime(msg.createdAt)}</span>
                </div>
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm ${
                    isMe
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-gray-800 text-gray-200 rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-800">
        <div className="flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2">
          <button className="text-gray-500 hover:text-gray-300">
            <Paperclip size={16} />
          </button>
          <button className="text-gray-500 hover:text-gray-300">
            <Image size={16} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
