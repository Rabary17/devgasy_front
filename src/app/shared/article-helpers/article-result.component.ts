import { Component, Input } from '@angular/core';

import { Article } from '../../core';

@Component({
  selector: 'app-article-result',
  templateUrl: './article-result.component.html'
})
export class ArticleResultComponent {
@Input() article;
}
