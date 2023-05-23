import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class WeatherService {
  apiKey = '827ee4e2454511e6757b715d17f5d56c'; // Insira sua chave de API do OpenWeatherMap aqui

  constructor(private http: HttpClient) { }

  getWeatherData(city: string) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.apiKey}`;

    return this.http.get(currentWeatherUrl)
      .pipe(
        switchMap((currentWeather: any) => {
          return this.http.get(forecastUrl)
            .pipe(
              map((forecast: any) => {
                const weatherData: any = {
                  currentTemp: currentWeather.main.temp,
                  forecast: []
                };

                for (const item of forecast.list) {
                  const date: string = item.dt_txt;
                  const temperature: number = item.main.temp;
                  weatherData.forecast.push({ date: date, temperature: temperature });
                }

                return weatherData;
              })
            );
        })
      );
  }
}
