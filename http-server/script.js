let userForm = document.getElementById("registrationForm");

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;

}
let userEntries = retrieveEntries();


const displayEntries = () => {
    const entries = retrieveEntries();

    if (entries.length === 0) {
        document.getElementById("user-entries").innerHTML = "<p>No entries found.</p>";
        return;
    }

    const tableRows = entries.map((entry) => `
        <tr>
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.terms ? "Yes" : "No"}</td>
        </tr>
    `).join("");

    const tableHTML = `
        <table border="1" cellspacing="0" cellpadding="10">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>DOB</th>
                    <th>Accepted Terms?</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
    `;

    document.getElementById("user-entries").innerHTML = tableHTML;
};

const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;

    const terms = document.getElementById("terms").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        terms
    };

    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
}
userForm.addEventListener("submit", saveUserForm);

const terms = document.getElementById("terms");
terms.addEventListener("invalid", () => {
    terms.setCustomValidity("You must accept the terms and conditions to proceed.");
});
terms.addEventListener("input", () => {
    terms.setCustomValidity(""); // Clear the message once the user interacts
});



displayEntries();