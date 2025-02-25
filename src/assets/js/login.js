import { signInWithEmailAndPassword, signInWithGoogle } from '../services/supabase.js';

const form = document.getElementById('login-form');
const googleLoginButton = document.getElementById('google-login');
const registerLink = document.getElementById('register-link');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const { user, error } = await signInWithEmailAndPassword(email, password);
    if (error) {
      // Manejo de errores de autenticación
      console.error('Error al iniciar sesión:', error.message);
      // Mostrar mensaje de error al usuario (puedes usar un elemento en el DOM)
    } else {
      // Redireccionar al usuario a la página principal o realizar otras acciones
      console.log('Inicio de sesión exitoso:', user);
      // Ocultar el formulario de login y mostrar la sección de búsqueda
      document.getElementById('login-container').style.display = 'none';
      document.getElementById('search-container').style.display = 'block';
    }
  } catch (error) {
    console.error('Error inesperado:', error);
    // Mostrar mensaje de error genérico al usuario
  }
});

googleLoginButton.addEventListener('click', async () => {
  try {
    const user = await signInWithGoogle();
    // Redireccionar al usuario a la página principal o realizar otras acciones
    console.log('Inicio de sesión con Google exitoso:', user);
    // Ocultar el formulario de login y mostrar la sección de búsqueda
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('search-container').style.display = 'block';
  } catch (error) {
    // Manejo de errores de autenticación con Google
    console.error('Error al iniciar sesión con Google:', error.message);
    // Mostrar mensaje de error al usuario
  }
});

registerLink.addEventListener('click', () => {
  // Implementar la lógica para mostrar el formulario de registro
  // Puedes usar un formulario similar al de login o redirigir a otra página
});