import { ThunkDispatch } from "redux-thunk";
import { Category } from "./category";

// Kayıt (record) durumu için gerekli olan veri yapısı
export interface RecordState {
  data: Record[]; // Kayıtlara ait veri dizisi
  loading: boolean; // Yükleme durumu
  error: string; // Hata durumu
}

// Kayıt (record) veri yapısı
export interface Record {
  id: number; // Kayıt kimliği
  title: string; // Kayıt başlığı
  amount: number; // Kayıt miktarı
  createdAt: string; // Oluşturulma tarihi
  updatedAt: string; // Güncellenme tarihi
  category: Category; // Kategoriye ait bilgiler
}

// Kayıt (record) ekleme veya güncelleme için kullanılan form yapısı
export interface RecordForm {
  title: string; // Kayıt başlığı
  amount: number; // Kayıt miktarı
  category_id: number; // Kategori kimliği
}

// Kayıt (record) eylemlerine ait belirli eylem türleri (action types)
interface GET_START {
  type: "GET_RECORDS_START"; // Kayıtları alma işlemi başladı
}

interface GET_SUCCESS {
  type: "GET_RECORDS_SUCCESS"; // Kayıtları alma işlemi başarılı
  payload: Record[]; // Alınan kayıt verileri
}

interface GET_ERROR {
  type: "GET_RECORDS_ERROR"; // Kayıtları alma işlemi hata verdi
}

interface ADD_START {
  type: "ADD_RECORD_START";
}

interface ADD_SUCCESS {
  type: "ADD_RECORD_SUCCESS";
  payload: Record;
}

interface ADD_ERROR {
  type: "ADD_RECORD_ERROR";
}

interface UPDATE_START {
  type: "UPDATE_RECORD_START";
}

interface UPDATE_SUCCESS {
  type: "UPDATE_RECORD_SUCCESS";
  payload: Record;
}

interface UPDATE_ERROR {
  type: "UPDATE_RECORD_ERROR";
}

interface DELETE_START {
  type: "DELETE_RECORD_START";
}

interface DELETE_SUCCESS {
  type: "DELETE_RECORD_SUCCESS";
  payload: Record["id"];
}

interface DELETE_ERROR {
  type: "DELETE_RECORD_ERROR";
}

// Tüm kayıt (record) eylem türlerini birleştiren bir tür (union type)
export type RecordAction =
  | GET_START
  | GET_SUCCESS
  | GET_ERROR
  | ADD_START
  | ADD_SUCCESS
  | ADD_ERROR
  | UPDATE_START
  | UPDATE_SUCCESS
  | UPDATE_ERROR
  | DELETE_START
  | DELETE_SUCCESS
  | DELETE_ERROR;

// Kayıt (record) eylemlerini yönetmek için bir dispatch türü oluşturuluyor
export type RecordDispatch = ThunkDispatch<RecordState, void, RecordAction>;
