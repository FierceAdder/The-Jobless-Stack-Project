// search.js
const searchData = [
    // Health Facilities
    { title: 'Medical Appointments', url: '/appointment.html' },
    { title: 'Health Advice', url: '/health-advice.html' },
    { title: 'Medicine Services', url: 'https://janaushadhi.gov.in/KendraDetails.aspx' },
    
    // Educational Facilities
    { title: 'School Education', url: '/school.html' },
    { title: 'Skills Training', url: '/skills.html' },
    { title: 'Professional Development', url: '/professional.html' },
    { title: 'Exam Updates', url: 'https://testbook.com/government-exam-calendar' },
    
    // School Sections
    { title: 'Class 3 Study Material', url: '/school.html#class3' },
    { title: 'Class 4 Study Material', url: '/school.html#class4' },
    { title: 'Class 5 Study Material', url: '/school.html#class5' },
    { title: 'Class 6 Study Material', url: '/school.html#class6' },
    { title: 'Class 7 Study Material', url: '/school.html#class7' },
    { title: 'Class 8 Study Material', url: '/school.html#class8' },
    { title: 'Class 9 Study Material', url: '/school.html#class9' },
    { title: 'Class 10 Study Material', url: '/school.html#class10' },
    { title: 'Class 11 Study Material', url: '/school.html#class11' },
    { title: 'Class 12 Study Material', url: '/school.html#class12' },
    { title: 'JEE Preparation', url: '/school.html#jee' },
    { title: 'NEET Preparation', url: '/school.html#neet' },
    
    // Professional Skills
    { title: 'Technical Skills - Coursera', url: 'https://www.coursera.org/browse/computer-science' },
    { title: 'Creative Skills - Skillshare', url: 'https://www.skillshare.com/browse/creative' },
    { title: 'Communication Skills - Duolingo', url: 'https://www.duolingo.com' },
    { title: 'Marketing Skills - LinkedIn', url: 'https://www.linkedin.com/learning/topics/marketing' },
    
    // college Skills
    { title: 'Aerospace and Aviation', url: '/skills.html#aerospace' },
    { title: 'Home Furnishing', url: '/skills.html#furnishing' },
    { title: 'Automotive', url: '/skills.html#automotive' },
    { title: 'Handicrafts and Carpet', url: '/skills.html#handicrafts' },
    { title: 'Leather Industry', url: '/skills.html#leather' },
    { title: 'Logistics', url: '/skills.html#logistics' },
    { title: 'Media and Entertainment', url: '/skills.html#media' },
    { title: 'Textile Industry', url: '/skills.html#textile' },
    
    // Financial Facilities
    { title: 'Investment Services', url: 'https://zerodha.com' },
    { title: 'Financial Learning', url: '/financial-learn.html' },
    { title: 'Loan Services', url: '/financial-loan.html' },
    { title: 'LIC Services', url: 'https://licindia.in/' },
    
    // Agricultural Facilities
    { title: 'Agricultural Equipment', url: '/agricultural-equipment.html' },
    { title: 'Modern Farming Technology', url: '/modern-agriculture.html' },
    { title: 'Crop support', url: '/crop-support.html' },
    
    // Home
    { title: 'Home Page', url: '/index.html' },
    // Financial Facilities
    
];

function initializeSearch() {
    const searchBox = document.getElementById('searchBox');
    const searchResults = document.getElementById('searchResults');

    searchBox.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const filteredResults = searchData.filter(item => 
            item.title.toLowerCase().includes(searchTerm)
        );

        if (filteredResults.length > 0) {
            searchResults.innerHTML = filteredResults
                .map(item => `
                    <div class="search-result-item">
                        <a href="${item.url}">${item.title}</a>
                    </div>
                `).join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = `
                <div class="search-result-item">
                    No results found
                </div>
            `;
            searchResults.style.display = 'block';
        }
    });

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchBox.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSearch);