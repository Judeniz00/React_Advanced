import { ThunkDispatch } from "redux-thunk";

// Kategori durumu için gerekli olan veri yapısı
export interface CategoryState {
  data: Category[]; // Kategorilere ait veri dizisi
  loading: boolean; // Yükleme durumu
  error: string; // Hata durumu
}

// Kategori veri yapısı
export interface Category {
  id: number; // Kategori kimliği
  name: string; // Kategori adı
  type: "expense" | "income"; // Kategori tipi: gider veya gelir
  color: string; // Kategori rengi
}

// Kategori ekleme veya güncelleme için kullanılan form yapısı
export interface CategoryForm {
  name: string; // Kategori adı
  type: "income" | "expense"; // Kategori tipi: gider veya gelir
  color?: string; // Opsiyonel: Kategori rengi
}
// Kategori eylemlerine ait belirli eylem türleri (action types)
interface GET_START {
  type: "GET_CATEGORIES_START"; // Kategorileri alma işlemi başladı
}

interface GET_SUCCESS {
  type: "GET_CATEGORIES_SUCCESS"; // Kategorileri alma işlemi başarılı
  payload: Category[]; // Alınan kategori verileri
}

interface GET_ERROR {
  type: "GET_CATEGORIES_ERROR"; // Kategorileri alma işlemi hata verdi
}

// ... (ADD, UPDATE, DELETE için benzer eylem türleri)
interface ADD_START {
  type: "ADD_CATEGORY_START";
}

interface ADD_SUCCESS {
  type: "ADD_CATEGORY_SUCCESS";
  payload: Category;
}

interface ADD_ERROR {
  type: "ADD_CATEGORY_ERROR";
}

interface UPDATE_START {
  type: "UPDATE_CATEGORY_START";
}

interface UPDATE_SUCCESS {
  type: "UPDATE_CATEGORY_SUCCESS";
  payload: Category;
}

interface UPDATE_ERROR {
  type: "UPDATE_CATEGORY_ERROR";
}

interface DELETE_START {
  type: "DELETE_CATEGORY_START";
}

interface DELETE_SUCCESS {
  type: "DELETE_CATEGORY_SUCCESS";
  payload: number;
}

interface DELETE_ERROR {
  type: "DELETE_CATEGORY_ERROR";
}
// Tüm kategori eylem türlerini birleştiren bir tür (union type)
export type CategoryAction =
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
  
// Kategori eylemlerini yönetmek için bir dispatch türü oluşturuluyor
export type CategoryDispatch = ThunkDispatch<
  CategoryState,
  void,
  CategoryAction
>;
