import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  arr = [1, 2, 3, 3, 6, 7, 8, 9, 0];
  cityWeatherData;
  cardNumber;
  source;
  city;
  interval;

  constructor(
    public dialog: MatDialog,
    public dataService: DataService,
    private ngxService: NgxUiLoaderService
    ) { }
  cityName: string;
  locationIcon = document.querySelector('.weather-icon');
  ngOnInit() {

  }
  openDialog(i, name) {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'col-11 col-sm-11 col-md-8 col-lg-6 col-xl-5 px-0'.split(' '),
      data: name ? {cityName: name} : { cityName: this.cityName }
    });

    dialogRef.afterClosed().subscribe(result => {
      try {
        this.city = result;
        this.showData(result, i);
        // this.spinnerInterval(result, i);
      } catch (e) {
        console.log(e);
      }
    });
  }
  update(name){
    this.openDialog(this.cardNumber, name);
  }

  showData(result, i) {
    this.dataService.getData(result).subscribe(data => {
      const {icon} = data.weather[0];
      this.source = `assets/icons/${icon}.png`;
      this.cardNumber = i;
      this.cityWeatherData = data;
      console.log(data);
    });
  }
  spinnerInterval(result, i) {
    this.interval = setInterval(() => {
      this.ngxService.start();
      this.showData(result, i);
      this.ngxService.stop();
    }, 1800);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
