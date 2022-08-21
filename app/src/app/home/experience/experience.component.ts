import { Component, OnInit } from '@angular/core';
import {ExperienceService} from "../../services/experience.service";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  loading = true;
  experiences!: { frontend: { title: string; experience: string }[]; backend: { title: string; experience: string }[] };

  constructor(
    private readonly experienceService: ExperienceService
  ) { }

  ngOnInit(): void {
    this.experienceService.index.subscribe({
      next: (experiences) => {
        this.experiences = experiences;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

}
