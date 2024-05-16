// Get the query parameters from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Extract tailor details from the query parameters
const tailorData = {
    name: urlParams.get('name'),
    age: urlParams.get('age'),
    email: urlParams.get('email'),
    phone: urlParams.get('phone'),
    gender: urlParams.get('gender'),
    role: urlParams.get('role')
};

// Function to populate tailor details in the grid
function populateTailorDetails(data) {
    const tailorDetailsContainer = document.getElementById("tailorDetails");

    // Create a grid for tailor details
    const gridHtml = `
        <div class="col-md-6">
            <h4>Details</h4>
            <table class="table">
                <tbody>
                    <tr>
                        <th>Name:</th>
                        <td>${data.name}</td>
                    </tr>
                    <tr>
                        <th>Age:</th>
                        <td>${data.age}</td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td>${data.email}</td>
                    </tr>
                    <tr>
                        <th>Phone:</th>
                        <td>${data.phone}</td>
                    </tr>
                    <tr>
                        <th>Gender:</th>
                        <td>${data.gender}</td>
                    </tr>
                    <tr>
                        <th>Role:</th>
                        <td>${data.role}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    // Insert the grid HTML into the container
    tailorDetailsContainer.innerHTML = gridHtml;
}

// Populate the tailor details
populateTailorDetails(tailorData);
