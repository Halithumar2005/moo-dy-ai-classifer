import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Brain, Database, Dna, Mail, Phone, MapPin, ChevronDown, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import CowChatbot from "@/components/CowChatbot";
import heroBackground from "@/assets/hero-cow-bg.jpg";
import cowFace from "@/assets/cow-face.jpg";
import cowIcon from "@/assets/cow-icon.png";
import aiCattle from "@/assets/ai-cattle.jpg";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isClassifying, setIsClassifying] = useState(false);
  const [result, setResult] = useState<{breed: string, confidence: number, description: string} | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setResult(null);
    }
  };

  const handleClassify = () => {
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive"
      });
      return;
    }

    setIsClassifying(true);
    // Simulate classification
    setTimeout(() => {
      setResult({
        breed: "Gir",
        confidence: 94.7,
        description: "Gir cattle are one of the principal Zebu breeds originating in India. They are known for their distinctive appearance with a convex forehead, long pendulous ears, and horns that curve backward."
      });
      setIsClassifying(false);
      toast({
        title: "Classification Complete!",
        description: "Breed identified successfully",
      });
    }, 2000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <CowChatbot />
      
      {/* Hero Section */}
      <section 
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 253, 252, 0.8), rgba(255, 253, 252, 0.9)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 cow-spot-subtle"></div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="floating-animation mb-8">
            <img src={cowIcon} alt="Cow" className="w-24 h-24 mx-auto" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-6 animate-fade-in drop-shadow-lg">
            Indian Cattle Breed Classifier
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
            AI-powered system to identify and classify Indian cattle breeds using advanced deep learning
          </p>

          <div className="flex items-center justify-center gap-2 mb-12 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-lg font-semibold text-accent">Hybrid VGG16 + Transformer Architecture</span>
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          
          <Button 
            size="lg" 
            className="glossy-card text-lg px-8 py-6 pulse-glow animate-scale-in"
            style={{animationDelay: '0.4s'}}
            onClick={() => scrollToSection('classify')}
          >
            Classify Now
          </Button>

          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4 text-primary">
              About the Project
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leveraging cutting-edge AI to preserve and promote India's rich cattle heritage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="glossy-card border-2 hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4 mx-auto">
                  <Brain className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-center">Hybrid Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Combines VGG16's powerful feature extraction with Transformer's attention mechanism for superior accuracy in breed classification.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glossy-card border-2 hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4 mx-auto">
                  <Database className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-center">Comprehensive Dataset</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Trained on thousands of images covering major Indian cattle breeds including Gir, Sahiwal, Red Sindhi, Tharparkar, and more.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glossy-card border-2 hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4 mx-auto">
                  <Dna className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-center">Breed Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Identifies distinct characteristics and features unique to each Indian cattle breed with high precision and confidence scores.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="glossy-card border-2 cow-spot-subtle">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <img 
                    src={aiCattle} 
                    alt="AI Technology" 
                    className="w-full md:w-1/2 rounded-lg shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-primary">Advanced Technology</h3>
                    <p className="text-muted-foreground">
                      Our hybrid model leverages the strengths of both convolutional neural networks and transformer architectures. 
                      VGG16 provides robust spatial feature extraction, while the transformer layer captures long-range dependencies 
                      and contextual information, resulting in state-of-the-art classification accuracy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Classification Section */}
      <section id="classify" className="py-20 bg-gradient-to-b from-secondary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4 text-primary">
              Classify Your Cattle
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Upload an image and let our AI identify the breed instantly
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="glossy-card border-2 border-accent/20">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div 
                    className="relative mx-auto w-full max-w-md aspect-square rounded-3xl border-4 border-dashed border-accent/30 hover:border-accent transition-colors duration-300 flex items-center justify-center cursor-pointer cow-spot-subtle overflow-hidden group"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {previewUrl ? (
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <img src={cowFace} alt="Upload" className="w-32 h-32 mx-auto mb-4 rounded-full opacity-50 group-hover:opacity-70 transition-opacity" />
                        <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg text-muted-foreground">Click to upload cattle image</p>
                        <p className="text-sm text-muted-foreground mt-2">Supports JPG, PNG</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                </div>

                {selectedFile && (
                  <div className="text-center">
                    <Button 
                      size="lg"
                      onClick={handleClassify}
                      disabled={isClassifying}
                      className="bg-accent hover:bg-accent/90 text-white px-12 py-6 text-lg"
                    >
                      {isClassifying ? (
                        <>
                          <div className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                          Classifying...
                        </>
                      ) : (
                        'Classify Breed'
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Result Section */}
      {result && (
        <section id="result" className="py-20 bg-gradient-to-b from-background to-secondary/10 animate-fade-in">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold text-center mb-16 text-primary">
              Classification Result
            </h2>

            <div className="max-w-3xl mx-auto">
              <Card className="glossy-card border-4 border-accent/30 cow-spot-subtle">
                <CardHeader className="text-center pb-4">
                  <img src={cowIcon} alt="Result" className="w-20 h-20 mx-auto mb-4" />
                  <CardTitle className="text-4xl mb-2">Breed: {result.breed}</CardTitle>
                  <div className="text-2xl font-semibold text-accent">
                    Confidence: {result.confidence}%
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary/30 rounded-lg p-6 mb-6">
                    <div className="w-full bg-background rounded-full h-4 overflow-hidden">
                      <div 
                        className="bg-accent h-full rounded-full transition-all duration-1000"
                        style={{ width: `${result.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {result.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-secondary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4 text-primary">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions? We're here to help with your cattle classification needs
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="glossy-card border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">cattle@classifier.ai</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-muted-foreground">+91 1234567890</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-muted-foreground">Agricultural Research Center, India</p>
                  </div>
                </div>

                <div className="mt-8">
                  <img src={cowFace} alt="Cow" className="rounded-lg shadow-lg w-full floating-animation" />
                </div>
              </CardContent>
            </Card>

            <Card className="glossy-card border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  toast({
                    title: "Message Sent!",
                    description: "We'll get back to you soon.",
                  });
                }}>
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" className="mt-2" />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="mt-2" />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Your message..." 
                      className="mt-2 min-h-[120px]"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 cow-spot-pattern">
        <div className="container mx-auto px-4 text-center">
          <img src={cowIcon} alt="Logo" className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <p className="text-lg mb-2">Indian Cattle Breed Classification System</p>
          <p className="text-sm opacity-80">Powered by Hybrid VGG16 + Transformer Architecture</p>
          <p className="text-sm opacity-60 mt-4">© 2024 All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
