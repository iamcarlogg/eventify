

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("#login-form");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        const email = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        function setCookie(name, value, days)
        {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "")  + expires + "; path=/";
        };

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar el token en el almacenamiento local o en una cookie
                setCookie("token", data.token, 1);
                localStorage.setItem("token", data.token);
                
                
                // Redirigir a otra página o realizar alguna acción.
                if (data.role === "admin") {
                    window.location.href = "../dashboard/dashboard_admin.html";
                    
                }
                if(data.role==="superAdmin"){
                    window.location.href = "../dashboard/dashboard_supadmin.html";
                }
                if(data.role==="usuario"){
                    window.location.href = "../dashboard/dashboard_user.html";
                };
                
                
            } else {
                // Manejar errores de autenticación
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    });
});