//  Listen for submit
const calculateResults = () => {
    // UI Vars
    const amount = document.querySelector("#amount");
    const interest = document.querySelector("#interest");
    const years = document.querySelector("#years");
    const monthlyPayment = document.querySelector("#monthly-payment");
    const totalPayment = document.querySelector("#total-payment");
    const totalInterest = document.querySelector("#total-interest");

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value)*12; 

    // Compute monthly payments;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest) / (x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        // Show results
        document.querySelector("#results").style.display = "block";
        // Hide spinner
        document.querySelector("#loading").style.display = "none";
    } else {
        showError("Please check your numbers");
    }
}

// Event listener to call the function
document.querySelector("#loan-form").addEventListener("submit", (e) => {
    // Hide results
    document.querySelector("#results").style.display = "none";
    
    //Show loader 
    document.querySelector("#loading").style.display = "block";

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});



// Show error
const showError = (error) => {
    // create div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Instert error above heading

    card.insertBefore(errorDiv, heading) // insert error before heading

    // Hide loader if error
    document.querySelector("#loading").style.display = "none";

    // Hide error on click
    const hideError = () => { 
        errorDiv.style.display = "none";
    }
    document.body.addEventListener("click", hideError);
    // If user doesn't click, set timeout to 5 seconds
    setTimeout(hideError, 4000);
}








