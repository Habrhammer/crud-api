import { v4, validate } from 'uuid';

const users = [];

export const getUsers = async (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(users));
};

export const createUser = async (req, res, body) => {
  const { username, age, hobbies } = body;

  if (
    !username ||
    typeof username !== "string" ||
    age === undefined ||
    typeof age !== "number" ||
    (hobbies && !Array.isArray(hobbies))
  ) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid user data" }));
    return;
  }

  const newUser = {
    id: v4(),
    username,
    age,
    hobbies: Array.isArray(hobbies) ? hobbies : [],
  };

  users.push(newUser);

  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newUser));
};

export const getUserById = async (req, res, userId) => {
  if (!validate(userId)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid user ID" }));
    return;
  }

  const user = users.find((u) => u.id === userId);
  if (!user) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User not found" }));
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
};

export const updateUser = async (req, res, userId, body) => {
  if (!validate(userId)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid user ID" }));
    return;
  }

  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User not found" }));
    return;
  }

  const { username, age, hobbies } = body;
  if (
    !username ||
    typeof username !== "string" ||
    age === undefined ||
    typeof age !== "number" ||
    (hobbies && !Array.isArray(hobbies))
  ) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid user data" }));
    return;
  }

  const updatedUser = {
    id: userId,
    username,
    age,
    hobbies: Array.isArray(hobbies) ? hobbies : [],
  };

  users[userIndex] = updatedUser;

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(updatedUser));
};

export const deleteUser = async (req, res, userId) => {
  if (!validate(userId)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid user ID" }));
    return;
  }

  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User not found" }));
    return;
  }

  users.splice(userIndex, 1);

  res.writeHead(204);
  res.end();
};
