import { Component, OnInit } from '@angular/core';
import { DataServiceProvider } from 'src/app/providers/data-service/data-service';

@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.page.html',
  styleUrls: ['./user-guide.page.scss'],
})
export class UserGuidePage implements OnInit {

  constructor(
    private dataService: DataServiceProvider,
  ) { }

  ngOnInit() {
  }
  safeImage(name: string): any {
    return this.dataService.safeUserGuideImage(name);
  }

}
