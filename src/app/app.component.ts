import { Component, HostListener } from '@angular/core';
import { RelativeDimensions } from './timeline/relative-dimensions';
import { WindowResizeService } from './services/window-resize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private windowResizeService: WindowResizeService) { }

  title = 'AJ: Timeline';

  @HostListener('window:resize', ['$event']) onWindowResize(event){
    this.windowResizeService.publish(new RelativeDimensions({
      offsetLeft: 0,
      offsetTop: 0,
      offsetWidth: event.target.innerWidth,
      offsetHeight: event.target.innerHeight
    }));
  }
}
