import axios from "axios";

export default () => {
  // Bu satır, tarayıcının yerel depolama alanından "token" adlı bir öğeyi alır. 
  // Genellikle bu tür tokenler, kullanıcının oturumunu doğrulamak veya kimlik doğrulaması yapmak için kullanılır.
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://expensetracker-be.herokuapp.com",
    headers: {
      Authorization: token,
    },
  });
};
