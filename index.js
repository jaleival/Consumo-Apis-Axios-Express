// Ejercicio de axios APIs y Express JS para obtener datos de 10 usuarios aleatorios 
// y mostrarlos en una página web con HTML.
import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://randomuser.me/api/?results=10");
    const usersData = response.data.results;

    let usersHTML = "<h1><center>Lista de 10 Usuarios aleatorios:</center></h1>";
    usersData.forEach((user) => {
      usersHTML += `
                <div>
                    <h2>Nombre: ${user.name.first} ${user.name.last}</h2>
                    <img src="${user.picture.large}" alt="User Image">
                    <p>Email: ${user.email}</p>
                    <p>Genero: ${user.gender}</p>
                    <p>Pais: ${user.location.country}</p>
                    <hr>
                </div>
            `;
    });

    res.send(usersHTML);
  } catch (error) {
    console.error("Error fetching random users:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});