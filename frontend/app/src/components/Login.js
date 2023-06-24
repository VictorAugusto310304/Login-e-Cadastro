import {Formik, Form, Field, ErrorMessage} from "formik";
import axios from "axios";
import * as yup from "yup";

function Login(){

    const handleClickLogin = (values) => {
        axios.post("http://localhost:3000/login", {
            email: values.email,
            password: values.password
        }).then((response)=>{
            console.log(response);
        })
    };

    const validationLogin = yup.object().shape({
        email: yup.string().email("Email inválido").required("Este campo é obrigatório"),
        password: yup.string().min(8, "A senha deve conter no mínimo 8 caracteres").required("Este campo é obrigatório"),
    });

    return(
        <div className="login-form-wrap">
                <div>
                    <h2>Login</h2>
                    <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
                        <Form className="login-form">
                            <div className="login-form-group">
                                <Field type="email" name="email" className="form-field" placeHolder="Email"/>
                                <ErrorMessage component="span" name="email" className="form-error"/>
                            </div>
                            <div className="login-form-group">
                                <Field type="password" name="password" className="form-field" placeHolder="Senha"/>
                                <ErrorMessage component="span" name="password" className="form-error"/>
                            </div>
                            <button className="btn" type="submit">Login</button>
                        </Form>
                    </Formik>
                </div>
        </div>
    )
}

export default Login