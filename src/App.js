import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import './App.css';
import WeatherIcon from './components/WeatherIcon/WeatherIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faEnvelope, faGlobe, faSitemap, faTemperatureArrowDown, faTemperatureArrowUp, faWind } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [dataFormatada, setDataFormatada] = useState("");

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const fetchWeather = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(
        savePositionToState
      );

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=243407f7190a846b8a643d31a0be604e&units=metric&lang=pt_br`
      );

      setWeather(response.data.weather[0].description);
      setWeatherIcon(response.data.weather[0].icon);
      setTemperature(response.data.main.temp);
      setCityName(response.data.name);
      setCountry(response.data.sys.country);
      setMinTemp(response.data.main.temp_min);
      setMaxTemp(response.data.main.temp_max);
      setHumidity(response.data.main.humidity);
      setWindSpeed(response.data.wind.speed);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);

  useEffect(() => {
    const getDataFormatada = () => {
      const dataAtual = moment();
      const diaSemana = dataAtual.format('dddd');
      const horaFormatada = dataAtual.format('HH:mm');

      const dataFormatada = `${diaSemana}, ${horaFormatada}`;
      setDataFormatada(dataFormatada);
    };

    getDataFormatada();
  }, []);

  return (
    <div>
      <div className='bloco'>
        <div>
          <h1>Clima Local</h1>
        </div>
        <hr></hr>
        
        <div className='corpo'>
          <div className='cidade'>
            <h3>{cityName} - {country}</h3>
          </div>

          <div className='linha1'>
            <div className='coluna1'>
              <div className='temperatura'>
                <h2>{temperature}ºC</h2>
              </div>
            </div>
            
            <div className='coluna2'>
              <div>
                {dataFormatada}
              </div>
              <div className='tempo'>
                <div className='descricao-tempo'>
                {weather}
                </div>
                <div className='icone-tempo'>
                 <WeatherIcon code={weatherIcon} />

                </div>
              </div>
            </div>
          </div>

          <div className='linha2'>
            <div className='coluna1'>
                <div className='temp-max'>
                  <div className='icone-temp-max'>
                    <FontAwesomeIcon icon={faTemperatureArrowUp} />
                  </div>
                  <div className='valor-temp-max'>
                    Máxima {maxTemp}ºC
                  </div>
                </div>
                <div className='temp-min'>
                  <div className='icone-temp-min'>
                    <FontAwesomeIcon icon={faTemperatureArrowDown} />
                  </div>
                  <div className='valor-temp-min'>
                    Mínima {minTemp}ºC</div>
                  </div>
            </div>
            <div className='coluna2'> 
              <div className='umidade'>
                <div className='icone-umidade'>
                  <FontAwesomeIcon icon={faDroplet} />
                </div>
                <div className='porcentagem-umidade'>
                  Umidade {humidity}%
                </div>
              </div>
              <div className='vento'>
                <div className='icone-vento'>
                  <FontAwesomeIcon icon={faWind} />
                </div>
                <div className='velocidade-vento'>
                  Ventos {windSpeed}Km/h
                </div>
              </div>
            </div>   
          </div>
        </div>
      </div>
      <div className='rodape'>
        <hr></hr>
        Este é um projeto didático feito para exercitar conceitos de React JS e consumo de APIs. 
        Este projeto se utilizou da API <span><a href='https://openweathermap.org/' target='_blank' rel='noreferrer'>Open Weather Map</a></span>, disponibilizada gratuitamente na Web.
        <hr></hr>
        <div class="social">
              <a href="https://github.com/theyCallMeDudu" target="blank">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href="https://www.linkedin.com/in/eduardo-coelho-/" target="blank">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="mailto:eduardo.coelho@edu.unirio.br" target="blank">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
              <a href="https://theycallmedudu.github.io/eduardocoelho/" target="blank">
                <FontAwesomeIcon icon={faGlobe} />
              </a>
        </div>
      </div>
    </div>
  );
}

export default App;