const express = require("express");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));

const users = [{ username: "fgp555", password: "Electron5.pe" }];
const loginAttempts = {}; // Objeto para mantener un registro de los intentos de inicio de sesión por dirección IP

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "/private/login.html"));
});

app.post("/admin", (req, res) => {
  const ip = req.ip; // Obtener la dirección IP del cliente
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  // Verificar si ya ha excedido el límite de intentos por IP
  if (loginAttempts[ip] >= 3 && Date.now() - loginAttempts[ip + "_timestamp"] < 30 * 60 * 1000) {
    return res.send("Por favor, espera 30 minutos antes de intentarlo de nuevo.");
  }

  if (user) {
    // Restablecer el contador de intentos si el inicio de sesión es exitoso
    loginAttempts[ip] = 0;
    const adminPath = path.join(__dirname, "private", "admin.html");
    res.sendFile(adminPath);
  } else {
    // Incrementar el contador de intentos si el inicio de sesión falla
    loginAttempts[ip] = (loginAttempts[ip] || 0) + 1;
    loginAttempts[ip + "_timestamp"] = Date.now();
    res.send("Inicio de sesión fallido");
  }
  console.log(loginAttempts)
});

app.listen(4000, () => {
  console.log("Servidor escuchando en el puerto 4000");
});
