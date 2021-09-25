export class Model{
    kullanici:Array<Kullanici>;
    log:Array<Log>;
    tasinmaz:Array<Tasinmaz>;
    mahalle:Array<Mahalle>;
    ilce:Array<Ilce>;
    il:Array<Il>;

    constructor() {
    }
}
export class Login
{
  email:string;
  sifre:string;

  constructor(email:string,sifre:string){
    this.email = email;
    this.sifre = sifre;
  }
}
export class Kullanici{
  id:number;
  kullaniciAdi:string ='';
  kullaniciSoyadi:string='';
  sifre:string='';
  eMail:string='';
  adres:string='';
  rol:boolean=true;
  isActive:boolean=true;

  constructor(id?:number,kullaniciAdi?:string,kullaniciSoyadi?:string,adres?:string){
    this.id = id;
    this.kullaniciAdi = kullaniciAdi;
    this.kullaniciSoyadi = kullaniciSoyadi;
    this.adres = adres;
  }
}
export class Log{
  logId:number;
  durum:boolean;
  islemTip:string;
  aciklama:string;
  tarihSaat:Date;
  ip:string;
}
export class Tasinmaz{
  id:number;
  ada:number;
  parsel:number;
  nitelik:string;
  isActive:boolean;
  adres:string;
  mahalleId:number;
  mahalleAdi:string;
}
export class filterTasinmaz{
  kullaniciAdi:string;
  kullaniciSoyadi:string;
  eMail:string;
  adres:string;
}
export class TasinmazGet{
  id:number;
  ada:number;
  parsel:number;
  nitelik:string;
  isActive:boolean;
  adres:string;
  mahalleId:number;
  ilceId:number;
  ilId:number;
  mahalleAdi:string;
  ilceAdi:string;
  ilAdi:string;
}
export class PutTasinmaz{
  Id:number;
  Ada:number;
  Parsel:number;
  Nitelik:string;
  isActive:boolean;
  Adres:string;
  MahalleId:number;
}
export class Mahalle{
  id:number;
  mahalleAdi:string;
  ilceId:number;
  ilceAdi:string;
}
export class Ilce{
  id:number;
  ilceAdi:string;
  ilId:number;
  ilAdi:string;
}
export class Il{
  id:number;
  ilAd:string
}
export class PageRequest<T>{
  count:number;
  pageIndex:number;
  pageSize:number;
  items : T[];

  constructor(count?:number,pageIndex?:number,pageSize?:number,items?:T[]){
    this.count = count;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.items = items;
  }
}
export class Pagination{
  page:number;
  count:number;
  pageSize:number;
  pageSizes:number[];

  constructor(page?:number,count?:number,pageSize?:number,pageSizes?:number[]) {
    this.page = page;
    this.count = count;
    this.pageSize = pageSize;
    this.pageSizes = pageSizes;

  }
}
export class LoginModel{
  EMail:string;
  Sifre:string;
  rol:boolean;
}
