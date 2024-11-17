document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector("#register_form");
    const errorMessage = document.querySelector("#error-message");
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        const fullName = document.querySelector("#fname").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const confirmPassword = document.querySelector("#confirm-password").value;
        errorMessage.textContent = "";
        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match";
            return;
        }
        // Validar que los campos no estén vacíos
        if (!fullName || !email || !password || !confirmPassword) {
            errorMessage.textContent = "All fields are required.";
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorMessage.textContent = "Invalid email format.";
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fullName, email, password, role: "usuario" })
            });

            const data = await response.json();

            if (response.ok) {
                // Mostrar mensaje de éxito
                alert("User registered successfully!");
                console.log("User registered successfully!");
                // Redirigir a la página de inicio de sesión o realizar alguna acción
                setTimeout(() => {
                    window.location.href = "/src/Login/login.html";
                }, 2000);
            } else {
                // Manejar errores de registro
                errorMessage.textContent = data.message;
                console.error("Error:", data.message);
                
            }
        } catch (error) {
            console.error("Error:", error);
            errorMessage.textContent = "An error occurred. Please try again later.";
            
        }
    });
});