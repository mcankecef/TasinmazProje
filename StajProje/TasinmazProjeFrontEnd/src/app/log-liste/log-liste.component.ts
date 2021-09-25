import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Model, Log, Pagination } from '../Model';
import { LogService } from '../log.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-log-liste',
  templateUrl: './log-liste.component.html',
  styleUrls: ['./log-liste.component.css']
})
export class LogListeComponent implements OnInit {
  logModel :Log = new Log();
  formValue !:FormGroup;
  log : Log[];
  searchTerm : string;
  public searchText :string ='';
  public pagination : Pagination = new Pagination(1,0,10,[10,20,30,40]);
  fileName= 'ExcelSheet.xlsx';
  searchValue:string;


  constructor(private LogService :LogService,private formBuilder :FormBuilder) { }


  ngOnInit() {
    this.getLog();
  }
  getLog(){
    this.LogService.getLog().subscribe(log => {
      this.log = log;
    })
  }
  getKullaniciList(){
    this.LogService.getLogList(this.searchText,this.pagination)
    .subscribe(
      response => {
        this.log = response.items as Log[];
        this.pagination.count = response.count;
        console.log(response);
      },
      error =>{
        console.log(error);
      });
  }
  onPageChange(event){
    this.pagination.page = event;
    this.getKullaniciList();
  }
  onPageSizeChange(event){
    this.pagination.pageSize = event.target.value;
    this.pagination.page = 1;
    this.getKullaniciList();
  }
  exportexcel(): void
    {
       let element = document.getElementById('excel-table');
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element,{dateNF:'mm/dd/yyyy;@',cellDates:true, raw: true});

       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       XLSX.writeFile(wb, this.fileName);

    }
    filterLog(searchTerm:string){
      this.pagination.page=1;
      searchTerm = searchTerm.toLowerCase();
      if(searchTerm =="b"){
        searchTerm="true";
      }
      else if(searchTerm == "ba"){
        searchTerm = "true";
      }
      else if(searchTerm =="baş"){
        searchTerm = "true";
      }
      else if(searchTerm =="başa"){
        searchTerm = "true";
      }
      else if(searchTerm =="başar"){
        searchTerm = "true";
      }
      else if(searchTerm == "başarı"){
        searchTerm ="true";
      }
      else if(searchTerm == "başarıl"){
        searchTerm="true";
      }
      else if(searchTerm == "başarılı")
      {
        searchTerm="true";
      }
      else if(searchTerm == "b"){
        searchTerm ="false";
      }
      else if(searchTerm == "ba"){
        searchTerm = "false";
      }
      else if(searchTerm =="baş"){
        searchTerm = "false";
      }
      else if(searchTerm =="başa"){
        searchTerm = "false";
      }
      else if(searchTerm =="başar"){
        searchTerm = "false";
      }
      else if(searchTerm == "başarı"){
        searchTerm ="false";
      }
      else if(searchTerm == "başarıs"){
        searchTerm = "false";
      }
      else if(searchTerm == "başarısı"){
        searchTerm =  "false";
      }
      else if(searchTerm == "başarısız"){
        searchTerm="false";
      }

      if(searchTerm !=null && searchTerm !=""){
      this.LogService.filterLog(searchTerm)
      .subscribe(res => {
        this.log = res;
        console.log('a');

      },
      err =>{
        console.log(err)
      }
      )
    }
    else
    {
      this.getLog();
    }
  }

}
