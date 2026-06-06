import LoginForm from '../components/LoginForm'
import Logo from '../components/Logo';
import './WelcomeRegister.css'
import { useNavigate } from 'react-router-dom';
const WelcomePage = () => {
	const navigate = useNavigate();

	const handleSuccess = () => {
		navigate('/dashboard', { replace: true });
	};

	return (
		<section className="welcome-page">
			<div className="back-grid" />
			<div className="subtle-line" />
			<div className="corner-tr" />
			<div className="corner-tl" />
			<div className="corner-br" />
			<div className="corner-bl" />
			<Logo />
			<section className="hero">
				<div className="hero-text">
					<div className="hero-eyebrow">Job application tracker</div>
					<h1 className="hero-h1">Every opportunity, <em>crafted</em> with intention.</h1>
					<p className="hero-body">Track applications, manage follow-ups, and move through your search with clarity</p>
					<div className="feat-list">
						<div className="feat"><div className="feat-dot"></div>Pipeline overview at a glance</div>
						<div className="feat"><div className="feat-dot"></div>Status tracking &amp; reminders</div>
						<div className="feat"><div className="feat-dot"></div>Notes &amp; contacts per role</div>
					</div>
				</div>
				<div className="footer-hero">Crafted with intention &nbsp;·&nbsp; 13 Software Studio</div>
			</section>

			<section className='login'>
				<div className="screen-label">Welcome</div>
				< LoginForm onSuccess={handleSuccess}
				/>
			</section>
		</section>
	)
}

export default WelcomePage
