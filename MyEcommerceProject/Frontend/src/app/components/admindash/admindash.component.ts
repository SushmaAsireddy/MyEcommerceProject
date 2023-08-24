import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/common/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit {

  searchText: string;
  patients: Patient[]; 
  filteredPatients: Patient[];

  constructor(private patientService: PatientService,
    private router: Router) { }

  ngOnInit(): void {

    this.getPatients();
  }

  private getPatients(){
    this.patientService.getPatientslist().subscribe(data => { this.patients = data; 
      this.filteredPatients = data;
    });
  }

  updatePatient(id: number) {

    this.router.navigate(['updatepatient', id]);

  }

  deletePatient(id: number) {
    this.patientService.deletePatient(id).subscribe(data => {
      console.log(data);
      this.getPatients();
    } ); 
  }

  applyFilter() {
    if (this.searchText) {
      this.filteredPatients = this.patients.filter(patient =>
        patient.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } 
    else {
      this.filteredPatients = this.patients;
    }
  }

}
