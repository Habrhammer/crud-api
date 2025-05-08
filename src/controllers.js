export const getUsers = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'getUsers stub' }));
};

export const createUser = (req, res, data) => {
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'createUser stub', data }));
};

export const getUserById = (req, res, userId) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'getUserById stub', userId }));
};

export const updateUser = (req, res, userId, data) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'updateUser stub', userId, data }));
};

export const deleteUser = (req, res, userId) => {
  res.writeHead(204);
  res.end();
};
