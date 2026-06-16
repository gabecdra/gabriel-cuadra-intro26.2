

const API_KEY = 'live_V6cc7P6mDT2lJzxsJq77ZTEMhAA6iPlpvPr6bU0tdGzLNmWC9bfCVXNRSBnYqYyt'; // Get free key at https://thecatapi.com/signup

let currentBreedId = null;

document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation elements
    const breedsLink = document.getElementById('breeds-link');
    const detailsLink = document.getElementById('details-link');
    const breedsSection = document.getElementById('breeds-section');
    const detailsSection = document.getElementById('details-section');
    const breedDetail = document.getElementById('breed-detail');
    
    // Navigation between views
    breedsLink.addEventListener('click', function(e) {
        e.preventDefault();
        goBackToBreeds();
    });
    
    detailsLink.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentBreedId) {
            showDetailsSection();
        } else {
            alert('Please select a breed first!');
        }
    });
    
    // Use event delegation for dynamically created elements
    breedDetail.addEventListener('click', function(e) {
        if (e.target.classList.contains('back-btn')) {
            goBackToBreeds();
        }
    });
    
    // Load all breeds on page load
    fetchAllBreeds();
});

// Switch to details view
function showDetailsSection() {
    document.getElementById('breeds-section').className = 'hidden-section';
    document.getElementById('details-section').className = 'active-section';
    document.getElementById('breeds-link').classList.remove('active');
    document.getElementById('details-link').classList.add('active');
}

// Switch to breeds view
function goBackToBreeds() {
    document.getElementById('breeds-section').className = 'active-section';
    document.getElementById('details-section').className = 'hidden-section';
    document.getElementById('breeds-link').classList.add('active');
    document.getElementById('details-link').classList.remove('active');
}

// ENDPOINT 1: Get all breeds
async function fetchAllBreeds() {
    const breedsGrid = document.getElementById('breeds-grid');
    const errorMessage = document.getElementById('error-message');
    
    breedsGrid.innerHTML = '<p class="loading">Loading cat breeds...</p>';
    errorMessage.classList.add('hidden');
    
    try {
        const response = await fetch('https://api.thecatapi.com/v1/breeds', {
            headers: {
                'x-api-key': API_KEY
            }
        });
        
        if (!response.ok) throw new Error('Failed to fetch breeds');
        
        const breeds = await response.json();
        displayBreeds(breeds);
        
    } catch (error) {
        errorMessage.textContent = 'Error: ' + error.message;
        errorMessage.classList.remove('hidden');
        breedsGrid.innerHTML = '<p class="loading">Error loading breeds. Please refresh the page.</p>';
    }
}

// Display breeds in grid
function displayBreeds(breeds) {
    const breedsGrid = document.getElementById('breeds-grid');
    
    if (breeds.length === 0) {
        breedsGrid.innerHTML = '<p class="loading">No breeds found</p>';
        return;
    }
    
    let html = '';
    
    breeds.forEach(breed => {
        const imageUrl = breed.image?.url || 'https://via.placeholder.com/200x180?text=No+Image';
        
        html += `
            <div class="breed-card" data-breed-id="${breed.id}">
                <img src="${imageUrl}" alt="${breed.name}">
                <div class="breed-name">${breed.name}</div>
            </div>
        `;
    });
    
    breedsGrid.innerHTML = html;
    
    // Add click events to breed cards
    document.querySelectorAll('.breed-card').forEach(card => {
        card.addEventListener('click', function() {
            const breedId = this.dataset.breedId;
            fetchBreedDetails(breedId);
        });
    });
}

// ENDPOINT 2: Get specific breed details
async function fetchBreedDetails(breedId) {
    const breedDetail = document.getElementById('breed-detail');
    const errorMessage = document.getElementById('error-message');
    
    breedDetail.innerHTML = '<p class="loading">Loading breed details...</p>';
    errorMessage.classList.add('hidden');
    
    // Switch to details view
    showDetailsSection();
    
    currentBreedId = breedId;
    
    try {
        // Get breed details
        const breedResponse = await fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        
        if (!breedResponse.ok) throw new Error('Failed to fetch breed details');
        
        const breed = await breedResponse.json();
        
        // Get images for this breed
        const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=1`, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        
        let imageUrl = null;
        if (imageResponse.ok) {
            const images = await imageResponse.json();
            if (images && images.length > 0) {
                imageUrl = images[0].url;
            }
        }
        
        // Display with the fetched image
        displayBreedDetails(breed, imageUrl);
        
    } catch (error) {
        errorMessage.textContent = 'Error: ' + error.message;
        errorMessage.classList.remove('hidden');
        breedDetail.innerHTML = '<p class="loading">Error loading details. Please try again.</p>';
    }
}

// Display breed details
function displayBreedDetails(breed, imageUrl) {
    const breedDetail = document.getElementById('breed-detail');
    
    // Use fetched image, or breed's own image, or placeholder
    const finalImageUrl = imageUrl || breed.image?.url || 'https://via.placeholder.com/400x300?text=No+Image+Available';
    
    const html = `
        <button class="back-btn">← Back to All Breeds</button>
        <img src="${finalImageUrl}" alt="${breed.name}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
        <h2>${breed.name}</h2>
        
        <div class="detail-item">
            <div class="detail-label">Origin</div>
            <div class="detail-value">${breed.origin || 'Unknown'}</div>
        </div>
        
        <div class="detail-item">
            <div class="detail-label">Life Span</div>
            <div class="detail-value">${breed.life_span || 'Unknown'} years</div>
        </div>
        
        <div class="detail-item">
            <div class="detail-label">Temperament</div>
            <div class="detail-value">${breed.temperament || 'Unknown'}</div>
        </div>
        
        <div class="detail-item">
            <div class="detail-label">Weight</div>
            <div class="detail-value">${breed.weight?.imperial || 'Unknown'} lbs</div>
        </div>
        
        <div class="detail-item">
            <div class="detail-label">Description</div>
            <div class="detail-value" style="font-weight: normal; font-size: 0.95em; line-height: 1.5;">${breed.description || 'No description available'}</div>
        </div>
    `;
    
    breedDetail.innerHTML = html;
    
    // Add click event to back button
    const backBtn = breedDetail.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', goBackToBreeds);
    }
}