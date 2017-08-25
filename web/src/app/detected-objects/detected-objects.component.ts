import { Component, OnInit } from '@angular/core';
import { DaterangePickerComponent } from 'ng2-daterange-picker';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { AuthenticationService } from '../login/login.service';
import { ObjectService } from './detected-object.service';
import * as datetime from 'angular-datetime-range';
@Component({
  selector: 'id-detected-objects',
  templateUrl: './detected-objects.component.html',
  styleUrls: ['./detected-objects.component.css']
})
export class DetectedObjectsComponent implements OnInit {
  private date: DateModel;
  private options1: DatePickerOptions;

  private isLogin: boolean = false;
  private isShowCarusel: boolean = false;
  private searchData: boolean = false;

  
  private jsObj;
  private pageItemsCount = 5;
  private DBobjetsCount = 0;
  private currentPage = 1;//current page

  private clickedObject:any;
  private selectedObjects:Array<Object>;

  public objToEdit;
  public editObjecttype;
  public editObjectDate;

  
  constructor(private objectService: ObjectService, private authenticationService:AuthenticationService, private daterangepickerOptions: DaterangepickerConfig) {
    this.daterangepickerOptions.skipCSS = true;
    this.options1 = new DatePickerOptions();
    this.selectedObjects = new Array<Object>();
    this.pageItemsCount = 5;
  }
  
  ngOnInit() {
    this.getObjectList(0, this.pageItemsCount - 1)
  }

  private pageChanged($event) {
    this.currentPage = $event;
    if (!this.searchData) {
      this.getObjectList( (this.currentPage - 1) * this.pageItemsCount, this.pageItemsCount - 1);
    }
  }

  private getObjectList(start:number, size: number) {
    this.objectService.getObjectList(start, size)
    .subscribe(
          data => {
            this.jsObj = this.objectService.objects.objects;
            this.DBobjetsCount = this.objectService.objects.count;
            for (let i = 0; i < this.jsObj.length; ++i) {
              this.jsObj[i].isChecked = false;
            }
          },
          error => {
            alert(error);
          },
      );
  }

  private reload($event) {
    if (this.searchData == true)
      this.searchData = false;
    this.pageChanged(1);
  }
    
  private search(obj) {
      this.searchData = true;
      this.jsObj = obj; 
      this.DBobjetsCount = this.jsObj.count / this.pageItemsCount;
      for (let i = 0; i < this.jsObj.length; ++i) {
          this.jsObj[i].isChecked = false;
      }
      this.currentPage = 1;
  }

  private deleteObject(object_id, index) {
    this.objectService.deleteObject(object_id).subscribe(
        data => {
            this.jsObj.splice(index, 1);
            console.log(data);
        },
        error => console.log(error),
        () => console.log("Done")
    );
  }

  private mergeObjects(object:any) {
    console.log(object);
      let index = this.selectedObjects.indexOf(object, 0);
      if (index > -1) {
          this.selectedObjects.splice(index, 1);
          object.isChecked = false;
      } else {
        this.selectedObjects.push(object);
        object.isChecked = true;
      }
    
  }

  public edit(obj) {
    this.objToEdit = obj;
    this.editObjecttype = obj.type;
    this.editObjectDate = obj.firstDetectedDate;
  }

  private showCarousel(object:any) {
    this.isShowCarusel = true;
    this.clickedObject = object;
  }

  private onChanged(){ 
    this.isShowCarusel = false;
  }

}
