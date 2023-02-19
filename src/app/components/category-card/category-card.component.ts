import { ApiClientService } from './../../services/api-client.service';
import { Bookmark } from './../../interfaces/bookmark';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {

  @Input() category: string = '';
  @Input() bookmarkList: any[] = [];
  @Output() newBookmarkDetails= new EventEmitter()

  filteredBookmark: Bookmark[] = [];
 

  constructor(private apiClient: ApiClientService, private router: Router) {

  }
  ngOnInit(): void {
    console.log(this.category);
    console.log('from card',this.bookmarkList)
   this. filterBookmarkByCategory()
  }


  filterBookmarkByCategory() {
    console.log(this.bookmarkList);
    this.filteredBookmark = this.bookmarkList.filter(bookmark => bookmark.category === this.category);
    console.log('from filter', this.filteredBookmark);
  }

  viewDetails(id:number){
    this.newBookmarkDetails.emit(id);
  }
}
