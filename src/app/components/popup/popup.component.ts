import { ActivatedRoute, Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { ApiClientService } from 'src/app/services/api-client.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Bookmark } from 'src/app/interfaces/bookmark';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  categoryList: Category[] = [];
  bookmarkList: Bookmark[] = [];
  updatedBookmarkList: Bookmark[] = [];


  bookmarkForm = this.fb.group({
    title: ['', [Validators.required]],
    url: ['', Validators.required],
    category: ['', Validators.required]
  })

  constructor(private apiClient: ApiClientService,
    private fb: FormBuilder,
    private dialogref: DialogRef<PopupComponent>,
    private router: Router) {
  }
  
  ngOnInit(): void {
    this.getCategoryList();
    this.getBookmarkList();
  }

  getCategoryList() {
    this.apiClient.getCategory().subscribe(response => this.categoryList = response)
  }

  getBookmarkList() {
    this.apiClient.getBookmark().subscribe(response => {
      this.bookmarkList = response;
      // console.log('from home', this.bookmarkList);
    });
  }


  addBookmark() {
    if (this.bookmarkForm.valid) {
      const { title, url, category } = this.bookmarkForm.value;
      let id = this.bookmarkList.length + 1;
      console.log(id);
      if (title && url && category) {
        this.apiClient.addBookmark({ title, url, category, id }).subscribe(response => {
          this.updatedBookmarkList = [...this.bookmarkList, response];
          this.apiClient.setUpdatedBookmark(this.updatedBookmarkList);
        });
      }

      alert('Bookmark Added Successfully');
      this.dialogref.close();
    }
  }

  closeModal() {
    this.dialogref.close()
  }

}
