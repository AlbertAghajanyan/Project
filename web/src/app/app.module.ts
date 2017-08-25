import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent, CamerasComponent, LoginComponent, DetectedObjectsComponent, CarouselComponent, DetectedObjectsFilterPipe, NavigationBarComponent, appRoutes } from './app.index'
import { DatePickerModule } from 'ng2-datepicker';
import { MaterialModule } from '@angular/material';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { HttpModule } from '@angular/http';
import { AuthenticationService } from './login/login.service';
import { ObjectService } from './detected-objects/detected-object.service'
import { CamerasService } from './cameras/cameras.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { NgxPaginationModule } from 'ngx-pagination';
import { EditAreaComponent } from './cameras/edit-area/edit-area.component';
import { DtEditAreaComponent } from './detected-objects/edit-area/edit-area.component';
import { CamerasFilterPipe } from './cameras/cameras-filter.pipe';
import { SearchComponent } from './detected-objects/search/search.component';
import { MergeComponent } from './detected-objects/merge/merge.component';

import { DateTimePickerModule } from 'ng-pick-datetime';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CamerasComponent,
    LoginComponent,
    DetectedObjectsComponent,
    CarouselComponent,
    NavigationBarComponent,
    DetectedObjectsFilterPipe,
    EditAreaComponent,
    DtEditAreaComponent,
    CamerasFilterPipe,
    SearchComponent,
    MergeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    CarouselModule.forRoot(),
    Daterangepicker,
    HttpModule,
    NgxPaginationModule,
    DatePickerModule,
    DateTimePickerModule
  ],
  providers: [AuthenticationService, ObjectService, CookieService, CamerasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
