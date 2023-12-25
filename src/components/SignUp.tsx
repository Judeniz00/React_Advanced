import { Form, Input, Button } from "antd"; // Ant Design'den Form, Input ve Button bileşenleri import ediliyor
import { useHistory } from "react-router-dom"; // React Router'dan useHistory hook'u import ediliyor

import api from "../utils/api"; // Proje içindeki api dosyası import ediliyor
import showError from "../utils/showError"; // Proje içindeki showError fonksiyonu import ediliyor

function SignUp() {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }; // Form layout yapısı tanımlanıyor

  const validateMessages = {
    required: "${label} is required!", // Zorunlu alanlara ilişkin hata mesajı
    types: {
      email: "${label} is not a valid email!", // Geçersiz email formatı hatası
      number: "${label} is not a valid number!", // Geçersiz sayı formatı hatası
    },
    number: {
      range: "${label} must be between ${min} and ${max}", // Belirtilen aralıkta sayı olması gerektiği hatası
    },
  }; // Formun hata mesajları tanımlanıyor

  const history = useHistory(); // useHistory hook'u kullanarak tarayıcı geçmişi işlemleri için history nesnesi alınıyor

  const onFinish = async (values: any) => {
    try {
      await api().post("/users/register", values); // API kullanarak kullanıcı kaydı oluşturma isteği yapılıyor
      history.push("/login", { newSignUp: true }); // Kullanıcı kaydı başarılıysa "/login" sayfasına yönlendiriliyor ve yeni kayıt yapıldığı bilgisi gönderiliyor
    } catch (error) {
      console.log({ error }); // Hata oluştuğunda hata konsola yazdırılıyor
      showError((error as any).response.data.errorMessage); // showError fonksiyonuyla kullanıcıya hatayı gösteren bir mesaj görüntüleniyor
    }
  }; // Form submit işlemi sonrası çalışacak fonksiyon

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      {/* Formun başlık kısmı */}
      <h2 style={{ textAlign: "center", marginBottom: 40 }}>
        Register for an account
      </h2>
      {/* Kullanıcı adı alanı */}
      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      {/* Şifre alanı */}
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!", min: 6 },
        ]}
      >
        <Input.Password />
      </Form.Item>
      {/* Email alanı */}
      <Form.Item
        name="email"
        label="Email"
        rules={[{ type: "email", required: true }]}
      >
        <Input />
      </Form.Item>
      {/* Tam ad alanı */}
      <Form.Item name="full_name" label="Full Name">
        <Input />
      </Form.Item>
      {/* Submit butonu */}
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignUp;
