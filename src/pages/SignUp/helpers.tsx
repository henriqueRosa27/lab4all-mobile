type FormData = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const rules = {
  name: {
    required: "Campo obrigatório",
    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
    maxLength: { value: 20, message: "Máximo de 20 caracteres" }
  },
  surname: {
    required: "Campo obrigatório",
    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
    maxLength: { value: 50, message: "Máximo de 50 caracteres" }
  },
  email: {
    required: "Campo obrigatório",
    maxLength: { value: 50, message: "Máximo de 50 caracteres" },
    pattern: {
      value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      message: "E-mail inválido"
    }
  },
  password: {
    required: "Campo obrigatório",
    minLength: { value: 8, message: "Mínimo de 8 caracteres" },
    maxLength: { value: 16, message: "Máximo de 16 caracteres" }
  }
};

export { rules };

export type { FormData };
