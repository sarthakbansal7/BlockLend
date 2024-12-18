import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Wallet, ArrowRight, Shield, Zap, DollarSign, Users,
PiggyBank, LineChart, Github, Twitter, MessageSquare, Bitcoin,
Clock, Star, Send } from 'lucide-react';


// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={` w-full z-50 transition-all duration-300 ${
      true ? 'bg-[#6a6867]/90 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 text-[#ec0029]" />
            <span className="ml-2 text-2xl font-bold text-white">BlockLend</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-[#ec0029] transition-colors">Home</a>
            <a href="#features" className="text-white hover:text-[#ec0029] transition-colors">Features</a>
            <a href="#how-it-works" className="text-white hover:text-[#ec0029] transition-colors">How it Works</a>
            <button className="bg-[#ec0029] text-white px-6 py-2 rounded-full hover:bg-[#ec0029]/80 transition-all">
              Connect Wallet
            </button>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#6a6867] py-4">
            <div className="flex flex-col space-y-4 px-6">
              <a href="#" className="text-white hover:text-[#ec0029] transition-colors">Home</a>
              <a href="#features" className="text-white hover:text-[#ec0029] transition-colors">Features</a>
              <a href="#how-it-works" className="text-white hover:text-[#ec0029] transition-colors">How it Works</a>
              <button className="bg-[#ec0029] text-white px-6 py-2 rounded-full hover:bg-[#ec0029]/80 transition-all">
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/lending");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#6a6867] to-[#1a1a1a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-screen">
          <div className="md:w-1/2 text-white pt-20 md:pt-0">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in">
              Decentralized Lending & Borrowing
              <span className="text-[#ec0029]">Made Simple</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in-delay">
              Access the future of finance with our secure, efficient, and user-friendly DeFi platform.
              Earn interest on your crypto assets or get instant loans without intermediaries.
            </p>
            <button onClick={handleGetStarted} className="group flex items-center bg-[#ec0029] text-white px-8 py-4 rounded-full hover:bg-[#ec0029]/80 transition-all animate-fade-in-delay-2">
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative animate-float">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#ec0029]/20 rounded-full blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80"
                alt="DeFi Platform"
                className="relative z-10 w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stats Component
const Stats = () => {
  const stats = [
    {
      icon: <DollarSign className="w-8 h-8 text-[#ec0029]" />,
      value: "$500M+",
      label: "Total Value Locked"
    },
    {
      icon: <Users className="w-8 h-8 text-[#ec0029]" />,
      value: "50K+",
      label: "Active Users"
    },
    {
      icon: <Clock className="w-8 h-8 text-[#ec0029]" />,
      value: "2M+",
      label: "Transactions"
    },
    {
      icon: <Wallet className="w-8 h-8 text-[#ec0029]" />,
      value: "15+",
      label: "Supported Assets"
    }
  ];

  return (
    <section className="py-16 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-gradient-to-br from-[#6a6867]/20 to-transparent"
            >
              <div className="mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Component
const Features = () => {
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-[#ec0029]" />,
      title: "Bank-Grade Security",
      description: "Your assets are protected by industry-leading security protocols and smart contract audits."
    },
    {
      icon: <Zap className="w-12 h-12 text-[#ec0029]" />,
      title: "Lightning Fast",
      description: "Get instant loans and process transactions within seconds on our optimized platform."
    },
    {
      icon: <DollarSign className="w-12 h-12 text-[#ec0029]" />,
      title: "Competitive Rates",
      description: "Enjoy the best lending and borrowing rates in the DeFi space with minimal fees."
    },
    {
      icon: <Users className="w-12 h-12 text-[#ec0029]" />,
      title: "Community Driven",
      description: "Join a thriving community of users and participate in platform governance."
    }
  ];

  return (
    <section id="features" className="py-20 bg-[#f5f5f5]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Why Choose <span className="text-[#ec0029]">BlockLend</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Token List Component
const TokenList = () => {
  const tokens = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      apy: "4.5%",
      icon: <Bitcoin className="w-8 h-8" />
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      apy: "5.2%",
      icon: <DollarSign className="w-8 h-8" />
    },
    {
      name: "USDC",
      symbol: "USDC",
      apy: "8.1%",
      icon: <DollarSign className="w-8 h-8" />
    },
    {
      name: "MNT",
      symbol: "MNT",
      apy: "8.0%",
      icon: <DollarSign className="w-8 h-8" />
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Supported Assets
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4">Asset</th>
                <th className="text-left py-4">Symbol</th>
                <th className="text-right py-4">APY</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, index) => (
                <tr 
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="mr-3">{token.icon}</div>
                      {token.name}
                    </div>
                  </td>
                  <td className="py-4">{token.symbol}</td>
                  <td className="text-right py-4 text-[#ec0029] font-bold">
                    {token.apy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

// How It Works Component
const HowItWorks = () => {
  const steps = [
    {
      icon: <Wallet className="w-16 h-16 text-[#ec0029]" />,
      title: "Connect Wallet",
      description: "Link your crypto wallet to access our platform securely."
    },
    {
      icon: <PiggyBank className="w-16 h-16 text-[#ec0029]" />,
      title: "Deposit Assets",
      description: "Deposit your crypto assets to start earning interest or use as collateral."
    },
    {
      icon: <LineChart className="w-16 h-16 text-[#ec0029]" />,
      title: "Start Earning",
      description: "Earn competitive yields on your deposits or take out a loan instantly."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-[#6a6867] to-[#1a1a1a] text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>

        <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center max-w-sm">
              <div className="mb-6 transform transition-transform duration-500 hover:scale-110">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
              
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 text-[#ec0029]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Component
const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Crypto Investor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
      content: "DeFiLend has transformed how I manage my crypto assets. The platform is intuitive and the returns are exceptional."
    },
    {
      name: "Sarah Chen",
      role: "DeFi Enthusiast",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
      content: "The security features and competitive rates make DeFiLend stand out. It's my go-to platform for crypto lending."
    },
    {
      name: "Michael Roberts",
      role: "Blockchain Developer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
      content: "As a developer, I appreciate the technical robustness of DeFiLend. The smart contracts are well-audited and secure."
    }
  ];

  return (
    <section className="py-20 bg-[#f5f5f5]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Newsletter Component
const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#6a6867] to-[#1a1a1a] text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-gray-300 mb-8">
            Subscribe to our newsletter for the latest updates, features, and community news.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:border-[#ec0029]"
              required
            />
            <button
              type="submit"
              className="group flex items-center justify-center px-8 py-3 bg-[#ec0029] rounded-full hover:bg-[#ec0029]/80 transition-all"
            >
              Subscribe
              <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <Wallet className="h-8 w-8 text-[#ec0029]" />
              <span className="ml-2 text-2xl font-bold">BlockLend</span>
            </div>
            <p className="text-gray-400">
              The future of decentralized lending and borrowing.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#ec0029] transition-colors">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-[#ec0029] transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-[#ec0029] transition-colors">How it Works</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#ec0029] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#ec0029] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#ec0029] transition-colors">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#ec0029] transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#ec0029] transition-colors">
                <MessageSquare className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#ec0029] transition-colors">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DeFiLend. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const Landing = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Header />
      <HeroSection />
      <Stats />
      <Features />
      <TokenList />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Landing;