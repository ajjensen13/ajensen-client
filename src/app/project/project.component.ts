import { Component, OnInit } from '@angular/core';
import { Project, ProjectService } from './project.service';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  project$: Observable<Project | undefined>;

  constructor(
      private service: ProjectService,
      private title: Title,
      private route: ActivatedRoute,
      private meta: Meta) {}

  ngOnInit(): void {
    this.project$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          return EMPTY;
        }
        return this.service.getProject(id).pipe(
          tap(x => {
            if (x?.title) {
              this.title.setTitle(x.title);
            }
          }),
          tap(x => {
            if (x?.summary) {
              this.meta.updateTag({ name: 'description', content: x.summary });
            }
          })
        );
      })
    );
  }
}
