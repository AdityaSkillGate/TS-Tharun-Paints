
const USERS_KEY = "tsTharunDemoUsers";
const SESSION_KEY = "tsTharunDemoSession";

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const profile = document.getElementById("profile-details");
const tabs = document.getElementById("account-tabs");
const message = document.getElementById("account-message");

function users() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
    } catch {
        return {};
    }
}

function showMessage(text) {
    message.textContent = text;
}

function showForm(type) {
    loginForm.hidden = type !== "login";
    signupForm.hidden = type !== "signup";

    document.getElementById("login-tab")
        .classList.toggle("selected", type === "login");
    document.getElementById("signup-tab")
        .classList.toggle("selected", type === "signup");

    document.getElementById("account-title").textContent =
        type === "login" ? "Welcome Back" : "Create Your Account";

    showMessage("");
}

document.getElementById("login-tab").onclick = () => showForm("login");
document.getElementById("signup-tab").onclick = () => showForm("signup");

function showProfile(user) {
    loginForm.hidden = true;
    signupForm.hidden = true;
    tabs.hidden = true;
    profile.hidden = false;

    document.getElementById("account-title").textContent = "My Account";
    document.getElementById("profile-name").textContent = "Name: " + user.name;
    document.getElementById("profile-email").textContent = "Email: " + user.email;
    document.getElementById("profile-phone").textContent = "Phone: " + user.phone;
}

async function hashPassword(email, password) {
    const input = new TextEncoder().encode(email + ":" + password);
    const hash = await crypto.subtle.digest("SHA-256", input);

    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

signupForm.addEventListener("submit", async event => {
    event.preventDefault();

    if (!crypto.subtle) {
        showMessage("Use HTTPS or VS Code Live Server.");
        return;
    }

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim().toLowerCase();
    const phone = document.getElementById("signup-phone").value.trim();
    const password = document.getElementById("signup-password").value;

    const data = users();

    if (data[email]) {
        showMessage("This email already exists. Please log in.");
        return;
    }

    data[email] = {
        name,
        email,
        phone,
        hash: await hashPassword(email, password)
    };

    localStorage.setItem(USERS_KEY, JSON.stringify(data));

    sessionStorage.setItem(SESSION_KEY, email);
    showProfile(data[email]);
    showMessage("Demo account created successfully.");
    signupForm.reset();
});

loginForm.addEventListener("submit", async event => {
    event.preventDefault();

    if (!crypto.subtle) {
        showMessage("Use HTTPS or VS Code Live Server.");
        return;
    }

    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;
    const user = users()[email];

    if (!user || user.hash !== await hashPassword(email, password)) {
        showMessage("Invalid email or password.");
        return;
    }

    sessionStorage.setItem(SESSION_KEY, email);
    showProfile(user);
    showMessage("Logged in successfully.");
    loginForm.reset();
});

document.getElementById("logout-btn").addEventListener("click", () => {
    sessionStorage.removeItem(SESSION_KEY);

    profile.hidden = true;
    tabs.hidden = false;
    document.getElementById("account-title").textContent = "Welcome Back";

    showForm("login");
    showMessage("You have signed out.");
});

(function restoreLogin() {
    const email = sessionStorage.getItem(SESSION_KEY);
    const user = email ? users()[email] : null;

    if (user) showProfile(user);
})();
