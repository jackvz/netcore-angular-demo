import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidentService } from '../incident.service';
import { Incident } from '../incident';

@Component({
  selector: 'app-incident-add-edit',
  templateUrl: './incident-add-edit.component.html',
  styleUrls: ['./incident-add-edit.component.scss']
})
export class IncidentAddEditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formType: string;
  formDescription: string;
  formPerson: string;
  incidentId: number;
  errorMessage: any;
  existingIncident: Incident;

  constructor(
    private incidentService: IncidentService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router) {

    const idParam = 'id';
    this.actionType = 'Add';
    this.formType = 'type';
    this.formDescription = 'description';
    this.formPerson = 'person';
    if (this.avRoute.snapshot.params[idParam]) {
      this.incidentId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        incidentId: 0,
        type: ['', [Validators.required]],
        description: ['', [Validators.required]],
        person: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {
    if (this.incidentId > 0) {
      this.actionType = 'Edit';
      this.incidentService.getIncident(this.incidentId)
        .subscribe(data => (
          this.existingIncident = data,
          this.form.controls[this.formType].setValue(data.type),
          this.form.controls[this.formDescription].setValue(data.description),
          this.form.controls[this.formPerson].setValue(data.person)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let incident: Incident = {
        type: this.form.get(this.formType).value,
        description: this.form.get(this.formDescription).value,
        person: this.form.get(this.formPerson).value,
        dt: new Date()
      };

      this.incidentService.saveIncident(incident)
        .subscribe((data) => {
          this.router.navigate(['/']);
        });
    }

    if (this.actionType === 'Edit') {
      let incident: Incident = {
        incidentId: this.existingIncident.incidentId,
        type: this.form.get(this.formType).value,
        description: this.form.get(this.formDescription).value,
        person: this.form.get(this.formPerson).value,
        dt: this.existingIncident.dt
      };
      this.incidentService.updateIncident(incident.incidentId, incident)
        .subscribe((data) => {
          this.router.navigate(['/']);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get type() { return this.form.get(this.formType); }
  get description() { return this.form.get(this.formDescription); }
  get person() { return this.form.get(this.formPerson); }
}
