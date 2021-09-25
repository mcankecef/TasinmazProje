import { Component, OnInit } from '@angular/core';
import { KullaniciService } from '../kullanici.service';
import { Kullanici, filterTasinmaz, Pagination } from '../Model';
import { FormBuilder,FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import { AlertifyService } from '../alertify.service';


@Component({
  selector: 'app-kullanici-liste',
  templateUrl: './kullanici-liste.component.html',
  styleUrls: ['./kullanici-liste.component.css']
})
export class KullaniciListeComponent implements OnInit {

    formValue !: FormGroup;
    formValue2 !:FormGroup;
    kullanici: Kullanici[];
    kullanicilar : Kullanici[] = [];
    showAdd !:boolean;
    showUpdate !:boolean;
    myKullanici :filterTasinmaz[];
    searchValue:string;
    fileName= 'KullaniciExcel.xlsx';
    kullaniciAdi:string;
    hide : boolean = true;

    public searchText :string ='';
    public pagination : Pagination = new Pagination(1,0,10,[10,20,30,40]);

    kullaniciModel : Kullanici = new Kullanici();

  constructor(private kullaniciService: KullaniciService,private formBuilder : FormBuilder,private alertifyService:AlertifyService) {

  }

  ngOnInit() {
    this.getKullanici();
    this.getKullaniciList();
    this.formValue = this.formBuilder.group({
      kullaniciAdi : [''],
      kullaniciSoyadi : [''],
      sifre : [''],
      eMail : [''],
      adres : [''],
      rol :['']
    })
    this.formValue2 = this.formBuilder.group({
      kullaniciAdi : [''],
      kullaniciSoyadi : [''],
      sifre : [''],
      eMail : [''],
      adres : [''],
      rol :['']
    })
  }
  passwordEye() {
    this.hide = !this.hide;
  }
  getKullanici() {
    this.kullaniciService.getKullanici().subscribe(kullanici =>
    {
      this.kullanici = kullanici;
    });
  }
  postKullanici(){
    this.kullaniciModel.kullaniciAdi = this.formValue2.value.kullaniciAdi;
    this.kullaniciModel.kullaniciSoyadi = this.formValue2.value.kullaniciSoyadi;
    this.kullaniciModel.sifre = this.formValue2.value.sifre;
    this.kullaniciModel.eMail = this.formValue2.value.eMail;
    this.kullaniciModel.adres = this.formValue2.value.adres;
    this.kullaniciModel.rol = this.formValue2.value.rol;

    this.kullaniciService.postKullanici(this.kullaniciModel)
    .subscribe(res => {
      console.log(res);
      this.alertifyService.success("Kullanıcı başarıyla eklendi.");
      this.getKullanici();
      let value = document.getElementById('cancel2');
      value.click();
      this.formValue2.reset();
    },
    err =>{
      alert("Bir şeyler yanlış gitti !")
    })
  }
  deleteKullanici(row : any){
    // if (confirm('Silmek istediğiniz emin misiniz ?')) {
    //   console.log('Evet');
      this.kullaniciService.deleteKullanici(row.id)
      .subscribe(res =>{
        this.alertifyService.success("Başarıyla silindi.");
        this.getKullanici();
      })
    // // } else {
    //   console.log('Hayır');
    // }

  }
  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.kullaniciModel.id = row.id;
    this.formValue.controls['kullaniciAdi'].setValue(row.kullaniciAdi);
    this.formValue.controls['kullaniciSoyadi'].setValue(row.kullaniciSoyadi);
    this.formValue.controls['eMail'].setValue(row.eMail);
    this.formValue.controls['adres'].setValue(row.adres);
    this.formValue.controls['rol'].setValue(row.rol);
  }
  clickAddKullanici(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  updateKullanici(){
    this.kullaniciModel.kullaniciAdi = this.formValue.value.kullaniciAdi;
    this.kullaniciModel.kullaniciSoyadi = this.formValue.value.kullaniciSoyadi;
    this.kullaniciModel.sifre = this.formValue.value.sifre;
    this.kullaniciModel.eMail = this.formValue.value.eMail;
    this.kullaniciModel.adres = this.formValue.value.adres;
    this.kullaniciModel.rol = this.formValue.value.rol;
    this.kullaniciModel.isActive = true;
    this.kullaniciService.updateKullanici(this.kullaniciModel,this.kullaniciModel.id)
    .subscribe(res =>{
      this.alertifyService.success("Kullanıcı başarıyla güncellendi.");
      let value = document.getElementById('cancel')
      value.click();
      this.formValue.reset();
      this.getKullanici();

    })
  }
  filterKullanici(searchTerm:string){
    searchTerm=searchTerm.toLowerCase();
    if(searchTerm == "a"){
      searchTerm="true";
    }
    else if(searchTerm =="ad"){
      searchTerm="true";
    }
    else if(searchTerm =="adm"){
      searchTerm="true";
    }
    else if(searchTerm =="admi"){
      searchTerm="true";
    }
   else if(searchTerm == "admin"){
      searchTerm ="true";
    }
    else if(searchTerm == "k"){
      searchTerm ="false";
    }
    else if(searchTerm == "ku"){
      searchTerm ="false";
    }
    else if(searchTerm == "kul"){
      searchTerm ="false";
    }
    else if(searchTerm == "kull"){
      searchTerm ="false";
    }
    else if(searchTerm == "kulla"){
      searchTerm ="false";
    }
    else if(searchTerm == "kullan"){
      searchTerm ="false";
    }
    else if(searchTerm == "kullanı"){
      searchTerm ="false";
    }
    else if(searchTerm == "kullanıc"){
      searchTerm ="false";
    }
    else if(searchTerm == "kullanıcı"){
      searchTerm ="false";
    }
    if(searchTerm !=null && searchTerm !=""){
      this.pagination.page=1;
    this.kullaniciService.filterKullanici(searchTerm)
    .subscribe(res => {
      this.kullanici = res;
      console.log('a');

    },
    err =>{
      console.log(err)
    }
    )
  }
  else{
    this.getKullanici();
  }
  }
  getKullaniciList(){
    this.kullaniciService.getKullaniciList(this.searchText,this.pagination)
    .subscribe(
      response => {
        this.kullanici = response.items as Kullanici[];
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
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     XLSX.writeFile(wb, this.fileName);

  }
  resetForm(){
    this.formValue2.reset();
  }

}

