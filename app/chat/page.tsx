'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey! I'm the Hailey Device Repair tech helper. Tell me what's going on with your device and I'll try to help you troubleshoot, or point you to Sam if it needs hands-on attention. What's up?"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const MAX_USER_MESSAGES = 50
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const hasMountedRef = useRef(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  useEffect(() => {
    // Prevent auto-scroll on initial page load so chat page behaves like a normal page.
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      return
    }
    scrollToBottom()
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMsgCount = messages.filter(m => m.role === 'user').length
    if (userMsgCount >= MAX_USER_MESSAGES) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "You've hit the chat limit for this session. If you still need help, please call or text Sam at (208) 366-6111."
      }])
      return
    }

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }]
        })
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please call or text Sam directly at (208) 366-6111 for help."
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <header className="page-header" style={{paddingBottom: '1rem'}}>
        <div className="container">
          <span className="kicker reveal">Free troubleshooting help</span>
          <h1 className="reveal">Tech Helper</h1>
          <p className="reveal">Describe your tech problem and I'll try to help you fix it—or let you know when it's time to call in the pros.</p>
        </div>
      </header>

      <section className="section" style={{paddingTop: '1rem'}}>
        <div className="container">
          <div className="chat-container">
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-message ${msg.role}`}>
                  <div className="chat-bubble">
                    {msg.content.split('\n').map((line, j) => (
                      <p key={j} style={{margin: j === 0 ? 0 : '0.5rem 0 0'}}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="chat-message assistant">
                  <div className="chat-bubble">
                    <p style={{margin: 0, opacity: 0.7}}>Thinking...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="chat-input-form">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your tech problem..."
                disabled={loading}
                autoFocus
              />
              <button type="submit" className="btn btn-primary" disabled={loading || !input.trim()}>
                Send
              </button>
            </form>
          </div>

          <div className="chat-footer">
            <p>Can't fix it remotely? <a href="sms:+12083666111">Text Sam at (208) 366-6111</a> or <Link href="/contact">request a repair</Link>.</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .chat-container {
          background: rgba(255, 250, 243, 0.82);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          overflow: hidden;
          max-width: 740px;
          margin: 0 auto;
          box-shadow: var(--shadow);
          backdrop-filter: blur(12px);
        }

        .chat-messages {
          height: 430px;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: linear-gradient(180deg, rgba(255, 252, 247, 0.78), rgba(244, 235, 221, 0.62));
        }

        .chat-message {
          display: flex;
        }

        .chat-message.user {
          justify-content: flex-end;
        }

        .chat-message.assistant {
          justify-content: flex-start;
        }

        .chat-bubble {
          max-width: 82%;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          line-height: 1.5;
          box-shadow: 0 10px 24px rgba(82, 62, 38, 0.07);
        }

        .chat-message.user .chat-bubble {
          background: linear-gradient(135deg, #efdfc5, #cf9e68);
          color: #2b1a0f;
          border: 1px solid rgba(171, 124, 77, 0.18);
        }

        .chat-message.assistant .chat-bubble {
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid var(--line);
        }

        .chat-input-form {
          display: flex;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          border-top: 1px solid var(--line);
          background: rgba(248, 241, 232, 0.92);
          backdrop-filter: blur(10px);
        }

        .chat-input-form input {
          flex: 1;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          border: 1px solid var(--line);
          background: rgba(255, 255, 255, 0.9);
          color: var(--ink);
          font-size: 1rem;
        }

        .chat-input-form input:focus {
          outline: none;
          border-color: #ab7c4d;
          box-shadow: 0 0 0 3px rgba(171, 124, 77, 0.18);
        }

        .chat-input-form input::placeholder {
          color: var(--muted2);
        }

        .chat-footer {
          text-align: center;
          margin-top: 1.5rem;
          color: var(--muted);
        }

        .chat-footer a {
          color: var(--accent);
        }
      `}</style>
    </>
  )
}
