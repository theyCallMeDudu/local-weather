import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake, faCloudShowersHeavy, faMoon, faSmog } from '@fortawesome/free-solid-svg-icons';

// Mapeie os códigos de condições meteorológicas para os ícones
const weatherIcons = {
  '01d': faSun,          // Dia limpo
  '01n': faMoon,         // Noite limpa
  '02d': faCloud,        // Poucas nuvens durante o dia
  '02n': faCloud,        // Poucas nuvens durante a noite
  '03d': faCloud,        // Nuvens dispersas durante o dia
  '03n': faCloud,        // Nuvens dispersas durante a noite
  '04d': faCloud,        // Nuvens quebradas durante o dia
  '04n': faCloud,        // Nuvens quebradas durante a noite
  '09d': faCloudRain,    // Chuva leve durante o dia
  '09n': faCloudRain,    // Chuva leve durante a noite
  '10d': faCloudRain,    // Chuva moderada durante o dia
  '10n': faCloudRain,    // Chuva moderada durante a noite
  '11d': faCloudShowersHeavy, // Tempestades durante o dia
  '11n': faCloudShowersHeavy, // Tempestades durante a noite
  '13d': faSnowflake,    // Neve durante o dia
  '13n': faSnowflake,    // Neve durante a noite
  '50d': faSmog,         // Neblina durante o dia
  '50n': faSmog          // Neblina durante a noite
};

// Componente React que renderiza o ícone com base no código de condição meteorológica
const WeatherIcon = ({ code }) => {
  return <FontAwesomeIcon icon={weatherIcons[code]} />;
};

export default WeatherIcon;
