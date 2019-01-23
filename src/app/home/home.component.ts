import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ArticleListConfig, TagsService, UserService } from '../core';
import { User} from '../core/models/user.model';
import { ApiService } from '../core/services/api.service';
import { Article } from '../core/models/article.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  article: Array<Article>;
  searchForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tagsService: TagsService,
    private userService: UserService,
    private http: ApiService
  ) {
    this.searchForm = this.fb.group({
      keyword: '',
    });
  }

  searchOn = false;
  isAuthenticated: boolean;
  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };
  tags: Array<string> = [];
  tagsLoaded = false;
  currentUser: User;
  role: Array<string> = [];
  keyword = '';

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        // set the article list accordingly
        if (authenticated) {
          this.setListTo('feed');
          this.role.forEach(res => {
            if (res.indexOf('ADMIN')) {
              console.log('Admin Bonjour' + res);
              this.router.navigateByUrl('/admin');
            }
          });
        } else {
          this.setListTo('all');
        }
      }
    );

    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        this.role = userData.role;
      }
    );

    this.tagsService.getAll()
    .subscribe(tags => {
      this.tags = tags;
      this.tagsLoaded = true;
    });
  }

  search() {
    console.log(this.searchForm.value.keyword);
    if (this.searchForm.value.keyword < 1) {
      this.searchOn = false;
    }
    if (this.searchForm.value.keyword.length > 2) {
      this.keyword = this.searchForm.value.keyword;
      this.searchOn = true;
      // this.searchForm.value.keyword = 'a';

      return this.http.get('/articles/search/' + this.searchForm.value.keyword, this.searchForm.value.keyword).subscribe(
        res =>  {
            this.article = res.article;
        });
    }
  }

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Otherwise, set the list object
    this.listConfig = {type: type, filters: filters};
    this.searchOn = false;
  }
}
