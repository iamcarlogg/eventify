document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector("#register_form");

    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        const fullName = document.querySelector("#fname").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const confirmPassword = document.querySelector("#confirm-password").value;

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            
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
                console.log("User registered successfully!");
                // Redirigir a la página de inicio de sesión o realizar alguna acción
                setTimeout(() => {
                    window.location.href = "/src/Login/login.html";
                }, 2000);
            } else {
                // Manejar errores de registro
                console.error("Error:", data.message);
                
            }
        } catch (error) {
            console.error("Error:", error);
            
        }
    });
});