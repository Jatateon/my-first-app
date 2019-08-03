import axios from 'axios';
import WebService from './WebService';

const url = 'https://anapioficeandfire.com/api/characters';

const urlWeather = 'http://api.openweathermap.org/data/2.5/weather/';

export default {
	async postLogin({ character }) {
		const user = await WebService.post(url + '583', {
			character
		});
		return {
			user
		};
	},
	async getCharacter({ character }) {
		return await WebService.get(url + '/' + character);
	},
	async getWheaterByCityId({city}) {
		return await WebService.get(urlWeather + '?id=' + city + '&APPID=f4b7aed55eedf34fc3e857d2707e9af1&units=metric'); 
	}
};
