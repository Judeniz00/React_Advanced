/*
Redux uygulamasında kayıtların alınması, ekleme, güncelleme ve silinmesi için gereken işlemlerin yapıldığı yer. 
Her bir eylem, ilgili işlem başladığında, başarılı olduğunda veya hata aldığında ilgili eylem türünü Redux store'a gönderir. 
Bu sayede Redux store'daki durum güncellenir ve UI (kullanıcı arayüzü) bu değişikliklere tepki verebilir.
*/


import { Record, RecordDispatch, RecordForm } from "../../types/record";
import api from "../../utils/api";

// Kayıt verilerini almak için bir istek gönderen eylem
export const getRecords = () => async (dispatch: RecordDispatch) => {
  dispatch({ type: "GET_RECORDS_START" }); // Kayıt alımının başladığını belirten eylem
  try {
    const response = await api().get<Record[]>("/records"); // Kayıt verilerini API'den GET isteğiyle alır
    response.data.sort((a, b) => b.id - a.id); // Alınan kayıtları id'ye göre azalan sırayla sıralar
    dispatch({ type: "GET_RECORDS_SUCCESS", payload: response.data }); // Başarılı alımı redux store'a bildiren eylem
  } catch {
    dispatch({ type: "GET_RECORDS_ERROR" }); // Kayıt alımı sırasında hata olduğunu redux store'a bildiren eylem
  }
};

// Yeni bir kayıt eklemek için bir istek gönderen eylem
export const addRecord = (form: RecordForm) => async (dispatch: RecordDispatch) => {
  dispatch({ type: "ADD_RECORD_START" }); // Kayıt ekleme işleminin başladığını belirten eylem
  try {
    const response = await api().post<Record>("/records", form); // Yeni kaydı API'ye POST isteğiyle ekler
    dispatch({ type: "ADD_RECORD_SUCCESS", payload: response.data }); // Başarılı ekleme işlemini redux store'a bildiren eylem
  } catch {
    dispatch({ type: "ADD_RECORD_ERROR" }); // Kayıt ekleme sırasında hata olduğunu redux store'a bildiren eylem
  }
};

// Mevcut bir kaydı güncellemek için bir istek gönderen eylem
export const updateRecord = (form: RecordForm, id: Record["id"]) => async (
  dispatch: RecordDispatch
) => {
  dispatch({ type: "UPDATE_RECORD_START" }); // Kayıt güncelleme işleminin başladığını belirten eylem
  try {
    const response = await api().put<Record>("/records/" + id, form); // Kaydı güncellemek için PUT isteği gönderir
    dispatch({ type: "UPDATE_RECORD_SUCCESS", payload: response.data }); // Başarılı güncelleme işlemini redux store'a bildiren eylem
  } catch {
    dispatch({ type: "UPDATE_RECORD_ERROR" }); // Kayıt güncelleme sırasında hata olduğunu redux store'a bildiren eylem
  }
};

// Bir kaydı silmek için bir istek gönderen eylem
export const deleteRecord = (id: Record["id"]) => async (
  dispatch: RecordDispatch
) => {
  dispatch({ type: "DELETE_RECORD_START" }); // Kayıt silme işleminin başladığını belirten eylem
  try {
    await api().delete("/records/" + id); // Kaydı silmek için DELETE isteği gönderir
    dispatch({ type: "DELETE_RECORD_SUCCESS", payload: id }); // Başarılı silme işlemini redux store'a bildiren eylem
  } catch {
    dispatch({ type: "DELETE_RECORD_ERROR" }); // Kayıt silme sırasında hata olduğunu redux store'a bildiren eylem
  }
};
