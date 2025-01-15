document.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');  // Add class when scrolled more than 50px
    } else {
      navbar.classList.remove('scrolled');  // Remove class when scrolled back to top
    }
  });

  function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
}

function calculateRoadTravel() {
    const distance = parseFloat(document.getElementById('road-distance').value) || 0;
    const efficiency = parseFloat(document.getElementById('road-efficiency').value) || 1;
    const fuelType = document.getElementById('road-fuel').value;

    const fuelEmissionFactors = { petrol: 2.31, diesel: 2.68, cng: 2.17 };
    const emissions = (distance / efficiency) * fuelEmissionFactors[fuelType];
    addToTotal(emissions);
    showTab('rail-travel');
}

function calculateRailTravel() {
    const distance = parseFloat(document.getElementById('rail-distance').value) || 0;
    const emissions = distance * 0.041; // kg CO2 per km
    addToTotal(emissions);
    showTab('domestic-air');
}

function calculateDomesticAir() {
    const flights = parseFloat(document.getElementById('domestic-flights').value) || 0;
    const emissions = flights * 0.25; // tonnes CO2 per flight
    addToTotal(emissions);
    showTab('international-air');
}

function calculateInternationalAir() {
    const flights = parseFloat(document.getElementById('international-flights').value) || 0;
    const emissions = flights * 1.1; // tonnes CO2 per flight
    addToTotal(emissions);
    showTab('accommodation');
}

function calculateAccommodation() {
    const nights = parseFloat(document.getElementById('nights-stayed').value) || 0;
    const emissions = nights * 0.02; // tonnes CO2 per night
    addToTotal(emissions);
    showTab('total');
}

let totalEmissions = 0;

function addToTotal(emissions) {
    totalEmissions += emissions;
    document.getElementById('total-emissions').textContent = totalEmissions.toFixed(3);
}

function resetCalculator() {
    totalEmissions = 0;
    document.getElementById('total-emissions').textContent = '0.000';
    document.querySelectorAll('input').forEach(input => input.value = '');
    showTab('road-travel');
}
