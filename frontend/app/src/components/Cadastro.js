import {Formik, Form, Field, ErrorMessage} from "formik";
import axios from "axios";
import * as yup from "yup";

function Cadastro(){

    const handleClickRegister = (values) => {
        axios.post("http://localhost:3000/cadastrar", {
            email: values.email,
            password: values.password
        }).then((response)=>{
            console.log(response)
        })
    };

    const validationRegister = yup.object().shape({
        email: yup.string().email("Email inválido").required("Este campo é obrigatório"),
        password: yup.string().min(8, "A senha deve conter no mínimo 8 caracteres").required("Este campo é obrigatório"),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Senhas diferentes").required("Este campo é obrigatório")
    });

    return(
        <div className="login-form-wrap">
            <h2>Cadastro</h2>
            <Formik initialValues={{}} onSubmit={handleClickRegister} validationSchema={validationRegister}>
                <Form className="login-form">
                    <div className="login-form-group">
                        <Field type="email" name="email" className="form-field" placeHolder="Email"/>
                        <ErrorMessage component="span" name="email" className="form-error"/>
                    </div>
                    <div className="login-form-group">
                        <Field type="password" name="password" className="form-field" placeHolder="Senha"/>
                        <ErrorMessage component="span" name="password" className="form-error"/>
                    </div>
                    <div className="login-form-group">
                        <Field type="password" name="confirmPassword" className="form-field" placeHolder="Confirme sua Senha"/>
                        <ErrorMessage component="span" name="confirmPassword" className="form-error"/>
                    </div>
                    <button className="btn" type="submit">Cadastro</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Cadastro