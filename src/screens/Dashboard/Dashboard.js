import * as React from 'react';
import styles from './Dashboard.module.scss';
import WebServices from '../../../src/WebServices/WebServices';
import { async } from 'q';
import produce from 'immer';
import List from '../../components/List/List';

export default (class Dashboard extends React.PureComponent {
	state = {
        response: {},
        cities:[2172797,3522509,3517285],
        selectedCity:3522509,
        city:{}
	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData = async () => {
		try {
			const character = '583';
			const response = await WebServices.getCharacter({
				character
            });

            const {selectedCity} = this.state;

            const responseCity = await WebServices.getWheaterByCityId({
                city:selectedCity
            });
            
            const nextState = produce(this.state, (draft) => {
                draft.response = response;
                draft.city = responseCity;
            })
            
            this.setState(nextState);
            console.log("TCL: Dashboard -> fetchData -> nextState", nextState)
            console.log("TCL: Dashboard -> fetchData -> responseCity", responseCity)

		} catch (e) {
			console.log('TCL: fetchData -> e', e);
		}
	};

	render() {
        const {response, cities, city, selectedCity} = this.state;
        
        return ( 
            <div>
                <select>
                    {cities.map((item, idx) => (
                        <option key={idx.toString()}>{item}</option>
                    ))}    
                </select>
                {city && 
                city.name && (
                    <p>{city.name}</p>
                )}
                
                {city && 
                city.weather && (
                    <div>
                        <strong>Description</strong>
                    {city.weather.map((item, idx) => (
                        <p>{item.description}</p>
                    ))}
                    </div>
                )}

                {city &&
                city.main && (
                    <div>
                    <strong>Humidity: </strong>
                    <p>{city.main.humidity}</p>
                    </div>
                )}
                
            </div>
        );
	}
});
