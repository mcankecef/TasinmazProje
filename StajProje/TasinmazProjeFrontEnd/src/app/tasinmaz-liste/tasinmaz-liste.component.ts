import { Component, OnInit } from "@angular/core";
import {
  Tasinmaz,
  Mahalle,
  Il,
  Ilce,
  Model,
  TasinmazGet,
  Pagination,
  PutTasinmaz,
} from "../Model";
import { TasinmazService } from "../tasinmaz.service";
import { MahalleService } from "../mahalle.service";
import { IlceService } from "../ilce.service";
import { IlService } from "../il.service";
import { Form, FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as XLSX from "xlsx";
import { parse } from "querystring";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { AlertifyService } from '../alertify.service';

@Component({
  selector: "app-tasinmaz-liste",
  templateUrl: "./tasinmaz-liste.component.html",
  styleUrls: ["./tasinmaz-liste.component.css"],
})
export class TasinmazListeComponent implements OnInit {
  tasinmaz: Tasinmaz[];
  mahalle: Mahalle[];
  ilce: Ilce[];
  il: Il[];
  customTasinmaz: TasinmazGet[];
  ilList;
  ilceList;
  mahalleList;
  selectedCountry = 0;
  selectedState = 0;
  dropDownForm: FormGroup;
  dropDownForm2: FormGroup;
  tasinmazModel: TasinmazGet = new TasinmazGet();
  tasinmazPutModel: PutTasinmaz = new PutTasinmaz();
  public searchText: string = "";
  public pagination: Pagination = new Pagination(1, 0, 10, [10, 20, 30, 40]);
  searchValue: string;
  tasinmaz3: TasinmazGet;
  isValidated = false;
  fileName = "TasinmazExcel.xlsx";
  constructor(
    private tasinmazService: TasinmazService,
    private ilService: IlService,
    private formBuilder: FormBuilder,
    private mahalleService: MahalleService,
    private alertifyService:AlertifyService
  ) {}

  ngOnInit() {
    this.dropDownForm = this.formBuilder.group({
      il: ["",Validators.required],
      ilce: ["",Validators.required],
      ada: ["",Validators.required],
      parsel: ["",Validators.required],
      nitelik: ["",Validators.required],
      adres: ["",Validators.required],
      mahalleId: ["",Validators.required],
    });
    this.dropDownForm2 = this.formBuilder.group({
      Il: ["", Validators.required],
      Ilce: ["", Validators.required],
      Ada: ["", Validators.required],
      Parsel: ["", Validators.required],
      Nitelik: ["", Validators.required],
      Adres: ["", Validators.required],
      Mahalle: ["", Validators.required],
    });
    this.getTasinmazList();
    this.getTasinmaz();
    this.ilService.getIl().subscribe((ilListe) => {
      this.ilList = ilListe;
    });
  }
  getMahalle() {
    this.mahalleService.getMahalle().subscribe((mahalle) => {
      this.mahalle = mahalle;
    });
  }
  getIl() {
    this.ilService.getIl().subscribe((il) => {
      this.il = il;
    });
  }
  postTasinmaz() {
    this.tasinmazModel.ada = this.dropDownForm.value.ada;
    this.tasinmazModel.parsel = this.dropDownForm.value.parsel;
    this.tasinmazModel.nitelik = this.dropDownForm.value.nitelik;
    this.tasinmazModel.adres = this.dropDownForm.value.adres;
    this.tasinmazModel.mahalleId = this.dropDownForm.value.mahalleId;
    console.log(this.tasinmazModel.mahalleId);
    if (this.dropDownForm.valid) {
      this.tasinmazService.postTasinmaz(this.tasinmazModel).subscribe(
        (res) => {
          console.log(res);
          this.alertifyService.success("Taşınmaz başarıyla eklendi");
          this.getTasinmaz();
          let value = document.getElementById("cancel2");
          value.click();
          this.dropDownForm.reset();
        }

      );
    }
    else{
      console.log('a');
      (err) => {
        console.log(err);
        alert("Bir şeyler yanlış gitti !");
      }
    }
  }

  onEdit(tasinmaz2: TasinmazGet) {
    console.log(tasinmaz2);
    this.tasinmazModel.id = tasinmaz2.id;
    this.getIl();
    this.getIlceByIl2(tasinmaz2.ilId);
    this.getMahalleByIl2(tasinmaz2.ilceId);
    this.dropDownForm2.controls["Il"].setValue(tasinmaz2.ilId);
    this.dropDownForm2.controls["Ilce"].setValue(tasinmaz2.ilceId);
    this.dropDownForm2.controls["Mahalle"].setValue(tasinmaz2.mahalleId);
    this.dropDownForm2.controls["Ada"].setValue(tasinmaz2.ada);
    this.dropDownForm2.controls["Parsel"].setValue(tasinmaz2.parsel);
    this.dropDownForm2.controls["Nitelik"].setValue(tasinmaz2.nitelik);
    this.dropDownForm2.controls["Adres"].setValue(tasinmaz2.adres);

    this.tasinmaz3 = tasinmaz2;
  }
  updateTasinmaz() {
    this.tasinmazModel.ada = parseInt(this.dropDownForm2.get("Ada").value);
    this.tasinmazModel.parsel = parseInt(
      this.dropDownForm2.get("Parsel").value
    );
    this.tasinmazModel.nitelik = this.dropDownForm2.get("Nitelik").value;
    this.tasinmazModel.mahalleId = parseInt(
      this.dropDownForm2.get("Mahalle").value
    );
    this.tasinmazModel.adres = this.dropDownForm2.get("Adres").value;
    console.log(this.tasinmazModel);
    if (this.dropDownForm2.valid) {
      this.tasinmazService
        .updateTasinmaz(this.tasinmazModel.id, this.tasinmazModel)
        .subscribe(
          (res) => {
            this.alertifyService.success("Taşınmaz başarıyla güncellendi.");
            this.getTasinmaz();
            let value = document.getElementById("cancel");
            value.click();
            this.dropDownForm2.reset();
          },

        );
    }
    else{
      (err) => {
        console.log(err);
        alert("Bir şeyler yanlış gitti");
      }
    }
  }

  getTasinmaz() {
    this.tasinmazService.getTasinmaz().subscribe((tasinmaz) => {
      this.customTasinmaz = tasinmaz;
    });
  }
  deleteTasinmaz(row: any) {
      this.tasinmazService.deleteTasinmaz(row.id).subscribe((res) => {
        this.alertifyService.success("Taşınmaz Başarıyla silindi.");
        this.getTasinmaz();
      });
  }

  getIlceByIl(event) {
    this.ilService
      .getIlceByIl(Number(event.target.value))
      .subscribe((ilceList) => {
        this.ilceList = ilceList;
      });
      this.dropDownForm.patchValue({mahalleId:""});
      this.dropDownForm2.patchValue({Mahalle:""});
      this.dropDownForm.patchValue({ilce:""});
      this.dropDownForm2.patchValue({Ilce:""});
  }
  getIlceByIl2(event: number) {
    this.ilService.getIlceByIl(event).subscribe((ilceList) => {
      this.ilceList = ilceList;
    });
  }
  getMahalleByIl2(event: number) {
    this.ilService.getMahalleByIlce(event).subscribe((mahalleList) => {
      this.mahalleList = mahalleList;
    });
  }
  getMahalleByIl(event) {
    this.ilService
      .getMahalleByIlce(Number(event.target.value))
      .subscribe((mahalleList) => {
        this.mahalleList = mahalleList;
      });
      this.dropDownForm.patchValue({mahalleId:""});
      this.dropDownForm2.patchValue({Mahalle:""});
  }
  getTasinmazList() {
    this.tasinmazService
      .getTasinmazList(this.searchText, this.pagination)
      .subscribe(
        (response) => {
          this.tasinmaz = response.items as Tasinmaz[];
          this.pagination.count = response.count;
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  onPageChange(event) {
    this.pagination.page = event;
    this.getTasinmazList();
  }
  onPageSizeChange(event) {
    this.pagination.pageSize = event.target.value;
    this.pagination.page = 1;
    this.getTasinmazList();
  }
  exportexcel(): void {
    let element = document.getElementById("excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, this.fileName);
  }
  filterTasinmaz(searchTerm: string) {
    this.pagination.page=1;
    if (searchTerm != null && searchTerm != "") {
      this.tasinmazService.filterTasinmaz(searchTerm).subscribe(
        (res) => {
          this.customTasinmaz = res;
          console.log("a");
        },
        (err) => {
          console.log(err);
        }
      );
    }
    this.getTasinmaz();
  }
  resetForm(){
    this.dropDownForm.reset();
  }
}
