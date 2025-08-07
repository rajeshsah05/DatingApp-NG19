import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MemebrService } from '../../../core/services/memebr.service';
import { Member, MemberParams } from '../../../types/member';
import { MemberCardComponent } from "../../members/member-card/member-card.component";
import { PaginatedResult } from '../../../types/pagination';
import { PaginatorComponent } from "../../../shared/paginator/paginator.component";
import { FilterModalComponent } from '../../members/filter-modal/filter-modal.component';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent, PaginatorComponent, FilterModalComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  @ViewChild('filterModal') modal!: FilterModalComponent;
  private memberService = inject(MemebrService);
  protected paginatedMembers = signal<PaginatedResult<Member> | null>(null);
  protected memberParams = new MemberParams();
  private updatedParams = new MemberParams();

  constructor(){
    const filters = localStorage.getItem('filters');
    if(filters){
      this.memberParams = JSON.parse(filters);
      this.updatedParams =JSON.parse(filters);
    }
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.memberParams).subscribe({
      next: result => {
        this.paginatedMembers.set(result);
      }
    })
  }

  onPageChange(event: { pageNumber: number, pageSize: number }) {
    this.memberParams.pageNumber = event.pageNumber;
    this.memberParams.pageSize = event.pageSize;
    this.loadMembers();
  }

  openModal() {
    this.modal.open();
  }

  onClose() {
    console.log('Modal closed');
  }

  onFilterChange(data: MemberParams) {
    this.memberParams = {...data};
    this.updatedParams = {...data};
    this.loadMembers();
  }

  reserFilter() {
    this.memberParams = new MemberParams();
    this.updatedParams = new MemberParams();
    this.loadMembers();
  }

  get displayMessage(): string {
    const defaultParams = new MemberParams();

    const filters: string[] = [];
    if (this.updatedParams.gender) {
      filters.push(this.updatedParams.gender + 's')
    } else {
      filters.push('Males', 'Females');
    }
    if (this.updatedParams.minAge !== defaultParams.minAge
      || this.updatedParams.maxAge !== defaultParams.maxAge) {
      filters.push(` ages ${this.updatedParams.minAge}-${this.updatedParams.maxAge}`);
    }

    filters.push(this.updatedParams.orderBy === 'lastActive'
      ? 'Recently active' : 'Newest members')

    return filters.length > 0 ? `Selected: ${filters.join(' | ')}` : 'All members';
  }

}
