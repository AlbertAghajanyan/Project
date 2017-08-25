import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output  } from '@angular/core';
import { ObjectService } from '../detected-object.service';
import { Router } from '@angular/router';

@Component({
  selector: 'id-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() objects;
  @Output() searching = new EventEmitter<boolean>();
  @Output() reload = new EventEmitter<boolean>();
  @ViewChild('myDate') myDate:ElementRef;
  @ViewChild('camName') camName:ElementRef; 
  @ViewChild('objType') objType:ElementRef; 
  @ViewChild('objTypeMobile') objTypeMobile:ElementRef; 
  @ViewChild('camNameMobile') camNameMobile:ElementRef; 
  @ViewChild('resetLabel') resetLabel:ElementRef; 
  @ViewChild('resetMobileLabel') resetMobileLabel:ElementRef; 

  private cameraName:String;
  private objectType:String;
  private daterange: any = {};
  private isSearchbarOpen = true;
  public options: any = {
        timePicker: true,
        timePickerIncrement: 5,
        startDate: '2016-01-01 12:03:00',
        locale: {
            format: 'YYYY-MM-DD h:mm:ss'
        },
        alwaysShowCalendars: false,
  };

  constructor(private objectService: ObjectService, private  _router: Router) { }

  ngOnInit() {
      this.resetLabel.nativeElement.hidden = true;
  }

  /**
   * Open navigation bar
   */
  private openNav() {
    document.getElementById("searchbar").style.width = "280px";
    this.isSearchbarOpen = false;
  }

  /**
   * Close navigation bar
   */
  private closeNav() {
    document.getElementById("searchbar").style.width = "0";
    this.isSearchbarOpen = true;
  }

  /**
   * Search object
   */
   private search() {
    let cameraName = this.cameraName;
    let objectType = this.objectType;
    let date = this.myDate.nativeElement.value.split(" - ");
    let startDate = date[0];
    let endDate = date[1];
    let body:Object = {"camera_name":cameraName, "type":objectType, "from_date":startDate, "to_date":endDate};
    this.objectService.searchObjects(body)
    .subscribe(
          data => {
            this.resetLabel.nativeElement.hidden = false;
            this.resetMobileLabel.nativeElement.hidden = false;
            this.objects = this.objectService.objects.objects;
            this.searching.emit(this.objectService.objects.objects);
          },
          error => {
            alert(error);
          },
      );
      this.closeNav();
  }

  /**
   * Reset Search data
   */
  private reset() {
    this.resetMobileLabel.nativeElement.hidden = true;
    this.resetLabel.nativeElement.hidden = true;
    this.camName.nativeElement.value = '';
    this.objType.nativeElement.value = '';
    this.camNameMobile.nativeElement.value = '';
    this.objTypeMobile.nativeElement.value = '';
    this.reload.emit(true);
    this.closeNav();
  }

  /**
   * Get search date from date picker 
   * 
   * @param value date picker output object
   */
  private selectedDate(value: any) {
      this.daterange.start = value.start._d;
      this.daterange.end = value.end._d;
  }
}
