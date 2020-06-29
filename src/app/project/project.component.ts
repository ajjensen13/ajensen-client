import { Component, OnInit } from '@angular/core';
import { Project, ProjectService } from './project.service';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  project$: Observable<Project | undefined>;

  constructor(private service: ProjectService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.project$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          return EMPTY;
        }
        return this.service.getProject(id);
      })
    );
  }
}
