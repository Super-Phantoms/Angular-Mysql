import { HttpClient } from '@angular/common/http';
import { Injectable,Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  @Input() service_categories:any;

  public service: any;
  private isLoggon = new BehaviorSubject(false);
  private data = new BehaviorSubject({});
  private blogs = new BehaviorSubject([] as Object[]);
  private categories = new BehaviorSubject([] as Object[]);
  private currentCategory = new BehaviorSubject({});
  private contacts = new BehaviorSubject({});

  data$ = this.data.asObservable();
  blogs$ = this.blogs.asObservable();
  isLoggon$ = this.isLoggon.asObservable();
  categories$ = this.categories.asObservable();
  currentCategory$ = this.currentCategory.asObservable();
  contacts$ = this.contacts.asObservable();

  updateCurrentCategory(cur_category: Object) {
    this.currentCategory.next(cur_category);
  }

  updateBlogs(blogs:Object[]){
    this.blogs.next(blogs);
  }
  updateData(updatedData:any) {
    const currentData = this.data.getValue();
    const newData = { ...currentData, ...updatedData };
    this.data.next(newData);
  }

  updateIsLoggon(loggon: boolean) {
    this.isLoggon.next(loggon);
  }

  updateCategories(categories: Object[]) {
    this.categories.next(categories);
  }

  updateContacts(contactsData:object[]){
    this.contacts.next(contactsData);
  }

  constructor(private http: HttpClient) { 
    const token = localStorage.getItem("jwt_token");
    if(token) this.updateIsLoggon(true);
  }
}
