import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
import './WelcomeRegister.css'
const RegisterPage = () => {

	const navigate = useNavigate();

	const handleSuccess = () => {
		navigate('/dashboard', { replace: true });
	};

	return (
		<div className="register-page">
			<div className="back-grid" />
			<div className="corner-tr" />
			<div className="corner-tl" />
			<div className="corner-br" />
			<div className="corner-bl" />
			<RegisterForm onSuccess={handleSuccess} />
		</div>
	);
}

export default RegisterPage;
