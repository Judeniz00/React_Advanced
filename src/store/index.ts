import { combineReducers } from "redux";
//Dosyalar
import { CategoryState } from "../types/category";
import { RecordState } from "../types/record";
import { UserState } from "../types/user";
//Dosyalar
import categoryReducer from "./reducers/categoryReducer";
import recordReducer from "./reducers/recordReducer";
import userReducer from "./reducers/userReducer";

//bir Redux uygulamasında kullanılan birkaç farklı reducer'ı birleştirip bir root reducer oluşturma.
export interface AppState {
  user: UserState;          // Kullanıcı durumunu temsil eden veri yapısı
  categories: CategoryState; // Kategorilerin durumunu temsil eden veri yapısı
  records: RecordState;      // Kayıtların durumunu temsil eden veri yapısı
}

// birden fazla reducer'ı bir araya getirerek tek bir root reducer oluşturuyoruz.
const rootReducer = combineReducers<AppState>({
  user: userReducer,          // Kullanıcı durumu için userReducer'ı kullan
  categories: categoryReducer, // Kategori durumu için categoryReducer'ı kullan
  records: recordReducer,      // Kayıt durumu için recordReducer'ı kullan
});


export default rootReducer;
