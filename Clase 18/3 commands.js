db.createUser(
    {
        user: "encargado",
        pwd: "qwerty123",
        roles: [
            { role: "readWrite", db: "empresa"}
        ]
    }
)