import http from "k6/http";
import { sleep } from "k6";

export default function() {
  http.get(`http://localhost:3003/${Math.floor(Math.random()* 10000000)}`);
  sleep(1);
  // const url = 'http://localhost:3003/header';
  // const payload = JSON.stringify({ title: "POST RESTaurant", claimed: "True", price:"1", category: "Diner" });
  // const params = { headers: { "Content-Type": "application/json" } };
  // http.post(url, payload, params);
};
