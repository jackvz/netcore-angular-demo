import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IncidentService } from '../incident.service';
import { Incident } from '../incident';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.scss']
})
export class IncidentComponent implements OnInit {

  incident$: Observable<Incident>;
  incidentId: number;

  constructor(private incidentService: IncidentService, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.incidentId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadIncident();
  }

  loadIncident() {
    this.incident$ = this.incidentService.getIncident(this.incidentId);
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
