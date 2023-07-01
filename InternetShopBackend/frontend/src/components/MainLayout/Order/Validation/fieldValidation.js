import * as Yup from 'yup';

export default Yup.object({
    name: Yup.string().required("Поле не може бути пустим!"),
    surname: Yup.string().required("Поле не може бути пустим!"),
    parentName: Yup.string().required("Поле не може бути пустим!"),
    phoneNumber: Yup.string().required("Поле не може бути пустим!").matches(/^\+38 \(([0-9]){3}\) ([0-9]){3} [0-9]{2} [0-9]{2}$/, "Введіть номер телефону коректно"),
    email: Yup.string().required("Поле не може бути пустим!").email("Введіть email коректно"),
    post: Yup.string().required("Поле не може бути пустим!"),
});