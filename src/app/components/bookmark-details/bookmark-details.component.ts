import { Bookmark } from './../../interfaces/bookmark';
import { ApiClientService } from './../../services/api-client.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookmark-details',
  templateUrl: './bookmark-details.component.html',
  styleUrls: ['./bookmark-details.component.css']
})
export class BookmarkDetailsComponent implements OnInit {
  bookmarkId!:number
  bookmarkDetails?:Bookmark

  constructor(private activatedRoute: ActivatedRoute, private apiClient: ApiClientService) { }
  ngOnInit(): void {
    this.getBookmarkDetails()
  }

  getBookmarkDetails() {
    this.activatedRoute.params.forEach(params => this.bookmarkId = params['id']);
    this.apiClient.getBookmark().subscribe(response=>{
     let bookmarkList=response;
     this.bookmarkDetails=bookmarkList.find(bookmark=>bookmark.id==this.bookmarkId);
      console.log(this.bookmarkDetails);
     
    })
  }
}
