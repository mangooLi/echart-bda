import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagerComponent implements OnInit, OnChanges {

  @Input() pageIndex = 1;
  @Input() total = 0;
  @Input() pageSize = 10;
  @Output() pageIndexChange = new EventEmitter();
  showPages = [];
  totalPage = 0;
  maxItems = 2;
  paginationPageSizes = [10, 20, 30];
  constructor() { }
  ngOnInit() { }

  // 上一页
  prev() {
    if (this.isPrev()) {
      this.onPageIndexChange(this.pageIndex - 1);
    }
  }

  isPrev() {
    return this.pageIndex > 1;
  }


  // 下一页
  next() {
    if (this.isNext()) {
      this.onPageIndexChange(this.pageIndex + 1);
    }
  }

  isNext() {
    return this.pageIndex < this.totalPage;
  }


  // 选择页码
  onPageIndexChange(item) {
    this.pageIndex = item;
    this.createPageArray();
    this.pageIndexChange.emit({
      pageSkip: Number(item - 1) * this.pageSize,
      pageIndex: item,
      pageSize: this.pageSize
    });
  }

  // 首页
  // first() {
  //   if (this.pageIndex !== 1) {
  //     this.onPageIndexChange(1, true);
  //   }
  // }

  changePageSize() {
    this.totalPage = this.getTotalPage();
    this.pageIndex = 1;
    this.onPageIndexChange(1);
  }



  ngOnChanges(changes: SimpleChanges): void {
    this.totalPage = this.getTotalPage();
    this.pageIndex = Math.max(Math.min(this.pageIndex, this.totalPage), 1);
    this.createPageArray();
  }

  // 获取总页数
  getTotalPage() {
    return Math.ceil(this.total / this.pageSize);
  }

  // 创建页码array
  createPageArray() {
    const index = this.pageIndex;
    if (this.totalPage < this.maxItems) {
      this.showPages = new Array<number>(this.totalPage).fill(index).map((_a, i) => i + 1);
      return;
    }
    this.showPages = this.maxPageArray();
  }

  maxPageArray() {
    let showPages = [this.pageIndex];
    let start = this.pageIndex - 1;
    let end = this.pageIndex + 1;

    const leftRange = index => index < 1;
    const rightRange = index => index > this.totalPage;
    const pageLenRange = len => len.length >= this.maxItems;
    while (!pageLenRange(showPages)) {
      if (!leftRange(start)) {
        showPages.unshift(start--);
      }

      if (!rightRange(end)) {
        showPages.push(end++);
      }
    }

    return showPages;

  }

}
