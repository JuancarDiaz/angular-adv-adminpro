import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit{


ngOnInit(): void {
   this.settingsService.checkCurrentTheme();
}

   constructor(private settingsService:SettingsService){}

public linckTheme:any;
public licks:NodeListOf<Element> | undefined;



changeTheme(theme:string){

    this.settingsService.changeTheme(theme);
}






}
