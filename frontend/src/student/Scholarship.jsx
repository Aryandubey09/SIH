import React, { useState, useEffect, useMemo } from 'react';
import './Scholarship.css';

const Scholarship = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  
  const [scholarships] = useState([
    {
      id: 1,
      name: "Beti Bachao Beti Padhao Scholarship",
      eligibility: ["Girls Only"],
      category: "girls",
      expiryDate: new Date('2024-12-31'),
      website: "https://betibachaobetipadhao.gov.in/",
      description: "Empowering girls through education",
      amount: "₹50,000",
      priority: "high"
    },
    {
      id: 2,
      name: "Pragati Scholarship for Girls",
      eligibility: ["Girls Only", "SC/ST"],
      category: "girls",
      expiryDate: new Date('2024-11-30'),
      website: "https://www.aicte-india.org/pragati",
      description: "Technical education support for girls",
      amount: "₹30,000",
      priority: "high"
    },
    {
      id: 3,
      name: "National Merit Scholarship",
      eligibility: ["General", "SC/ST", "OBC"],
      category: "general",
      expiryDate: new Date('2025-01-15'),
      website: "https://scholarships.gov.in/",
      description: "Merit-based scholarship for all categories",
      amount: "₹12,000",
      priority: "medium"
    },
    {
      id: 4,
      name: "Post-Matric Scholarship for SC/ST",
      eligibility: ["SC/ST"],
      category: "scst",
      expiryDate: new Date('2024-12-15'),
      website: "https://scholarships.gov.in/",
      description: "Financial support for SC/ST students",
      amount: "₹25,000",
      priority: "medium"
    },
    {
      id: 5,
      name: "Girls Education Empowerment Scheme",
      eligibility: ["Girls Only"],
      category: "girls",
      expiryDate: new Date('2024-11-25'),
      website: "https://www.education.gov.in/",
      description: "Exclusive scholarship for girl students",
      amount: "₹40,000",
      priority: "high"
    },
    {
      id: 6,
      name: "OBC Post-Matric Scholarship",
      eligibility: ["OBC"],
      category: "obc",
      expiryDate: new Date('2025-02-28'),
      website: "https://scholarships.gov.in/",
      description: "Educational support for OBC students",
      amount: "₹20,000",
      priority: "medium"
    },
    {
      id: 7,
      name: "Sukanya Samriddhi Scholarship",
      eligibility: ["Girls Only"],
      category: "girls",
      expiryDate: new Date('2024-12-10'),
      website: "https://www.sukanyasamriddhi.gov.in/",
      description: "Financial aid for girl child education",
      amount: "₹35,000",
      priority: "high"
    },
    {
      id: 8,
      name: "General Category Merit Scholarship",
      eligibility: ["General"],
      category: "general",
      expiryDate: new Date('2025-01-20'),
      website: "https://www.education.gov.in/",
      description: "Merit scholarship for general category",
      amount: "₹15,000",
      priority: "low"
    }
  ]);

  // Bank schemes data
  const [bankSchemes] = useState([
    {
      id: 1,
      bankName: "SBI Education Loan",
      schemeName: "Student Loan Scheme",
      interestRate: "8.5%",
      maxAmount: "₹1.5 Crore",
      website: "https://sbi.co.in/",
      logo: "🏦"
    },
    {
      id: 2,
      bankName: "PNB Education Loan",
      schemeName: "PNB Udaan",
      interestRate: "9.0%",
      maxAmount: "₹50 Lakhs",
      website: "https://www.pnbindia.in/",
      logo: "🏛️"
    },
    {
      id: 3,
      bankName: "HDFC Education Loan",
      schemeName: "Educational Loan",
      interestRate: "9.25%",
      maxAmount: "₹40 Lakhs",
      website: "https://www.hdfcbank.com/",
      logo: "🏦"
    },
    {
      id: 4,
      bankName: "ICICI Education Loan",
      schemeName: "Education Loan Solutions",
      interestRate: "9.5%",
      maxAmount: "₹30 Lakhs",
      website: "https://www.icicibank.com/",
      logo: "🏛️"
    }
  ]);

  const filterOptions = [
    { value: 'all', label: 'All Scholarships' },
    { value: 'girls', label: 'Girls Only' },
    { value: 'general', label: 'General' },
    { value: 'scst', label: 'SC/ST' },
    { value: 'obc', label: 'OBC' }
  ];

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Filter and sort scholarships
  const filteredAndSortedScholarships = useMemo(() => {
    let filtered = scholarships;
    
    if (selectedFilter !== 'all') {
      filtered = scholarships.filter(scholarship => 
        scholarship.category === selectedFilter
      );
    }

    // Sort by expiry date (closest first)
    return filtered.sort((a, b) => a.expiryDate - b.expiryDate);
  }, [scholarships, selectedFilter]);

  const getDaysRemaining = (expiryDate) => {
    const today = new Date();
    const timeDiff = expiryDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  };

  const getUrgencyColor = (daysRemaining) => {
    if (daysRemaining <= 15) return '#ff4757'; // Red - Very urgent
    if (daysRemaining <= 30) return '#ffa502'; // Orange - Urgent
    if (daysRemaining <= 60) return '#ffdd59'; // Yellow - Moderate
    return '#26de81'; // Green - Plenty of time
  };

  const handleCardClick = (website) => {
    window.open(website, '_blank');
  };

  const handleReset = () => {
    setSelectedFilter('all');
    setIsDropdownOpen(false);
  };

  return (
    <div className="scholarship-container">
      {/* Header with Filter */}
      <div className="header-section">
        <h1 className="main-title">🎓 Scholarship Portal</h1>
        <p className="subtitle">Empowering Education, Transforming Lives</p>
        
        <div className="filter-section">
          <div className="filter-dropdown">
            <button 
              className="filter-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {filterOptions.find(opt => opt.value === selectedFilter)?.label}
              <span className="dropdown-arrow">▼</span>
            </button>
            
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {filterOptions.map(option => (
                  <div
                    key={option.value}
                    className="dropdown-item"
                    onClick={() => {
                      setSelectedFilter(option.value);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button className="reset-button" onClick={handleReset}>
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Scholarship Cards */}
      <div className="scholarships-grid">
        {filteredAndSortedScholarships.map(scholarship => {
          const daysRemaining = getDaysRemaining(scholarship.expiryDate);
          const urgencyColor = getUrgencyColor(daysRemaining);
          
          return (
            <div 
              key={scholarship.id}
              className={`scholarship-card ${scholarship.priority}`}
              onClick={() => handleCardClick(scholarship.website)}
            >
              <div className="card-header">
                <h3 className="scholarship-name">{scholarship.name}</h3>
                <div 
                  className="days-remaining"
                  style={{ backgroundColor: urgencyColor }}
                >
                  {daysRemaining > 0 ? `${daysRemaining} days left` : 'Expired'}
                </div>
              </div>
              
              <div className="card-body">
                <p className="description">{scholarship.description}</p>
                
                <div className="eligibility-tags">
                  {scholarship.eligibility.map((elig, index) => (
                    <span key={index} className="eligibility-tag">
                      {elig}
                    </span>
                  ))}
                </div>
                
                <div className="scholarship-details">
                  <div className="amount">
                    <span className="label">Amount:</span>
                    <span className="value">{scholarship.amount}</span>
                  </div>
                  <div className="expiry">
                    <span className="label">Expires:</span>
                    <span className="value">
                      {scholarship.expiryDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="card-footer">
                <span className="click-hint">Click to apply →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bank Schemes Section */}
      <div className="bank-schemes-section">
        <h2 className="section-title">🏦 Bank Education Schemes</h2>
        <div className="bank-schemes-container">
          {bankSchemes.map(scheme => (
            <div 
              key={scheme.id}
              className="bank-scheme-card"
              onClick={() => handleCardClick(scheme.website)}
            >
              <div className="bank-logo">{scheme.logo}</div>
              <h4 className="bank-name">{scheme.bankName}</h4>
              <p className="scheme-name">{scheme.schemeName}</p>
              <div className="scheme-details">
                <div className="interest-rate">
                  <span className="label">Interest:</span>
                  <span className="value">{scheme.interestRate}</span>
                </div>
                <div className="max-amount">
                  <span className="label">Max:</span>
                  <span className="value">{scheme.maxAmount}</span>
                </div>
              </div>
              <div className="apply-hint">Apply Now →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scholarship;