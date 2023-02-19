import { ApiClientService } from './../../services/api-client.service';
import { Category } from './../../interfaces/category';
import { Component, OnInit } from '@angular/core';
import { Bookmark } from 'src/app/interfaces/bookmark';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categoryList: Category[] = [];
  bookmarkList: Bookmark[] = [];
  bookmarkDetails?: Bookmark

  constructor(private apiClient: ApiClientService,public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getBookmarkList();
    this.getCategoryList();
  }

  getCategoryList() {
    this.apiClient.getCategory().subscribe(response => this.categoryList = response)
  }
  getBookmarkList() {
    this.apiClient.getBookmark().subscribe(response => {
      this.bookmarkList = response;
      console.log('from home', this.bookmarkList);
    });
  }

  addBookmark() {
    this.dialog.open(PopupComponent);
    this.bookmarkList=this.apiClient.getUpdatedBookmarkList();
    console.log('after add',this.bookmarkList)
  }

  getBookmarkDetails(id: number) {
    this.bookmarkDetails = this.bookmarkList.find(bookmark => bookmark.id == id);
    console.log(this.bookmarkDetails);
  }
}
