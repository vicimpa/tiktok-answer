import { io } from "socket.io-client";
import { proxy } from "valtio";




export const giftCounts = proxy({} as { [key: string]: number; });

const connection = io('http://localhost:999', { query: { userId: prompt('Введите ник стрима') } });

connection.on('new_data', data => {
  for (let key in data) {
    giftCounts[key] = data[key];
  }
});

connection.on('error', error => {
  alert('Какая-то хрень! Обновите страницу!');
});