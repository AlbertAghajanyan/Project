import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'detectedObjectsFilter'
})
export class DetectedObjectsFilterPipe implements PipeTransform {

  private data: any[];

  transform(items: any[], key: string, input: string, searchBy: string): any[] {
    this.data = items;
    if (!items) {
      return [];
    } else if (!input) {
      return items;
    }
    if (searchBy === 'Camera' && key === 'cameraName') {
      return this.createCameraObject(items, input);
    } else if (searchBy === 'Date' && key === 'imageDate') {
      return this.searchByInterval(input);
    } else {
      return items.filter(it => (it[key] === input || it[key].length !== input.length));
    }
  };

  isContainInterval(date, fromDate, toDate) {
    let dt = date.split('/');
    for (let i = 0; i < 3; ++i) {
      if (dt[i] < fromDate[i] || (toDate && dt[i] > toDate[i]) || (!toDate && dt[i] !== fromDate[i])) {
        return false;
      }
    }
    return true;
  }

  searchByInterval(date) {
    let regExpr = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    let dateList = date.split('-');
    let fromDate = dateList[0] ? dateList[0] : date;
    let toDate = dateList[1] ? dateList[1] : date;
    if (fromDate && fromDate.match(regExpr)) {
      if (toDate && toDate.match(regExpr)) {
        return this.createItem(this.data, fromDate.split('/'), toDate.split('/'));
      } else {
        return this.createItem(this.data, fromDate.split('/'), null);
      }
    }
  }


  createItem(obj, fromDate, toDate) {
    let items = [];

      for (let j = 0, i = 0; j < obj.length; ++j) {
        if (!fromDate || this.isContainInterval(obj[j].imageDate, fromDate, toDate)) {
          items[i] =  obj[j];
          i++;
        }
      }
    return items;
  }

  createCameraObject(obj, cameraName) {
    let items = [];
    for (let i = 0, j = 0; i < obj.length; ++i) {
      if (obj[i].cameraName === cameraName) {
        items[j] = obj[i];
        j++;
      }
    }
    return items;
  }

}
