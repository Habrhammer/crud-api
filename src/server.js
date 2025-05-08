import http from "http";
import dotenv from "dotenv";
import { parse } from "url";
import * as controllers from "./controllers.js";

dotenv.config();
console.log(process.env.PORT);
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (!pathname.startsWith("/api/users")) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
    return;
  }

  const pathParts = pathname.split("/").filter((part) => part !== "");

  switch (pathParts.length) {
    case 2:
      switch (req.method) {
        case "GET":
          controllers.getUsers(req, res);
          break;
        case "POST": {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => {
            try {
              const data = JSON.parse(body);
              controllers.createUser(req, res, data);
            } catch (e) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Invalid JSON" }));
            }
          });
          break;
        }
        default:
          res.writeHead(405, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Method Not Allowed" }));
          break;
      }
      break;

    case 3:
      const userId = pathParts[2];
      switch (req.method) {
        case "GET":
          controllers.getUserById(req, res, userId);
          break;
        case "PUT": {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => {
            try {
              const data = JSON.parse(body);
              controllers.updateUser(req, res, userId, data);
            } catch (e) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Invalid JSON" }));
            }
          });
          break;
        }
        case "DELETE":
          controllers.deleteUser(req, res, userId);
          break;
        default:
          res.writeHead(405, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Method Not Allowed" }));
          break;
      }
      break;

    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Not Found" }));
      break;
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export default server;
