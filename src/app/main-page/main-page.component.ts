import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  //styleUrls: ['./main-page.component.scss'],
  providers: [WeatherService]
})
export class MainPageComponent {
  weatherData: any;

  constructor(private weatherService: WeatherService) { }

  getWeather() {
    const city = (document.getElementById('city-select') as HTMLSelectElement).value;
    this.weatherService.getWeatherData(city)
      .subscribe(data => {
        this.weatherData = data;
      });
  }
}
