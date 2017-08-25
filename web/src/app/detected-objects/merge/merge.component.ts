import { Component, OnInit,  Input,EventEmitter, Output } from '@angular/core';
import {  AuthenticationService } from '../../login/login.service';
import { ObjectService } from '../detected-object.service';

@Component({
  selector: 'id-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class MergeComponent implements OnInit {
  @Input() selectedObjects;
  constructor(private objectService: ObjectService, private authenticationService:AuthenticationService) {}
  @Output() reload = new EventEmitter<boolean>();


  ngOnInit() {
  }
  removeObject(object:any) {
    let index = this.selectedObjects.indexOf(object, 0);
      if (index > -1) {
          this.selectedObjects.splice(index, 1);
     }
  }

  private mergeObjects() {
    let mergeId: Array<Number> = new Array<Number>(); 
    for (let i= 0; i < this.selectedObjects.length; ++i) {
        mergeId.push(this.selectedObjects[i].id);
    }
      console.log(mergeId);
    this.objectService.mergeObjects(mergeId)
      .subscribe( data=> {
       this.reload.emit(true);
        console.log(data);
      })
  }
}