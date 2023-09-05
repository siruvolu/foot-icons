import { Component, OnInit } from '@angular/core';
import { PremierLeagueService } from './services/premier-league.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name1: string = "Arsenal";
  footballIcons1: any[] = [];
  isClickEnabled: boolean = true; // Add a flag variable
  premierLeagueData: any; // Variable to store fetched data

  constructor(private premierLeagueService: PremierLeagueService) {}

  maxIcons: number = 5;

  ngOnInit() {
    const storedIcons1 = localStorage.getItem('footballIcons1');
    if (storedIcons1) {
      this.footballIcons1 = JSON.parse(storedIcons1);
    }
    const season = 2023; // Replace with the desired season
    const leagueId = 39; // Replace with the desired league ID
    this.premierLeagueService.getPremierLeagueData(season, leagueId).subscribe((data) => {
      this.premierLeagueData = data;
      console.log(this.premierLeagueData); // Display fetched data in the console
    });
  }

  handleNameClick(name: string, icons: any[], storageKey: string) {
    if (this.isClickEnabled && icons.length < this.maxIcons) {
      icons.push({});
      localStorage.setItem(storageKey, JSON.stringify(icons));
      this.disableClickForAWhile(); // Call the method to disable click
    }
  }

  resetIcons() {
    this.footballIcons1 = [];
    localStorage.removeItem('footballIcons1');
    this.enableClick(); // Re-enable click after resetting
  }

  disableClickForAWhile() {
    this.isClickEnabled = false;
    setTimeout(() => {
      this.enableClick(); // Re-enable click after a certain time (e.g., 2 seconds)
    }, 2000); // Adjust the time duration as needed (2000 milliseconds = 2 seconds)
  }

  enableClick() {
    this.isClickEnabled = true;
  }
}
