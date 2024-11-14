const Role = require("../models/role.model");

async function create(req, res, body) {
    try {
        const role = new Role(body);
        await role.save();
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Role created successfully", role }));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Error creating role", error }));
    }
    }

async function getAll(req, res) {
    try {
        const roles = await Role.find();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                roles
            })
        );
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Error fetching roles", error }));
    }
}

    module.exports = { create, getAll};