import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IncidentService } from '../incident.service';
import { Incident } from '../incident';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {
  incidents$: Observable<Incident[]>;

  constructor(private incidentService: IncidentService) {
  }

  ngOnInit() {
    this.loadIncidents();
  }

  loadIncidents() {
    this.incidents$ = this.incidentService.getIncidents();
  }

  delete(incidentId) {
    const ans = confirm('Do you want to delete incident with id: ' + incidentId);
    if (ans) {
      this.incidentService.deleteIncident(incidentId).subscribe((data) => {
        this.loadIncidents();
      });
    }
  }
}
