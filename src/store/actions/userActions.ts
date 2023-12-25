import { LoginForm, User, UserDispatch } from "../../types/user"; // Kullanılan türleri import ediyoruz.
import api from "../../utils/api"; // API fonksiyonunu import ediyoruz.

// Kullanıcı girişini yöneten eylem yaratıcı fonksiyonu
export const login = (creds: LoginForm) => async (dispatch: UserDispatch) => {
  dispatch({ type: "LOGIN_START" }); // Giriş başladığında eylemi tetikler.

  try {
    const response = await api().post<User>("/users/login", creds); // API üzerinden kullanıcı girişi yapar.
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data }); // Başarılı giriş durumunda eylemi tetikler ve kullanıcı verisini gönderir.
    localStorage.setItem("token", response.data.token); // Kullanıcıya ait token'i yerel depolamada saklar.
  } catch {
    dispatch({ type: "LOGIN_ERROR" }); // Girişte hata olursa hata eylemini tetikler.
  }
};

// Kullanıcının oturum durumunu kontrol eden eylem yaratıcı fonksiyonu
export const isLoggedIn = () => async (dispatch: UserDispatch) => {
  dispatch({ type: "IS_LOGGED_IN_START" }); // Oturum kontrolü başladığında eylemi tetikler.

  try {
    const response = await api().post<User>("/users/is_logged_in"); // API üzerinden oturum durumunu kontrol eder.
    dispatch({ type: "IS_LOGGED_IN_SUCCESS", payload: response.data }); // Oturum durumu kontrolünde başarılıysa eylemi tetikler ve kullanıcı verisini gönderir.
  } catch {
    dispatch({ type: "IS_LOGGED_IN_ERROR" }); // Oturum durumu kontrolünde hata olursa hata eylemini tetikler.
  }
};

// Kullanıcı çıkışını yöneten eylem yaratıcı fonksiyonu
export const logout = () => (dispatch: UserDispatch) => {
  localStorage.removeItem("token"); // Kullanıcıya ait token'i yerel depolamadan kaldırır.
  dispatch({ type: "LOGOUT" }); // Çıkış eylemini tetikler.
};
