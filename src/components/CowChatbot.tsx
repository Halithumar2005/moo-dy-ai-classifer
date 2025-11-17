import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send } from "lucide-react";
import cowFace from "@/assets/cow-face.jpg";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const CowChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Moo! 🐄 Welcome! I'm your cattle breed assistant. Ask me anything about Indian cattle breeds!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("gir")) {
      return "Gir cattle are one of the most popular Indian breeds! They're known for their distinctive humped back, long pendulous ears, and excellent milk production. They originated in Gujarat and are well-adapted to hot climates. 🐄";
    } else if (input.includes("sahiwal")) {
      return "Sahiwal cattle are excellent dairy animals from Punjab! They have a reddish-brown coat and are known for high milk yield and heat tolerance. They're considered one of the best dairy breeds in India. 🥛";
    } else if (input.includes("classify") || input.includes("upload")) {
      return "To classify a cattle breed, scroll up to the 'Classify Your Cattle' section and click the upload area to select an image. Our AI will identify the breed for you! 📸";
    } else if (input.includes("breed") || input.includes("types")) {
      return "Major Indian cattle breeds include Gir, Sahiwal, Red Sindhi, Tharparkar, Rathi, Kankrej, and many more! Each has unique characteristics suited to different regions and purposes. What would you like to know about? 🐮";
    } else if (input.includes("help") || input.includes("how")) {
      return "I can help you with:\n• Information about Indian cattle breeds\n• How to use the classifier\n• Breed characteristics\n• General cattle farming questions\nJust ask away! 💚";
    } else {
      return "That's interesting! I'm here to help with cattle breed information. Try asking about specific breeds like Gir, Sahiwal, or how to use the classifier! 🐄";
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-110 ${
          isOpen ? 'scale-0' : 'scale-100'
        } bg-accent hover:bg-accent/90 text-white pulse-glow`}
      >
        <div className="relative">
          <MessageCircle className="w-8 h-8" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <Card className={`fixed bottom-6 right-6 w-96 h-[500px] z-50 shadow-2xl animate-scale-in border-2 border-accent/30 cow-spot-subtle`}>
          <CardHeader className="bg-accent text-white rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 cow-spot-pattern opacity-20"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <img 
                  src={cowFace} 
                  alt="Cow Assistant" 
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div>
                  <CardTitle className="text-lg">Moo Assistant 🐄</CardTitle>
                  <p className="text-xs text-white/80">Always here to help!</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-accent text-white"
                          : "bg-secondary text-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about cattle breeds..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  className="bg-accent hover:bg-accent/90 text-white"
                  size="icon"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CowChatbot;
