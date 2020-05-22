import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { ProjectService } from './project.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private projectService: ProjectService) { }

  getTimeline(): Observable<Project[]> {
    return this.projectService.getProjects();
  }
}
