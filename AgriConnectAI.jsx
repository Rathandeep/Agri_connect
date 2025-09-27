
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, User, Bot, Wheat, TrendingUp, DollarSign, Calendar } from 'lucide-react';

const AgriConnectAI = () => {
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [farmerData, setFarmerData] = useState({
    name: "Rajesh Kumar",
    crops: [
      { name: "Wheat", area: "5 acres", status: "Growing", planted: "2024-01-15", expectedHarvest: "2024-04-20" },
      { name: "Rice", area: "3 acres", status: "Harvested", planted: "2023-08-10", harvested: "2023-12-05" }
    ],
    recentSales: [
      { crop: "Rice", quantity: "2 tons", price: "₹40,000", date: "2024-01-10", buyer: "Local Mill" },
      { crop: "Wheat", quantity: "1.5 tons", price: "₹30,000", date: "2023-12-20", buyer: "Grain Trader" }
    ],
    purchases: [
      { item: "Seeds", quantity: "50kg", price: "₹5,000", date: "2024-01-05", supplier: "AgriStore" },
      { item: "Fertilizer", quantity: "100kg", price: "₹8,000", date: "2024-01-12", supplier: "FertMax" }
    ],
    loans: [
      { type: "Crop Loan", amount: "₹2,00,000", status: "Active", nextEMI: "₹15,000", dueDate: "2024-02-15" },
      { type: "Equipment Loan", amount: "₹50,000", status: "Completed", paidAmount: "₹55,000" }
    ],
    dailyTasks: [
      { task: "Irrigation - Wheat field", completed: true, date: "2024-01-13" },
      { task: "Pest inspection - Rice field", completed: false, date: "2024-01-13" },
      { task: "Fertilizer application", completed: true, date: "2024-01-12" }
    ]
  });

  // Simulated voice recognition
  const startListening = () => {
    setIsListening(true);
    // Simulate voice input after 2 seconds
    setTimeout(() => {
      const sampleQueries = [
        "What is my current crop status?",
        "Show me my recent sales",
        "What are my pending tasks for today?",
        "Tell me about my active loans",
        "What did I buy last week?"
      ];
      const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setCurrentQuery(randomQuery);
      handleVoiceQuery(randomQuery);
      setIsListening(false);
    }, 2000);
  };

  const handleVoiceQuery = (query) => {
    const newConversation = [...conversation, { type: 'user', message: query }];
    
    let response = generateResponse(query.toLowerCase());
    
    setConversation([...newConversation, { type: 'ai', message: response }]);
    setCurrentQuery('');
    
    // Simulate text-to-speech
    speakResponse(response);
  };

  const generateResponse = (query) => {
    const { name, crops, recentSales, purchases, loans, dailyTasks } = farmerData;
    
    if (query.includes('crop status') || query.includes('crops')) {
      return `Hello ${name}! Here's your current crop status: ${crops.map(crop => 
        `${crop.name} - ${crop.area}, Status: ${crop.status}${crop.status === 'Growing' ? `, Expected harvest: ${crop.expectedHarvest}` : ''}`
      ).join('. ')}`;
    }
    
    if (query.includes('sales') || query.includes('sell')) {
      const totalSales = recentSales.reduce((sum, sale) => sum + parseInt(sale.price.replace(/[₹,]/g, '')), 0);
      return `Your recent sales: ${recentSales.map(sale => 
        `${sale.crop} - ${sale.quantity} sold for ${sale.price} on ${sale.date}`
      ).join('. ')}. Total recent sales: ₹${totalSales.toLocaleString()}`;
    }
    
    if (query.includes('tasks') || query.includes('work')) {
      const pendingTasks = dailyTasks.filter(task => !task.completed);
      const completedTasks = dailyTasks.filter(task => task.completed);
      return `Today's tasks: Completed - ${completedTasks.length} tasks. Pending - ${pendingTasks.length} tasks: ${pendingTasks.map(task => task.task).join(', ')}`;
    }
    
    if (query.includes('loan') || query.includes('debt')) {
      const activeLoans = loans.filter(loan => loan.status === 'Active');
      return `Your loan status: ${activeLoans.map(loan => 
        `${loan.type} - ${loan.amount}, Next EMI: ${loan.nextEMI} due on ${loan.dueDate}`
      ).join('. ')}`;
    }
    
    if (query.includes('buy') || query.includes('purchase')) {
      const recentPurchases = purchases.slice(-2);
      return `Your recent purchases: ${recentPurchases.map(purchase => 
        `${purchase.item} - ${purchase.quantity} for ${purchase.price} from ${purchase.supplier} on ${purchase.date}`
      ).join('. ')}`;
    }
    
    if (query.includes('weather')) {
      return "Today's weather is sunny with 28°C temperature. Good conditions for field work. Humidity is 65%. No rain expected for next 3 days.";
    }
    
    if (query.includes('price') || query.includes('market')) {
      return "Current market prices: Wheat - ₹2,100/quintal, Rice - ₹1,950/quintal, Cotton - ₹6,800/quintal. Prices are stable compared to last week.";
    }
    
    return `I understand you asked about "${query}". I can help you with crop status, sales records, daily tasks, loan information, purchases, weather updates, and market prices. What specific information would you like?`;
  };

  const speakResponse = (text) => {
    // In a real implementation, you would use Web Speech API
    console.log("AI Speaking:", text);
  };

  const QuickStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-green-100 p-4 rounded-lg">
        <div className="flex items-center">
          <Wheat className="h-8 w-8 text-green-600 mr-2" />
          <div>
            <p className="text-sm text-green-600">Active Crops</p>
            <p className="text-2xl font-bold text-green-800">{farmerData.crops.length}</p>
          </div>
        </div>
      </div>
      <div className="bg-blue-100 p-4 rounded-lg">
        <div className="flex items-center">
          <TrendingUp className="h-8 w-8 text-blue-600 mr-2" />
          <div>
            <p className="text-sm text-blue-600">This Month Sales</p>
            <p className="text-2xl font-bold text-blue-800">₹70,000</p>
          </div>
        </div>
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg">
        <div className="flex items-center">
          <Calendar className="h-8 w-8 text-yellow-600 mr-2" />
          <div>
            <p className="text-sm text-yellow-600">Pending Tasks</p>
            <p className="text-2xl font-bold text-yellow-800">
              {farmerData.dailyTasks.filter(task => !task.completed).length}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-red-100 p-4 rounded-lg">
        <div className="flex items-center">
          <DollarSign className="h-8 w-8 text-red-600 mr-2" />
          <div>
            <p className="text-sm text-red-600">Active Loans</p>
            <p className="text-2xl font-bold text-red-800">
              {farmerData.loans.filter(loan => loan.status === 'Active').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-600 mb-2">AgriConnect AI Assistant</h1>
          <p className="text-gray-600">Your Personal Farming Assistant - Just like Jarvis!</p>
          <p className="text-lg font-semibold text-gray-800 mt-2">Welcome back, {farmerData.name}!</p>
        </div>

        <QuickStats />

        {/* Voice Assistant Interface */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-6 mb-6 text-white">
          <div className="text-center">
            <div className="mb-4">
              <button
                onClick={startListening}
                disabled={isListening}
                className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 cursor-not-allowed' 
                    : 'bg-white text-green-600 hover:bg-gray-100'
                }`}
              >
                {isListening ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
                {isListening ? 'Listening...' : 'Ask Me Anything'}
              </button>
            </div>
            
            {isListening && (
              <div className="flex justify-center">
                <div className="animate-pulse flex space-x-2">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            )}
            
            <p className="text-sm opacity-90 mt-2">
              Try asking: "What's my crop status?", "Show recent sales", "What are my tasks?"
            </p>
          </div>
        </div>

        {/* Conversation History */}
        <div className="bg-gray-100 rounded-lg p-4 max-h-96 overflow-y-auto mb-4">
          <h3 className="font-semibold text-gray-700 mb-3">Conversation History</h3>
          {conversation.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Start a conversation by clicking "Ask Me Anything" above</p>
          ) : (
            conversation.map((msg, index) => (
              <div key={index} className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start max-w-xs lg:max-w-md ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-shrink-0 ${msg.type === 'user' ? 'ml-2' : 'mr-2'}`}>
                    {msg.type === 'user' ? (
                      <User className="w-8 h-8 bg-blue-500 text-white p-1 rounded-full" />
                    ) : (
                      <Bot className="w-8 h-8 bg-green-500 text-white p-1 rounded-full" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 rounded-bl-none'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button 
            onClick={() => handleVoiceQuery("What is my current crop status?")}
            className="p-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
          >
            Crop Status
          </button>
          <button 
            onClick={() => handleVoiceQuery("Show me my recent sales")}
            className="p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
          >
            Recent Sales
          </button>
          <button 
            onClick={() => handleVoiceQuery("What are my pending tasks?")}
            className="p-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
          >
            Daily Tasks
          </button>
          <button 
            onClick={() => handleVoiceQuery("Tell me about my loans")}
            className="p-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
          >
            Loan Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgriConnectAI;