//Función tipica barrita midiendo como de segura es la contraseña

function checkStrength(password) {
    let strengthBar = document.getElementById("strength-bar");
    let strengthText = document.getElementById("strength-text");
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[\W]/)) strength++;

    let percentage = (strength / 5) * 100;
    strengthBar.style.width = percentage + "%";

    let colors = ["red", "orange", "yellow", "blue", "green"];
    let texts = ["Muy débil", "Débil", "Regular", "Fuerte", "Muy fuerte"];

    strengthBar.style.background = colors[strength - 1] || "lightgray";
    strengthText.textContent = texts[strength - 1] || "";
}
