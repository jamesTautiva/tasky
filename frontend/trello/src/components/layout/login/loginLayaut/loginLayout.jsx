import { useState } from 'react';
import axios from 'axios';  // Asegúrate de importar axios
import './loginLayout.css';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player'
import Video from '../../../../assets/video.mp4'

export const LoginLayout = () => {
  const navigate = useNavigate()
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nameUser: '',
    phone: ''
  });
  const [error, setError] = useState('');

  const handleSignUpClick = () => {
    setShowRegister(true);
  };

  const handleLoginClick = () => {
    setShowRegister(false);
  };

  // Manejar los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario de login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email: formData.email,
        passwordUser: formData.password
      });
      const onLogin = (e) => {
        e.preventDefault();
      }


      console.log('Login exitoso:', response.data);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('Id', JSON.stringify(response.data.user.id));
      localStorage.setItem('name', JSON.stringify(response.data.user.name));


      navigate('/dashboard', {
        replace: true,
        state: {
          logged: true,
          user: response.data.user,
          token: response.data.token,
          id: response.data.user.id
          
        }
      });
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Credenciales incorrectas.');
      //
    }
  };

  // Manejar el envío del formulario de registro
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users', {
        nameUser: formData.nameUser,
        email: formData.email,
        passwordUser: formData.password,
        phone: formData.phone
      });
      console.log('Registro exitoso:', response.data);
      alert('Registro exit')
      // Redirige o actualiza la UI como desees
    } catch (error) {
      console.error('Error en el registro:', error);
      setError('Hubo un error al registrar el usuario.');
    }
  };

  return (

    <section className="container-log">
      <div className='video-login'>
        <ReactPlayer
          url={Video}
          playing={true}
          loop={true}
          className="video"
          width='100%'
          height='100%'
        />
      </div>
      {/* Formulario de registro */}
      <div className={`cards ${showRegister ? 'show-register' : ''}`}>
        <form onSubmit={handleRegisterSubmit}>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Name"
            name="nameUser"
            value={formData.nameUser}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Sign Up</button>
          {error && <p className="error">{error}</p>}
          <p>
            Already have an account? <a href="#" onClick={handleLoginClick}>Login</a>
          </p>
        </form>
      </div>

      {/* Formulario de login */}
      <div className={`cards ${!showRegister ? 'show-login' : ''}`}>
        <form onSubmit={handleLoginSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
          <p>
            Don't have an account? <a href="#" onClick={handleSignUpClick}>Sign Up</a>
          </p>
        </form>
      </div>
    </section>
  );
};
