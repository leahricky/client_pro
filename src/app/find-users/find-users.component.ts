import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../models/user.model';
import { User_Service } from '../services/user.service';
import { DatePipe, DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { newArray } from '@angular/compiler/src/util';
import { LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { DYNAMIC_TYPE } from '@angular/compiler';
//import { ENETDOWN } from 'constants';
import { first } from 'rxjs';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { DialogAvailabilityComponent } from '../dialog-availability/dialog-availability.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRoomBookingsComponent } from '../dialog-room-bookings/dialog-room-bookings.component';
import { DialogUserDetailsComponent } from '../dialog-user-details/dialog-user-details.component';


export interface DialogUserIdData {
  user: User;
}

@Component({
  selector: 'app-find-users',
  templateUrl: './find-users.component.html',
  styleUrls: ['./find-users.component.css'],
  //encapsulation: ViewEncapsulation.None

})
export class FindUsersComponent implements OnInit {


  workingStatusOpt = [
    { id: 18, name: "עצמאית" },
    { id: 19, name: "שכירה" },
    { id: 20, name: "פרילנסרית" }
  ];

  marriageStatusOpt = [
    { id: 13, name: "נשואה" },
    { id: 14, name: "רווקה" },
  ];

  user_roomb_details!: FormGroup;
  datasource!: User[];
  customers!: User[];
  totalRecords!: number;
  cols!: any[];
  loading!: boolean;
  ds!: Date;
  de!: Date;

  filteredUserFName: User[] = [];
  filteredUserLName: User[] = [];
  running: User[] = [];
  lazyData: User[] = [];

  user!: User;

  event!: LazyLoadEvent;
  constructor(private _aaa: User_Service, private primengConfig: PrimeNGConfig, public dialog: MatDialog,public datepipe: DatePipe) {

    //  this.d[0]=new Date('2022-03-06T14:00:42.784Z');
    //  this.d[1]=new Date('2022-03-06T14:00:42.784Z')
  }
;

  openRoomBookingsDialog(): void {
    const RBdialogRef = this.dialog.open(DialogRoomBookingsComponent, {
      width: '50%',
      height: '50%',
      data: {
        user: this.user
      },
    });


  RBdialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

    openUserDetailsDialog(): void {
      const UDdialogRef = this.dialog.open(DialogUserDetailsComponent, {
        width: '50%',
        height: '50%',
        data: {
          user: this.user
        },
      });
  
UDdialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  

  ngOnInit(): void {

    this.user_roomb_details = new FormGroup({
      s_date: new FormControl(),
      e_date: new FormControl(),

      filter_fName: new FormControl(),
      filter_lName: new FormControl()
    })


    // this._aaa.gettUsers(this.sedate).subscribe(data=>{ this.users = data;})

    //     this.statuses = [
    //         {label: 'INSTOCK', value: 'instock'},
    //         {label: 'LOWSTOCK', value: 'lowstock'},
    //         {label: 'OUTOFSTOCK', value: 'outofstock'}
    //     ];
  }

  func() {
   
    let data = this.user_roomb_details.value;
    data.s_date =this.datepipe.transform(data.s_date, 'yyyy-MM-dd');
    data.e_date=this.datepipe.transform(data.e_date, 'yyyy-MM-dd');
    
    this._aaa.whatever(data.s_date, data.e_date)
      .subscribe(data => {

        this.datasource = data;
        this.lazyData = this.datasource;
        this.customers = this.datasource.slice(0, (2 + 3));
        this.totalRecords = data.length;

      });
    this.loading = true;
    this.primengConfig.ripple = true;

  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    //this.customers = this.datasource.slice(0, (2+8));

    //in a real application, make a remote request to load data using state metadata from event
    //event.first = 0;
    //event.rows = 1;
    // event.sortField = this.datasource[0].firstName;
    // event.sortOrder=1;
    // filters:{this.datasource[0].firstName:} //FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network

    setTimeout(() => {
      if (this.lazyData && (event.first || event.first == 0) && event.rows) {
        this.customers = this.lazyData.slice(event.first, (event.first + event.rows));
        console.log(event.first, "event.first");
        console.log(event.rows, " event.rows");
        this.loading = false;
      }
    }, 10);
  }


  do_fName(paramF: string, paramL: string) {
    this.filteredUserFName = [];
    this.running = [];

    if (paramF && (paramL == "" || !paramL)) {
      this.running = this.datasource;
      this.runFName(paramF);
    }
    else {
      if (paramF && paramL) {
        this.running = this.filteredUserLName;
        this.runFName(paramF);
      }
      else {
        if (paramL) {
          this.do_lName(paramF, paramL)
        }
        else {
          [...new Set(this.datasource)];
          this.lazyData = this.datasource;
          this.customers = this.datasource.slice(0, (2 + 3));
          this.totalRecords = this.datasource.length;
        }
      }
    }

  }


  do_lName(paramF: string, paramL: string) {
    this.filteredUserLName = [];
    this.running = [];

    if (paramL && (paramF == "" || !paramF)) {
      this.running = this.datasource;
      this.runLName(paramL);
    }
    else {
      if (paramL && paramF) {
        this.running = this.filteredUserFName;
        this.runLName(paramL);
      }
      else {
        if (paramF)
          this.do_fName(paramF, paramL);
        else {
          [...new Set(this.datasource)];
          this.lazyData = this.datasource;
          this.customers = this.datasource.slice(0, (2 + 2));
          this.totalRecords = this.datasource.length;
        }
      }
    }
  }
  runFName(paramF: string) {

    this.running.forEach(user => {
      let i;

      for (i = 0; i < paramF.length; i++) {
        if (user.firstName.charAt(i) != paramF.charAt(i))
          break;
      }
      if (i == paramF.length)
        this.filteredUserFName.push(user)
    });

    [...new Set(this.filteredUserFName)];
    this.lazyData = this.filteredUserFName;
    this.customers = this.filteredUserFName.slice(0, (2 + 2));
    this.totalRecords = this.filteredUserFName.length;

  }


  runLName(paramL: string) {

    this.running.forEach(user => {
      let i;

      for (i = 0; i < paramL.length; i++) {
        if (user.lastName.charAt(i) != paramL.charAt(i))
          break;
      }
      if (i == paramL.length)
        this.filteredUserLName.push(user)
    });

    [...new Set(this.filteredUserLName)];
    this.lazyData = this.filteredUserLName;
    this.customers = this.filteredUserLName.slice(0, (2 + 2));
    this.totalRecords = this.filteredUserLName.length;

  }


  filter(id: string) {

    let paramF = this.user_roomb_details.controls['filter_fName'].value;
    let paramL = this.user_roomb_details.controls['filter_lName'].value;

    if (id == 'filter_fName')
      this.do_fName(paramF, paramL);
    else
      this.do_lName(paramF, paramL);

    this.loading = true;
    this.primengConfig.ripple = true;
  }

  getRBs(user: User) {

    this.user = user;
    this.openRoomBookingsDialog();
  }

  openUserDialog(user: User){
    this.user = user;
    this.openUserDetailsDialog();
  }

  DeleteUser(idNumber: string){
    alert("למצוא את ההודעה שאישורה תמחוק את היוזר וביטולה לא");
  }








  //  openNew() {
  //   this.users = [];
  //   this.submitted = false;
  //   this.ordersDialog = true;
  // }

  // deleteSelectedProducts() {
  //   this.confirmationService.confirm({
  //       message: 'Are you sure you want to delete the selected products?',
  //       header: 'Confirm',
  //       icon: 'pi pi-exclamation-triangle',
  //       accept: () => {
  //           this.users = this.users.filter(val => !this.selectedusers.includes(val));
  //           this.selectedusers = [];
  //           this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
  //       }
  //   });
  // }

  // editProduct(user: User) {
  //   this.user = {...user};
  //   this.ordersDialog = true;
  // }

  // deleteProduct(user: User) {
  //   this.confirmationService.confirm({
  //       message: 'Are you sure you want to delete ' + user.firstName + '?',
  //       header: 'Confirm',
  //       icon: 'pi pi-exclamation-triangle',
  //       accept: () => {
  //           this.users = this.users.filter(val => val.idNumber !== user.idNumber);
  //           this.users =[];
  //           this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
  //       }
  //   });
  // }

  // hideDialog() {
  //   this.ordersDialog = false;
  //   this.submitted = false;
  // }

  // saveProduct() {
  //   this.submitted = true;

  //   if (this.user.firstName.trim()) {
  //       if (this.user.idNumber) {
  //           this.users[this.findIndexById(this.user.idNumber)] = this.user;
  //           this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
  //       }
  //       else {
  //           this.user.idNumber = this.createId();
  //           // this.user.image = 'product-placeholder.svg';
  //           this.users.push(this.user);
  //           this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
  //       }

  //       this.users = [this.user];
  //       this.ordersDialog = false;
  //       this.users = [];
  //   }
  // }

  // findIndexById(id: string): number {
  //   let index = -1;
  //   for (let i = 0; i < this.users.length; i++) {
  //       if (this.users[i].idNumber == id) {
  //           index = i;
  //           break;
  //       }
  //   }

  //   return index;
  // }

  // createId(): string {
  //   let id = '';
  //   var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   for ( var i = 0; i < 5; i++ ) {
  //       id += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return id;
  // }

}