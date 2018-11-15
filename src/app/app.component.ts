import { Component } from '@angular/core';
import { faAngleDoubleLeft, faSearch, faBell, faTasks } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app';
  isCollapsed = false;
  isReverseArrow = true;
  width = 200;
  iconCollapse = faAngleDoubleLeft;
  iconSearch = faSearch;
  iconNotification = faBell;
  iconTask = faTasks;
}
