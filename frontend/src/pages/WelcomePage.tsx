import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm';
import './WelcomePage.css'
const WelcomePage = () => {

  const handleSuccess = () => {
    // redirect or update app state here
    console.log('authenticated, token saved');
  };

  return (
    <section className="welcome-page">
      <div className="back-grid" />
      <div className="subtle-line" />
      <div className="corner-tr" />
      <div className="corner-tl" />
      <div className="corner-br" />
      <div className="corner-bl" />
      <section className="hero">
        < RegisterForm onSuccess={handleSuccess} />
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
